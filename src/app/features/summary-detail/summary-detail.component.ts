import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FeaturesService } from '../shared/features.service';
import { DataLog } from '../shared/features.model';
import * as moment from 'moment';

@Component({
  selector: 'app-summary-detail',
  templateUrl: './summary-detail.component.html',
  styleUrls: ['./summary-detail.component.scss']
})
export class SummaryDetailComponent implements OnInit, OnDestroy {
  dataLog: DataLog;

  @Input() data;
  eeee = '';

  constructor(private service: FeaturesService) {
    this.service.setTitle('สรุปวงเงินสินเชื่อ', 'XXXX-XXX-2325');
  }
  @Output('outputData') outputData = new EventEmitter();
  timeCount = 0;
  count;
  countingTime() {
    this.count = setInterval(time => { this.timeCount += 1 }, 1000);
  }
  ngOnDestroy(): void {
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
      this.outputData.unsubscribe();
    }
  }

  ngOnInit() {
    let dateRes = '05';
    console.log("TCL: SummaryDetailComponent -> ngOnInit -> date", dateRes);

    this.countingTime();
    console.log(moment(moment().add(2, 'days')).format('DD-MM-YYYY'));
  }

}
