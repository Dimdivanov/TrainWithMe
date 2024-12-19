import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  providers: [ToastrService],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css',
})
export class ToasterComponent {
  constructor(private toastr: ToastrService) {}
  
  showTopRightToast() {
    this.toastr.show('This is a top-right toast', 'Toast Title', {
      positionClass: 'toast-top-right',
    });
  }

  showTopLeftToast() {
    this.toastr.show('This is a top-left toast', 'Toast Title', {
      positionClass: 'toast-top-left',
    });
  }
}
