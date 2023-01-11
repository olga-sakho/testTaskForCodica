import { Controller } from './controller'
import { Bank } from '../models/bank_model';
import { Transaction } from '../models/transaction_model';


class BanksController extends Controller {
    constructor() {
        super()
        this.applyGetBanks(),
        this.applyGetBankById(),
        this.applyCreateBank(),
        this.applyUpdateBank(),
        this.applyDeleteBank()
    }

    private applyGetBanks() {
        const path = '/banks'
        this.router.get(path, async (request: any, response: any) => {
            try {
                const banks = await Bank.getBanks();
                return response.status(200).json(banks)
            } catch (err) {
                return response.status(400).json(err)
            }
        })
    }

    private applyGetBankById() {
        const path = '/bank/:id'
        this.router.get(path, async (request: any, response: any) => {
            try {
                const bank = await Bank.getBankById(request.params.id)
                if (bank) {
                    return response.status(200).json(bank)
                } else {
                    return response.status(404).json('Bank not found')
                }
            } catch (err) {
                console.log('3')
                return response.status(400).json(err)
            }
        })
    }

   
    private applyCreateBank() {
        const path = '/bank'
        this.router.post(path, async (request: any, response: any) => {
            try {
                const bank = await Bank.getBankByName(request.body.name)
                if (bank) {
                    return response.status(201).json('This bank exists.')
                } else {
                    const newBank = await Bank.addBank(request.body);
                    return response.status(201).json(newBank)
                }

            } catch (err) {
                return response.status(400).json(err)
            }
        })
    }

    private applyUpdateBank() {
        const path = '/bank/:id'
        this.router.put(path, async (request: any, response: any) => {
            try {
                const bank = await Bank.getBankById(request.params.id)
                if (bank) {
                    request.body.id = bank.id
                    const updatedBank = await Bank.updateBank(request.body);
                    return response.status(200).json(updatedBank)
                } else {
                    return response.status(404).json('Bank not found')
                }
            } catch (err) {
                return response.status(400).json(err)
            }
        })
    }

    private applyDeleteBank() {
        const path = '/bank/:id'
        this.router.delete(path, async (request: any, response: any) => {
            try {
                const bankData = await Bank.getBankById(request.params.id);
                const transactionsExistInBank = await Transaction.isAnyTransactionsInBank(request.params.id)

                if(!transactionsExistInBank) {
                    const deleteBank = await Bank.deleteBank(bankData.id);
                     return response.status(200).json('Bank deleted successfully')
                 } else {
                     return response.status(400).json('There are some transactions in bank');
                 }
            } catch (err) {
                return response.status(400).json(err)
            }
        })
    }

}

export default BanksController
