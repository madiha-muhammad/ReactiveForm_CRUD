import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IUnitType } from './unitTypes/unit-type';

export class UnitTypeData implements InMemoryDbService {

  createDb() {
    const unit_types: IUnitType[] = [
      {
        id: 1,
        lookupValue: 'CAMPUS',
        lookupLabel: 'CAMPUS',
        description: 'This is testing'
      },
      {
        id: 2,
        lookupValue: 'COLLEGE',
        lookupLabel: 'COLLEGE',
        description: 'Testing'
      },
      {
        id: 4,
        lookupValue: 'DEPARTMENT',
        lookupLabel: 'DEPARTMENT',
        description: 'This is testing'
      },
      {
        id: 7,
        lookupValue: 'LEGAL_ENTITY',
        lookupLabel: 'LEGAL_ENTITY',
        description: ''
      }
    ];
    return { unit_types };
  }
}
