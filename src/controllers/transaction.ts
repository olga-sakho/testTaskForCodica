import { Controller } from './controller'
import axios from "axios";
import { Bank } from '../models/bank_model';
import {Transaction} from '../models/transaction_model'


const {WEBHOOK_API} = process.env;

class TransactionController extends Controller {
    constructor() {
        super()
        this.createTransaction(),
        this.deleteTransaction(),
        this.allTransaction()
    }

    private createTransaction() {
        const path = '/transaction'
        this.router.post(path, async (request: any, response: any) => {
            try {
                const dataReq = request.body
                if (dataReq.type !== 'profitable' && dataReq.type !== 'consumable') {
                    return response.status(400).json('Not valid format. Format must be profitable or consumable')
                }
                const transactionData: any = await axios.post(
                    WEBHOOK_API as string, {dataReq})    
                   if (transactionData.status == 200) {
                        transactionData.success = true
                        transactionData.data = dataReq
                        const bank = await Bank.getBankById(transactionData.data.bankId);
                        if(!bank) {
                            return response.status(404).json('Bank not found')
                        } else {
                            const transaction = await Transaction.createNew(transactionData.data);  
                            if (transactionData.data.type === "consumable") {
                                bank.balance -= transactionData.data.amount
                                await Bank.updateBalance(transactionData.data.bankId, bank.balance)
                            } else {
                                bank.balance += transactionData.data.amount
                                await Bank.updateBalance(transactionData.data.bankId, bank.balance)
                            }
                            return response.status(201).json(transaction)
                        }
                   } else {
                    return response.status(400).json('Transaction failed')
                   }
                
            } catch (error) {
                response.status(400).json(error)
            }
        })
    }

    private deleteTransaction() {
        const path = '/transaction/:id'
        this.router.delete(path, async (request: any, response: any) => {
            try {
                const transaction = await Transaction.getTransactionById(request.params.id)

                if(!transaction) {
                    return response.status(404).json('Transaction not found')
                } else {
                    const deleteTransaction = await Transaction.deleteTransaction(transaction.id)
                    return response.status(200).json('Transaction successefully deleted')

                }
                
            } catch (error) {
                response.status(400).json(error)
            }
        })
    }

    private allTransaction() {
        const path = '/transaction'
        this.router.get(path, async (request: any, response: any) => {
            try {
                const allTransaction = await Transaction.findAllPag(request.query)
                if(!allTransaction) {
                    return response.status(404).json('Transaction not found')
                }
                return response.status(200).json(allTransaction)
                
            } catch (error) {
                response.status(400).json(error)
            }
        })
    }
}

export default TransactionController