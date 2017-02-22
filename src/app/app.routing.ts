import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
//import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './students/student.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
 // { path: 'about', component: LoginComponent},
  { path: 'students', component: HomeComponent,
  children: [
      { path: 'slist', component: StudentComponent },
    ]
  }
];

export const routing = RouterModule.forRoot(routes);
