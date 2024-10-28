import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private gamesUrl = 'data/games.json';

  private gamesSubject = new BehaviorSubject<Game[]>([]);
  games$ = this.gamesSubject.asObservable();

  private games: Game[] = [];

  constructor(private http: HttpClient) {
    this.loadGamesFromJson();
  }

  private loadGamesFromJson(): void {
    this.http.get<Game[]>(this.gamesUrl).subscribe(
      (data: Game[]) => {
        this.games = data;
        this.gamesSubject.next(this.games);
      },
      (error) => {
        console.error('Error loading games:', error);
      }
    );
  }

  getGames(): Observable<Game[]> {
    return this.gamesSubject.asObservable();
  }

  addGame(newGame:Game): void {
    newGame.id = this.games.length > 0 ? Math.max(...this.games.map(u => u.id)) + 1 : 1;
    this.games.push(newGame);
    this.gamesSubject.next(this.games);
    console.log(this.games);
  }

  updateGame(updatedGame: Game): boolean {
    const index = this.games.findIndex(game => game.id === updatedGame.id);
    if (index !== -1) {
      this.games[index] = updatedGame;
      this.gamesSubject.next(this.games);
      console.log(this.games);
      return true;
    }
    return false;
  }

  deleteGame(id: number): boolean {
    const index = this.games.findIndex(game => game.id === id);
    if (index !== -1) {
      this.games.splice(index, 1);
      this.gamesSubject.next(this.games);
      return true;
    }
    return false;
  }
}
