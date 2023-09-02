import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRequest } from 'src/app/models/requests.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-side-settings',
  templateUrl: './side-settings.component.html',
  styleUrls: ['./side-settings.component.scss'],
})
export class SideSettingsComponent implements OnInit {
  @Output() categoryFilterEvent = new EventEmitter<string>();
  filterOptions: string[] = [
    'All',
    'UI',
    'UX',
    'Enhancement',
    'Bug',
    'Feature',
  ];

  statuses$: Observable<{ status: string; length: number }[]> | undefined;

  selectedFilter: string = 'All';

  constructor(private apiService: ApiService) {}

  updateFilter(option: string) {
    this.selectedFilter = option;
    this.categoryFilterEvent.emit(option);
  }

  switchColorOfStatuses(status: string) {
    if (status == 'planned') {
      return 'planned-status';
    } else if (status == 'in-progress') {
      return 'in-progress-status';
    } else if (status == 'live') {
      return 'live-status';
    } else {
      return 'no-status';
    }
  }

  ngOnInit() {
    this.statuses$ = this.apiService.getNonSuggestedProductsInformation();
  }
}
