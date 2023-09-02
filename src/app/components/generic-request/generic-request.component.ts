import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductRequest } from 'src/app/models/requests.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-generic-request',
  templateUrl: './generic-request.component.html',
  styleUrls: ['./generic-request.component.scss'],
})
export class GenericRequestComponent {
  @Input() item: ProductRequest | undefined;
  @Output() updateVotes = new EventEmitter<ProductRequest>();

  constructor(private router: Router, private apiService: ApiService) {}

  goToSingleFeedback(feedback: ProductRequest) {
    this.router.navigate(['feedback', feedback.id]);
  }

  updateUpvotes(item: ProductRequest) {
    this.updateVotes.emit(item);
  }
}
