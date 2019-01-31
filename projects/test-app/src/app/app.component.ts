import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent {

    login: any = {
        username: '',
        pin: ''
    };

    formSubmitted() {
        console.log('formSubmitted', this.login);
    }
}
