import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';
import { Table } from '../models/table.model';

interface MyDB extends DBSchema {
  games: {
    key: number;
    value: Game;
  };
  users: {
    key: number;
    value: User;
  };
  tables: {
    key: number;
    value: Table;
  };
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase<MyDB>>;

  constructor() {
    this.dbPromise = openDB<MyDB>('ScoreSheetDb', 1, {
      upgrade(db) {
        db.createObjectStore('games', { keyPath: 'id' });
        db.createObjectStore('users', { keyPath: 'id' });
        db.createObjectStore('tables', { keyPath: 'id' });
      },
    });
  }

  async add<T extends Game | User | Table>(storeName: 'games' | 'users' | 'tables', value: T): Promise<void> {
    const db = await this.dbPromise;
    await db.put(storeName, value);
  }

  async get<T extends Game | User | Table>(storeName: 'games' | 'users' | 'tables', key: number): Promise<T | undefined> {
    const db = await this.dbPromise;
    const result = await db.get(storeName, key);
    return result as T | undefined;
  }

  async getAll<T extends Game | User | Table>(storeName: 'games' | 'users' | 'tables'): Promise<T[]> {
    const db = await this.dbPromise;
    const result = await db.getAll(storeName);
    return result as T[];
  }

  async update<T extends Game | User | Table>(storeName: 'games' | 'users' | 'tables', value: T): Promise<void> {
    const db = await this.dbPromise;
    await db.put(storeName, value);
  }

  async delete(storeName: 'games' | 'users' | 'tables', key: number): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(storeName, key);
  }
}
