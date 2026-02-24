import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-consulta-usuarios',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './consulta-usuarios.html',
	styleUrl: './consulta-usuarios.css',
})
export class ConsultaUsuarios {
	protected datosTabla = [
		{
			nombre: 'neitan',
			numero_telefono: '7293479153',
			correo: 'neitan616',
			puesto: 'practicante',
			activo: '1'
		},

		{
			nombre: 'fabi',
			numero_telefono: '7297494501',
			correo: 'chakalita13',
			puesto: 'Ingeniera',
			activo: '1'
		},

		{
			nombre: 'karen',
			numero_telefono: '7127301829',
			correo: 'karen16',
			puesto: 'practicante',
			activo: '1'
		},

		{
			nombre: 'Adrian',
			numero_telefono: '7293912457',
			correo: 'fornite15',
			puesto: 'Ingeniero',
			activo: '1'
		}
	]
}