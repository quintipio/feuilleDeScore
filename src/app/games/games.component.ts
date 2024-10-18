import { Component, inject } from '@angular/core';
import { UserService } from '../service/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  selectedUsers: User[] = [];

  userService = inject(UserService);

  ngOnInit(): void {
    this.selectedUsers = this.userService.getSelectedUsers();
  }

}
