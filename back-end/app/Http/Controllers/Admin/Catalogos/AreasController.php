<?php

namespace App\Http\Controllers\Admin\Catalogos;

use App\Http\Controllers\Controller;
use App\Services\Admin\Catalogos\AreasService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AreasController extends Controller
{
    protected $areasService;

    public function __construct(
        AreasService $AreasService
    ) {
        $this->areasService = $AreasService;
    }

    public function registrarAreas(Request $request)
    {
        try {
            return $this->areasService->registrarAreas($request->all());
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al registrar la Area');
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

    public function obtenerInformacionAreas() 
    {
        try {
            return $this->areasService->obtenerInformacionAreas();
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de Areas');
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

    public function obtenerInformacionAreasPorpk($pkAreas){
        try {
            return $this->areasService->obtenerInformacionAreasPorPk($pkAreas);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de detalle de Areas');
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
