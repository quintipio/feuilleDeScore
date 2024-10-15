import {Injectable} from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users:User[] = [
    {id: 1, name: 'Joueur A'},
    {id: 2, name: 'Joueur B'},
    {id: 3, name: 'Joueur C'},
    {id: 4, name: 'Joueur D'},
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number) {
    return this.users[id];
  }

  addUser(newUser: Omit<User, 'id'>): void {
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    this.users.push({ id: newId, ...newUser });
  }

  updateUser(updatedUser: User): boolean {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      return true;
    }
    return false;
  }

  deleteUser(id : number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if(index !== - 1){
      this.users.splice(index,1);
    }
    return false;
  }
}
