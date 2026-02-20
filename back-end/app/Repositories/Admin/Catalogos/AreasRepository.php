<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatAreas;

class AreasRepository
{
    public function registrarAreas($areas)
    {
        $registro = new CatAreas();

        $registro->area     = $areas['area'];
        $registro->activo   = 1;
        $registro->save();
    }

    public function obtenerInformacionAreas()
    {
        $query = CatAreas::select(
            'id_area',
            'area',
            'activo',
        )
            ->where('activo', 1);

        return $query->get();
    }

    public function obtenerDetalleAreasPorpk($pkAreas)
    {
        $query = CatAreas::select(
            'id_area',
            'area',
            'activo'
        ) 
            ->where([
                ['id_area', $pkAreas],
                ['activo', 1]
            ]);

        return $query->get();
    }

    public function actualizarAreas($id, $areas)
    {
        $actualizar = CatAreas::findOrFail($id);

        $actualizar->area            = $areas['area'];
        $actualizar->save();
    }

    public function cambiarStatusArea($id)
    {
        $areas = CatAreas::findOrFail($id);
        $areas->activo = $areas->activo ? 0 : 1;
        $areas->save();
    }

}
