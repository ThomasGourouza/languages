import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  public items: MenuItem[];

  constructor() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'Dictionary', icon: 'pi pi-fw pi-book', routerLink: '/dictionary' },
      { label: 'Play', icon: 'pi pi-fw pi-play', routerLink: '/game' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' }
    ];
  }

  ngOnInit() { }

}
