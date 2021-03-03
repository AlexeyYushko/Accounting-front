export class Bill {
    constructor (
        public currency: string,
        public amount: number,
        public id?: string
    ) {

    }
}