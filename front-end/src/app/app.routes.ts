import { Routes } from '@angular/router';
import { Home } from './admin/home/home';
import { Login } from './auth/login/login';
import { ConsultaUsuarios } from './admin/modules/usuarios/consulta-usuarios/consulta-usuarios';
import { ConsultaAreas } from './admin/modules/catalogos/areas/consulta-areas/consulta-areas';

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
			}
		]
	}
];
