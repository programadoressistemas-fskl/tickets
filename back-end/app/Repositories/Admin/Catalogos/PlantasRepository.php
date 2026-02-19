<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatPlantas;

class PlantasRepository
{
    public function registrarPlantas($plantas)
    {

        $registro = new CatPlantas();

        $registro->planta  = $plantas['planta'];
        $registro->abrev   = $plantas['abrev'];
        $registro->activo  = 1;
        $registro->save();
    }

    public function obtenerInformacionPlantas()
    {
        $query = CatPlantas::select(
            'id_planta',
            'planta',
            'abrev',
            'direccion',
            'activo'
        )
            ->where('activo', 1);

        return $query->get();
    }

    public function obtenerInformacionPlantasPorPk($pkPlantas)
    {
        $query = CatPlantas::select(
            'id_planta',
            'planta',
            'abrev',
            'direccion',
            'activo'
        )
            ->where([
                ['id_area', $pkPlantas],
                ['activo', 1]
            ]);

        return $query->get();
    }

    public function actualizarPlanta($id, $plantas)
    {
        $actualizar = CatPlantas::findOrFail($id);

        $actualizar->planta     =$plantas['planta'];
        $actualizar->abrev      =$plantas['abrev'];
        $actualizar->direccion  =$plantas['direccion'];
        $actualizar->save();
    }

    public function cambiarStatusPlanta($id){

        $plantas = CatPlantas::findOrFail($id);
        $plantas->activo = $plantas->activo ? 0 : 1;
        $plantas->save();
    }
}
