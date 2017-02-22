import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import { Student } from '../shared/student.model';
import { AppState } from '../shared/store';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'student',
  template: require('./student.html')
})
export class StudentComponent implements OnInit, OnDestroy {
  private students$: Observable<Student[]>;
  private studentsFilter$: Observable<Student[]>;
  private studentCount$: Observable<number>;
  private loading = false;
  private loadSubscription: Subscription;
  private term = new FormControl();
  private termStr: string = "";
  private searchAction$: Observable<boolean>;
  private loadAction$: Observable<boolean>

  constructor(private store: Store<AppState>, private service: StudentService) {
  }



  ngOnInit(): void {
    this.students$ = this.store.select(x => x.students.collection);
    this.searchAction$ = this.store.select(x => x.operation.searchAction);
    this.loadAction$ = this.store.select(x => x.operation.loadAction);

    this.loadSubscription = this.store.select(x => x.operation.engLoadStudents)
      .subscribe(flag => {
        this.loading = flag;
      });

    this.studentCount$ = this.students$
      .map(x => {
        return x.length;
      });

    console.log("this.termStr:::" + this.termStr);
    this.service.loadStudents(this.termStr);
    this.studentsFilter$ = this.service.searchStudents(this.term.valueChanges);
  }

  attendanceClicked(event: any): void {
    console.log("reached flag..." + event.detail.togglebutton);
    console.log("stud Id..." + event.detail.studid);
  }

  ngOnDestroy(): void {
    this.loadSubscription.unsubscribe();
  }

}