import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.css'],
})
export class UrlFormComponent implements OnInit {
  urlForm: FormGroup;
  shortenURL: string = '';

  constructor(private http: HttpClient, private clipboard: Clipboard) {}
  ngOnInit() {
    let userURL: string = '';

    this.urlForm = new FormGroup({
      userURL: new FormControl(userURL, Validators.required),
    });
  }

  onSubmit() {
    let myData = JSON.stringify({
      long_url: this.urlForm.value.userURL,
      domain: 'bit.ly',
    });
    let headers = new HttpHeaders({
      Authorization: 'Bearer 047448797b98acc6fd038d981d8e6c4a8987f6cb',
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };

    console.log(this.urlForm);
    console.log(options);
    console.log(myData);
    console.log(this.urlForm.value.userURL);

    this.http
      .post<any>('https://api-ssl.bitly.com/v4/shorten', myData, options)
      .subscribe((response: any) => {
        console.log(response.link);
        this.shortenURL = response.link;
      });
    this.urlForm.reset();
  }

  onCopy() {
    this.clipboard.copy(this.shortenURL);
  }
}
