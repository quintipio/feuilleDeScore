import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'users.json';

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private selectedUsers: User[] = [];
  private users: User[] = [];

  constructor(private http: HttpClient) {
    this.loadUsersFromJson();
  }

  private loadUsersFromJson(): void {
    this.http.get<User[]>(this.usersUrl).subscribe(
      (data: User[]) => {
        this.users = data;
        this.usersSubject.next(this.users);
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  updateSelectedUsers(updatedUsers: User[]): void {
    this.selectedUsers = updatedUsers;
    console.log(this.selectedUsers);
  }

  getSelectedUsers(): User[] {
    return this.selectedUsers;
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(newUser: Omit<User, 'id' | 'isSelected'>): void {
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    const newUserWithId: User = { id: newId, isSelected: false, ...newUser };
    this.users.push(newUserWithId);
    this.usersSubject.next(this.users);  // Mettre à jour le BehaviorSubject avec la nouvelle liste
  }

  updateUser(updatedUser: User): boolean {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.usersSubject.next(this.users);  // Mettre à jour le BehaviorSubject avec la liste modifiée
      return true;
    }
    return false;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.usersSubject.next(this.users);  // Mettre à jour le BehaviorSubject avec la liste mise à jour
      return true;
    }
    return false;
  }
}
