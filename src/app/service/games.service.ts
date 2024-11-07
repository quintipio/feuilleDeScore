import { Injectable } from '@angular/core';
import { Game, GameExisting, isGame } from '../models/game.model';
import { IndexedDbService } from './indexedDb.service';
import { firstValueFrom, from, map, Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GameService {

  constructor(private indexedDbService: IndexedDbService) {}

  async initializeGames(): Promise<void> {
    for (const game of GameExisting) {
      const existingGame = await this.findGameByUuid(game.uuid!);
      if (!existingGame) {
        await this.addGame(game).toPromise();
      }
    }
  }

  private getHighestId(): Promise<number> {
    return this.indexedDbService.getAll("games").then(items => {
      const highestId = items.reduce((maxId, item) => {
        return item.id > maxId ? item.id : maxId;
      }, 0);
      return highestId + 1;
    });
  }

  addGame(game: Game): Observable<void> {
    return from(this.getHighestId()).pipe(
      switchMap((newId) => {
        if(game.id !== 0){
          game.id = newId;
        }
        return from(this.indexedDbService.add("games", game));
      }),
      map(() => undefined)
    );
  }

  getGame(id: number): Observable<Game | undefined> {
    return from(this.indexedDbService.get("games", id)).pipe(
      map((result: any | undefined) => (isGame(result) ? result : undefined))
    );
  }

  getAllGames(): Observable<Game[]> {
    return from(this.indexedDbService.getAll("games")).pipe(
      map((results: any[]) => results.filter(isGame) as Game[])
    );
  }

  updateGame(game: Game): Observable<void> {
    return from(this.indexedDbService.update("games", game)).pipe(
      map(() => undefined)
    );
  }

  deleteGame(id: number): Observable<void> {
    return from(this.indexedDbService.delete("games", id)).pipe(
      map(() => undefined)
    );
  }

  private async findGameByUuid(uuid: string): Promise<Game | undefined> {
    const games = await firstValueFrom(this.getAllGames());
    return games.find(game => game.uuid === uuid);
  }
}
