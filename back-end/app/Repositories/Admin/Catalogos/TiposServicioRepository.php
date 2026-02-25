<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatTiposServicio;

class TiposServicioRepository
{
    public function registrartiposServicio($tiposServicio) {
        $registro = new CatTiposServicio();

        $registro->tipoServicio = $tiposServicio['tiposServicio'];
        $registro->descripcion  = $tiposServicio['descripcion'];
        $registro->activo       = 1;
        $registro->save();
    }

    public function obtenerListatiposServicio() {
        $query = CatTiposServicio::select(
            'id_tipo_servicio',
            'tipo_servicio',
            'descripcion',
            'activo'
        )
            ->where('activo', 1);

        return $query->get();
    }

    public function obtenerDetalletiposServicio($pktiposServicio) {
        $query = CatTiposServicio::select(
            'id_tipo_servicio',
            'tipo_servicio',
            'descripcion',
            'activo'
        )
            ->where([
                ['id_tipo_servicio', $pktiposServicio],
                ['activo', 1]
            ]);

        return $query->get();
    }

    public function actualizartiposServicio($id, $tiposServicio) {
        $actualizar = CatTiposServicio::findOrFail($id);

        $actualizar->tipo_servicio     = $tiposServicio['tipo_servicio'];
        $actualizar->descripcion         = $tiposServicio['descripcion'];
        $actualizar->save();
    }

    public function cambiarStatustiposServicio($id) {

        $tiposServicio = CatTiposServicio::findOrFail($id);
        $tiposServicio->activo = $tiposServicio->activo ? 0 : 1;
        $tiposServicio->save();
    }
}
