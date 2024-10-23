import { Component, inject } from '@angular/core';
import { UserService } from '../service/users.service';
import { User } from '../models/user.model';
import {InputScoreComponent} from '../components/input-score/input-score.component'

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [InputScoreComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  selectedUsers: User[] = [];
  parentValue: number = 0;

  userService = inject(UserService);

  ngOnInit(): void {
    this.selectedUsers = this.userService.getSelectedUsers();
  }

  onValueChange(newValue: number) {
    this.parentValue = newValue;
    console.log('Nouvelle valeur reçue du composant enfant:', newValue);
  }

}
