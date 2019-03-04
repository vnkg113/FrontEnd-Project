import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service'
interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  resourceRoutes: ROUTE[] = [
    {
      icon: 'account_balance',
      route: '/products/all-products',
      title: 'Products',
    },
    {
      icon: 'favorite',
      route: '/products/favourite-products',
      title: 'My Wish List',
    },
    {
      icon: 'shopping_cart',
      route: '/products/cart-items',
      title: 'My Cart',
    }
  ];

  manageRoutes: ROUTE[] = [
    {
      icon: 'assignment',
      route: 'manage/cellphone',
      title: 'Cellphones',
    }, {
      icon: 'perm_identity',
      route: 'resource/brands',
      title: 'Brands',
    }
  ];

  constructor(private authService: AuthService) { }

}
