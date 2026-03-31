<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatAreas;
use Illuminate\Support\Facades\DB;

class AreasRepository
{
    public function registrarArea($areas)
    {
        $registro = new CatAreas();
        $registro->area     = $areas['area'];
        $registro->activo   = 1;
        $registro->save();

        return $registro->id_area;
    }

    public function obtenerListaAreas()
    {
        $query = CatAreas::select(
            DB::raw("CONCAT('tk-', cat_areas.id_area) as folio"),
            'area',
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

    public function obtenerDetalleArea($pkArea) {
        $query = CatAreas::select(
            'id_area',
            'area',
            'activo'
        )
            ->where([
                ['id_area', $pkArea],
                ['activo', 1]
            ]);

        return $query->get();
    }

    public function actualizarArea($id, $area)
    {
        $actualizar = CatAreas::findOrFail($id);
        $actualizar->area  = $area['area'];
        $actualizar->save();
    }

    public function cambiarStatusArea($pkArea)
    {
        $areas = CatAreas::findOrFail($pkArea);
        $areas->activo = $areas->activo ? 0 : 1;
        $areas->save();

        return $areas->activo;
    }
}
