import { Component, OnInit, AfterViewInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeaturesService } from './shared/features.service';
import { TitleChange, InputData } from './shared/features.model';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { data2 } from './shared/sampleJSON/mock-data2';

declare let alertify: any;

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  step: number;
  logo = '../../../assets/tiscologo.png';
  coutTimeItem = [];
  // bgTop1 = 'linear-gradient(106deg, #a9d6ff 0%, #ddebf8 35%, #ddebf8 65%, #fdcdd1 100%)';
  bgTop;
  bgBottom;
  subject: Subscription;
  title: string;
  itemNo: string;

  btnAndHeader;
  header1;
  header2;
  header3;
  body;
  header1TextColour;
  header2TextColour;
  header1TextSize;
  header2TextSize;

  allData;
  splash: InputData;
  salesSheet: InputData;
  termCon: InputData;
  stepPage: InputData;
  idCard: InputData;
  consent: InputData;
  theme;
  OTPPage: InputData;
  customerInfo: InputData;
  interestRate: InputData;
  payment: InputData;
  sumaryDetail: InputData;
  question: InputData;
  dataCust;
  questionComp;

  constructor(private activatedRoute: ActivatedRoute,
              private service: FeaturesService,
              private spinner: NgxSpinnerService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.subject = this.service.getName.subscribe((res: TitleChange) => {
      this.title = res.title;
      this.itemNo = res.itemNo;
    });
    this.activatedRoute.data.forEach(route => {
      this.step = route['step'];
    });
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 3000);
    // alertify.alert()
    //   .setting({
    //     'label': 'OK',
    //     'message': 'OK'
    //   }).show();

    console.log('data2', data2);
    this.theme = data2.data.theme;
    this.btnAndHeader = {
      btnColour: this.theme.button[0].btmColour,
      btnFontColour: this.theme.button[0].fontColour,
      headerTextColour: this.theme.theme[1].btmColour,
      headerTextSize: this.theme.theme[1].fontSize
    };
    this.splash = { data: data2.data.component[0], prod: data2.data.product, theme: this.btnAndHeader };
    this.salesSheet = { data: data2.data.component[2], prod: data2.data.product, theme: this.btnAndHeader };
    this.termCon = {
      data: data2.data.component[3],
      prod: data2.data.product, theme: this.btnAndHeader,
      template: data2.data.template.component[0]
    };
    this.stepPage = { data: data2.data.component[1], prod: data2.data.product, theme: this.btnAndHeader };
    this.customerInfo = {
      data: data2.data.component[6],
      prod: data2.data.product,
      theme: this.btnAndHeader,
      calculationMonth: data2.data.component[8].details[0].details[4].details[0].value,
      campaign: data2.data.component[8].details[0].details[2],
      checkDopa: data2.data.component[6].details[0].details[1].details[4].details[2].value,
    };
    this.idCard = { data: data2.data.component[6].details[0].details[1], prod: data2.data.product, theme: this.btnAndHeader };
    this.sumaryDetail = { data: data2.data.component[8].details[1], prod: data2.data.product, theme: this.btnAndHeader };
    this.interestRate = {
      data: data2.data.component[8].details[0], prod: data2.data.product,
      theme: this.btnAndHeader,
      prodInfo: data2.data.component[8]
    };
    this.consent = { data: data2.data.component[6], prod: data2.data.product, theme: this.btnAndHeader };
    this.OTPPage = { data: data2.data.component[4], prod: data2.data.product, theme: this.btnAndHeader };
    this.setTheme();
    this.questionComp = {data: data2.data.component[4]}
    this.dataCust = {
      custQ: data2.data.component[7],
      prodInfo: data2.data.component[0],
      prod: data2.data.product
    };
  }

  setTheme() {
    this.header1 = this.theme.header[0].colour;
    this.header2 = this.theme.header[1].colour;
    this.header3 = this.theme.header[2].colour;
    this.body = this.theme.body[0].colour;

    this.bgTop = `linear-gradient(106deg, ${this.header1} 0%, ${this.header3} 35%, ${this.header3} 65%, ${this.header2} 100%)`;
    // this.bgTop = `linear-gradient(106deg, ${this.header1} 0%, ${this.header2} 35%, ${this.header2} 65%, ${this.header3} 100%)`;
    this.bgBottom = this.body;
    document.body.style.background = this.bgBottom;

    this.header1TextColour = this.theme.theme[0].btmColour;
    this.header1TextSize = this.theme.theme[0].fontSize;
  }

  saveCount(item) {
    let timeData: any[] = [];
    const storageItem = this.getTimeStorage();
    if (storageItem) {
      timeData = JSON.parse(storageItem);
      timeData.push(item);
      const time = JSON.stringify(timeData);
      this.clearTimeStorage();
      localStorage.setItem('CountTime', time);
    } else {
      console.log(item);
      timeData.push(item);
      const time = JSON.stringify(timeData);

      localStorage.setItem('CountTime', time);
      console.log(JSON.parse(storageItem));
    }
    console.log(JSON.parse(storageItem));

  }

  getTimeStorage() {
    return localStorage.getItem('CountTime');
  }

  clearTimeStorage() {
    localStorage.removeItem('CountTime');
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }
}

