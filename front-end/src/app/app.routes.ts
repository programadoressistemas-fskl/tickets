import { Routes } from '@angular/router';
import { Home } from './admin/home/home';
import { Login } from './auth/login/login';
import { ConsultaUsuarios } from './admin/modules/usuarios/consulta-usuarios/consulta-usuarios';
import { ConsultaAreas } from './admin/modules/catalogos/areas/consulta-areas/consulta-areas';
import { ConsultaPlantas } from './admin/modules/catalogos/plantas/consulta-plantas/consulta-plantas';
import { ConsultaTiposServicio } from './admin/modules/catalogos/tipo-servicio/consulta-tipos-servicio/consulta-tipos-servicio';
import { ConsultaTurnos } from './admin/modules/catalogos/turnos/consulta-turnos/consulta-turnos';
import { ConsultaTickets } from './admin/modules/tickets/consulta-tickets/consulta-tickets';

export const AppRoutes: Routes = [
	{
		path: 'login',
		component: Login
	},
	{
		path: '',
		component: Home,
		children: [
			{
				path: 'consulta-usuarios',
				component: ConsultaUsuarios
			},

			{
				path: 'consulta-areas',
				component: ConsultaAreas
			},

			{
				path: 'consulta-plantas',
				component: ConsultaPlantas
			},

			{
				path: 'consulta-turnos',
				component: ConsultaTurnos
			},

			{
				path: 'consultar-tipo-servicio',
				component: ConsultaTiposServicio
			},

			{
				path: 'consulta-tickets',
				component: ConsultaTickets
			}
		]
	}
];
