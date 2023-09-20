import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  public autenticado!: boolean;
  public user = {
    username: "",
    password: ""
  }

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    await this.storage.create();

  }
  //Async Funciona como una declaracion de funcion asincrona
  //Esto permite operar la funciona de forma asincronica generando un loop con una Promise la cual devuelve un resultado positivo o negativo
  //las funciones marcadas como async pueden utilizar la palabra clave await
  //Await define una utilidad que espera si es que la promise es resuelta o rechazada
  //Formas mas complejas se pueden generar usando una funcion .then() definiendo los sucesos de la funcion en caso negativo y caso positivo

  //Adicionalmente una promise en JS o TS es una operacion que aun no se completa pero que lo hara en el futuro 
  //Estas promesas son la forma en que el codigo puede manejar ciertas operaciones con poosibiliad de fallo (Similar a trabajar con try/Catch)
  // Una promise puede tener los sig estados : Pendiente || Cumplida || Rechazada
  async login(username: any, password: any) {
    let users: { username: string, password: string }[] = await this.storage.get('users') || [];
    const encontrado = users.find((user: { username: string, password: string }) => user.username === username && user.password === password);
    if (encontrado) {
      console.log('Existe');
      this.autenticado = true;
    } else {
      console.log('no Existe')
      this.autenticado = false;
    }
  }

  logout() {
    this.autenticado = false;
  }
  async register(username: any, password: any) {
    const nuevo = {
      username,
      password
    };

    let users = await this.storage.get('users') || [];

    users.push(nuevo);
    await this.storage.set('users', users);
    this.validarStorage();
  }
  async validarStorage() {
    const us = await this.storage.get('users');
    if (us && us.length > 0) {
      console.log('Exitoso');
      console.log(us);
    } else {
      console.log(us);

    }
  }
}
