<?php

namespace App\Repositories\Auth\Usuarios;

use App\Models\TblUsuarios;
use Carbon\Carbon;


class UsuariosRepository
{

    public function obtenerInformacionUsuarios()
    {
        $query = TblUsuarios::select(
            'id_usuario',
            'nombre',
            'a_paterno',
            'a_materno',
            'numero_telefono',
            'correo_electronico',
            'pasword',
            'id_area',
            'puesto',
            'fecha_registro',
        )
            ->where('activo', 1);

        return $query->get();
    }

    public function obtenerInformacionUsuariosPorPk($pkUsuario)
    {
        $query = TblUsuarios::select(
            'id_usuario',
            'nombre',
            'a_paterno',
            'a_materno',
            'numero_telefono',
            'correo_electronico',
            'pasword',
            'id_area',
            'puesto',
            'fecha_registro',
            'activo',
        )
            ->where([
                ['id_usuario', $pkUsuario],
                ['activo', 1]
            ]);

        return $query->get();
    }

    public function registrarUsuario($usuario)
    {
        $registro = new TblUsuarios();

        $registro->nombre = $usuario['nombre'];
        $registro->a_paterno = $usuario['a_paterno'];
        $registro->a_materno = $usuario['a_materno'];
        $registro->numero_telefono = $usuario['numero_telefono'];
        $registro->correo_electronico = $usuario['correo_electronico'];
        $registro->pasword = $usuario['pasword'];
        $registro->id_area = $usuario['id_area'];
        $registro->puesto = $usuario['puesto'];
        $registro->id_usuario_registro = 1;
        $registro->fecha_registro = Carbon::now();
        $registro->activo = 1;
        $registro->save();

        return $registro->id_usuario;
    }
}