import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { Select } from 'primeng/select';

type City = {
  name: string;
  code: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [ButtonDirective, FormsModule, Select]
})
export class App {
  protected readonly cities: City[] = [
    { name: 'Mumbai', code: 'MUM' },
    { name: 'Delhi', code: 'DEL' },
    { name: 'Bengaluru', code: 'BLR' },
    { name: 'Hyderabad', code: 'HYD' },
    { name: 'Chennai', code: 'CHE' },
  ];

  protected readonly selectedCity = signal<City | null>(null);
}
