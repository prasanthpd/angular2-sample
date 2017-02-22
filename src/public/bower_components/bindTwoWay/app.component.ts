import { Component } from '@angular/core';

@Component({
   selector: 'my-app',
   template: ` 
       <input type="text" [(ngModel)]="name">
        {{ name }}
    `
})
export class AppComponent
{
        name: string = "Infosys";
}






