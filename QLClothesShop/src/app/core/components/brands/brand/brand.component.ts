import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CellphoneService } from '../../../../shared/services/cellphone.service';
import { BrandService } from '../../../../shared/services/brand.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private service: BrandService,
    public cellphoneService: CellphoneService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<BrandComponent>) { }

  ngOnInit() {
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value) {
        this.service.insertBrand(this.service.form.value);
      }
      else {
        this.service.updateBrand(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success('Submitted successfully');
        this.onClose();
      }
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
