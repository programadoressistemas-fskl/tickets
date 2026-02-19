<?php

namespace App\Http\Controllers\Admin\Catalogos;

use App\Http\Controllers\Controller;
use App\Services\Admin\Catalogos\PlantasService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PlantasController extends Controller
{
    protected $plantasService;

    public function __construct(
        PlantasService $PlantasService
    ) {
        $this->plantasService = $PlantasService;
    }

}
