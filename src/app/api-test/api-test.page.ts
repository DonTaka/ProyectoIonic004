import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { IonModal } from '@ionic/angular';

interface dataAPI {
  id: number,
  titulo: string,
  autor: string
}

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.page.html',
  styleUrls: ['./api-test.page.scss'],
})
export class ApiTestPage {
  @ViewChild('addModal') addModal!: IonModal;
  @ViewChild('updateModal') updateModal!: IonModal;
  constructor(private api: ApiService) { }

  public datosAPI = "";

  public post = {
    id: 0,
    titulo: "",
    autor: ""
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
    this.addModal.dismiss(null, 'cancel');
  }

  confirmAddModal() {
    console.log(this.post);
    this.api.createPost(this.post).subscribe((success) => {
      this.datosAPI = "Agregado con Exito  ";
    }, (err) => {
      console.error(err);
    })
    this.addModal.dismiss(null, 'confirm');
  }

  eliminar(id: any) {
    this.api.deletePost(id).subscribe((res) => {
      this.datosAPI = "Eliminado con exito";
    }, (err) => {
      console.error(err);
    })
  }
  modificar(id: any) {
    this.api.getPost(id).subscribe((res: dataAPI) => {
      console.log(res);
      this.post.id = res.id;
      this.post.autor = res.autor;
      this.post.titulo = res.titulo;

    }, (err) => {
      console.error(err.message)
    })
  }

  cancelUpdateModal() {
    this.updateModal.dismiss(null, 'cancel');
  }

  confirmUpdateModal() {
    console.log(this.post);
    this.api.updatePost(this.post.id, this.post).subscribe((success) => {
      this.datosAPI = "Modificado con Exito  ";
    }, (err) => {
      console.error(err);
    })
    this.updateModal.dismiss(null, 'confirm');
  }

}
