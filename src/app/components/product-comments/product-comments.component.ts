import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductRequest, Comment, User } from 'src/app/models/requests.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.scss'],
})
export class ProductCommentsComponent implements OnInit {
  @Input() singleProductRequest: ProductRequest | undefined;
  @Input() currentUser: User | undefined;
  newReply = new FormControl();
  maxCharacters = 250;
  charactersRemaining = 250;
  gettingReplied = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    console.log(this.singleProductRequest);
  }

  checkInputLength() {
    this.charactersRemaining = this.maxCharacters - this.newReply.value.length;
  }

  postReply() {
    console.log('test');
  }
}
