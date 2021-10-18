import { Component, OnInit } from '@angular/core';
import { SettingsService } from './service/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'deutsch';

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settingsService.init$();
  }

}
