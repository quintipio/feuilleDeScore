import { Component, inject } from '@angular/core';
import { Table } from '../../models/table.model';
import { TableService } from '../../service/table.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generic-sheet',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './generic-sheet.component.html',
  styleUrl: './generic-sheet.component.css'
})
export class GenericSheetComponent {

  private tableService = inject(TableService);
  table : Table | undefined;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      console.log("COUCOU"+idTable);
      if (idTable) {
        this.tableService.getTable(idTable).subscribe(table => {
          this.table = table;
          console.log(this.table?.game?.name);
        });
      }
    });
  }

}
