import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Animation, IonAvatar } from '@ionic/angular'
import { AnimationController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //Selector de componente
  @ViewChild(IonAvatar, { read: ElementRef })
  avatar!: ElementRef<HTMLIonNavElement>;

  constructor(private router: Router, private animationCtrl: AnimationController) { }
  public mensaje = "Hola soy el nuevo mensaje :3"
  private animation!: Animation;
  user = {
    usuario: "",
    password: ""
  }
  //Creacion de la animacion
  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.avatar.nativeElement)
      .duration(1500)
      .fromTo('opacity', '1', '0.1');
  }
  
  //Controlador de animacion : Play : Iniciar Animacion
  play() {
    this.animation.play();
  }
  enviarInformacion() {
    let navigationExtras: NavigationExtras = {
      state: { user: this.user }
    }
    this.router.navigate(['/login'], navigationExtras);
  }
  mostrarConsola() {
    console.log(this.user);
    if (this.user.usuario != "" && this.user.password != "") {
      this.mensaje = "Usuario Conectado";
    } else {
      this.mensaje = "Usuario y contraseña deben tener algun valor"
    }
  }

}
