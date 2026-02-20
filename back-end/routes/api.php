<?php

use App\Http\Controllers\Admin\Catalogos\AreasController;
use App\Http\Controllers\Admin\Catalogos\PlantasController;
use App\Http\Controllers\Admin\Catalogos\TiposServicioController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Usuarios\UsuariosController;

// Modulo Usuarios

Route::post('/usuarios/registrarUsuario', [UsuariosController::class, 'registrarUsuario']);
Route::post('/usuarios/login', [UsuariosController::class, 'login']);
Route::get('/usuarios/obtenerInformacionUsuarios', [UsuariosController::class, 'obtenerInformacionUsuarios']);
Route::get('/usuarios/obtenerDetalleUsuariosPorPk/{pkUsuario}', [UsuariosController::class, 'obtenerDetalleUsuariosPorPk']);
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
Route::post('/plantas/registrartiposServicio', [TiposServicioController::class, 'registrartiposServicio']);
Route::get('/plantas/obtenerInformaciontiposServicio', [TiposServicioController::class, 'obtenerInformaciontiposServicio']);
Route::get('/plantas/obtenerDetalletiposServicioPorPk/{pktiposServicio}', [TiposServicioController::class, 'obtenerDetalletiposServicioPorPk']);
Route::get('/plantas/actualizartiposServicio', [TiposServicioController::class, 'actualizartiposServicio']);
Route::get('/areas/cambiarStatustiposServicio/{id}', [TiposServicioController::class, 'cambiarStatustiposServicio']);


//Turnos
