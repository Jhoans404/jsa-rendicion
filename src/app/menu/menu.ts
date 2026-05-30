import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  navItems = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Planilla', route: '/planilla' },
    { label: 'Papeleta', route: '/papeleta' },
    { label: 'Rendicion', route: '/rendicion' },
    { label: 'Consulta', route: '/consulta' },
    { label: 'Acerca', route: '/acerca' }
  ];
}
