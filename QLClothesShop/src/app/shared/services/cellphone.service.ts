import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { validateConfig } from '@angular/router/src/config';

@Injectable({
  providedIn: 'root'
})
export class CellphoneService {

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) {
    this.cellphoneList = this.firebase.list('cellphones');
    this.cellphoneList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  cellphoneList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    productCode: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    brand: new FormControl(0),
    warrantyDate: new FormControl(''),
    status: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      productCode: '',
      productName: '',
      price: '',
      brand: 0,
      warrantyDate: '',
      status: false
    });
  }


  getCellphones() {
    this.cellphoneList = this.firebase.list('cellphones');
    return this.cellphoneList.snapshotChanges();
  }
  getCellphoneByKey($key) {
    if ($key == "0")
      return "";
    else {
      return _.find(this.array, (obj) => { return obj.$key === $key; });
    }
  }
  getBrandName($key) {
    if ($key == "0")
      return "";
    else {
      return _.find(this.array, (obj) => { return obj.$key == $key; })['brandName'];
    }
  }

  checkCellphoneExisted(code){
    return _.find(this.array, (obj) => { return obj.productCode === code; });
  }

  insertCellphone(cellphone) {
    this.cellphoneList.push({
      productCode: cellphone.productCode,
      productName:  cellphone.productName,
      price: cellphone.price,
      brand: cellphone.brand,
      warrantyDate: cellphone.warrantyDate == "" ? "" : this.datePipe.transform(cellphone.warrantyDate, 'yyyy-MM-dd'),
      status: cellphone.status
    });
  }

  updateCellphone(cellphone) {
    this.cellphoneList.update(cellphone.$key,
      {
        productCode: cellphone.productCode,
        productName:  cellphone.productName,
        price: cellphone.price,
        brand: cellphone.brand,
        warrantyDate: cellphone.warrantyDate == "" ? "" : this.datePipe.transform(cellphone.warrantyDate, 'yyyy-MM-dd'),
        status: cellphone.status
      });
  }

  deleteCellphone($key: string) {
    this.cellphoneList.remove($key);
  }

  populateForm(cellphone) {
    this.form.setValue(_.omit(cellphone, 'brandName'));
  }
}
