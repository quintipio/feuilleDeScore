import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Game } from '../models/game.model';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  isCreateTable: boolean = false;
  private gamesUrl = 'data/games.json';

  private gamesSubject = new BehaviorSubject<Game[]>([]);
  games$ = this.gamesSubject.asObservable();

  private games: Game[] = [];

  constructor(private http: HttpClient,private route: ActivatedRoute) {
    this.loadGamesFromJson();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isCreateTable = params['isCreateTable'] === 'true';
    });
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

  addGame(newGame: Omit<Game, 'id'>): void {
    const newId = this.games.length > 0 ? Math.max(...this.games.map(u => u.id)) + 1 : 1;
    const newGameWithId: Game = { id: newId, ...newGame };
    this.games.push(newGameWithId);
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
