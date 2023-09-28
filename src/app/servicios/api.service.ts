import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //Creamos Encabezado
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  //Creamos Objeto con la URL del APIRest
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  //List All
  getPosts(): Observable<any> {
    return this.http.get(this.apiURL + "/posts").pipe(
      retry(3)
    );
  }
  //Get one Object
  getPost(ID: any): Observable<any> {
    return this.http.get(this.apiURL + "/posts/" + ID).pipe(
      retry(3)
    )
  }

  //Create a post
  createPost(post: any): Observable<any> {
    return this.http.post(this.apiURL + "/posts", post, this.httpOptions).pipe(
      retry(3)
    )
  }

  //Delete a post

  deletePost(ID: any): Observable<any> {
    return this.http.delete(this.apiURL + "/posts/" + ID).pipe(
      retry(3)
    )
  }

  //Update a post
  updatePost(ID: any, post: any): Observable<any> {
    return this.http.put(this.apiURL + "/posts/" + ID, post, this.httpOptions).pipe(
      retry(3)
    )
  }


}
