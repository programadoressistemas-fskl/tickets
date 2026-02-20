import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class MessagesService {
	private mensajeError500: string = 'Al parecer ocurrió un error interno, porfavor contactarse con el DTIC de Faske Industrial';

	public mensajeEsperar() {
		Swal.fire({
			allowOutsideClick: false,
			text: 'Espere un momento...',
			icon: 'info',
			title: '',
			confirmButtonText: 'Cool',
			keyboard: false,
			allowEscapeKey: false
		} as any);

		Swal.showLoading();

		document.body.style.paddingRight = '';
	}

	public mensajeGenerico(mensaje: string, tipo: string, title: string = '', html: any = null, width: any = null){
		mensaje = mensaje == 'error' ? this.mensajeError500 : mensaje;
		const data: any = {
			title,
			allowOutsideClick: false, 
			icon: tipo,
			html: mensaje,
			confirmButtonText: 'Continuar',
			buttonStyling: false, 
			customClass: {
				confirmButton: 'btn btn-sm btn-primary',
				popup: width != null ? 'popup-custom': ''
			},
			keyboard: false,
			allowEscapeKey: false
		};

		if (html) data['html'] = html;

		Swal.fire(data);

		document.body.style.paddingRight = '';
	} 

	public cerrarMensajes(){
		Swal.close();
		document.body.style.paddingRight = '';
	}
}
