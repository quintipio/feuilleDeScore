import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Game } from '../../models/game.model';
import { CommonModule } from '@angular/common';
import { SkullKingConfigComponent } from './spec/skull-king-config/skull-king-config.component';

@Component({
  selector: 'app-config-game',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SkullKingConfigComponent ],
  templateUrl: './config-game.component.html',
  styleUrl: './config-game.component.css'
})
export class ConfigGameComponent {


  @ViewChild(SkullKingConfigComponent) skullKingConfigComponent: SkullKingConfigComponent | undefined;

  @Input()isModif = false;
  @Input() labelModal = "";
  @Output() gameValidated = new EventEmitter<Game>();

  editGameConditionWinScoreEleve: boolean = true;
  gameReceived: Game | undefined;
  conditionSpecificConf = true;
  gameForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(50)]),
    mancheLimite: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]),
    pointLimite: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]),
    scoreNegatif: new FormControl(false),
  });

  isScoreMaxEmpty(){
    return this.gameForm.value.pointLimite && Number.parseInt(this.gameForm.value.pointLimite) > 0;
  }

  ngOnInit(){
    this.gameReceived = {
      id: 0,
      name: '',
      uuid: undefined,
      scorePlusEleve: true,
      scoreLimite: 0,
      mancheLimite: 0,
      scoreNegatif : false,
      canEdit :true,
      minJoueur: undefined,
      maxJoueur: undefined,
      sheet: "generic",
      specificConf: ""
    };
  }

  initializeGame(gameToModif: Game | undefined) {
    if(gameToModif) {
      this.gameReceived = gameToModif;
      this.editGameConditionWinScoreEleve = gameToModif.scorePlusEleve;
      this.gameForm.patchValue({ name: gameToModif.name, mancheLimite: gameToModif.mancheLimite.toString(),
         pointLimite: gameToModif.scoreLimite.toString(), scoreNegatif : gameToModif.scoreNegatif });
    } else {
      this.gameForm.patchValue({ name: "", mancheLimite: "0", pointLimite: "0", scoreNegatif: false });
      this.editGameConditionWinScoreEleve = true;
    }


  }

  changeConditionWin(scoreEleve: boolean) {
    this.editGameConditionWinScoreEleve = scoreEleve;
  }

  validateFormGame(): void {
      const gameToSend : Game = {
        id: this.gameReceived!.id,
        uuid: this.gameReceived?.uuid,
        name: '',
        scorePlusEleve: this.editGameConditionWinScoreEleve,
        scoreLimite: 0,
        mancheLimite: 0,
        scoreNegatif : false,
        canEdit :true,
        minJoueur: this.gameReceived?.minJoueur,
        maxJoueur: this.gameReceived?.maxJoueur,
        sheet: this.gameReceived!.sheet,
        specificConf: this.gameReceived!.specificConf
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

      if(this.gameForm.value.scoreNegatif){
        gameToSend.scoreNegatif = (gameToSend.scoreLimite == 0)?false:this.gameForm.value.scoreNegatif;
      }
      this.gameValidated.emit(gameToSend);
  }


  /** CONFIG SPECIFIQUE */
  getSpecificConf(specificConf : string){
    this.gameReceived!.specificConf = specificConf;
  }

  getvalidator(isOk : boolean){
    this.conditionSpecificConf = isOk;
  }
}
