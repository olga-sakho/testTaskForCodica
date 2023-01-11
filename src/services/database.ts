import {Sequelize} from 'sequelize';

const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const sequelize = new Sequelize(
    DB_NAME as string,
    DB_USER as string,
    DB_PASSWORD as string,
    {   
        dialect: 'postgres',
        host: DB_HOST || 'localhost',
        pool: {
            max: 100,
            min: 0,
            idle: 300000,
            acquire: 300000
          },
        port: 5432,
          
});
 

try {
    sequelize.authenticate();
    console.log('Connecting to DB');
} catch (error) {
    console.log(error);
}


export {sequelize}