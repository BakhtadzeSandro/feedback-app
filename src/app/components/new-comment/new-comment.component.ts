import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent {
  @Output() addComment = new EventEmitter<string>();
  newComment = new FormControl();
  maxCharacters = 250;
  charactersRemaining = 250;
  checkInputLength() {
    this.charactersRemaining =
      this.maxCharacters - this.newComment.value.length;
  }

  postComment() {
    this.addComment.emit(this.newComment.value);
    this.newComment.setValue('');
  }
}
