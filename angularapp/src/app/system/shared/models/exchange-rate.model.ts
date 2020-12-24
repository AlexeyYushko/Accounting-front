import { Currency } from "./currency.model";

export class ExchangeRate {
    constructor (
        public id: string,
        public date: Date,
        public from: Currency,
        public to: Currency,
        public rate: number
    ) {

    }
}