import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { DataLog } from '../shared/features.model';
import { FeaturesService } from '../shared/features.service';
import { WebcamImage } from 'ngx-webcam';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-chanel',
  templateUrl: './payment-chanel.component.html',
  styleUrls: ['./payment-chanel.component.scss']
})
export class PaymentChanelComponent implements OnInit, OnDestroy {
  dataLog: DataLog;
  IDCardF = '../../../assets/id-front.png';
  IDCardB = '../../../assets/id-back.png';

  cars = [1, 2, 3];
  list = [1, 2, 3];
  constructor(private service: FeaturesService,
    private modalService: NgbModal) {
    this.service.setTitle('ช่องทางการรับเงิน', 'XXXX-XXX-2325');
  }

  @Input() data;
  @Output('outputData') outputData = new EventEmitter();
  timeCount = 0;
  count;

  responsiveOptions = [
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '420px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  countingTime() {
    this.count = setInterval(time => {
      this.timeCount += 1;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timeCount) {
      clearInterval(this.count);
      return;
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
    this.countingTime();
  }


  // handleImage(webcamImage: WebcamImage) {
  //   this.webcamImage = webcamImage;
  //   this.toggleCamera = !this.toggleCamera;
  //   this.modal.close();
  // }
  //
  // toggleWebcam(camModal) {
  //   this.toggleCamera = !this.toggleCamera;
  //   this.modal = this.modalService.open(camModal, {backdrop: 'static', keyboard: false});
  //
  // }
  //
  // toggleWebcamMobile(front = null) {
  //   this.toggleCamera = !this.toggleCamera;
  // }
}


