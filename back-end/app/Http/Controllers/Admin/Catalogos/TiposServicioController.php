<?php

namespace App\Http\Controllers\Admin\Catalogos;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\Catalogos\TiposServicioRepository;
use Illuminate\Http\Request;

class TiposServicioController extends Controller
{
    protected $tiposServicioService;

    public function __construct(
        TiposServicioRepository $TiposServicioService
    )
    {
        $this->tiposServicioService = $TiposServicioService;
    }
}
