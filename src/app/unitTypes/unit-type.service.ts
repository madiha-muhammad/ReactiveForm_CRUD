import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

//import { Observable, of, throwError } from 'rxjs';
//import { catchError, tap, map } from 'rxjs/Operators';

import { IUnitType } from './unit-type';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeService {
  private unitTypeUrl = 'api/unit_types';

  constructor(private http: HttpClient) { }

  getUnitTypes(): IUnitType[] {
    return [
      {
        checkRow: false,
        id: 1,
        lookupValue: 'CAMPUS',
        lookupLabel: 'CAMPUS',
        description: 'This is testing'
      },
      {
        checkRow: false,
        id: 2,
        lookupValue: 'COLLEGE',
        lookupLabel: 'COLLEGE',
        description: 'Testing'
      },
      {
        checkRow: false,
        id: 4,
        lookupValue: 'DEPARTMENT',
        lookupLabel: 'DEPARTMENT',
        description: 'This is testing'
      },
      {
        checkRow: false,
        id: 7,
        lookupValue: 'LEGAL_ENTITY',
        lookupLabel: 'LEGAL_ENTITY',
        description: ''
      }
    ];
  }
}
