import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { SalesSheetComponent } from './sales-sheet/sales-sheet.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { IdCardComponent } from './id-card/id-card.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ConsentInformationComponent } from './consent-information/consent-information.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { InterestRateComponent } from './interest-rate/interest-rate.component';
import { SummaryDetailComponent } from './summary-detail/summary-detail.component';


import { PdfViewerModule } from 'ng2-pdf-viewer';
import {
  CardModule,
  CheckboxModule,
  InputSwitchModule,
  PanelMenuModule,
  PanelModule,
  RadioButtonModule,
  SliderModule,
  TableModule
} from 'primeng';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepPicComponent } from './step-pic/step-pic.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ConfirmationQuestionComponent } from './confirmation-question/confirmation-question.component';
import { FeaturesComponent } from './features.component';
import { FeaturesService } from './shared/features.service';
import { PaymentChanelComponent } from './payment-chanel/payment-chanel.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompleteComponent } from './shared/complete/complete.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { WebcamModule } from 'ngx-webcam';
import { CameraComponent } from './shared/camera/camera.component';
import { CarouselModule } from 'primeng/carousel';
import { SharedsModule } from '../shareds/shareds.module';
import { CommaPipe } from '../shareds/pipe/comma.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    SalesSheetComponent,
    ConditionsComponent,
    IdCardComponent,
    PersonalInformationComponent,
    ConsentInformationComponent,
    ConfirmationComponent,
    InterestRateComponent,
    SummaryDetailComponent,
    CompleteComponent,
    StepPicComponent,
    ConfirmationQuestionComponent,
    FeaturesComponent,
    PaymentChanelComponent,
    CameraComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    PdfViewerModule,
    CheckboxModule,
    PanelModule,
    PanelMenuModule,
    InputSwitchModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    NgOtpInputModule,
    RadioButtonModule,
    SliderModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxExtendedPdfViewerModule,
    WebcamModule,
    CarouselModule,
    CardModule,
    NgbModule,
    SharedsModule
  ],
  providers: [FeaturesService]
})
export class FeaturesModule { }
