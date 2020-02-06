import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { FeaturesService } from '../shared/features.service';
import { FlagDOPA, CustomerDataInfo } from './personalInfo.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { PersonalInformationService } from './personal-information.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { customerInfo } from '../shared/sampleJSON/customerInfo';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

declare let alertify: any;

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  @Input('data') data;
  @Input('custQ') custQ;

  logo = '../../../assets/tiscologo.png';
  bgTop = 'linear-gradient(106deg, #a9d6ff 0%, #ddebf8 35%, #ddebf8 65%, #fdcdd1 100%)';
  val1;
  headerText;

  disable = false;
  maxDopa: string;
  citizenInfo;
  addressInfo;
  vehicleInfo;
  incomeInfo;
  otheKYC;
  identityInfo;
  otherInfo;


  homeDetail;
  personInHouseInfo;
  addressCustomer;
  vehicleRegis;
  vehicleowner;
  income;
  redio;
  countDopa = 1;
  dataLog
  flagDOPA: FormGroup;


  occipationCode;
  customerMasterData: CustomerDataInfo;
  cusPerAddress;
  cusCurAddress;
  cusPerSubDistrict;
  cusCurSubDistrict;
  perDistrict;
  curDistrict;
  perProvince;
  curProvince;
  perPostCode;
  curPostCode;
  cusOccupation;
  cusBusinessType;
  cusPerLocationCode;
  cusCurLocationCode;

  fakeDisabled = false;
  modal: NgbModalRef;
  allIncome;
  income1: number;
  income2: number;
  income3: number;
  income4: number;
  income5: number;
  allExpend;
  expend1: number;
  expend2: number;
  expend3: number;
  expend4: number;
  expend5: number;
  expend6: number;
  expend7: number;
  expend8: number;
  expend9: number;
  expend10: number;

  @ViewChild('ekyc', {static: false}) private ekyc;

  constructor(private service: FeaturesService,
              private build: FormBuilder,
              private personalService: PersonalInformationService,
              private spinner: NgxSpinnerService,
              private route: Router,
              private modalService: NgbModal) {
    this.service.setTitle('ข้อมูลส่วนตัว', 'XXXX-XXX-2325');
  }

  @Output('outputData') outputData = new EventEmitter();
  timeCount = 0;
  count;

  countingTime() {
    this.count = setInterval(time => {
      this.timeCount += 1
    }, 1000);
  }

  ngOnInit() {
    console.log('costomer info', this.data);
    console.log('custQ', this.custQ);
    this.countingTime();
    this.initialcreateForm();
    this.initialData();
  }

  fakeDisable(event) {
    console.log('event', event);
    if (event) {
      this.fakeDisabled = true;
    }
    if (!event) {
      this.fakeDisabled = false;
    }
  }

  initialcreateForm() {
    this.flagDOPA = this.build.group({
      cardId: ['', [Validators.required, Validators.minLength(13)]],
      firstName: [''],
      lastName: [''],
      birthDay: ['', Validators.required], //ปีเป็น พ.ศ. (yyyymmdd)
      laser: ['', Validators.minLength(12)],
    });
  }

  initialData() {
    const data = this.data.data.details[0];
    this.headerText = data.details[0];
    this.citizenInfo = data.details[1];
    this.addressInfo = data.details[2];
    this.vehicleInfo = data.details[3];
    this.incomeInfo = data.details[4];
    this.otheKYC = data.details[5];
    this.identityInfo = this.citizenInfo.details[1];
    this.addressCustomer = this.citizenInfo.details[2];
    this.otherInfo = this.citizenInfo.details[3];
    this.homeDetail = this.addressInfo.details[1];
    this.personInHouseInfo = this.addressInfo.details[2];
    this.vehicleRegis = this.vehicleInfo.details[1];
    this.vehicleowner = this.vehicleInfo.details[2];
    this.income = this.incomeInfo.details[1];
    this.redio = this.otheKYC.details[1];
    this.maxDopa = data.details[6].value;

    if (customerInfo) {
      this.customerMasterData = customerInfo;
      console.log("TCL: PersonalInformationComponent -> initialData -> customerMasterData", this.customerMasterData);
      this.occipationCode = this.customerMasterData.data.occupationCode;
      console.log(this.occipationCode);
    }
  }

  checkEKYC() {
    if (this.otheKYC.value === 'Y') {
      this.open();
    }
    this.onSubmit();
  }

  async onSubmit() {
    // if (this.flagDOPA.invalid) return this.disable = false;
    console.log(this.flagDOPA);
    this.spinner.show();
    if (this.data.calculationMonth === 'Y') {
      if (this.allExpend > this.allIncome) {
        console.log('show pop-up ว่าไม่ผ่าน ให้ติดต่อ call center');
        alertify.alert('ติดต่อ call center');
        return; // show pop-up ว่าไม่ผ่าน ให้ติดต่อ call center
      }
    }
    if (this.data.checkDopa === 'Y') {
      const chkDopa = await this.personalService.checkDopa(this.flagDOPA.value).toPromise();
      if (chkDopa) {
        this.spinner.hide();
        if (this.custQ.custQ.g001 === 'Y') {
          const item = {
            productCode: this.custQ.prod.prodCode,
            cardID: this.flagDOPA.value.cardId,
            ucID: '',
            promotionID: '',
            productID: '',
            promotionCode: this.data.campaign.details[0].value
          };
          if (this.custQ.custQ.chkCampaign === 'Y') {
            const chkCampain = await this.personalService.checkPromotion(item).toPromise();
            if (chkCampain) {
              // success
              console.log('success');
            } else {
              if (this.data.campaign.details[2].value === 'Y') {
                if (this.data.campaign.details[3].value === 'url') {
                  this.updateLockPromotion();
                  this.insertUpate();
                  window.location.href = this.data.campaign.details[4].value;
                }
                if (this.data.campaign.details[3].value === 'api') {
                  this.updateLockPromotion();
                  // ถ้า promotion not found ให้ยิงไป Lock promotion
                  // if (true) {
                    // success
                    // api ตาม attr value ของ this.data.campaign.details[3].value
                    // console.log('success');
                  // } else {
                  //   this.updateLockPromotion();
                  //   this.insertUpate();
                  //   this.caseError();
                  // }
                }
              } else {
                window.location.href = 'www.tisco.co.th';
              }
            }
          }
        }
        if (this.citizenInfo.value === 'Y') {
          if (this.otherInfo.details[0].value === 'Y') {
            const dataOccu = {codeOccupation: this.cusOccupation};
            const chkRiskOccupation = await this.personalService.checkRiskOccupation(dataOccu).toPromise();
            if (chkRiskOccupation === false) {
              console.log('ไป step ถัดไป');
            } else {
              this.updateLockPromotion();
              this.insertUpate();
              // this.route.navigate(['/features', 'Complete', {complete: false}]);
            }

            const dataBus = {codeBusinessType: this.cusOccupation};
            const chkRiskBusinessType = await this.personalService.checkRiskBusinessType(dataBus).toPromise();
            if (chkRiskBusinessType === false) {
              console.log('ไป step ถัดไป');
            } else {
              this.updateLockPromotion();
              this.insertUpate();
              // this.route.navigate(['/features', 'Complete', {complete: false}]);
            }
          }
        }
        if (this.data.details[0].value === 'Y') {
          if (this.addressCustomer.details[0].value === 'Y') {
            const dataPer = {codeLocation: this.cusPerLocationCode};
            const chkRiskPerLocation = await this.personalService.checkRiskLocation(dataPer).toPromise();
            if (chkRiskPerLocation === false) {
              console.log('ไป step ถัดไป');
            } else {
              this.updateLockPromotion();
              this.insertUpate();
              // this.route.navigate(['/features', 'Complete', {complete: false}]);
            }
          }

          if (this.addressCustomer.details[1].value === 'Y') {
            const dataCur = {codeLocation: this.cusCurLocationCode};
            const chkRiskCurLocation = await this.personalService.checkRiskLocation(dataCur).toPromise();
            if (chkRiskCurLocation === false) {
              console.log('ไป step ถัดไป');
            } else {
              this.updateLockPromotion();
              this.insertUpate();
              // this.route.navigate(['/features', 'Complete', {complete: false}]);
            }
          }
        }

        if (this.custQ.custQ.chkBlacklist === 'Y') {
          const levelList = [];
          const level = eval(this.custQ.custQ.riskLevelList);
          level.forEach(obj => {
            levelList.push(obj.level);
          });
          const data = {
            company: this.custQ.prod.company,
            firstName: this.flagDOPA.value.firstName,
            lastName: this.flagDOPA.value.lastName,
            cardNo: this.flagDOPA.value.cardId,
            colour: levelList
          };
          const blackList = await this.personalService.checkBlackList(data).toPromise();
          if (blackList) {
            // success ไป step ถัดไป (ค่า false)
          } else {
            this.updateLockPromotion();
            this.insertUpate();
            // this.route.navigate(['/features', 'Complete', {complete: false}]);
          }
        }

        if (this.custQ.custQ.dupCPO === 'Y') {
          const data = {
            token: 'XXXX',
            requestBy: 'devcpocmm',
            source: 'dsf',
            requestDateTime: '12/5/2014 12:00:15',
            appliedCompany: '10',
            loanType: 'R1', // groupProduct
            hpAccountNo: '',
            idNo: this.flagDOPA.value.cardId
          };
          const cpo = await this.personalService.checkCPO(data).toPromise();
          if (cpo) {
            // success ไป step ถัดไป (ค่า false)
          } else {
            this.updateLockPromotion();
            this.insertUpate();
            // this.route.navigate(['/features', 'Complete', {complete: false}]);
          }
        }

        // this.custQ.prodInfo.details[0].details[2].details[0].value
        //defCampain
        // console.log();
        // this.checkDefcampain();

        // this.personalService.checkPromotion(item).subscribe(res => {
        //    console.log(res);
        //  })
        // this.route.navigate(['/features', 'Confirmation']);
      } else {
        // dopa ไม่ผ่าน
        this.countMaxDopa();
      }
    }
  }

  countMaxDopa() {
    if (this.countDopa > +this.maxDopa) {
      this.route.navigate(['/features', 'Complete']);
    }
    this.countDopa += 1;
  }

  checkDefcampain() {
    console.log(this.custQ);
    if (this.custQ.prodInfo.details[0].details[2].details[2].value == 'Y') {
      console.log(this.custQ.prodInfo.details[0].details[2].details[3].value);
      console.log(this.custQ.prodInfo.details[0].details[2].details[4].value);
    }
  }

  testOcupation() {
    console.log('Occu', this.cusOccupation);
    console.log('BusiType', this.cusBusinessType);
    console.log('ocupation', this.otherInfo.details[0]);
  }


  updateLockPromotion() {
  }

  insertUpate() {
    this.insertLead();
    this.insertTermCon();
    this.insertSaleSheet();
    this.updateState();
    this.updateLog();
  }

  insertLead() {
  }

  insertTermCon() {
  }

  insertSaleSheet() {
  }

  updateState() {
  }

  updateLog() {
  }

  caseError() {
    //เป้าหมายคือไปสัก link หนึ่ง
    window.location.href = 'www.tisco.co.th';
  }

  findDistrict(event, type) {
    console.log('event', event);
    const value = event.srcElement.value;
    console.log(event.srcElement.value, this.customerMasterData.data.locationCode);
    const subDistrict = this.customerMasterData.data.locationCode.filter(res => value == res.subDistrict);
    console.log('subDistrict', subDistrict);

    if (subDistrict && type === 'Per') {
      this.perDistrict = subDistrict[0].district;
      this.perProvince = subDistrict[0].Province;
      this.cusPerLocationCode = subDistrict[0].codeLocation;
    }
    if (subDistrict && type === 'Cur') {
      this.perDistrict = subDistrict[0].district;
      this.perProvince = subDistrict[0].Province;
      this.cusCurLocationCode = subDistrict[0].codeLocation;
    }
  }

  ngOnDestroy() {
    if (this.timeCount) {
      clearInterval(this.count);
      const prodData = this.custQ.prod;
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
      console.log(this.dataLog);
      this.outputData.unsubscribe();
    }
  }

  sumIncomeExpend() {
    this.allIncome = (this.income1 || 0) + (this.income2 || 0) + (this.income3 || 0) + (this.income4 || 0) + (this.income5 || 0);
    this.allExpend = (this.expend1 || 0) + (this.expend2 || 0) + (this.expend3 || 0) + (this.expend4 || 0) + (this.expend5
      || 0) + (this.expend6 || 0) + (this.expend7 || 0) + (this.expend8 || 0) + (this.expend9 || 0) + (this.expend10 || 0);
    console.log(this.allIncome, typeof this.allIncome);
    console.log(this.allExpend, typeof this.allExpend);
    localStorage.setItem('allIncome', this.allIncome);
    localStorage.setItem('allExpend', this.allExpend);
  }

  open() {
    this.modal = this.modalService.open(this.ekyc, {backdrop: 'static', keyboard: false});
  }

  close() {
    this.modal.close();
  }

  qqqq() {
    console.log('YOYO');
    this.close();
  }
}


