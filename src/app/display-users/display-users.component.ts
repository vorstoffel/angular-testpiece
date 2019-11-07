import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../User.model';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent {
  @Input() users$: Observable<User[]>;
}
