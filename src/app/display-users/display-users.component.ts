import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Userpost2 } from '../models/userpost.model';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent {
  @Input() userposts$: Observable<Userpost2[]>;
}
