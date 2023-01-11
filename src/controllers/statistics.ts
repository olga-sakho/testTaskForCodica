import { Controller } from './controller'
import { Bank } from '../models/bank_model';
import {Transaction} from '../models/transaction_model'
import { Category } from '../models/category_model';


class StatisticsController extends Controller {
    constructor() {
        super()
        this.getStatistics()
    }

    private getStatistics() {
        const path = '/statistics'
        this.router.get(path, async (request: any, response: any) => {
            try {
                let category: any
                let statistic: any = []
                    const bank = await Bank.getBankById(request.query.bankId)
                    if (!bank) {
                        return response.status(404).json('Bank not Found')
                    }
                    const statistics = await Transaction.getStatistics(request.query)
                        if(!statistics) {
                            return response.status(404).json('Not Found')
                        }
                        for (const transaction of statistics) {
                            if (transaction.type == "profitable") {
                                category = await Category.getCategoryById(transaction.categoryId)
                                statistic.push(`${category.name}: +${transaction.amount}`)
                            } else if(transaction.type == "consumable") {
                                category = await Category.getCategoryById(transaction.categoryId)
                                statistic.push(`${category.name}: -${transaction.amount}`)
                            }
                        }
            
                  return response.status(200).json({statistic});
                
            } catch (error) {
                response.status(400).json(error)
            }
        })
    }

    
}

export default StatisticsController