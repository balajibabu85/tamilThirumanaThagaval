import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


class ImageSnippet{
/**
 *
 */
constructor(public src:string, public file:File) {

  
}

}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFile;

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }
   Name;
   Email;
   url;
  profileForm: FormGroup;
  async ngOnInit(): Promise<void> {
    
    
    const userClaims = await this.oktaAuth.getUser();
    this.Name = userClaims.firstName + ' ' + userClaims.lastName;
    this.Email = userClaims.email;
    this.profileForm = new FormGroup({
      Name: new FormControl(this.Name),
      DOB: new FormControl(new Date()),
      Age: new FormControl(),
      Gender: new FormControl(),
      Height: new FormControl(),
      Weight: new FormControl(),
      MaritalStatus: new FormControl(),
      MotherTongue: new FormControl(),
      LanguagesKnown: new FormControl(),
      Complexion: new FormControl(),
      Education: new FormControl(),
      EducationDetail: new FormControl(),
      EmployedIn: new FormControl(),
      Occupation: new FormControl(),
      OccupationDetail: new FormControl(),
      AnnualIncome: new FormControl(),
      Country: new FormControl(),

      Citizenship: new FormControl(),
      State: new FormControl(),
      City: new FormControl(),
      Religion: new FormControl(),
      Caste: new FormControl(),
      Zodiac: new FormControl(),
      Star: new FormControl(),
      Gothram: new FormControl(),
      Mobile: new FormControl(),
      Email: new FormControl(this.Email)
    });
  }
  
  profileSubmitForm(){
    console.log(this.profileForm.value);
    this.http.post("https://telugu-devangar.herokuapp.com/api/persons", JSON.stringify(this.profileForm.value)).subscribe((response) => {
      console.log('response received is ', response);
    });
  }
  processFile(event)
  {
    debugger;
    if(event.target.files && event.target.files[0])
    {
      this.selectedFile = event.target.files
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;

        let formData = new FormData();
        for (var i = 0; i < this.selectedFile.length; i++) {
          formData.append("uploads[]", this.selectedFile[i], this.selectedFile[i].name);
        }
        this.http.post('/api/upload', formData)
          .subscribe((response) => {
            console.log('response received is ', response);
          })
      }
    }
    // const file: File = imageInput.files[0];
    
    // reader.addEventListener('load', (event: any) => {
    //   this.selectedFile = new ImageSnippet(event.target.result, file);
    // });
  }

}
