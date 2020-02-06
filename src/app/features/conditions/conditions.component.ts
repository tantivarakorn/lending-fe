import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FeaturesService } from '../shared/features.service';
import { ConditionModel } from './conditions.models';
import { DataLog } from '../shared/features.model';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit, OnDestroy {
  dataLog: DataLog;
  @Input() item: ConditionModel;
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  logo = '../../../assets/tiscologo.png';
  bgTop = 'linear-gradient(106deg, #a9d6ff 0%, #ddebf8 35%, #ddebf8 65%, #fdcdd1 100%)';
  scrollToBottom = true;
  templateCheck: string = null;
  conCheck: string = null;

  @Input() data;

  constructor(private service: FeaturesService) {
    this.service.setTitle('เงื่อนไขการให้บริการ', 'XXXX-XXX-2325');
  }

  @Output() outputData = new EventEmitter();

  showCheckboxTemplate = false;
  showCheckbox = false;

  timeCount = 0;
  count;

  countingTime() {
    this.count = setInterval(time => { this.timeCount += 1; }, 1000);
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
        stateTime: this.timeCount + '',
        stateCode: 'PROD1001',
      }
      this.outputData.unsubscribe();
    }
  }

  ngOnInit() {
    console.log('data-term-con', this.data);
    this.countingTime();
    this.checkRadioMandatory();
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log('End');
      this.scrollToBottom = false;
    }
  }

  checkRadioMandatory() {
    if (this.data.template.radioMandatory === 'Y') {
      this.showCheckboxTemplate = true;
    } else {
      this.showCheckboxTemplate = false;
      this.templateCheck = '1';
    }
    if (this.data.data.radioMandatory === 'Y') {
      this.showCheckbox = true;
    } else {
      this.showCheckbox = false;
      this.conCheck = '1';
    }
  }

  click(event, type) {
    if (event && type === 'template') {
      this.templateCheck = '1';
    }
    if (event && type === 'con') {
      this.conCheck = '1';
    }
  }

}
