<?php

use App\Http\Controllers\Admin\Catalogos\AreasController;
use App\Http\Controllers\Admin\Catalogos\PlantasController;
use App\Http\Controllers\Admin\Catalogos\TiposServicioController;
use App\Http\Controllers\Admin\Catalogos\TurnosController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Usuarios\UsuariosController;

// Modulo Usuarios

Route::post('/usuarios/registrarUsuario', [UsuariosController::class, 'registrarUsuario']);
Route::post('/usuarios/login', [UsuariosController::class, 'login']);
Route::get('/usuarios/obtenerListaUsuarios', [UsuariosController::class, 'obtenerListaUsuarios']);
Route::get('/usuarios/obtenerDetalleUsuario/{pkUsuario}', [UsuariosController::class, 'obtenerDetalleUsuario']);
Route::put('/usuarios/actualizarUsuario', [UsuariosController::class, 'actualizarUsuario']);
Route::get('/usuarios/cambiarStatusUsuario/{id}', [UsuariosController::class, 'cambiarStatusDeUsuario']);

// Areas 
Route::post('/areas/registrarAreas', [AreasController::class, 'registrarAreas']);
Route::get('/areas/obtenerInformacionAreas', [AreasController::class, 'obtenerInformacionAreas']);
Route::get('/areas/obtenerDetalleAreasPorPk/{pkAreas}', [AreasController::class, 'obtenerDetalleAreasPorPk']);
Route::get('/areas/actualizarArea', [AreasController::class, 'actualizarArea']);
Route::get('/areas/cambiarStatusArea/{id}', [AreasController::class, 'cambiarStatusArea']);

//Plantas
Route::post('/plantas/registrarPlantas', [PlantasController::class, 'registrarPlantas']);
Route::get('/plantas/obtenerInformacionPlantas', [PlantasController::class, 'obtenerInformacionPlantas']);
Route::get('/plantas/obtenerDetallePlantasPorPk/{pkPlantas}', [PlantasController::class, 'obtenerDetallePlantasPorPk']);
Route::get('/plantas/actualizarPlanta', [PlantasController::class, 'actualizarPlanta']);
Route::get('/areas/cambiarStatusPlanta/{id}', [PlantasController::class, 'cambiarStatusPlanta']);

//Tipos Servicio
Route::post('/tiposServicio/registrartiposServicio', [TiposServicioController::class, 'registrartiposServicio']);
Route::get('/tiposServicio/obtenerInformaciontiposServicio', [TiposServicioController::class, 'obtenerInformaciontiposServicio']);
Route::get('/tiposServicio/obtenerDetalletiposServicioPorPk/{pktiposServicio}', [TiposServicioController::class, 'obtenerDetalletiposServicioPorPk']);
Route::get('/tiposServicio/actualizartiposServicio', [TiposServicioController::class, 'actualizartiposServicio']);
Route::get('/tiposServicio/cambiarStatustiposServicio/{id}', [TiposServicioController::class, 'cambiarStatustiposServicio']);

//Turnos
Route::post('/turnos/registrarTurnos', [TurnosController::class, 'registrarTurnos']);
Route::get('/turnos/obtenerInformacionTurnos', [TurnosController::class, 'obtenerInformacionTurnos']);
Route::get('/turnos/obtenerDetalleTurnosPorPk/{pkTurno}', [TurnosController::class, 'obtenerDetalleTurnosPorPk']);
Route::get('/turnos/actualizarTurno', [TurnosController::class, 'actualizarTurno']);
Route::get('/turnos/cambiarStatusTurno/{id}', [TurnosController::class, 'cambiarStatusTurno']);
