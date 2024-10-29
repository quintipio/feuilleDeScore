import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Game } from '../../models/game.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-config-game',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './config-game.component.html',
  styleUrl: './config-game.component.css'
})
export class ConfigGameComponent {

  @Input()isModif = false;
  @Input() labelModal = "";
  @Output() gameValidated = new EventEmitter<Game>();

  editGameConditionWinScoreEleve: boolean = true;
  gameSelectedId = 0;
  gameForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(50)]),
    mancheLimite: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]),
    pointLimite: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')])
  });


  initializeGame(gameToModif: Game | undefined) {
    if(gameToModif) {
      this.editGameConditionWinScoreEleve = gameToModif.scorePlusEleve;
      this.gameForm.patchValue({ name: gameToModif.name, mancheLimite: gameToModif.mancheLimite.toString(), pointLimite: gameToModif.scoreLimite.toString() });
      this.gameSelectedId = gameToModif.id;
    } else {
      this.gameForm.patchValue({ name: "", mancheLimite: "0", pointLimite: "0" });
      this.gameSelectedId = 0;
      this.editGameConditionWinScoreEleve = true;
    }
  }

  changeConditionWin(scoreEleve: boolean) {
    this.editGameConditionWinScoreEleve = scoreEleve;
  }

  validateFormGame(): void {
      const gameToSend : Game = {
        id: this.gameSelectedId,
        name: '',
        scorePlusEleve: this.editGameConditionWinScoreEleve,
        scoreLimite: 0,
        mancheLimite: 0,
        sheet: "generic"
      };
      if(this.gameForm.value.name) {
        gameToSend.name = this.gameForm.value.name;
      }

      if(this.gameForm.value.pointLimite) {
        gameToSend.scoreLimite = Number.parseInt(this.gameForm.value.pointLimite);
      }

      if(this.gameForm.value.mancheLimite) {
        gameToSend.mancheLimite = Number.parseInt(this.gameForm.value.mancheLimite);
      }

      this.gameValidated.emit(gameToSend);
  }
}
