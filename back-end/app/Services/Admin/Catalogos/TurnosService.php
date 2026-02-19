<?php

namespace App\Services\Admin\Catalogos;

use App\Repositories\Admin\Catalogos\TurnosRepository;

class TurnosService
{
    protected $turnosRepository;

    public function __construct(
        TurnosRepository $TurnosRepository
    )
    {
        $this->turnosRepository = $TurnosRepository;
    }
}
