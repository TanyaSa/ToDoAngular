import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChecklistComponent } from './checkList/checklist/checklist.component';
import { RegistrationComponent } from './registration/registration.component';
import { SigninComponent } from './signin/signin.component';

const appRoutes: Routes = [
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'checklist',
        component: ChecklistComponent
    }

];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
  })

export class AppRoutingModule { }
