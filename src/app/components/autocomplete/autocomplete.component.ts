
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-autocomplete',
    imports: [ReactiveFormsModule],
    templateUrl: './autocomplete.component.html',
    styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {

  @Input() name:string = "";
  @Input() placeholder: string = "";
  @Input() liste: string[] = [];
  @Input() class: string = "";

  @Output() seletedElement: EventEmitter<string> = new EventEmitter<string>();



  typeahead: FormControl = new FormControl();
  suggestions: string[] = [];


  suggest() {
      var saisie = this.typeahead.value as string;
      saisie = this.removeAccents(saisie.toLowerCase());
      this.suggestions = this.liste
        .filter(c => this.removeAccents(c.toLowerCase()).startsWith(saisie))
        .slice(0, 3);
  }

  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  selectElement(element: string){
    this.typeahead.setValue(element);
    this.suggestions = [];
    this.seletedElement.emit(element);
  }

  reinit(value : string){
    this.typeahead.setValue(value);
  }
}
