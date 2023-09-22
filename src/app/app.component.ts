import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: Storage, private platform: Platform) {
    this.iniciarStorage();

  }

  iniciarStorage() {
    this.platform.ready().then(async () => {
      await this.storage.create();
    })
  }
}
