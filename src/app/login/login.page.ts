import { Component, OnInit }                from '@angular/core';
import { AlertController }                  from '@ionic/angular';
import { HttpHeaders }                      from '@angular/common/http';
import { HttpClient }                       from '@angular/common/http';
import { Router }                           from '@angular/router';
import { Device }                           from '@ionic-native/device/ngx';
import { Facebook, FacebookLoginResponse }  from '@ionic-native/facebook/ngx';
import { GooglePlus }                       from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})

export class LoginPage implements OnInit {
  url: any = 'http://localhost';
  email: string;
  password: string;
  auth2: any;
  
  constructor(
    public alertController: AlertController, 
    public http: HttpClient, 
    public router:Router, 
    private device: Device,
    private fb: Facebook,
    private googlePlus: GooglePlus
    ) {}

  /**
   * Action POST login in system
   */
  login() {
    this.presentAlertInputEmpty()

    if(this.password == undefined || this.password == '' || this.email == '' || this.email == undefined){
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };

    this.http.post<any>(this.url+'/teste-post.php', { email: this.email}, httpOptions)
      .subscribe((data: any) => {
        console.log(data);
        if(data.success == true){
            this.router.navigate(['/home'])
            return;
        }
        alert('senha ou email invalidos');
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



/**
* FACEBOOK SDK
* Load facebook SDK and method login social facebook
* 
*/
  fbLibrary() {
    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '301879677451407',
        cookie     : true,
        xfbml      : true,
        version    : 'v6.0'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }


  loginFc() {

    if(this.device.platform == null){
     window['FB'].login((response) => {
        console.log('login response',response);
        if (response.authResponse) {

          window['FB'].api('/me', {
            fields: 'last_name, first_name, email'
          }, (userInfo) => {

            console.log("user information");
            console.log(userInfo);
            if(userInfo.id){
                this.router.navigate(['/home'])
            }
          });

        } else {
          console.log('User login failed');
        }
     }, {scope: 'email'});
    }else{
        this.loginFCNative()
    }
  }


  loginFCNative(){
    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res)
      this.router.navigate(['/home'])
     }
    )
    .catch(e => console.log('Error logging into Facebook', e));
  }

 /**
  * GOOGLE SDK
  * Google login social SDK Google
  *
  */
  googleSDK() {
 
   window['googleSDKLoaded'] = () => {
    
    window['gapi'].load('auth2', () => {
      this.auth2 = window['gapi'].auth2.init({
        client_id: '779004342617-doim1c6qdmvi73oktm0cccir3upikna1.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
       
      
    });
   }
 
   (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'google-jssdk'));
 
  }


  loginGoogle() {
     if(this.device.platform == null){
     this.auth2.attachClickHandler(document.getElementById('googleBtn'), {},
      (googleUser) => {

      let profile = googleUser.getBasicProfile();
      console.log('Token || ' + googleUser.getAuthResponse().id_token);
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      //YOUR CODE HERE
      this.router.navigate(['/home']);
    
     }, (error) => {
       console.log(error)
       console.log(JSON.stringify(error, undefined, 2));
     });
    }else{
        this.loginGoogleNative()
    }


   }

   loginGoogleNative(){
    this.googlePlus.login({})
    .then((res) => {
      console.log(res)
      this.router.navigate(['/home'])
    })
    .catch(err => console.error(err));
   }


  ngOnInit() {
    this.fbLibrary();
    this.googleSDK();
  }
}
