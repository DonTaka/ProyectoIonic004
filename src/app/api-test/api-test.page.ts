import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.page.html',
  styleUrls: ['./api-test.page.scss'],
})
export class ApiTestPage implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }
  obtenerTodo() {
    this.api.getPosts().subscribe((res) => {
      console.log(res[0]);
    }, (error) => {
      console.log(error);
    })
  }

}
