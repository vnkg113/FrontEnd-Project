import { CellphoneComponent } from './../cellphone/cellphone.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CellphoneService } from '../../../../shared/services/cellphone.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BrandService } from '../../../../shared/services/brand.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from '../../../../shared/services/notification.service';
import { DialogService } from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-cellphone-list',
  templateUrl: './cellphone-list.component.html',
  styleUrls: ['./cellphone-list.component.css']
})
export class CellphoneListComponent implements OnInit {

  constructor(private service: CellphoneService,
    private brandService: BrandService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['productCode', 'productName', 'price', 'brand', 'warrantyDate', 'status', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getCellphones().subscribe(
      list => {
        let array = list.map(item => {
          let brand = this.brandService.getBrandByKey(item.payload.val()['brand']);
          let brandName = brand.brandName;
          return {
            $key: item.key,
            brandName,
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
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CellphoneComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CellphoneComponent,dialogConfig);
  }

  onDelete($key){
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteCellphone($key);
        this.notificationService.warn('Deleted successfully!!!');
      }
    });
  }
}
