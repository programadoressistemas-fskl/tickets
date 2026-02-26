<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatTiposServicio;
use Illuminate\Support\Facades\DB;

class TiposServicioRepository
{
    public function registrarTipoServicio($tiposServicio) {
        $registro = new CatTiposServicio();

        $registro->tipoServicio = $tiposServicio['tiposServicio'];
        $registro->descripcion  = $tiposServicio['descripcion'];
        $registro->activo       = 1;
        $registro->save();
    }

    public function obtenerListaTipoServicio() {
        $query = CatTiposServicio::select(
            'id_tipo_servicio',
            'tipo_servicio',
            'descripcion',
            'activo',
            DB::raw("
            CASE 
                WHEN activo = 1 THEN 'Activo'
                ELSE 'Inactivo'
            END as estado
        ")
        );

        return $query->get();
    }

    public function obtenerDetalleTipoServicio($pkTipoServicio) {
        $query = CatTiposServicio::select(
            'id_tipo_servicio',
            'tipo_servicio',
            'descripcion',
            'activo'
        )
            ->where([
                ['id_tipo_servicio', $pkTipoServicio],
                ['activo', 1]
            ]);

        return $query->get();
    }

    public function actualizarTipoServicio($id, $tiposServicio) {
        $actualizar = CatTiposServicio::findOrFail($id);

        $actualizar->tipo_servicio     = $tiposServicio['tipo_servicio'];
        $actualizar->descripcion         = $tiposServicio['descripcion'];
        $actualizar->save();
    }

    public function cambiarStatustiposServicio($pkTipoServicio) {

        $tiposServicio = CatTiposServicio::findOrFail($pkTipoServicio);
        $tiposServicio->activo = $tiposServicio->activo ? 0 : 1;
        $tiposServicio->save();
    } 
} 
