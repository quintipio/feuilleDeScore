import {Component, inject} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userService = inject(UserService);

  users: User[] = [];

  textInput = "";
  titleModalInput = "";
  textButton = "Sauvegarder";
  userForm = new FormGroup({name: new FormControl('', Validators.required),});
  private currentUserId: number | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  addUser(){
    this.textInput = "Entrez le nouveau nom : ";
    this.titleModalInput = "Ajouter";
  }

  deleteUser(user: User){
    this.userService.deleteUser(user.id)
    this.loadUsers();
  }

  editUser(user: User) {
    this.titleModalInput = "Modifier";
    this.textInput = "Modifier le nom : ";
    this.userForm.patchValue({ name: user.name });
    this.currentUserId = user.id;
  }

  toggleSelection(userId: number) {
    const user = this.users.find(user => user.id === userId);
    if (user) {
      user.isSelected = !user.isSelected;
    }
  }

  validateFormUser() {
    const newName = this.userForm.value.name;

    if (typeof newName === 'string') {
      if (this.currentUserId !== null) {
        // Modifier l'utilisateur existant
        const updatedUser = { id: this.currentUserId, name: newName};
        const success = this.userService.updateUser(updatedUser);
        if (success) {
          this.loadUsers();
        } else {
          console.log('Utilisateur non trouvé');
        }
      } else {
        // Ajouter un nouvel utilisateur
        const newUser = { name: newName};
        this.userService.addUser(newUser);
        this.loadUsers();
      }

      this.userForm.reset();
      this.currentUserId = null;
    } else {
      console.error('Le nom de l’utilisateur est invalide');
    }
  }
}
