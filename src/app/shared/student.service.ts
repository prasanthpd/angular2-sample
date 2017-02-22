import { Injectable } from '@angular/core';

import { Student } from './student.model';
import { AppState } from './store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
//import { Response } from '@angular/http';

import {
    END_STUDENTSLOAD,
    SEARCH_ACTION,
    LOAD_ACTION
} from './operation.reducer';

import {
    LOAD_ALBUMS
} from './students.reducer';


@Injectable()
export class StudentService {

    students: Student[];
    private API_PATH: string = 'http://localhost:3000/students';

    constructor(private http: Http, private store: Store<AppState>) { }

    loadStudents(searchParam: string): void {

        this.getStudents(searchParam).subscribe(students => {
            this.students = students;

            this.store.dispatch({
                type: END_STUDENTSLOAD
            });

            this.store.dispatch({
                type: LOAD_ALBUMS,
                payload: students
            });

            this.store.dispatch({
                type: LOAD_ACTION
            });

        })
    }

    searchStudents(terms: Observable<string>, debounceDuration = 2500) {
        return terms.debounceTime(debounceDuration)
            .distinctUntilChanged()
            .switchMap(term => {
                console.log("Search term:" + term);
                return this.getStudents(term);
            });
    }

    private getStudents(searchParam: string): Observable<Student[]> {

        this.store.dispatch({
            type: SEARCH_ACTION
        });

        console.log(searchParam);
        return this.http.get(`${this.API_PATH}?`)
            .map(response => { console.log(response.json()); return response.json().studs || [] })
            .map(students => students.filter(student => {
                if (searchParam != null && searchParam.length != 0)
                    return (student.name.indexOf(searchParam) != -1)
                else return true;
            }));
        //.filter((student: Student) => { console.log(searchParam + "student.name" + student.name); return (student.name.indexOf(searchParam) != -1) })
        //.catch(this.handleError);
    }

    // private extractData(res: Response)  {
    //     console.log(res);
    //     let body = res.json();
    //     console.log("body.data " + body);
    //     return body[0] || {};

    // let results = <Student[]>[];
    // let obj = res.json();
    // obj.forEach(
    //     function (o: any) {
    //         results.push(new Student(o.id, o.name, o.imgUrl, o.details));
    //     }
    // );
    // return results;



    //}

    // private handleError(error: Response | any) {
    //     // In a real world app, we might use a remote logging infrastructure
    //     let errMsg: string;
    //     if (error instanceof Response) {
    //         const body = error.json() || '';
    //         const err = body.error || JSON.stringify(body);
    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }
    //     console.error(errMsg);
    //     return Observable.throw(errMsg);
    // }


}

