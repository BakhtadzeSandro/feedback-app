import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions-header',
  templateUrl: './suggestions-header.component.html',
  styleUrls: ['./suggestions-header.component.scss'],
})
export class SuggestionsHeaderComponent {
  @Input() dataLength: number | undefined = 0;
  @Input() onSuggestionsPage = true;
  @Output() sortOption = new EventEmitter<string>();
  chosenSortOption = 'Most Upvotes';
  sortOptions = ['Most Upvotes', 'Least Upvotes'];

  constructor(private router: Router) {}

  chooseSortOption(option: string) {
    this.chosenSortOption = option;
    this.sortOption.emit(option);
  }

  goToAddFeedbackPage() {
    this.router.navigate(['add-feedback', 0]);
  }
}
