import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UnitTypeService } from './unit-type.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IUnitType } from 'src/app/unitTypes/unit-type';

@Component({
  selector: 'as-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.css']
})
export class UnitTypeComponent implements OnInit {
  fromTitle: string = 'Unit Types'
  unitTypeForm: FormGroup;
  selectedRowValues = [];
  private sub: Subscription;
  errorMessage: string;
  unitTypes: IUnitType[] = [];
  //unitTypes: IUnitType;

  get rows(): FormArray {
    return <FormArray>this.unitTypeForm.get('rows');
  }

  constructor(private fb: FormBuilder,
    private unitTypeSvc: UnitTypeService) { }

  ngOnInit(): void {
    this.unitTypeForm = this.fb.group({
      checkAllRows: false,
      rows: this.fb.array([])
    });

    this.getUnitTypes();
    this.addRow();
  }

  getUnitTypes() {
    this.clearTableData();
    this.sub = this.unitTypeSvc.getUnitTypes().subscribe({
      next: units => {
        this.rows.patchValue(units)
      },
      error: err => this.errorMessage = err
    });

    // this.unitTypeSvc.getUnitTypes().forEach(x => {
    //   this.rows.push(this.populateRow(x))
    // })
  }

  clearTableData() {
    this.rows.clear();
  }

  populateRow(row?: any) {
    return this.fb.group({
      id: row.id,
      lookupValue: row.lookupValue,
      lookupLabel: row.lookupLabel,
      description: row.description
    })
  }

  createRow(): FormGroup {
    return this.fb.group({
      checkRow: false,
      id: 0,
      lookupValue: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      lookupLabel: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]],
      description: ['']
    });
  }

  addRow(): void {
    this.rows.push(this.createRow());
  }

  deleteRow(): void {
    //this.rows.removeAt(index);
  }
  isChecked(index: Event): void {

  }

  saveRecord(): void {

  }

  save() {
    //console.log(this.unitTypeForm);
    //console.log('Saved: ' + JSON.stringify(this.unitTypeForm.value));
  }

  getSelectedRowValues() {
  }

}
