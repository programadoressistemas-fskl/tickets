<?php

namespace App\Http\Controllers\Admin\Catalogos;

use App\Http\Controllers\Controller;
use App\Services\Admin\Catalogos\TurnosService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TurnosController extends Controller
{
    protected $turnosService;

    public function __construct(
        TurnosService $TurnosService
    ) {
        $this->turnosService = $TurnosService;
    }

    public function registrarTurnos(Request $request)
    {
        try {
            return $this->turnosService->registrarTurnos($request->all());
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al registrar turnos');
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