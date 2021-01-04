import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';

@Pipe({
    name: 'wfmMoment'
})
export class MomentPipe implements PipeTransform {

    transform(value: any, formatFrom: string, formatTo: string = 'DD.MM.YYYY'): string {
        return moment(String(value)).format(formatTo);
    }

}