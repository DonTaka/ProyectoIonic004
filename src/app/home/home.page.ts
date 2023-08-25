import { Component,ElementRef,ViewChild} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonAvatar,AnimationController} from '@ionic/angular';
import type { Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //ViewChild(TipoComponente,{read:ElementRef}) nombre!:ElementRef<HTMLTipoObjetoElement>
  @ViewChild(IonAvatar,{read:ElementRef}) avatar!:ElementRef<HTMLIonAvatarElement>;
 
  constructor(private router: Router,private animationCtrl:AnimationController) { }
  private animation!:Animation;
  public mensaje = ""

  ngAfterViewInit() {
    this.animation = this.animationCtrl.create()
    .addElement(this.avatar.nativeElement)
    .duration(1500) 
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', '1', '0.2');
  }
  user = {
    usuario: "",
    password: ""
  }
  
  avatarPlay(){
    this.animation.play();
  }

  enviarInformacion() {
    if (this.user.usuario != "") {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.router.navigate(['/login'], navigationExtras);
    } else {
      this.mensaje = "Debe ingresar sus credenciales";
    }
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
