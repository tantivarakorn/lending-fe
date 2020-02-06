import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FeaturesService } from '../shared/features.service';
import { DataLog } from '../shared/features.model';

@Component({
  selector: 'app-step-pic',
  templateUrl: './step-pic.component.html',
  styleUrls: ['./step-pic.component.scss']
})
export class StepPicComponent implements OnInit, OnDestroy { 
dataLog:DataLog;

  @Input() data;

  logo = '../../../assets/tiscologo.png';
  stepPicture = '../../../assets/step.png';
  bgTop = 'linear-gradient(106deg, #a9d6ff 0%, #ddebf8 35%, #ddebf8 65%, #fdcdd1 100%)';

  constructor(private service: FeaturesService) {
    this.service.setTitle('รับเงินง่าย แค่ 4 ขั้นตอน', 'XXXX-XXX-2325');
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
    this.countingTime();
    console.log('step pic', this.data);
  }

}
