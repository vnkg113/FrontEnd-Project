import { Component, EventEmitter, Output, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service'
import { ProductService } from '../../../shared/services/product.service'
import { OverlayContainer } from '@angular/cdk/overlay';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  userProfile;
  defaultTheme: boolean = true;
  constructor(private router: Router,
    private authService: AuthService,
    public productService: ProductService,
    public overlayContainer: OverlayContainer
  ) { }
  @HostBinding('class') componentCssClass;
  logout() {
    this.authService.doLogout();
    this.router.navigate(['login']);
  }

ngOnInit(){
  this.userProfile = this.authService.getLoggedInUser();
}
  onSetTheme(theme) {
    //check dark theme
    if (this.overlayContainer.getContainerElement().classList.contains('dark-theme'))
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
    //check purple theme
    else if (this.overlayContainer.getContainerElement().classList.contains('purple-theme'))
      this.overlayContainer.getContainerElement().classList.remove('purple-theme');
    //check red theme
    else if (this.overlayContainer.getContainerElement().classList.contains('red-theme'))
      this.overlayContainer.getContainerElement().classList.remove('red-theme');
    //check blue theme
    else if (this.overlayContainer.getContainerElement().classList.contains('blue-theme'))
      this.overlayContainer.getContainerElement().classList.remove('blue-theme');
    //check green theme
    else if (this.overlayContainer.getContainerElement().classList.contains('green-theme'))
      this.overlayContainer.getContainerElement().classList.remove('green-theme');
    //check teal theme
    else if (this.overlayContainer.getContainerElement().classList.contains('teal-theme'))
      this.overlayContainer.getContainerElement().classList.remove('teal-theme');
      this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

}
