import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FeaturesService } from '../shared/features.service';
import { DataLog } from '../shared/features.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  dataLog: DataLog;

  logo = '../../../assets/tiscologo.png';
  bgTop = 'linear-gradient(106deg, #a9d6ff 0%, #ddebf8 35%, #ddebf8 65%, #fdcdd1 100%)';

  constructor(private service: FeaturesService) {
    this.service.setTitle('ยืนยันตัวตน', 'XXXX-XXX-2325');
  }
  @Input() data;
  @Output('outputData') outputData = new EventEmitter();
  timeCount = 0;
  count;
  countingTime() {
    this.count = setInterval(time => { this.timeCount += 1 }, 1000);
  }
  ngOnDestroy(): void {
    if (this.timeCount) {
      clearInterval(this.count);
      
      return
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
        stateTime: this.timeCount + '',
        stateCode: 'PROD1001',
      }
      this.outputData.unsubscribe();
    }
  }

  ngOnInit() {
    console.log('OTP', this.data);
    this.countingTime();
  }

  onOtpChange(event) {
    console.log('event', event);
  }

}
