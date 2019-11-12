import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Userpost } from '../models/userpost.model';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent {
  // @Input() users$: Observable<User[]>;
  @Input() userposts$: Observable<Userpost[]>;

}
