import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductRequest } from '../../models/requests.model';
import { ApiService } from 'src/app/services/api.service';
import { SortOptions } from 'src/app/models/request.enum';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { getTotalCommentCount } from 'src/app/utils/helper.fn';

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: ['./product-request.component.scss'],
})
export class ProductRequestComponent implements OnChanges {
  @Input() category: string = '';
  @Input() sortOption: string | undefined = 'Most Upvotes';
  @Input() singleMode = false;
  @Output() suggestedProductsLength = new EventEmitter<number>();
  productRequests$: Observable<ProductRequest[]> | undefined;
  hasProductRequests: boolean | undefined;
  startIndex = 0;
  endIndex = 6;
  pageIndex: number | undefined;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnChanges() {
    this.getInitialProductRequests();
  }

  getInitialProductRequests() {
    this.productRequests$ = this.apiService
      .getSuggestedProductRequests(this.category)
      .pipe(
        map((productRequests: ProductRequest[]) => {
          this.hasProductRequests = productRequests.length > 0;
          if (this.category !== '' && this.category !== 'all') {
            this.startIndex = 0;
            this.endIndex = 6;
            this.pageIndex = 0;
          }

          this.suggestedProductsLength.emit(productRequests.length);
          switch (this.sortOption) {
            case SortOptions.MOST_UPVOTES:
              productRequests.sort((a, b) => b.upvotes - a.upvotes);
              break;
            case SortOptions.LEAST_UPVOTES:
              productRequests.sort((a, b) => a.upvotes - b.upvotes);
              break;
            default:
              productRequests.sort((a, b) => b.upvotes - a.upvotes);
          }
          return productRequests.map((productRequest) => ({
            ...productRequest,
            totalCommentCount: getTotalCommentCount(productRequest.comments),
          }));
        })
      );
  }

  updateVotesHandler(item: ProductRequest) {
    this.apiService.updateUpvotes(item.id, item.upvotes + 1).subscribe();
    this.getInitialProductRequests();
  }

  handlePageEvent(e: PageEvent) {
    this.startIndex = e.pageIndex * e.pageSize;
    this.endIndex = this.startIndex + e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
