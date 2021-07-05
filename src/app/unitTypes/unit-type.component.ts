import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UnitTypeService } from './unit-type.service';
import { IUnitType } from '../unitTypes/unit-type';
import { UnitTypeData } from 'src/app/unit-type-data';

@Component({
  selector: 'as-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.css']
})
export class UnitTypeComponent implements OnInit {
  fromTitle: string = 'Unit Types';
  unitTypeForm: FormGroup;
  selectedRowValues = [];
  unitTypes: IUnitType[] = [];
  //unitTypes: IUnitType;

  get rows(): FormArray {
    return <FormArray>this.unitTypeForm.get('rows');
  }

  get isChecked(): FormArray {
    return <FormArray>this.unitTypeForm.get('isChecked');

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
      checkRow: false,
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
    // this.isChecked.forEach((unit: IUnitType) => {
    //   this.rows.removeAt(this.rows(unit));
    // });
  }


  onCheck(index, event) {
    if (event.target.checked) {
      this.isChecked.push(index);
    }
  }

  saveRecord(): void {
    console.log(this.unitTypeForm.getRawValue());
  }

  save() {
    // this.rows.valueChanges.subscribe(
    //   value => 
    // )
    //console.log(this.unitTypeForm);
    //console.log('Saved: ' + JSON.stringify(this.unitTypeForm.value));
  }

  getSelectedRowValues() { }

  private initializeUnitType(): IUnitType {
    return {
      id: 0,
      lookupValue: null,
      lookupLabel: null,
      description: null
    };
  }
}
