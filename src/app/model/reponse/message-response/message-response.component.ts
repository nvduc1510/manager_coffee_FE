import { Component } from '@angular/core';

@Component({
  selector: 'app-message-response',
  standalone: true,
  imports: [],
  templateUrl: './message-response.component.html',
  styleUrl: './message-response.component.css'
})
export class MessageResponseComponent {
  code!: string;
  params!: string[] | string;
}
