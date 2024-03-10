import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'customerName', 'email', 'phoneNumber', 'active', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    // Initialize your data source (replace this with your actual data)
    const data = [
      { id: 1, customerName: 'Azhar Hussain', email: 'azharhussain@gmail.com', phoneNumber: '03083021398', active: 'Active' }
      // Add more data as needed
    ];

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
  }
}