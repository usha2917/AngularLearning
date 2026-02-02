import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../Service/user-service';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../Models/user-model';

@Component({
  selector: 'app-user',
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
   displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'website'];
  dataSource = new MatTableDataSource<UserModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
