import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseHttpClient } from "src/app/shared/core/base-httpclient";
import { Bill } from "../models/bill.model";

@Injectable() 
export class BillService extends BaseHttpClient {
    constructor (public http: HttpClient) {
        super(http);
    }

    getBill(userId: string): Observable<Bill> {
        return this.get<Bill>(`/api/bill/getbyuserid?userId=${userId}`);
    }

    edit(bill: Bill): Observable<Bill> {
        return this.put(`/api/bill/${bill.id}`, bill);
    }
}