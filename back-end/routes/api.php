<?php

use App\Http\Controllers\Admin\Catalogos\AreasController;
use App\Http\Controllers\Admin\Catalogos\PlantasController;
use App\Http\Controllers\Admin\Catalogos\TiposServicioController;
use App\Http\Controllers\Admin\Catalogos\TurnosController;
use App\Http\Controllers\Admin\Tickets\TicketsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Usuarios\UsuariosController;

// Modulo Usuarios

Route::post('/usuarios/registrarUsuario', [UsuariosController::class, 'registrarUsuario']);
Route::post('/usuarios/login', [UsuariosController::class, 'login']);
Route::get('/usuarios/obtenerListaUsuarios', [UsuariosController::class, 'obtenerListaUsuarios']);
Route::get('/usuarios/obtenerDetalleUsuario/{pkUsuario}', [UsuariosController::class, 'obtenerDetalleUsuario']);
Route::put('/usuarios/actualizarUsuario', [UsuariosController::class, 'actualizarUsuario']);
Route::get('/usuarios/cambiarStatusUsuario/{id}', [UsuariosController::class, 'cambiarStatusUsuario']);

// Areas 
Route::post('/areas/registrarArea', [AreasController::class, 'registrarArea']);
Route::get('/areas/obtenerListaAreas', [AreasController::class, 'obtenerListaAreas']);
Route::get('/areas/obtenerDetalleArea/{pkArea}', [AreasController::class, 'obtenerDetalleArea']);
Route::put('/areas/actualizarArea', [AreasController::class, 'actualizarArea']);
Route::get('/areas/cambiarStatusArea/{pkArea}', [AreasController::class, 'cambiarStatusArea']);

//Plantas
Route::post('/plantas/registrarPlanta', [PlantasController::class, 'registrarPlanta']);
Route::get('/plantas/obtenerListaPlantas', [PlantasController::class, 'obtenerListaPlantas']);
Route::get('/plantas/obtenerDetallePlanta/{pkPlantas}', [PlantasController::class, 'obtenerDetallePlanta']);
Route::put('/plantas/actualizarPlanta', [PlantasController::class, 'actualizarPlanta']);
Route::get('/plantas/cambiarStatusPlanta/{pkPlantas}', [PlantasController::class, 'cambiarStatusPlanta']);

//Tipos Servicio
Route::post('/tiposServicio/registrarTipoServicio', [TiposServicioController::class, 'registrarTipoServicio']);
Route::get('/tiposServicio/obtenerListaTipoServicio', [TiposServicioController::class, 'obtenerListaTipoServicio']);
Route::get('/tiposServicio/obtenerDetalleTipoServicio/{pkTipoServicio}', [TiposServicioController::class, 'obtenerDetalleTipoServicio']);
Route::put('/tiposServicio/actualizarTipoServicio', [TiposServicioController::class, 'actualizarTipoServicio']);
Route::get('/tiposServicio/cambiarStatustiposServicio/{pkTipoServicio}', [TiposServicioController::class, 'cambiarStatustiposServicio']);

// Turnos
Route::post('/turnos/registrarTurno', [TurnosController::class, 'registrarTurno']);
Route::get('/turnos/obtenerListaTurnos', [TurnosController::class, 'obtenerListaTurnos']);
Route::get('/turnos/obtenerDetalleTurno/{pkTurno}', [TurnosController::class, 'obtenerDetalleTurno']);
Route::put('/turnos/actualizarTurno', [TurnosController::class, 'actualizarTurno']);
Route::get('/turnos/cambiarStatusTurno/{pkTurno}', [TurnosController::class, 'cambiarStatusTurno']);

// Ticket 
Route::get('/tickets/obtenerRecursosRegistroTicket', [TicketsController::class, 'obtenerRecursosRegistroTicket']);
Route::post('/tickets/registrarTicket', [TicketsController::class, 'registrarTicket']);
Route::get('/tickets/obtenerListaTickets', [TicketsController::class, 'obtenerListaTickets']);
Route::get('/tickets/obtenerDetalleTickets/{pkTickets}', [TicketsController::class, 'obtenerDetalleTicket']);