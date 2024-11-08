import { Component, inject, Inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { GameService } from './service/games.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Feuille de score';

  private gameService = inject(GameService);

  ngOnInit(): void {
    this.gameService.initializeGames()
      .then(() => console.log("Vérification et initialisation des jeux terminée."))
      .catch(error => console.error("Erreur lors de l'initialisation des jeux :", error));
  }
}
