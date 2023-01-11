require('dotenv').config()
import express  from 'express'
import { Controller } from './controllers/controller'
import { sequelize } from "./services/database";
//const app = express();

(async () => {
  await sequelize.sync({ force: true });

  console.log('Connection has been established successfully');
})();

class MainApplication {
  public app: express.Application;
  public origins: Array<string> = [
    '*'
  ];

  // public accessControl = (req: any, res: any, next: any) => {
  //   this.origins.forEach(function (origin) {
  //     res.header('Access-Control-Allow-Origin', origin);
  //   });

  //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
  //   res.header("Access-Control-Allow-Headers", "*");
  //   next();
  // };


  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }

  public listen() {
    console.log('works')
    this.app.listen(process.env.PORT, () => {
      console.log(`MainApplication listening on the port ${process.env.PORT}`);
    });
  }


  private initializeMiddlewares() {
    // this.app.use(this.accessControl);
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    // this.app.use(cors({
    //   origin: true,
    //   methods: "*",
    //   allowedHeaders: ['Content-Type', 'Authorization'],
    //   optionsSuccessStatus: 204
    // }))

  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default MainApplication