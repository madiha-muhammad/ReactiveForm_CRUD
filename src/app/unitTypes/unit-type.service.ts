import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/Operators';

import { IUnitType } from './unit-type';

@Injectable({
    providedIn: 'root'
})

export class UnitTypeService {
    private unitTypeUrl = 'api/unit_types';

    constructor(private http: HttpClient) { }

    getUnitTypes(): Observable<IUnitType[]> {
        return this.http.get<IUnitType[]>(this.unitTypeUrl)
            .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
            );
    }

    getUniType(id: number): Observable<IUnitType> {
        if (id === 0) {
            return of(this.initializeUnitType());
        }
        const url = `${this.unitTypeUrl}/${id}`;
        return this.http.get<IUnitType>(url)
        // .pipe(
        //     tap(data => console.log('getUnitType: ' + JSON.stringify(data))),
        //     catchError(this.handleError)
        //     );
    }

    public handleError(err) {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

    private initializeUnitType(): IUnitType {
        return {
            id: 0,
            lookupValue: null,
            lookupLabel: null,
            description: null
        };
    }
}
