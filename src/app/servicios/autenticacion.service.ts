import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {
  public autenticado!: boolean;

  private _storage!: Storage;

  constructor(private storage: Storage, private route: Router) {
    this.init()
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

  }

  //Funcion Registrar Usuario
  async register(username: string, password: string) {
    const users = await this._storage?.get('users') || [];
    const existe = users.find((us: User) => us.username === username && us.password === password);
    if (existe) {
      console.log("Usuario Existente")
    } else {
      const nuevo: User = { username, password };
      users.push(nuevo);
      await this._storage.set('users', users);
      console.log("Registro Exitoso")
    }
  }

  //Async Funciona como una declaracion de funcion asincrona
  //Esto permite operar la funciona de forma asincronica generando un loop con una Promise la cual devuelve un resultado positivo o negativo
  //las funciones marcadas como async pueden utilizar la palabra clave await
  //Await define una utilidad que espera si es que la promise es resuelta o rechazada
  //Formas mas complejas se pueden generar usando una funcion .then() definiendo los sucesos de la funcion en caso negativo y caso positivo

  //Adicionalmente una promise en JS o TS es una operacion que aun no se completa pero que lo hara en el futuro 
  //Estas promesas son la forma en que el codigo puede manejar ciertas operaciones con poosibiliad de fallo (Similar a trabajar con try/Catch)
  // Una promise puede tener los sig estados : Pendiente || Cumplida || Rechazada
  async login(username: string, password: string): Promise<boolean> {
    //Llamamos el arreglo desde el Storage
    const users: User[] = (await this._storage.get('users')) || [];
    //obtenermos el valor del usuario que buscamos 
    const user = users.find((us: User) => us.username === username && us.password === password);
    //Si el usuario existe autentificamos y el metodo retorna true
    //caso contrario lanzamos false y no esta activo
    if (user) {
      this.autenticado = true;
      return true;
    }
    this.autenticado = false;
    return false;

  }

  logout() {
    this.autenticado = false;
    this.route.navigate(['/home']);
  }
}
