import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingModel } from 'src/app/models/booking.model';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  @Input() list: BookingModel[];
  public displayedColumns: string[] = [];
  public dataSource: MatTableDataSource<BookingModel>;
  public fields: any[] = [];
  public operators: any[] = [];
  public field: any;
  public operator: any;
  public search: string;

  ngOnInit(): void {
    this.displayedColumns = ['bookingId', 'client', 'bookingTime', 'streetAddress', 'bookingPrice'];
    this.fields = [
      { title: 'BookingId', value: 'bookingId' },
      { title: 'Precio', value: 'bookingPrice' }
    ];
    this.operators = [
      { title: '>=', value: 'mai' },
      { title: '<=', value: 'mei' }
    ];
    this.dataSource = new MatTableDataSource(this.list);
  }

  public applyFilterLike(): void {
    const fv = (this.field !== '' && this.field !== undefined);
    const ov = (this.operator !== '' && this.operator !== undefined);
    const sv = (this.search !== '' && this.search !== undefined);

    // Validando que los campos esten establecidos
    if (fv && ov && sv) {
      this.dataSource.filterPredicate = (data: BookingModel, filter: string) => {
        if (this.operator === 'mei') {
          return data[this.field] <= filter;
        } else if (this.operator === 'mai') {
          return data[this.field] >= filter;
        }
      };
      this.dataSource.filter = this.search.trim().toLowerCase();
    }
  }
}
