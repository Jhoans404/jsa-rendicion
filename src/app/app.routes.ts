import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { PlanillaViaticos } from './planilla-viaticos/planilla-viaticos';
import { PapeletaComision } from './papeleta-comision/papeleta-comision';
import { RendicionCuentas } from './rendicion-cuentas/rendicion-cuentas';
import { ConsultaRendiciones } from './consulta-rendiciones/consulta-rendiciones';
import { AcercaDe } from './acerca-de/acerca-de';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio, title: 'Inicio' },
  { path: 'planilla', component: PlanillaViaticos, title: 'Planilla de Viaticos' },
  { path: 'papeleta', component: PapeletaComision, title: 'Papeleta de Comision' },
  { path: 'rendicion', component: RendicionCuentas, title: 'Rendicion de Cuentas' },
  { path: 'consulta', component: ConsultaRendiciones, title: 'Consulta de Rendiciones' },
  { path: 'acerca', component: AcercaDe, title: 'Acerca de' },
  { path: '**', redirectTo: 'inicio' }
];
