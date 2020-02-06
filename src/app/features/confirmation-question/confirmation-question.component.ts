import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FeaturesService } from '../shared/features.service';
import { DataLog } from '../shared/features.model';
import { questionData } from './resonseJson'
import { DataQuestion, DatChoice } from './confirmation-question.models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmation-question',
  templateUrl: './confirmation-question.component.html',
  styleUrls: ['./confirmation-question.component.scss']
})
export class ConfirmationQuestionComponent implements OnInit, OnDestroy {
  dataLog: DataLog;
  logo = '../../../assets/tiscologo.png';
  bgTop = 'linear-gradient(106deg, #a9d6ff 0%, #ddebf8 35%, #ddebf8 65%, #fdcdd1 100%)';
  val1;
  questionData: DataQuestion;
  constructor(private service: FeaturesService, private router: Router) {
    this.service.setTitle('ยืนยันตัวตน', 'XXXX-XXX-2325');
  }
  @Input() data;
  @Output('outputData') outputData = new EventEmitter();
  answer;
  timeCount = 0;
  count;
  value = [];
  limit = 0;
  answerCount = 0;
  countingTime() {
    this.count = setInterval(time => { this.timeCount += 1 }, 1000);
  }

  ngOnInit() {
    this.countingTime();
    questionData.data.forEach(item => {
      this.value.push({ ...item, value: '' });
    });
    console.log(this.value);
    this.questionData = questionData;
    console.log(this.data);
    this.limit = this.data.data.inCorrectAnswer;
  }

  setFinalValue(question: DatChoice[]) {
    const answer = question.map(item => {
      if (item.question_type === 1) {

      }
    }
    );
  }

  setValueItem(item: DatChoice, event) {
    this.value.forEach(e => {
      if (e.question_id == item.question_id) {
        e.value = event.srcElement.value;
      }
    });
    console.log(this.value);

  }
  onSubmit() {
    this.answerCount += 1;
    if (this.limit < this.answerCount) {
      this.router.navigate(['/features', 'Complete']);
    }
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
  // [routerLink]="['/features', 'ConsentInfo']"
}
