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
}
