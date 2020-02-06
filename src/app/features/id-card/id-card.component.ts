import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FeaturesService } from '../shared/features.service';
import { WebcamImage } from 'ngx-webcam';
import { DataLog } from '../shared/features.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.scss']
})
export class IdCardComponent implements OnInit, OnDestroy {
  dataLog: DataLog;

  @Input() data;

  logo = '../../../assets/tiscologo.png';
  IDCardF = '../../../assets/id-front.png';
  IDCardB = '../../../assets/id-back.png';
  bgTop = 'linear-gradient(106deg, #a9d6ff 0%, #ddebf8 35%, #ddebf8 65%, #fdcdd1 100%)';
  show = 1;

  webcamImage: WebcamImage = null;
  toggleCamera = false;
  front = true;
  frontCapture: WebcamImage = null;
  backCapture: WebcamImage = null;
  modal: NgbModalRef;

  constructor(private service: FeaturesService,
              private modalService: NgbModal,
              private route: Router) {
    this.service.setTitle('ถ่ายรูปบัตรประชาชน', 'XXXX-XXX-2325');
  }

  @Output('outputData') outputData = new EventEmitter();
  timeCount = 0;
  count;

  countingTime() {
    this.count = setInterval(time => {
      this.timeCount += 1
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
    this.countingTime();
    console.log('id card', this.data);
  }

  showB() {
    if (this.data.data.details[4].details[1].value === 'Y') {
      this.show = 2;
    } else {
      this.route.navigate(['/features', 'PersonalInfo']);
    }
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    if (this.front) {
      this.frontCapture = webcamImage;
    } else {
      this.backCapture = webcamImage;
    }
    this.toggleCamera = !this.toggleCamera;
    this.modal.close();
  }

  toggleWebcam(front = null, camModal) {
    this.front = !!front;
    this.toggleCamera = !this.toggleCamera;
    this.modal = this.modalService.open(camModal, {backdrop: 'static', keyboard: false});

  }

  toggleWebcamMobile(front = null) {
    this.front = !!front;
    this.toggleCamera = !this.toggleCamera;
  }

}
