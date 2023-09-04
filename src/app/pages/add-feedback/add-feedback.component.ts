import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Form,
  NewFeedback,
  changedProduct,
} from 'src/app/models/requests.model';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isEqual } from 'lodash';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss'],
})
export class AddFeedbackComponent implements OnInit {
  public form: FormGroup<Form> = this.fb.group<Form>({
    title: this.fb.control('', [Validators.required]),
    category: this.fb.control('', [Validators.required]),
    // status: this.fb.control('', [Validators.required]),
    feedbackDetails: this.fb.control('', [Validators.required]),
  });
  currentProductId = 0;
  currentProduct = {};
  categoryOptions = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];
  statusOptions = ['Suggestion', 'Planned', 'In-Progress', 'Live'];
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  openSnackBar() {
    this._snackBar.open('You did not make any changes', 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  capitalizeFirstLetter(word: string) {
    if (word == 'ui' || word == 'ux') {
      return word.toUpperCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentProductId = params['id'];
    });
    if (this.currentProductId > 0) {
      this.editMode = true;
      this.form.addControl(
        'status',
        this.fb.control('', [Validators.required])
      );
      this.apiService
        .getSingleProductRequest(this.currentProductId)
        .subscribe((productRequest) => {
          this.currentProduct = {
            title: productRequest.title,
            category: this.capitalizeFirstLetter(productRequest.category),
            status: this.capitalizeFirstLetter(productRequest.status),
            feedbackDetails: productRequest.description,
          };
          return (this.form = this.fb.group<Form>({
            title: this.fb.control(productRequest.title, [Validators.required]),
            category: this.fb.control(
              this.capitalizeFirstLetter(productRequest.category),
              [Validators.required]
            ),
            status: this.fb.control(
              this.capitalizeFirstLetter(productRequest.status),
              [Validators.required]
            ),
            feedbackDetails: this.fb.control(productRequest.description, [
              Validators.required,
            ]),
          }));
        });
    }
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService
          .deleteProductRequest(this.currentProductId)
          .subscribe(() => this.router.navigate(['']));
      }
    });
  }

  handleSubmission() {
    if (!this.editMode) {
      const title = this.form.value.title;
      const category = this.form.value.category?.toLocaleLowerCase();
      const description = this.form.value.feedbackDetails;
      if (title && category && description) {
        const newFeedbackToSend: NewFeedback = {
          title,
          category,
          upvotes: 0,
          status: 'suggestion',
          description,
          comments: [],
        };
        this.apiService.addNewFeedback(newFeedbackToSend).subscribe(() => {
          this.router.navigate(['']);
        });
      }
    } else {
      if (isEqual(this.currentProduct, this.form.value)) {
        this.openSnackBar();
      } else {
        const changedProduct: changedProduct = {
          title: this.form.value.title,
          category: this.form.value.category,
          status: this.form.value.status,
          feedbackDetails: this.form.value.feedbackDetails,
        };
        this.apiService
          .editProductRequest(this.currentProductId, changedProduct)
          .subscribe(() => this.router.navigate(['']));
        this.editMode = false;
      }
    }
  }
}
