import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  public autenticado!: boolean;
  public usuarioActual = {
    username: "",
    password: ""
  }
  constructor() { }

  login(username: any, password: any) {
    if (username == 'jo.riquelmee' && password == 'pass1234') {
      this.usuarioActual.username = username;
      this.usuarioActual.password = password;
      this.autenticado = true;
    } else {
      this.autenticado = false;
    }
  }

  logout() {
    this.usuarioActual.username = "";
    this.usuarioActual.password = "";
    this.autenticado = false;
  }
}
