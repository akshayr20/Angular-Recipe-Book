import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() selectedFeature = new EventEmitter<string>();
  constructor() {}

  onSelect(feature: string) {
    this.selectedFeature.emit(feature);
  }
}
