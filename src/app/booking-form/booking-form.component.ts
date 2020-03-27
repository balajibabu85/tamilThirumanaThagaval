import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  constructor(private http:HttpClient) { }
bookingForm;
  showToggleDesc = "display:none";
  showToggle=true;
  // tslint:disable-next-line:max-line-length
  postData = { id: '0', createdAt: '2020-02-22T04:42:16.045Z', name: 'balaji', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kurafire/128.jpg', description: 'balaji@gmail.com', price: '0' };

  ngOnInit(): void {
    this.bookingForm = new FormGroup(
      {
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        roomType: new FormControl(''),
        adults: new FormControl(''),
        kids: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email])
      }
    )
  }
  
  submitForm(){

    
    this.http.post('http://5e50ee50f2c0d300147c0100.mockapi.io/api/get', this.postData ).subscribe((data)=>{console.log(data)});
    // console.log(this.bookingForm.value)
  }
  show_hide_loginpop()
  {
    if (this.showToggle)
    {
    this.showToggleDesc = "display:block";
      this.showToggle=false;
    }

    else
    {
      this.showToggleDesc = "display:none";
      this.showToggle=true;
    }
      // if(show1 === 'show')
      // {
      //   this.showToggle="display:block";
      // }
      // else{

      //   this.showToggle = "display:none";
      // }
      }

}
