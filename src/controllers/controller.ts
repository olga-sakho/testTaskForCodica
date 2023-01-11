import express from "express"
import * as Validator from 'validate-typescript'

export class Controller {
    router: express.Router = express.Router()
    validator: typeof Validator

    constructor() {
        this.validator = Validator
    }

}