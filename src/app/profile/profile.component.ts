import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFile;

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient, private router: Router) { }
  Name;
  Email;
  url;
  serviceData = false;
  serviceUrl;
  profileForm: FormGroup;
  mailBody; 
  formData1;
  async ngOnInit(): Promise<void> {
    
    const userClaims = await this.oktaAuth.getUser();
    this.Name = userClaims.firstName + ' ' + userClaims.lastName;
    this.Email = userClaims.email;
    this.serviceUrl = `https://telugu-devangar.herokuapp.com/api/persons/email/${this.Email}`;
    console.log(this.serviceUrl);
    const accessToken = await this.oktaAuth.getAccessToken();
    console.log('Access Token is' + accessToken);
    this.formData1 = new FormData();
   
    
    this.mailBody = this.Name + "requested your phone number. If you are interested, you can mail your contact/phone number to his/her email Id" + this.Email;
    //this.formData1.append('mailBody', this.mailBody);
    // this.http.post('/api/sendmail', { bodyMail: this.mailBody})
    //   .subscribe((response) => {
    //     debugger;
    //     console.log("client form Data " + this.formData1)
    //     console.log('Email sent successfully ', response);

    //   });
    this.profileForm = new FormGroup({
      Name: new FormControl(this.Name),
      DOB: new FormControl(),
      Age: new FormControl(),
      Gender: new FormControl(),
      HeightCms: new FormControl(),
      WeightKgs: new FormControl(),
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
      Country: new FormControl(), Citizenship: new FormControl(),
      State: new FormControl(),
      City: new FormControl(),
      Religion: new FormControl(),
      Caste: new FormControl(),
      Zodiac: new FormControl(),
      Star: new FormControl(),
      Gothram: new FormControl(),
      Mobile: new FormControl(),
      Email: new FormControl(this.Email),
      ImagePath: new FormControl(this.Email.split(".com")[0] + ".jpeg")
    });
    
    if (accessToken != null) {
      this.http.get(this.serviceUrl).subscribe((data) => {
        if (data != null && data[0] != null) {
          this.serviceData = true;
          this.url = './assets/images/' + data[0].ImagePath;
          this.profileForm = new FormGroup({
            Id: new FormControl(data[0].Id),
            Name: new FormControl(this.Name),
            DOB: new FormControl(data[0].DOB),
            Age: new FormControl((data[0].Age)),
            Gender: new FormControl(data[0].Gender),
            HeightCms: new FormControl(data[0].HeightCms),
            WeightKgs: new FormControl(data[0].WeightKgs),
            MaritalStatus: new FormControl(data[0].MaritalStatus),
            MotherTongue: new FormControl(data[0].MotherTongue),
            LanguagesKnown: new FormControl(data[0].LanguagesKnown),
            Complexion: new FormControl(data[0].Complexion),
            Education: new FormControl(data[0].Education),
            EducationDetail: new FormControl(data[0].EducationDetail),
            EmployedIn: new FormControl(data[0].EmployedIn),
            Occupation: new FormControl(data[0].Occupation),
            OccupationDetail: new FormControl(data[0].OccupationDetail),
            AnnualIncome: new FormControl(data[0].AnnualIncome),
            Country: new FormControl(data[0].Country),
            Citizenship: new FormControl(data[0].Citizenship),
            State: new FormControl(data[0].State),
            City: new FormControl(data[0].City),
            Religion: new FormControl(data[0].Religion),
            Caste: new FormControl((data[0].Caste)),
            Zodiac: new FormControl((data[0].Zodiac)),
            Star: new FormControl((data[0].Star)),
            Gothram: new FormControl((data[0].Gothram)),
            Mobile: new FormControl((data[0].Mobile)),
            Email: new FormControl(this.Email),
            ImagePath: new FormControl(this.Email.split(".com")[0] + ".jpeg")
          });
        }
      });
    }
  }
  

  profileSubmitForm() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log(this.profileForm.value);
    console.log(JSON.stringify(this.profileForm.value));
    if (this.serviceData) {
      // tslint:disable-next-line: object-literal-shorthand
      // tslint:disable-next-line: max-line-length
      this.http.put('https://telugu-devangar.herokuapp.com/api/persons', JSON.stringify(this.profileForm.value), { headers: headers }).subscribe((response) => {
        console.log('Updated Successfully. Response received is ', response);
        this.router.navigateByUrl('/home');
      });
    } else {
      // tslint:disable-next-line: object-literal-shorthand
      // tslint:disable-next-line: max-line-length
      this.http.post('https://telugu-devangar.herokuapp.com/api/persons', JSON.stringify(this.profileForm.value), { headers: headers }).subscribe((response) => {
        console.log('Saved Successfully. Response received is ', response);
        this.router.navigateByUrl('/home');
      });
    }
  }
  processFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.url = event.target.result;

        // tslint:disable-next-line: prefer-const
        let formData = new FormData();
        // Object.defineProperty(this.selectedFile[0],'name', {
        //   writable:true,
        //   value: this.Email.split(".com")[0]
        // });

        formData.append('uploads', this.selectedFile[0], this.Email.split('.com')[0] + '.jpeg');
        this.http.post('/api/upload', formData)
          .subscribe((response) => {
            console.log('response received is ', response);

          });
      };
    }
    // const file: File = imageInput.files[0];

    // reader.addEventListener('load', (event: any) => {
    //   this.selectedFile = new ImageSnippet(event.target.result, file);
    // });
  }

}
