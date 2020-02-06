import { Injectable } from '@angular/core';
import { AppServiceService } from '../../shareds/services/app-service.service';
import { FlagDOPA } from './personalInfo.models';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

  constructor(private service: AppServiceService) {
  }

  checkDopa(data: FlagDOPA) {
    const item = {data: data};
    //ตอนยิงไปเช็ค ส่ง ip device ไปด้วย
    return this.service.post(`dopa/lasor`, item);
  }

  checkPromotion(data) {
    // const item = {
    //   data: {
    //     productCode: 'ABC',
    //     cardID: 1234567890,
    //     ucID: '',
    //     promotionID: '',
    //     productID: '',
    //     promotionCode: 'ADD12456'
    //   }
    // }
    return this.service.post(`promotion/inquiry`, data);
  }

  checkRiskOccupation(data) {
    return this.service.post(`data/risk/occupation`, data);
  }

  checkRiskBusinessType(data) {
    return this.service.post(`data/risk/businesstype`, data);
  }

  checkRiskLocation(data) {
    return this.service.post(`data/risk/location`, data);
  }

  checkBlackList(data) {
    return this.service.post(`bls/blacklist`, data);
  }

  checkCPO(data) {
    return this.service.post(`cpoWS/rest/dfp/request/inquirycase`, data);
  }
}
