import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatButtonModule, MatCheckbox, MatCheckboxModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MemoComponent } from './memo/memo.component';
import { CheckComponent } from './check/check.component'
import { LetterService } from './letter.service';
import { ResultComponent } from './result/result.component';
import { ConfigComponent } from './config/config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MemoComponent,
    CheckComponent,
    ResultComponent,
    ConfigComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [LetterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
