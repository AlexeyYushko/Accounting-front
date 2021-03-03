import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseHttpClient } from "src/app/shared/core/base-httpclient";
import { WFMEvent } from "../models/wfmevent.model";

@Injectable()
export class EventService extends BaseHttpClient {
    constructor (public http: HttpClient) {
        super(http);
    }

    add(category: WFMEvent): Observable<WFMEvent> {
        return super.post<WFMEvent>(`/api/event/add`, category);
    }
}