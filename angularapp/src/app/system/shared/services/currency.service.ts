import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseHttpClient } from "src/app/shared/core/base-httpclient";
import { Currency } from "../models/currency.model";

@Injectable() 
export class CurrencyService extends BaseHttpClient {
    constructor (public http: HttpClient) {
        super(http);
    }

    getCurrency(currencyName: string) {
        return this.get<Array<Currency>>(`/api/currency/getexchangerates?baseCurrencyName=${currencyName}`);
    }
}