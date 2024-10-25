import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/users.service';
import { User } from '../models/user.model';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);

  users: User[] = [];
  selectedUser: User[] = [];
  isCreateTable: boolean = false;
  textInput = "";
  titleModalInput = "";
  textButton = "Sauvegarder";
  userForm = new FormGroup({ name: new FormControl('', Validators.required), });
  private currentUserId: number | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isCreateTable = params['isCreateTable'] === 'true';
    });
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.users$.subscribe((data: User[]) => {
      this.users = data;
    });
  }

  addUser() {
    this.textInput = "Entrez le nouveau nom : ";
    this.titleModalInput = "Ajouter";
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id);
    const index = this.selectedUser.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.selectedUser.splice(index, 1);
    }
    this.loadUsers();
  }

  editUser(user: User) {
    this.titleModalInput = "Modifier";
    this.textInput = "Modifier le nom : ";
    this.userForm.patchValue({ name: user.name });
    this.currentUserId = user.id;
  }

  toggleSelection(userId: number): void {
    const user = this.users.find(user => user.id === userId);

    if (user) {
      const index = this.selectedUser.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.selectedUser.splice(index, 1);
      } else {
        this.selectedUser.push(user);
      }
    }
  }

  checkSelectedUser(userId: number): boolean {
    return this.selectedUser.findIndex(u => u.id === userId) !== -1;
  }

  isSelectedUser() {
    return this.selectedUser.length > 0 && this.isCreateTable;
  }

  validateFormUser() {
    const newName = this.userForm.value.name;

    if (typeof newName === 'string') {
      if (this.currentUserId !== null) {
        // Modifier l'utilisateur existant
        const updatedUser = { id: this.currentUserId, name: newName };
        const success = this.userService.updateUser(updatedUser);
        if (success) {
          this.loadUsers();
        } else {
          console.log('Utilisateur non trouvé');
        }
      } else {
        // Ajouter un nouvel utilisateur
        const newUser = { name: newName };
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
