import { Component, inject } from '@angular/core';
import { Table } from '../../models/table.model';
import { TableService } from '../../service/table.service';
import { ActivatedRoute } from '@angular/router';
import { CountRoundRow } from '../../models/sheet';


@Component({
    selector: 'app-historic',
    imports: [],
    templateUrl: './historic.component.html',
    styleUrl: './historic.component.css'
})
export class HistoricComponent {

  private tableService = inject(TableService);
  table: Table | undefined;
  historic: Record<string, CountRoundRow[]> = {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.table?.game?.mancheLimite
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      if (idTable) {
        this.tableService.getTable(idTable).subscribe({
          next: (table: Table | undefined) => {
            if (table) {
              this.historic = table.historic
              this.table = table;
            }
          },
          error: (error) => {
            console.error("Error fetching table:", error);
          }
        });
      }
    });
  }

  get sortedDates(): string[] {
    return Object.keys(this.historic).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }

  formatDate(key: string): string {
    const [datePart, timePart] = key.split('/');
    const day = datePart.slice(0, 2);
    const month = datePart.slice(2, 4);
    const year = datePart.slice(4, 8);
    const [hours, minutes, seconds] = timePart.split(':');

    return `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
  }

  trackByPosition(index: number, winner: CountRoundRow): number {
    return winner.user.position;
  }
}
