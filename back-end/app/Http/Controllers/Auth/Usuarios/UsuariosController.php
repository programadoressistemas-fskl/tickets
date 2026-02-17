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
    ) {
        $this->usuariosService =  $UsuariosService;
    }

    public function registrarUsuario(Request $request)
    {
        try {
            return $this->usuariosService->registrarUsuario($request->all());
        } catch (\Throwable $error) {
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

    public function obtenerInformacionUsuarios()
    {
        try {
            return $this->usuariosService->obtenerInformacionUsuarios();
        } catch (\Throwable $error) {
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

    public function obtenerDetalleUsuarioPorPk($pkUsuario)
    {
        try {
            return $this->usuariosService->obtenerDetalleUsuarioPorPk($pkUsuario);
        } catch (\Throwable $error) {
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

    public function actualizarUsuario(Request $request)
    {
        try {

            $usuario = $this->usuariosService->actualizarUsuario($request->all());

            return response()->json([
                'data' => $usuario,
                'mensaje' => 'Usuario actualizado correctamente'
            ]);
        } catch (\Throwable $error) {

            Log::alert('*********************************************');
            Log::alert('Error al actualizar usuario');
            Log::alert($error->getMessage());

            return response()->json([
                'mensaje' => 'Ocurrió un error interno'
            ], 500);
        }
    }

    public function cambiarStatusUsuario($id)
    {
        try {
            return $this->usuariosService->cambiarStatusUsuario($id);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al cambiar Status Del Usuario');
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

    public function login(Request $request)
    {
        try {
            return $this->usuariosService->login($request->all());
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al iniciar sesión usuario');
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
