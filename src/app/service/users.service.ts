import { Injectable } from '@angular/core';
import { isUser, User } from '../models/user.model';
import { IndexedDbService } from './indexedDb.service';
import { Observable, from, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private indexedDbService: IndexedDbService) {}

  addUser(user: User): Observable<void> {
    return from(this.getHighestId()).pipe(
      switchMap((newId) => {
        user.id = newId;
        return from(this.indexedDbService.add("users", user));
      }),
      map(() => undefined)
    );
  }

  private getHighestId(): Promise<number> {
    return this.indexedDbService.getAll("users").then(items => {
      const highestId = items.reduce((maxId, item) => {
        return item.id > maxId ? item.id : maxId;
      }, 0);
      return highestId + 1;
    });
  }

  getUser(id: number): Observable<User | undefined> {
    return from(this.indexedDbService.get("users", id)).pipe(
      map((result: any | undefined) => (isUser(result) ? result : undefined))
    );
  }

  getAllUsers(): Observable<User[]> {
    return from(this.indexedDbService.getAll("users")).pipe(
      map((results: any[]) => results.filter(isUser) as User[])
    );
  }

  deleteUser(id: number): Observable<void> {
    return from(this.indexedDbService.delete("users", id)).pipe(
      map(() => undefined)
    );
  }
}
