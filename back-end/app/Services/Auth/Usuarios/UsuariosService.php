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

    public function registrarUsuario($usuario)
    {
        $usuario = $this->usuariosRepository->registrarUsuario($usuario);

        return response()->json(
            [
                'usuarios' => $usuario,
                'mensaje' => 'Se registro correctamente el usuario'
            ]
        );
    }

    public function obtenerInformacionUsuarios()
    {
        $usuario = $this->usuariosRepository->obtenerInformacionUsuarios();

        return response()->json(
            [
                'usuarios' => $usuario,
                'mensaje' => 'Se obtuvo la informacion correctamente'
            ]
        );
    }

    public function obtenerDetalleUsuarioPorPk($pkUsuario)
    {
        $usuario = $this->usuariosRepository->obtenerDetalleUsuariosPorPk($pkUsuario);

        return response()->json(
            [
                'usuarios' => $usuario,
                'mensaje' => 'Se obtuvo la informacion correctamente'
            ]
        );
    }

    public function actualizarUsuario($usuario)
    {
        $this->usuariosRepository->actualizarUsuario($usuario['pkUsuario'], $usuario['usuario']);

        return response()->json(
            [
                'mensaje' => 'Se actualizó correctamente el usuario'
            ]
        );
    }

    public function cambiarStatusUsuario($id)
    {
        $this->usuariosRepository->cambiarStatusUsuario($id);

        return response()->json(
            [
                'mensaje' => 'Se cambio el status del usuario con exito'
            ] 
        );
    }

    public function login($usuario)
    {
        $resultado = $this->usuariosRepository->login($usuario);

        if ($resultado === 'no_usuario') {
            return response()->json([
                'mensaje' => 'El usuario no existe o las credenciales son incorrectas'
            ], 404);
        }

        if ($resultado === 'mal_contraseña') {
            return response()->json([
                'mensaje' => 'Las credenciales son incorrectas'
            ], 401); 
        }

        return response()->json([
            'usuarios' => $resultado,
            'mensaje' => 'Inicio de sesión correctamente el usuario'
        ]);
    }
}
