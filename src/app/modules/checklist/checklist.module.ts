import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistRoutingModule } from './checklist-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ItemComponent } from './list/list.component';
import { DateCustomPipe } from 'src/app/shared/pipes/date/date.pipe';
import { MonthCustomPipe } from 'src/app/shared/pipes/month/month.pipe';
import { HeaderComponent } from './header/header.component';
import { ChecklistComponent } from './checklist.component';
import { AbilityModule } from '@casl/angular';
import { ErrorHandterInterceptor } from 'src/app/core/interceptors/errorHandler.interceptor';

@NgModule({
  declarations: [
    ItemComponent,
    HeaderComponent,
    DateCustomPipe,
    MonthCustomPipe,
    ChecklistComponent
  ],
  imports: [
    CommonModule,
    ChecklistRoutingModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatListModule,
    HttpClientModule,
    AbilityModule
  ],
  providers: [{provide: ErrorHandler, useClass: ErrorHandterInterceptor}]
})
export class ChecklistModule { }
