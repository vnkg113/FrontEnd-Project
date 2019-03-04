import { Component, OnInit, ViewChild } from '@angular/core';
import { CellphoneService } from '../../../../shared/services/cellphone.service';
import { BrandComponent } from './../brand/brand.component';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BrandService } from '../../../../shared/services/brand.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from '../../../../shared/services/notification.service';
import { DialogService } from '../../../../shared/services/dialog.service';
@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  constructor(private service: CellphoneService,
     private brandService: BrandService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }

    listData: MatTableDataSource<any>;
    displayedColumns: string[] = ['brandCode','brandName', 'actions'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey: string;

    ngOnInit() {
      this.brandService.getBrands().subscribe(
        list => {
          let array = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
          this.listData = new MatTableDataSource(array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filterPredicate = (data, filter) => {
            return this.displayedColumns.some(ele => {
              return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
            });
          };
        });
    }

    onSearchClear() {
      this.searchKey = "";
      this.applyFilter();
    }

    applyFilter() {
      this.listData.filter = this.searchKey.trim().toLowerCase();
    }


    onCreate() {
      this.brandService.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      this.dialog.open(BrandComponent, dialogConfig);
    }

    onEdit(row){
      this.brandService.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(BrandComponent, dialogConfig);
    }

    onDelete($key){
      this.dialogService.openConfirmDialog('Are you want to delete this?')
      .afterClosed().subscribe(res =>{
        if(res){
          this.brandService.deleteBrand($key);
          this.notificationService.warn('Deleted successfully!!!');
        }
      });
    }

}
