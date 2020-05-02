import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  success(message: string, delay: number = 3000) {
    this.show(message, {
      className: 'bg-success text-light',
      delay,
    });
  }

  warning(message: string, delay: number = 3000) {
    this.show(message, {
      className: 'bg-warning text-light',
      delay,
    });
  }

  danger(message: string, delay: number = 3000) {
    this.show(message, {
      className: 'bg-danger text-light',
      delay,
    });
  }
}
