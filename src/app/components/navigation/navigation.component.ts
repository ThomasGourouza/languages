import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  public items: MenuItem[];
  private start: boolean;

  constructor(
    private confirmationService: ConfirmationService,
    private gameService: GameService,
    private router: Router
  ) {
    this.start = false;
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', command: () => { this.onleavePage('/home'); } },
      { label: 'Dictionary', icon: 'pi pi-fw pi-book', command: () => { this.onleavePage('/dictionary'); } },
      { label: 'Play', icon: 'pi pi-fw pi-play', routerLink: '/game' },
      { label: 'Swadesh lists', icon: 'pi pi-fw pi-list', routerLink: '/swadesh' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog', command: () => { this.onleavePage('/settings'); } }
    ];
  }

  ngOnInit(): void {
    this.gameService.start$.subscribe((start) => {
      this.start = start;
    });
  }

  public onleavePage(path: string): void {
    if (this.router.url === '/game' && this.start) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to quit the game ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.gameService.setStart$(false);
          this.router.navigateByUrl(path);
        }
      });
    } else {
      this.router.navigateByUrl(path);
    }
  }

}
