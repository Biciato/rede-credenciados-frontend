import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserIdAndEmailService {

    // Observable string sources
    userIdAndEmailSrc: any;

    // Service message commands
    passEmailAndId(id, email) {
        this.userIdAndEmailSrc = {id: id, email: email};
    }
}
