<?php

namespace App\Services\Admin\Catalogos;

use App\Repositories\Admin\Catalogos\PlantasRepository;

class PlantasService
{
    protected $plantasRepository;

    public function __construct(
        PlantasRepository $PlantasRepository
    ) {
        $this->plantasRepository = $PlantasRepository;
    }

}
