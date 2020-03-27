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
    this.http.get(`http://5e50ee50f2c0d300147c0100.mockapi.io/api/get/${this.paramId}`).subscribe((data)=>this.hotelData=data,(err)=>this.error=err,()=>{} );
  }

}
