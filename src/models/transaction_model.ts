import { sequelize } from "../services/database";
import { DataTypes, Op } from "sequelize";
import { Bank } from './bank_model'
import {v4 as uuid_v4} from "uuid";
import { Category } from "./category_model";
import {ITransactionData} from "../interface/ITransactionData"


const attributes = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: false
    },
    type: {
        type: DataTypes.ENUM("profitable", "consumable"),
        field: 'type'
    },
    amount: {
        type: DataTypes.INTEGER,
        field: 'amount'
    },
    bankId: {
        type: DataTypes.UUID,
        field: 'bankId'
    },
    categoryId: {
        type: DataTypes.UUID,
        field: 'categoryId' 
    },
    createdAt:{
        type: DataTypes.DATE,
        field: 'created_at'
    }

};

const options = { timestamps: false, tableName: 'transaction', sequelize: sequelize };
const Transaction: any = sequelize.define('Transaction', attributes, options);


Transaction.createNew = async (data: ITransactionData) => {
    data.id = uuid_v4()
    data.createdAt = Date()

    return await Transaction.create(data)
}
Transaction.getTransactionById = async (id: string) => {
    return await Transaction.findOne({
                where: {
                    id: id
                }

    })
}

Transaction.deleteTransaction = async (id: string) => {
    await Transaction.destroy({
        where: {id: id},
    })
}

Transaction.findAllPag = async (params: any) => {
    return await Transaction.findAndCountAll({
        order: [[params.sort || 'id', params.order || 'ASC']],
        limit: +params.limit || 20,
        offset: +params.offset || 0,
    });
}

Transaction.getStatistics = async (data: any) => {
    return await Transaction.findAll({
        where: {
            bankId: data.bankId,
            createdAt: {
                [Op.between]: [data.fromPeriod, data.toPeriod]
            }
        }

    })
}

Transaction.isAnyTransactionsInBank = async (id: string) => {
    return await Transaction.findOne({
                where: {
                    [Op.or]: [{bankId: id},{categoryId: id}]
                }

    })
}



export { Transaction }