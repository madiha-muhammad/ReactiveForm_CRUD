import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UnitTypeService } from './unit-type.service';
import { IUnitType } from '../unitTypes/unit-type';

@Component({
  selector: 'as-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.css']
})

export class UnitTypeComponent implements OnInit {
  fromTitle: string = 'Unit Types';
  unitTypeForm: FormGroup;
  unitTypes: IUnitType[] = [];

  get rows(): FormArray {
    return <FormArray>this.unitTypeForm.get('rows');
  }

  constructor(private fb: FormBuilder, private unitTypeSvc: UnitTypeService) { }

  ngOnInit(): void {
    this.unitTypeForm = this.fb.group({
      checkAllRows: false,
      rows: this.fb.array([]),
      isChecked: this.fb.array([])
    });

    this.getUnitTypes();
  }

  getUnitTypes() {
    this.unitTypeSvc.getUnitTypes().forEach((unit: IUnitType) => {
      this.rows.push(this.createRow(unit));
    });
  }

  clearTableData() {
    this.rows.clear();
  }

  createRow(row: IUnitType): FormGroup {
    return this.fb.group({
      checkRow: row.checkRow,
      id: row.id,
      lookupValue: [
        row.lookupValue,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(300)
        ]
      ],
      lookupLabel: [
        row.lookupLabel,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(300)
        ]
      ],
      description: [row.description]
    });
  }

  addRow(): void {
    this.rows.push(this.createRow(this.initializeUnitType()));
  }

  deleteRow(): void {
    var dt = this.rows.controls.filter(row => row.value.checkRow !== true);
    this.rows.clear();

    dt.forEach(row => {
      this.rows.push(row);
    });
  }

  saveRecord(): void {
    console.log(this.unitTypeForm.getRawValue());
  }

  save() {
    //console.log(this.unitTypeForm);
    //console.log('Saved: ' + JSON.stringify(this.unitTypeForm.value));
  }

  getSelectedRowValues() { }

  private initializeUnitType(): IUnitType {
    return {
      checkRow: false,
      id: 0,
      lookupValue: null,
      lookupLabel: null,
      description: null
    };
  }
}
