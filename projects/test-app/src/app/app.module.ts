import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapValidationModule } from '../../../ngx-bootstrap-validation/src/lib/ngx-bootstrap-validation.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgxBootstrapValidationModule.forRoot([]),
        NgxBootstrapValidationModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
