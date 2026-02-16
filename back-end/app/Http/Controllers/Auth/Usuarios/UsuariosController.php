<?php

namespace App\Http\Controllers\Auth\Usuarios;

use App\Http\Controllers\Controller;
use App\Services\Auth\Usuarios\UsuariosService;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
    protected $usuariosService;

    public function __construct(
        UsuariosService $UsuariosService
    )
    {
        $this->usuariosService =  $UsuariosService; 
    }

    public function obtenerInformacionUsuarios () {
        try{
            return $this->usuariosService->obtenerInformacionUsuarios();
        }catch( \Throwable $error ) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de Usuario');
            Log::alert($error);
            return response()->json(
                [
                    'error' => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ], 
                500
            ); 
        }
    }

    public function obtenerInformacionUsuariosPorPk ($pkUsuario) {
        try{
            return $this->usuariosService->obtenerInformacionUsuariosPorPk($pkUsuario);
        }catch( \Throwable $error ) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de Usuario PorPK');
            Log::alert($error);
            return response()->json(
                [
                    'error' => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ], 
                500
            );
        }
    }

    public function registrarUsuario (Request $request) { 
        try{
            return $this->usuariosService->registrarUsuario( $request->all() );
        }catch( \Throwable $error ) {
            Log::alert('*********************************************');
            Log::alert('Error al registrar usuario');
            Log::alert($error);
            return response()->json(
                [
                    'error' => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ], 
                500
            );
        }
    }

    
}
