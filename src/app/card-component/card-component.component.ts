import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { OktaAuthService, OktaAuthGuard } from '@okta/okta-angular';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {
  room;
  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {}

  showToggleDesc = "display:none";
  showToggle = true;
  searchText = "Show";

  searchForm;
  async ngOnInit(): Promise<void> {
    const accessToken = await this.oktaAuth.getAccessToken();
    console.log('Access Token is' + accessToken);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + accessToken);
    // tslint:disable-next-line: max-line-length
    if (accessToken != null) {
      this.http.get('https://telugu-devangar.herokuapp.com/api/persons').subscribe((data) => { this.room = data;});
    };

    this.searchForm = new FormGroup(
      {
        searchGender: new FormControl(''),
        searchLanguage: new FormControl(''),
        searchCaste: new FormControl(''),
        searchFromAge: new FormControl(''),
        searchToAge: new FormControl(''),
        searchFromHeight: new FormControl(''),
        searchToHeight: new FormControl('')
      }
    )
  }
  // show_hide_loginpop() {
  //   if (this.showToggle) {
  //     this.showToggleDesc = "display:block";
  //     this.showToggle = false;
  //   } else {
  //     this.showToggleDesc = "display:none";
  //     this.showToggle = true;
  //   }
  //   // if(show1 === 'show')
  //   // {
  //   //   this.showToggle="display:block";
  //   // }
  //   // else{

  //   //   this.showToggle = "display:none";
  //   // }
  // }

  searchButtonClick()
  {
    
      if (this.showToggle) {
        this.showToggleDesc = "display:block";
        this.showToggle = false;
        this.searchText = "Hide";
      }

      else {
        this.showToggleDesc = "display:none";
        this.showToggle = true;
        this.searchText = "Show";
      }

  }


  async submitForm(){
    const accessToken = await this.oktaAuth.getAccessToken();
    if (accessToken != null) {
      const searchGenderCondition = this.searchForm.get('searchGender').value;
      const searchLanguageCondition = this.searchForm.get('searchLanguage').value;
      const searchCasteCondition = this.searchForm.get('searchCaste').value;
      const searchFromAgeCondition = this.searchForm.get('searchFromAge').value;
      const searchToAgeCondition = this.searchForm.get('searchToAge').value;
      const searchFromHeightCondition = this.searchForm.get('searchFromHeight').value;
      const searchToHeightCondition = this.searchForm.get('searchToHeight').value;

      this.http.get('https://telugu-devangar.herokuapp.com/api/persons').subscribe((data) => {
        // tslint:disable-next-line: max-line-length
        this.room = data;
        this.room = this.room.filter(x => x.Gender === searchGenderCondition
          && x.MotherTongue === searchLanguageCondition
          && x.Age >= searchFromAgeCondition
          && x.Age <= searchToAgeCondition
          && x.HeightCms >= searchFromHeightCondition
          && x.HeightCms <= searchToHeightCondition);
      });      
          // && x.Caste.Contains(searchCasteCondition)
    }
  }

}
