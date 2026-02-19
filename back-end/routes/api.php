<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Usuarios\UsuariosController;

// Modulo Usuarios

Route::post('/usuarios/registrarUsuario', [UsuariosController::class, 'registrarUsuario']);
Route::post('/usuarios/login', [UsuariosController::class, 'login']);
Route::get('/usuarios/obtenerInformacionUsuarios', [UsuariosController::class, 'obtenerInformacionUsuarios']);
Route::get('/usuarios/obtenerInformacionUsuariosPorPk/{pkUsuario}', [UsuariosController::class, 'obtenerInformacionUsuariosPorPk']);
Route::put('/usuarios/actualizarUsuario', [UsuariosController::class, 'actualizarUsuario']);
Route::get('/usuarios/cambiarStatusUsuario/{id}', [UsuariosController::class, 'cambiarStatusDeUsuario']);