<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatTurnos;

class TurnosRepository
{   
    public function registrarTurnos($turnos){
        $registro = new CatTurnos();

        $registro->turno = $turnos['turno'];
        $registro->activo =1;
        $registro->save();
    }
}
