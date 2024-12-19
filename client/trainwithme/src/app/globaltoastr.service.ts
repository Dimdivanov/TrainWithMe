import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GlobalToastrService {
  constructor(private toastr: ToastrService) {}

  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title, {
      positionClass: 'toast-top-right',
    });
  }

  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title, {
      positionClass: 'toast-top-right',
    });
  }

  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title, {
      positionClass: 'toast-top-right',
    });
  }

  showWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title, {
      positionClass: 'toast-top-right',
    });
  }
}
