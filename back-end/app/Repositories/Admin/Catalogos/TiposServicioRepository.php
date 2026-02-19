<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatTiposServicio;

class TiposServicioRepository
{
    public function registrartiposServicio($tiposServicios)
    {
        $registro = new CatTiposServicio();

        $registro->tipoServicio = $tiposServicios['tiposServicio'];
        $registro->descripcion  = $tiposServicios[''];
        $registro->activo       = 1;
        $registro->save();
    }
}
