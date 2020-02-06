import { Component, Input, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataLog } from '../shared/features.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  dataLog: DataLog;

  splashD;
  splashM;
  @Input('data') data;
  @Output('outputData') outputData = new EventEmitter();
  timeCount = 0;
  count;
  constructor(private spinner: NgxSpinnerService) {
  }

  clearTimeStorage() {
    localStorage.removeItem('CountTime');
  }
  ngOnDestroy() {

    if (this.timeCount) {
      clearInterval(this.count);
      
    const prodData = this.data.prod;
     this.dataLog = {
        trnId: prodData.trnId,
        trnSubStatus: '',
        source: '',
        productId: prodData.prodId,
        productVersionId: prodData.prodVer,
        productComponentId: this.data.data.compUuid,
        taskCategory: '',
        keywords: '',
        trnStatus: '200',
        failureReason: '',
        sourceDevice: 'web',
        sourceDeviceId: '',
        sourceCifId: '',
        accountName: '',
        stateTime: this.timeCount+'',
        stateCode: 'PROD1001',
      }
      this.dataLog = {
        trnId: prodData.trnId,
        trnSubStatus: '',
        source: '',
        productId: prodData.prodId,
        productVersionId: prodData.prodVer,
        productComponentId: this.data.data.compUuid,
        taskCategory: '',
        keywords: '',
        trnStatus: '200',
        failureReason: '',
        sourceDevice: 'web',
        sourceDeviceId: '',
        sourceCifId: '',
        accountName: '',
        stateTime: this.timeCount+'',
        stateCode: 'PROD1001',
      }

      this.outputData.unsubscribe();
    }
  }
  countingTime() {
    this.count = setInterval(time => { this.timeCount += 1 }, 1000);
  }
  ngOnInit() {
    this.clearTimeStorage();
    this.countingTime();
    console.log('data-splash', this.data);
    this.createImg();


  }
  createImg() {
    let image = eval(this.data.data.imgUpload);
    image.forEach(obj => {
      if (obj.type === 'w') {
        this.splashD = obj.value;
      }
      if (obj.type === 'm') {
        this.splashM = obj.value;
      }
    });
  }

}
