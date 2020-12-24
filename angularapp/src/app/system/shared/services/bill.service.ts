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
        return this.http.get<Bill>(`/api/bill/getbyuserid?userId=${userId}`);
    }
}