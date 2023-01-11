import { sequelize } from "../services/database";
import { DataTypes } from "sequelize";
import {v4 as uuid_v4} from "uuid";
import { IBankData } from "../interface/IBankData";
import { Transaction } from "./transaction_model";



const attributes = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: DataTypes.STRING,
        field: 'name'
    },
    balance: {
        type: DataTypes.INTEGER,
        field: 'balance'
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    modifiedAt: {
        type: DataTypes.DATE,
        field: 'modified_at'

    }

};

const options = { timestamps: false, tableName: 'bank', sequelize: sequelize };
const Bank: any = sequelize.define('Bank', attributes, options);

Bank.hasMany(Transaction, {
    foreignKey: 'bankId'
});
// Transaction.belongsTo(Bank);

Bank.getBanks = () => {
    return Bank.findAll({})
}

Bank.getBankById = (id: string) => {
    return Bank.findOne({
        where: {id: id},
    })
}

Bank.updateBalance = async (id: string, balance: number) => {
    await Bank.update({
        balance: balance
    },
    {
        where: {id: id},
    })
    return Bank.findOne({
        where: {id: id}
    });
}

Bank.getBankByName = (name: string) => {
    return Bank.findOne({
        where: {
            name: name
        },
    })
}

Bank.addBank = async (data: IBankData) => {
    data.id = uuid_v4()
    data.name = data.name
    data.balance = data.balance
    data.createdAt = Date()

    return Bank.create(data)
}

Bank.updateBank = async (data: any) => {
    data.modifiedAt = Date()

    await Bank.update({ ...data}, {
        where: {id: data.id},
    })

    return Bank.findOne({
        where: {id: data.id}
    });
}

Bank.deleteBank = async (id: string) => {
    return await Bank.destroy({
        where: {id: id},
    })

}

export { Bank }