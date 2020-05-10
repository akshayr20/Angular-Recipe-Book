import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsContainer } from './toast/toasts-container.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ToastsContainer, LoadingSpinnerComponent],
  exports: [ToastsContainer, LoadingSpinnerComponent],
  imports: [CommonModule, NgbModule],
})
export class SharedModule {}
