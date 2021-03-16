import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BaseHttpClient {
    private prodUrl = 'http://localhost:5000'
    private localUrl = 'http://localhost:57266'
    private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    constructor(public http: HttpClient) {}

    private getUrl(url: string = ''): string {
        return this.prodUrl + url;
    }

    public get<T>(url: string): Observable<T> {
        return this.http.get<T>(this.getUrl(url));
    }

    public post<T>(url: string, body: T, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(this.getUrl(url), body, {headers: headers ?? this.headers});
    }

    public put<T>(url: string, body: any = {}): Observable<T> {
        return this.http.put<T>(this.getUrl(url), body);
    }
}
