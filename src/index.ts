import MainApplication from './main_app'
import {Controller} from './controllers/controller';
import BanksController from './controllers/bank';
import CategoryController from './controllers/category';
import TransactionController from './controllers/transaction';
import StatisticsController from './controllers/statistics'


const controllers: Controller[] = [
    new BanksController(),
    new CategoryController(),
    new TransactionController(),
    new StatisticsController()
];

const application = new MainApplication(controllers);
application.listen();