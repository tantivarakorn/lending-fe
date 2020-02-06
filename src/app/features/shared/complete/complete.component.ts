import { Component, HostListener, OnInit } from '@angular/core';
import { FeaturesService } from '../features.service';


@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  logo = '../../../assets/tiscologo.png';
  bgTop = 'linear-gradient(106deg, #a9d6ff 0%, #ddebf8 35%, #ddebf8 65%, #fdcdd1 100%)';


  constructor(private service: FeaturesService) {
    // this.service.setTitle('Complete', 'XXXX-XXX-2325');
  }

  ngOnInit() {
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log('End');
    }
  }


}
