<?php

namespace App\Http\Controllers\Admin\Catalogos;

use App\Http\Controllers\Controller;
use App\Services\Admin\Catalogos\TurnosService;
use Illuminate\Http\Request;

class TurnosController extends Controller
{
    protected $turnosService;

    public function __construct(
        TurnosService $TurnosService
    )
    {
        $this->turnosService = $TurnosService;
    }
}
