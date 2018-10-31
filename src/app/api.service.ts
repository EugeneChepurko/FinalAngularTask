import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { IUser } from './users/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private postsURL ="https://api.github.com/users";

  constructor(private http: Http ) {}
  
 getPosts(): Observable<IUser[]>{
    return this.http.get(this.postsURL).map((response: Response)=> 
    {
       return <IUser[]>response.json();
    }).
     catch(this.handleError);
 }

 private handleError(error: Response) {
   return Observable.throw(error.statusText);
 }
}
