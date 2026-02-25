<?php

namespace App\Services\Auth\Usuarios;

use App\Repositories\Auth\Usuarios\UsuariosRepository;


class UsuariosService
{
    protected $usuariosRepository;

    public function __construct(
        UsuariosRepository $UsuariosRepository
    ) {
        $this->usuariosRepository = $UsuariosRepository;
    }

    public function registrarUsuario($usuario) {
        $usuario = $this->usuariosRepository->registrarUsuario($usuario);

        return response()->json(
            [
                'usuarios' => $usuario,
                'mensaje' => 'Se registro correctamente el usuario'
            ]
        );
    }

    public function obtenerListaUsuarios() {
        $usuario = $this->usuariosRepository->obtenerListaUsuarios();

        return response()->json(
            [
                'usuarios' => $usuario,
                'mensaje' => 'Se obtuvo la informacion correctamente'
            ]
        );
    }

    public function obtenerDetalleUsuario($pkUsuario) {
        $usuario = $this->usuariosRepository->obtenerDetalleUsuario($pkUsuario);

        return response()->json(
            [
                'usuarios' => $usuario,
                'mensaje' => 'Se obtuvo la informacion correctamente'
            ]
        );
    }

    public function actualizarUsuario($usuario) {
        $this->usuariosRepository->actualizarUsuario($usuario['pkUsuario'], $usuario['usuario']);

        return response()->json(
            [
                'mensaje' => 'Se actualizó correctamente el usuario'
            ]
        );
    }

    public function cambiarStatusUsuario($id) {
        $this->usuariosRepository->cambiarStatusUsuario($id);

        return response()->json(
            [
                'mensaje' => 'Se cambio el status del usuario con exito'
            ] 
        );
    }

    public function login($usuario) {
        $resultado = $this->usuariosRepository->login($usuario);

        if ($resultado === 'no_usuario') {
            return response()->json([
                'success' => 204,
                'title'   => 'Usuario no encontrado',
                'mensaje' => 'El usuario no existe o las credenciales son incorrectas'
            ]);
        }

        if ($resultado === 'mal_contraseña') {
            return response()->json([
                'success' => 204,
                'title'   => 'Credenciales Incorrectas',
                'mensaje' => 'Las credenciales son incorrectas'
            ]); 
        }

        return response()->json([
            'usuarios' => $resultado,
            'mensaje' => 'Inicio de sesión correctamente el usuario'
        ]);
    }
}
