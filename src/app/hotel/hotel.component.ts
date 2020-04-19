import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private oktaAuth: OktaAuthService) { }
  paramId = this.activatedRoute.snapshot.params.id;
  hotelData;
  error;
  mailBody; 
  Name;
  Email;
  async ngOnInit(): Promise<void> {
    // tslint:disable-next-line:max-line-length
    this.http.get(`https://telugu-devangar.herokuapp.com/api/persons/${this.paramId}`).subscribe((data)=>{this.hotelData=data; console.log(data);},(err)=>this.error=err,()=>{} );
    const userClaims = await this.oktaAuth.getUser();
    this.Name = userClaims.firstName + ' ' + userClaims.lastName;
    this.Email = userClaims.email;
  }

  requestPhoneNo(){
    this.mailBody = this.Name + " requested your phone number. If you are interested, you can mail your contact/phone number to his/her email address " + this.Email;
    //this.formData1.append('mailBody', this.mailBody);
    this.http.post('/api/sendmail', { bodyMail: this.mailBody, toMail: this.hotelData.Email })
      .subscribe((response) => {
        debugger;
        console.log('Email sent successfully ', response);

      });


  }

}
