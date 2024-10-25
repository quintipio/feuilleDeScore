import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {

  private tablesUrl = 'data/tables.json';

  private tablesSubject = new BehaviorSubject<Table[]>([]);
  tables$ = this.tablesSubject.asObservable();

  private tables: Table[] = [];

  constructor(private http: HttpClient) {
    this.loadTablesFromJson();
  }

  private loadTablesFromJson(): void {
    this.http.get<Table[]>(this.tablesUrl).subscribe(
      (data: Table[]) => {
        this.tables = data;
        this.tablesSubject.next(this.tables);
      },
      (error) => {
        console.error('Error loading tables:', error);
      }
    );
  }

  getTables(): Observable<Table[]> {
    return this.tablesSubject.asObservable();
  }

  addTable(newTable: Omit<Table, 'id'>): void {
    const newId = this.tables.length > 0 ? Math.max(...this.tables.map(u => u.id)) + 1 : 1;
    const newTableWithId: Table = { id: newId, ...newTable };
    this.tables.push(newTableWithId);
    this.tablesSubject.next(this.tables);
    console.log(this.tables);
  }

  updateTable(updatedTable: Table): boolean {
    const index = this.tables.findIndex(game => game.id === updatedTable.id);
    if (index !== -1) {
      this.tables[index] = updatedTable;
      this.tablesSubject.next(this.tables);
      console.log(this.tables);
      return true;
    }
    return false;
  }

  deleteTable(id: number): boolean {
    const index = this.tables.findIndex(game => game.id === id);
    if (index !== -1) {
      this.tables.splice(index, 1);
      this.tablesSubject.next(this.tables);
      return true;
    }
    return false;
  }
}
