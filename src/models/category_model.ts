import { sequelize } from "../services/database";
import { DataTypes, Op } from "sequelize";
import {v4 as uuid_v4} from "uuid";
import { ICategoryData } from "../interface/ICategoryData";
import { Transaction } from "./transaction_model";
import { Bank } from "./bank_model";


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
    createdAt:{
        type: DataTypes.DATE,
        field: 'created_at'
    },
    modifiedAt: {
        type: DataTypes.DATE,
        field: 'modified_at'
    }

};

const options = { timestamps: false, tableName: 'category', sequelize: sequelize };
const Category: any = sequelize.define('Category', attributes, options);

Category.hasMany(Transaction, {
    foreignKey: 'categoryId'
});
// Transaction.belongsTo(Category);


Category.getCategories = () => {
    return Category.findAll({})
}

Category.getCategoryById = (id: string) => {
    return Category.findOne({
        where: {id: id},
    })
}

Category.getCategoryByName = (name: string) => {
    return Category.findOne({
        where: {
            name: name
        },
    })
}

Category.addCategory = async (data: ICategoryData) => {
    data.id = uuid_v4()
    data.name = data.name
    data.createdAt = Date()

    return Category.create(data)
}

Category.updateCategory = async (data: any) => {
    data.modifiedAt = Date()

    await Category.update({ ...data}, {
        where: {id: data.id},
    })

    return Category.findOne({
        where: {id: data.id}
    });
}

Category.deleteCategory = async (id: string) => {
    return await Category.destroy({
        where: {id: id},
    })

}



export { Category }