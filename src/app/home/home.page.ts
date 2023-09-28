import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonAvatar, IonModal } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonAvatar, { read: ElementRef }) avatar!: ElementRef<HTMLIonAvatarElement>;

  @ViewChild(IonModal) modal!: IonModal;

  private animation!: Animation;
  constructor(private router: Router, private animationCtrl: AnimationController, private auth: AutenticacionService) { }
  public mensaje = "";
  public estado: String = "";

  public alertButtons = ['OK'];

  ngAfterViewInit() {
    this.animation = this.animationCtrl.create()
      .addElement(this.avatar.nativeElement)
      .duration(5000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)', opacity: '1' },
        { offset: 0.25, transform: 'translateX(100px)', opacity: '0.2' },
        { offset: 0.50, transform: 'translateX(0px)', opacity: '1' },
        { offset: 0.75, transform: 'translateX(-100px)', opacity: '0.2' },
        { offset: 1, transform: 'translateX(0px)', opacity: '1' },
      ])


    this.animation.play();
  }

  user = {
    usuario: "",
    password: ""
  }


  enviarInformacion() {
    this.auth.login(this.user.usuario, this.user.password).then(() => {
      if (this.auth.autenticado) {
        let navigationExtras: NavigationExtras = {
          state: { user: this.user }
        }
        this.router.navigate(['/login'], navigationExtras);
      } else {
        this.mensaje = "Debe ingresar sus credenciales";
      }
    });
  }
  mostrarConsola() {
    console.log(this.user);
    if (this.user.usuario != "" && this.user.password != "") {
      this.mensaje = "Usuario Conectado";
    } else {
      this.mensaje = "Usuario y contraseña deben tener algun valor"
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.auth.register(this.user.usuario, this.user.password).then((res) => {
      if (res) {
        this.estado = "Usuario Existente";
      } else {
        this.mensaje = "Registro Exitoso";
        this.modal.dismiss(this.user.usuario, 'confirm');
      }
    })
  }

}
