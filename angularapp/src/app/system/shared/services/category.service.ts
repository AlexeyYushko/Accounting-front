import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseHttpClient } from "src/app/shared/core/base-httpclient";
import { Category } from "../models/category.model";

@Injectable()
export class CategoryService extends BaseHttpClient {
    constructor (public http: HttpClient) {
        super(http);
    }

    add(category: Category): Observable<Category> {
        return this.post<Category>(`/api/category/add`, category);
    }

    getAll(): Observable<Category[]> {
        return this.get<Category[]>(`/api/category`);
    }

    edit(category: Category): Observable<Category> {
        return this.put(`/api/category/${category.id}`, category);
    }
}
