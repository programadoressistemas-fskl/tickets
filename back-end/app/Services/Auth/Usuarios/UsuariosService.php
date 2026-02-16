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

    public function obtenerInformacionUsuariosPorPk($pkUsuario)
    {
        $usuario = $this->usuariosRepository->obtenerInformacionUsuariosPorPk($pkUsuario);

        return response()->json(
            [
                'usuarios' => $usuario,
                'mensaje' => 'Se obtuvo la informacion correctamente'
            ]
        );
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
}