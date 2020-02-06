import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TitleChange } from './features.model';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private changeName: Subject<TitleChange> = new Subject<TitleChange>();
  title: string;
  itemNo: string;
  constructor() { }

  get getName() {
    return this.changeName;
  }
  setTitle(title: string, itemNo: string) {
    this.changeName.next({ title, itemNo });
  }
}


