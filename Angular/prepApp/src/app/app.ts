import { Component, signal } from '@angular/core';
  import { CustomEventManager } from '../components/event-manager-plugin/custom-event-manager';

@Component({
  selector: 'app-root',
  imports: [CustomEventManager],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('prepApp');
}
