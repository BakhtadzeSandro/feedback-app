import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestions-page',
  templateUrl: './suggestions-page.component.html',
  styleUrls: ['./suggestions-page.component.scss'],
})
export class SuggestionsPageComponent {
  category: string = '';
  dataLength: number | undefined;
  sortOption: string | undefined;

  categoryFilterEventHandler(category: string) {
    this.category = category.toLocaleLowerCase();
  }

  dataLengthHandler(dataLength: number) {
    this.dataLength = dataLength;
  }

  sortOptionHandler(sortOption: string) {
    this.sortOption = sortOption;
  }
}
