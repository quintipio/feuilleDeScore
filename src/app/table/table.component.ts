import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableService } from '../service/table.service';
import { Table } from '../models/table.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  private tableService = inject(TableService);

  tables:Table[] = [];

  ngOnInit(){
    this.loadTables();
  }

  loadTables(){
    this.tableService.tables$.subscribe((data: Table[]) => {
      this.tables = data;
    });
  }
}
