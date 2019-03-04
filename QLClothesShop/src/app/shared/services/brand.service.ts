import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  brandList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.brandList = this.firebase.list('brands');
    this.brandList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }


  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    brandCode: new FormControl('', Validators.required),
    brandName: new FormControl('', Validators.required),
  });


  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      brandCode: '',
      brandName: '',
    });
  }

  getBrands() {
    this.brandList = this.firebase.list('brands');
    return this.brandList.snapshotChanges();
  }

  getBrandName($key) {
    if ($key == "0")
      return "";
    else {
      return _.find(this.array, (obj) => { return obj.$key == $key; })['brandName'];
    }
  }
  getBrandByKey($key) {
    if ($key == "0")
      return "";
    else {
      return _.find(this.array, (obj) => { return obj.$key === $key; });
    }
  }
  checkBrandExisted(brandCode){
    return _.find(this.array, (obj) => { return obj.brandCode === brandCode; });
  }
  insertBrand(brand) {
    this.brandList.push({
      brandCode: brand.brandCode,
      brandName: brand.brandName
    });
  }

  updateBrand(brand) {
    this.brandList.update(brand.$key,
      {
        brandCode: brand.brandCode,
        brandName: brand.brandName
      });
  }

  deleteBrand($key: string) {
    this.brandList.remove($key);
  }

  populateForm(brand) {
    this.form.setValue(_.omit(brand));
  }
}
