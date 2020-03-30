import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }
  paramId = this.activatedRoute.snapshot.params.id;
  hotelData;
  error;
  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    this.http.get(`https://telugu-devangar.herokuapp.com/api/persons/${this.paramId}`).subscribe((data)=>{this.hotelData=data; console.log(data);},(err)=>this.error=err,()=>{} );
  }

}
