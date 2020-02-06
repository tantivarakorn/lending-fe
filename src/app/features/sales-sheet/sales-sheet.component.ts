import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FeaturesService } from '../shared/features.service';
import { DataLog } from '../shared/features.model';

@Component({
  selector: 'app-sales-sheet',
  templateUrl: './sales-sheet.component.html',
  styleUrls: ['./sales-sheet.component.scss']
})
export class SalesSheetComponent implements OnInit, OnDestroy {
  dataLog: DataLog;

  pdfSrc;
  logo = '../../../assets/tiscologo.png';
  bgTop = 'linear-gradient(106deg, #a9d6ff 0%, #ddebf8 35%, #ddebf8 65%, #fdcdd1 100%)';

  isCheck: string = null;
  showCheckbox: boolean = false;
  pagesCount = 0;
  currentPage = 1;
  scrollToBottom = true;

  constructor(private service: FeaturesService) {
    this.service.setTitle('Sale Sheet', 'XXXX-XXX-2325');
  }

  @Input() data;
  @Output('outputData') outputData = new EventEmitter();
  timeCount = 0;
  count;

  countingTime() {
    this.count = setInterval(time => {
      this.timeCount += 1;
    }, 1000);
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
    console.log('sale sheet', this.data);
    this.countingTime();
    const pdfFile = eval(this.data.data.pdfUpload);
    this.pdfSrc = pdfFile[0].value;
    this.checkRadioMandatory();
  }

  checkRadioMandatory() {
    if (this.data.data.radioMandatory === 'Y') {
      this.showCheckbox = true;
    } else {
      this.showCheckbox = false;
      this.isCheck = '1';
    }
  }

  click(event) {
    if (event) {
      this.isCheck = '1';
    }
  }

  updatePagesCount(event) {
    this.pagesCount = event.pagesCount;
  }

  updateCurrentPage(event) {
    this.currentPage = event;
    if (this.currentPage === this.pagesCount) {
      this.scrollToBottom = false;
    }
  }

}
