import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import FGenerico from '../../../shared/util/funciones-genericas';
import { NgModel } from '@angular/forms';

@Component({
	selector: 'app-datatable',
	standalone: true,
	imports: [NgModel],
	templateUrl: './datatable.html',
	styleUrl: './datatable.css',
})
export class Datatable extends FGenerico implements OnInit, OnChanges{
	@Input() columnasTabla: any = [];
	@Input() datosTabla: any = [];
	@Input() tableConfig: any = [];
	@Input() tableType: string = 'static';
	@Input() textSinInfo: string = 'Sin información';
	@Input() selectRow: boolean = false;
	@Input() rowValue: string = '';
	@Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() actionSelected: EventEmitter<any> = new EventEmitter<any>();

	protected selectedCheckboxes: Array<{ pk: number, status: boolean }> = [];

	public currentPage: number = 1;
	public itemsPerPageOptions = [5, 10, 25, 50];
	public itemsPerPage = this.itemsPerPageOptions[0];

	public sortBy: string = '';
	public sortDesc: boolean = false;

	public filterValues: { [key: string]: string } = {};
	public registrosBusqueda = this.datosTabla;

	constructor(private cdRef: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
		this.selectedCheckboxes = [];
		this.emitirDatos();
		Object.keys(this.columnasTabla).forEach(key => this.filterValues[key] = '');
		this.limpiarFiltros();
	}

	ngOnChanges(): void {
		this.selectedCheckboxes = [];
		Object.keys(this.columnasTabla).forEach((key) => {
			if (this.tableConfig[key]?.selectColumn) {
				const columnData = this.datosTabla.map((item: any) => item[key]);
				this.tableConfig[key].selectOptions = Array.from(new Set(columnData)).map((value: any) => ({
					value: value,
					label: value == null ? 'Sin información' : value,
					checked: false
				}));

				if (this.tableConfig[key]?.preSelects) {
					this.tableConfig[key].selectOptions.forEach((poblacion: any) => {
						poblacion.checked = this.tableConfig[key]?.preSelects.split(',').includes(poblacion.value);
					});
				}
			}
		});
		this.emitirDatos();
		this.onItemsPerPageChange();
		this.order(this.sortBy);
	}

	get canSeeInfo() {
		const keys = Object.keys(this.tableConfig);
		const noPreSelects = keys.every(key => !this.tableConfig[key].hasOwnProperty("preSelects"));
		if (noPreSelects) return true;
		return keys.some(key =>
			this.tableConfig[key]?.preSelects &&
			this.tableConfig[key].selectOptions?.some((opt: any) => opt.checked)
		);
	}

	protected abrirOpcionesTelefono(telefono: string): void {
		telefono = telefono.replace(/[^\d]/g, '');
		if (telefono.length !== 10) return;

		Swal.fire({
			allowOutsideClick: false,
			title: "¿Que quieres hacer?",
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: "Llamar",
			denyButtonText: 'Enviar WhatsApp',
			cancelButtonText: 'Cerrar',
			buttonsStyling: false,
			customClass: {
				confirmButton: 'order-1 btn btn-primary me-2',
				denyButton: 'order-2 btn btn-success me-2',
				cancelButton: 'order-3 btn btn-danger'
			},
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.href = `tel:${telefono}`;
			} else if (result.isDenied) {
				window.location.href = `whatsapp://send?phone=+152${telefono}`;
			}
		});
	}

	private getDateDb(dateString: string): Date | null {
		const parts = dateString.split('-');
		if (parts.length === 3) {
			const [year, month, day] = parts.map(Number);
			return new Date(year, month - 1, day);
		}
		return null;
	}

	private getDateInput(dateString: string): Date | null {
		return this.getDateDb(dateString);
	}

	get paginatedItems() {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;

		const datosMostrar = this.datosTabla.filter((registro: any) =>
			Object.keys(this.filterValues).every((column) => {
				const filter: any = this.filterValues[column];
				let value = registro[column.replace('_inicio', '').replace('_fin', '')];

				if (column.endsWith('_inicio') || column.endsWith('_fin')) {
					const baseColumn = column.replace('_inicio', '').replace('_fin', '');
					const startDate = this.getDateInput(this.filterValues[baseColumn + '_inicio'] ?? '');
					const endDate = this.getDateInput(this.filterValues[baseColumn + '_fin'] ?? '');
					value = this.tableConfig[baseColumn]?.dateSpForm ? value?.split(' ')[0] : value;
					const dateValue = this.getDateDb(value ?? '');
					if (startDate && endDate && dateValue) {
						return dateValue >= startDate && dateValue <= endDate;
					}
					return true;
				}

				if (!filter?.length) return true;
				if (this.tableConfig[column]?.showEmptyOption && filter.toLowerCase() === 'null') {
					return value === undefined || value === null || value === '';
				}
				if (this.tableConfig[column]?.selectColumn) {
					return filter.includes(value);
				}
				return this.formatString(value ?? '').includes(this.formatString(filter));
			})
		);

		this.registrosBusqueda = datosMostrar;
		return datosMostrar.slice(startIndex, endIndex);
	}

	get totalPages() {
		return Math.ceil(this.registrosBusqueda.length / this.itemsPerPage);
	}

	get pagesArray() {
		const visiblePages = 3;
		const half = Math.floor(visiblePages / 2);
		let start = Math.max(this.currentPage - half, 1);
		let end = start + visiblePages - 1;

		if (end > this.totalPages) {
			end = this.totalPages;
			start = Math.max(end - visiblePages + 1, 1);
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	}

	goToPage(page: number) {
		if (page >= 1 && page <= this.totalPages) {
			this.currentPage = page;
		}
	}

	onItemsPerPageChange() {
		if (this.tableType === 'static') this.currentPage = 1;
		this.itemsPerPage = Number(this.itemsPerPage);
		this.refreshViewData();
	}

	sortColumn(indice: string) {
		if (this.sortBy === indice) {
			this.sortDesc = !this.sortDesc;
		} else {
			this.sortBy = indice;
			this.sortDesc = false;
		}
		this.order(indice);
	}

	private order(indice: string): void {
		this.datosTabla.sort((a: any, b: any) => {
			const aVal = a[indice];
			const bVal = b[indice];

			if (typeof aVal === 'string' && typeof bVal === 'string') {
				return aVal.localeCompare(bVal, undefined, {
					numeric: true,
					sensitivity: 'base',
				}) * (this.sortDesc ? -1 : 1);
			}

			if (aVal < bVal) return this.sortDesc ? 1 : -1;
			if (aVal > bVal) return this.sortDesc ? -1 : 1;
			return 0;
		});
	}

	protected seleccionFila(data: any): void {
		if (!this.selectRow) return;
		this.selectedCheckboxes = [data];
		this.emitirDatos();
	}

	getColumnKeys(): string[] {
		return Object.keys(this.columnasTabla);
	}

	getStartIndex(): number {
		return (this.currentPage - 1) * this.itemsPerPage + 1;
	}

	getEndIndex(): number {
		const end = this.currentPage * this.itemsPerPage;
		return Math.min(end, this.datosTabla.length);
	}

	isCheckboxSelected(id: number): boolean {
		return this.selectedCheckboxes.find(item => item.pk === id)?.status ?? false;
	}

	toggleCheckboxSelection(event: any, id: number): void {
		const existing = this.selectedCheckboxes.find(item => item.pk === id);
		if (existing) {
			existing.status = event.target.checked;
		} else {
			this.selectedCheckboxes.push({ pk: id, status: event.target.checked });
		}
		this.emitirDatos();
	}

	areAllSelected(): boolean {
		const key = 'id_codigos';
		return this.registrosBusqueda.every((item: any) => this.isCheckboxSelected(item[key]));
	}

	toggleSelectAll(event: any): void {
		const key = 'id_codigos';
		if (event.target.checked) {
			this.registrosBusqueda.forEach((item: any) => {
				if (!this.selectedCheckboxes.some(s => s.pk === item[key])) {
					this.selectedCheckboxes.push({ pk: item[key], status: true });
				}
			});
		} else {
			this.registrosBusqueda.forEach((item: any) => {
				const idx = this.selectedCheckboxes.findIndex(s => s.pk === item[key]);
				if (idx !== -1) this.selectedCheckboxes.splice(idx, 1);
			});
		}
		this.emitirDatos();
	}

	protected limpiarFiltros(): void {
		Object.keys(this.filterValues).forEach(key => this.filterValues[key] = '');
		Object.keys(this.tableConfig).forEach(key => {
			if (this.tableConfig[key]?.selectColumn) {
				this.tableConfig[key].selectOptions?.forEach((opt: any) => opt.checked = false);
			}
		});
		this.emitirDatos();
		if (this.tableType === 'static') this.currentPage = 1;
		this.cdRef.detectChanges();
	}

	getTableColumnStyle(columna: string, rowData: any): any {
		return this.tableConfig[columna]?.style || null;
	}

	private refreshViewData(): void {
		if (this.paginatedItems.length === 0) {
			for (let i = this.totalPages; i >= 1; i--) {
				if (this.datosTabla.slice((i - 1) * this.itemsPerPage, i * this.itemsPerPage).length > 0) {
					this.currentPage = i;
					break;
				}
			}
		}
	}

	protected obtenerColorDadges(columna: string, valor: string): string {
		return this.tableConfig[columna]?.dadgesCases.find((d: any) => d.text == valor)?.color || 'default';
	}

	protected obtenerColorDadgesStyle(columna: string, valor: string): string {
		return this.tableConfig[columna]?.dadgesCases.find((d: any) => d.text == valor)?.color || '#000';
	}

	protected actualizarFiltro(data: any): void {
		this.filterValues[data.from] = data.selectedOptions.map((o: any) => o.value);
		this.onItemsPerPageChange();
	}

	protected calcularSumaTotal(columna: string): number {
		return this.registrosBusqueda.reduce((total: any, row: any) => total + parseFloat(row[columna] ?? 0), 0);
	}

	protected hasTotalColumn(): boolean {
		return this.paginatedItems.some((row: any) =>
			Object.keys(row).some(key => this.tableConfig[key]?.totalColumn)
		);
	}

	protected emitirDatos(): void {
		this.selectionChange.emit({ selectedOptions: this.selectedCheckboxes });
	}

	protected emitirIdAccion(action: string, idAccion: any = null): void {
		this.actionSelected.emit({ action, idAccion });
	}

	trackByFn(index: number, item: any): any {
		return item?.id || item?.id_codigos || index;
	}
}
