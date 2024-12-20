import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMousehover]',
  standalone: true,
})
export class MousehoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.applyHoverEffect();
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.removeHoverEffect();
  }

  private applyHoverEffect() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.05)');
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      'rgba(0, 0, 0, 0.2) 0px 8px 15px'
    );
  }
  private removeHoverEffect() {
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
  }
}
