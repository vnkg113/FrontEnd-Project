import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { CellphoneService } from '../../../../shared/services/cellphone.service';
import { BrandService } from '../../../../shared/services/brand.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-cellphone',
  templateUrl: './cellphone.component.html',
  styleUrls: ['./cellphone.component.css']
})
export class CellphoneComponent implements OnInit {

  constructor(private service: CellphoneService,
    public brandService: BrandService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CellphoneComponent>) { }



  ngOnInit() {
    this.service.getCellphones();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertCellphone(this.service.form.value);
      else
      this.service.updateCellphone(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
