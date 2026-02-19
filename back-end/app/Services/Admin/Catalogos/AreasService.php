<?php

namespace App\Services\Admin\Catalogos;

use App\Repositories\Admin\Catalogos\AreasRepository;

class AreasService
{
    protected $areasRepository;
    
    public function __construct(
        AreasRepository $AreasRepository
    )
    {
        $this->areasRepository = $AreasRepository;
    }
}
