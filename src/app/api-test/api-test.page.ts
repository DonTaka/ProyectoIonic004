import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { IonModal } from '@ionic/angular';

interface dataAPI {
  id: Number,
  titulo: String,
  autor: String
}
@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.page.html',
  styleUrls: ['./api-test.page.scss'],
})
export class ApiTestPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  constructor(private api: ApiService) { }

  public datosAPI = "";

  public post = {
    id: 0,
    titulo: "",
    autor: ""
  }
  ngOnInit() {
  }

  obtenerTodo() {
    this.datosAPI = ""
    this.api.getPosts().subscribe((res) => {
      console.log(res);
      res.forEach((tmp: dataAPI) => {
        this.datosAPI += tmp.id + "\n";
        this.datosAPI += tmp.titulo + "\n";
        this.datosAPI += tmp.autor + "\n";
      });
    }, (error) => {
      console.log(error);
    })
  }

  cancelAddModal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmAddModal() {
    console.log(this.post);
    this.api.createPost(this.post).subscribe((success) => {
      this.datosAPI = "Agregado con Exito  ";
    }, (err) => {
      console.error(err);
    })
    this.modal.dismiss(null, 'confirm');
  }

  eliminar(id: any) {
    this.api.deletePost(id).subscribe((res) => {
      this.datosAPI = "Eliminado con exito";
    }, (err) => {
      console.error(err);
    })
  }

}
