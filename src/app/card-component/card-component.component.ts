import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { OktaAuthService, OktaAuthGuard } from '@okta/okta-angular';


@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {
  room;
  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    const accessToken = await this.oktaAuth.getAccessToken();
    console.log('Access Token is' + accessToken);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + accessToken);
    // tslint:disable-next-line: max-line-length
    if (accessToken != null) {
      this.http.get('https://telugu-devangar.herokuapp.com/api/persons').subscribe((data) => { this.room = data; });
    }
  }
}
