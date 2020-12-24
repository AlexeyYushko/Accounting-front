import { Currency } from "./currency.model";

export class Bill {
    constructor (
        public id: string,
        public currency: string,
        public amount: number
    ) {

    }
}