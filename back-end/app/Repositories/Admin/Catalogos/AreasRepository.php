<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatAreas;

class AreasRepository
{
    public function registrarPlanta ($areas) {
        $registro = new CatAreas();

        $registro->area     = $areas['area'];
        $registro->activo   = 1;
        $registro->save();
    } 
}
