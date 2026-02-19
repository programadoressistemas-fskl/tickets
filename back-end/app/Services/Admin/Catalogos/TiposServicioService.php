<?php

namespace App\Services\Admin\Catalogos;

use App\Repositories\Admin\Catalogos\TiposServicioRepository;

class TiposServicioService
{
    protected $tiposServicioRepository;

    public function __construct(
        TiposServicioRepository $tiposServicioRepository
    )
    {
        $this->tiposServicioRepository = $tiposServicioRepository;
    }
}
