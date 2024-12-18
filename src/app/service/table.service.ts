import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map, switchMap } from 'rxjs';
import { isTable, Table } from '../models/table.model';
import { IndexedDbService } from './indexedDb.service';
import { RoundRow } from '../models/sheet';

@Injectable({
  providedIn: 'root',
})
export class TableService {

  private tables: Table[] = [];

  constructor(private http: HttpClient, private indexedDbService: IndexedDbService) {
  }

  generateEmptyTable():Table {
    const table:Table = {
      id: 0,
      users: [],
      game: undefined,
      round: [],
      specificData: "",
      historic: {}
    };
    return table;
  }

  addTable(table: Table): Observable<void> {
    return from(this.getHighestId()).pipe(
      switchMap((newId) => {
        table.id = newId;
        return from(this.indexedDbService.add("tables", table));
      }),
      map(() => undefined)
    );
  }

  private getHighestId(): Promise<number> {
    return this.indexedDbService.getAll("tables").then(items => {
      const highestId = items.reduce((maxId, item) => {
        return item.id > maxId ? item.id : maxId;
      }, 0);
      return highestId + 1;
    });
  }

  updateTable(table: Table): Observable<void> {
    return from(this.indexedDbService.update("tables", table)).pipe(
      map(() => undefined)
    );
  }

  updateRound(idTable: number, round: RoundRow[]): Observable<void> {
    return this.getTable(idTable).pipe(
      switchMap((table) => {
        if (table) {
          table.round = round;
          return this.updateTable(table);
        } else {
          throw new Error(`Table with id ${idTable} not found.`);
        }
      })
    );
  }

  updateSpecificData(idTable: number,specificData : string): Observable<void> {
    return this.getTable(idTable).pipe(
      switchMap((table) => {
        if (table) {
          table.specificData = specificData;
          return this.updateTable(table);
        } else {
          throw new Error(`Table with id ${idTable} not found.`);
        }
      })
    );
  }


  getTable(id: number): Observable<Table | undefined> {
    return from(this.indexedDbService.get("tables", id)).pipe(
      map((result: any | undefined) => (isTable(result) ? result : undefined))
    );
  }

  getAllTables(): Observable<Table[]> {
    return from(this.indexedDbService.getAll("tables")).pipe(
      map((results: any[]) => results.filter(isTable) as Table[])
    );
  }

  deleteTable(id: number): Observable<void> {
    return from(this.indexedDbService.delete("tables", id)).pipe(
      map(() => undefined)
    );
  }
}
