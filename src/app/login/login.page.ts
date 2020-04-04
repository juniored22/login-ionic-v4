import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public alertController: AlertController, public http: HttpClient) { }


  /**
   * Action POST login in sistem
   */
  login() {
    this.presentAlertInputEmpty()

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };

    this.http.post<any>('http://localhost/teste-post.php', { name: "teste" }, httpOptions)
      .subscribe((data: any) => {
        console.log(data);
      }
    );
  }


  /**
   * Input empyt 
   * email and password
   */
  async presentAlertInputEmpty() {

    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'fill in the email and password fields.',
      buttons: ['OK']
    });

    if (this.password == undefined || this.password == '') {
      await alert.present();
    }

    if (this.email == undefined || this.email == '') {
      await alert.present();
    }
  }

  ngOnInit() {
  }

}
