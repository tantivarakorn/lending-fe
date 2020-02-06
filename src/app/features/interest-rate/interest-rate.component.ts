import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FeaturesService } from '../shared/features.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataLog } from '../shared/features.model';
import { promotiomResponse } from './fake-data';
import { PromotionResponse, CalFactorList, PromotionCondition } from './interest-rate.models';
@Component({
  selector: 'app-interest-rate',
  templateUrl: './interest-rate.component.html',
  styleUrls: ['./interest-rate.component.scss']
})
export class InterestRateComponent implements OnInit, OnDestroy {
  dataLog: DataLog;
  @Input() data;
  calFactorList: CalFactorList[];
  logo = '../../../assets/tiscologo.png';
  bgTop = 'linear-gradient(106deg, #a9d6ff 0%, #ddebf8 35%, #ddebf8 65%, #fdcdd1 100%)';
  responsiveOptions;
  val;
  items: any[];
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  packageList;

  limitAdjust;
  minimum;
  maximum;

  promotionItem: PromotionResponse;
  productDetail: any[];
  packageDetail: any[];
  packageLists: any;
  @Output() outputData = new EventEmitter();
  timeCount = 0;
  count;

  constructor(private service: FeaturesService) {
    this.service.setTitle('เลือกวงเงินสินเชื่อ', 'XXXX-XXX-2325');
    this.responsiveOptions = [
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '420px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.countingTime();
    console.log("TCL: InterestRateComponent -> ngOnInit -> this.calFactorList", this.calFactorList);
    this.productDetail = this.data.prodInfo.details[0].details[5].details[0];
    // ตัวแปรที่้องโชว์ใน package
    this.packageLists = eval(this.data.prodInfo.details[0].details[5].details[1].value);
    // console.log("TCL: InterestRateComponent -> ngOnInit -> this.packageLists", this.packageLists)

    this.setValue();
    /// item ที่รีบมาจาก API
    this.promotionItem = promotiomResponse;
    console.log("TCL: InterestRateComponent -> ngOnInit -> this.promotionItem", this.promotionItem)
    /// item ที่โชว์ในpackinglist
    this.items = promotiomResponse.data[0].promotion_condition;
    // this.sum1chkIncomeData();
    // this.resultSum();
    // console.log("TCL: InterestRateComponent -> ngOnInit -> this.resultSum()", this.resultSum())
    this.setItemPackage();
  }

  countingTime() {
    this.count = setInterval(() => { this.timeCount += 1; }, 1000);
  }

  setDetails() {
    const loanAmount = this.items[0].factor_3_to;
    const minAmount = this.items[0].from;
    const maxProcuct = this.productDetail[4].value;
    const minProduct = this.productDetail[3].value;
    this.productDetail = this.data.prodInfo.details[0].details[0].details;
    this.maximum = loanAmount >= maxProcuct ? maxProcuct : loanAmount;
    this.minimum = minAmount >= minProduct ? minProduct : minAmount;
    this.limitAdjust = this.productDetail[2].value;
  }

  setValue() {
    this.limitAdjust = eval(this.data.data.details[0].details[2].value);
    this.minimum = eval(this.data.data.details[0].details[3].value);
    this.maximum = eval(this.data.data.details[0].details[4].value);
    this.val = this.maximum;
    this.packageList = eval(this.data.data.details[5].details[1].value);
    console.log('this.packageList', this.packageList);
  }

  returnParameter(item: { label: string, parameter: string, topic: string, unit: string }, param: string) {
    return item[param + ''];
  }

  plus() {
    if (this.val >= this.maximum) {
      return;
    }
    this.val += this.limitAdjust;
    this.setItemPackage();
  }

  minus() {
    if (this.val <= this.minimum) {
      return;
    }
    this.val -= this.limitAdjust;
    this.setItemPackage();
  }
  // ผลรวมรายได้
  sum1chkIncomeData(): number {
    const sum1 = [
      10000,
      10000,
      10000,
      10000,
      0,
    ];
    const resultSum = sum1.reduce((sum, value) => sum + value, 0);
    console.log(resultSum);
    return resultSum;
  }
  // ผลรวมรายจ่าย
  sum2chkExpendData(): number {
    const sum2 = [
      10000,
      0,
      0,
      0,
      0,
    ];
    const resultSum = sum2.reduce((sum, value) => sum + value, 0);
    console.log(resultSum);
    return resultSum;
  }
  // ผลรวมหนี้สิน
  sum3chkDebtData(): number {
    const sum3 = [
      18000,
      0,
      0,
      0,
      0,
    ];
    const resultSum = sum3.reduce((sum, value) => sum + value, 0);
    console.log(resultSum);
    return resultSum;
  }

  resultSum(item): boolean {
    // console.log(this.sum1chkIncomeData() - (this.sum2chkExpendData() + this.sum3chkDebtData() + parseInt(this.setCalAmount(null))));
    console.log(item * 2);
    console.log('555555', this.sum1chkIncomeData() - (this.sum2chkExpendData() + this.sum3chkDebtData() + parseInt(item)));
    // return this.sum1chkIncomeData() - (this.sum2chkExpendData() + this.sum3chkDebtData() + item);
    return (this.sum1chkIncomeData() - (this.sum2chkExpendData() + this.sum3chkDebtData() + parseInt(item)) >= (item * 2));

  }



  setCalAmount(item: PromotionCondition, calAmountNumber: number = 0): number {
    const factor_1_from = item.factor_1_from;
    const factor_1 = factor_1_from;
    const factor_1_to = item.factor_1_to;
    const factor_2_from = item.factor_2_from;
    const factor_2 = factor_2_from;
    const installmentTerm = factor_2_from;
    const factor_2_to = item.factor_2_to;
    const factor_3_from = item.factor_3_from
    const factor_3 = factor_3_from;
    const factor_3_to = item.factor_3_to
    const factor_4_from = item.factor_4_from
    const factor_4 = factor_4_from
    const factor_4_to = item.factor_4_to;
    const factor_5_from = item.factor_5_from
    const factor_5 = factor_5_from;
    const factor_5_to = item.factor_5_to;
    const factor_6_from = item.factor_6_from
    const factor_6 = factor_6_from
    const factor_6_to = item.factor_6_to
    const factor_7_from = item.factor_7_from
    const factor_7 = factor_7_from;
    const factor_7_to = item.factor_7_to;
    const factor_8_from = item.factor_8_from;
    const factor_8 = factor_8_from
    const factor_8_to = item.factor_8_to
    const factor_9_from = item.factor_9_from
    const factor_9 = factor_9_from
    const factor_9_to = item.factor_9_to
    const factor_10_from = item.factor_10_from
    const factor_10 = factor_10_from
    const factor_10_to = item.factor_10_to
    const fee_rate_code = item.fee_rate_code
    const promotion_type = item.promotion_type
    const premium = item.premium
    const discount_baht = item.discount_baht
    const discount = discount_baht;
    let rateAmount = item.discount_percent;
    const limit = this.val;
    rateAmount = rateAmount / 100;
    console.log(rateAmount);

    this.calFactorList = eval(this.data.prodInfo.details[0].details[3].details[1].value);

    console.log("TCL: setCalAmount -> this.calFactorList", this.calFactorList)

    const formularCalAmount = this.calFactorList[calAmountNumber];

    const decimal = formularCalAmount.decimal;

    let value = eval(eval('`' + formularCalAmount.formular.replace('^', '**') + '`'));
    // console.log(eval('`' + formularCalAmount.formular + '`'));

    if (formularCalAmount.unit) {
      value = Math.ceil(value / parseInt(formularCalAmount.unit)) * parseInt(formularCalAmount.unit)
    }
    console.log('calAmount', value.toFixed(decimal));
    return value.toFixed(decimal)
  }

  setItemPackage() {
    console.log('data res', this.items);
    this.items.forEach(item => {
      const calAmount = this.setCalAmount(item)
      item.show = this.resultSum(calAmount);
    });
    let obj = null;
    obj = this.items.filter(item => {
      return item.show == true
    });
    this.items = obj;

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
      };
      this.outputData.unsubscribe();
    }
  }

}
