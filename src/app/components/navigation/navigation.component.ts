import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  dockItems: MenuItem[];

  constructor() {
    this.dockItems = [
      {
        label: 'Finder',
        icon: "assets/showcase/images/dock/finder.svg"
      },
      {
        label: 'App Store',
        icon: "assets/showcase/images/dock/appstore.svg"
      },
      {
        label: 'Photos',
        icon: "assets/showcase/images/dock/photos.svg"
      },
      {
        label: 'Trash',
        icon: "assets/showcase/images/dock/trash.png"
      }
    ];
  }

}
