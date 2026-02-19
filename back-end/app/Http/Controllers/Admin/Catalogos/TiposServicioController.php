<?php

namespace App\Http\Controllers\Admin\Catalogos;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\Catalogos\TiposServicioRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TiposServicioController extends Controller
{
    protected $tiposServicioService;

    public function __construct(
        TiposServicioRepository $TiposServicioService
    ) {
        $this->tiposServicioService = $TiposServicioService;
    }

    public function registrartiposServicios(Request $request)
    {
        try {
            return $this->tiposServicioService->registrartiposServicio($request->all());
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al registrar tipos de servicio');
            Log::alert($error);
            return response()->json(
                [
                    'error' => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ],
                500
            );
        }
    }
}