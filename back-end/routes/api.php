<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Usuarios\UsuariosController;

Route::get('/test', function () {
    return response()->json(['ok' => true]);
});

Route::post('/usuarios/registrarUsuario', [UsuariosController::class, 'registrarUsuario']);

Route::get('/usuarios/obtenerInformacionUsuariosPorPk/{pkUsuario}', [UsuariosController::class, 'obtenerInformacionUsuariosPorPk']);

Route::get('/usuarios/obtenerInformacionUsuarios', [UsuariosController::class, 'obtenerInformacionUsuarios']);