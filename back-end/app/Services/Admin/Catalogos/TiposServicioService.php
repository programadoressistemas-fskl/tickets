<?php

namespace App\Services\Admin\Catalogos;

use App\Repositories\Admin\Catalogos\TiposServicioRepository;

class TiposServicioService
{
    protected $tiposServicioRepository;

    public function __construct(
        TiposServicioRepository $tiposServicioRepository
    ) {
        $this->tiposServicioRepository = $tiposServicioRepository;
    }

    public function registrartiposServicio($tiposServicios)
    {
        $this->tiposServicioRepository->registrartiposServicio($tiposServicios);

        return response()->json(
            [
                'tiposServicios' => $tiposServicios,
                'mensaje'        => 'Se registro correctamente el tipo de servicio'
            ]
        );
    }
}
