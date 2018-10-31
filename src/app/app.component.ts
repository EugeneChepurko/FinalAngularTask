import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { IUser } from './users/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ApiService]
})
export class AppComponent implements OnInit{
  title = 'ABC';
  pageTitle = 'List of users';
  imageWidth = 50;
  imageMargin = 2;
  showImage: boolean = false;
  _listFilter = '';
  errorMessage = '';
  
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUser = this.listFilter ? this.performFilter(this.listFilter) : this.users;
  }
  users: IUser[] = [];
  filteredUser: IUser[] = [];

  constructor(private apiSerivce: ApiService) {/*this.filteredUser = this.users;*/}

  toggleImage(): void {
      this.showImage = !this.showImage;
  }

 ngOnInit(): void{
    this.getPosts();
  }

  getPosts(): void {
    this.apiSerivce.getPosts().
    subscribe(users => {
       this.users = users;
       this.filteredUser = this.users;
    },
       error => this.errorMessage = <any>error);
  }

  performFilter(filterBy: string): IUser[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user: IUser) =>
      user.login.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}