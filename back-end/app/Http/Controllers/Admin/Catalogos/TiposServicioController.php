<?php

namespace App\Http\Controllers\Admin\Catalogos;

use App\Http\Controllers\Controller;
use App\Services\Admin\Catalogos\TiposServicioService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TiposServicioController extends Controller
{
    protected $tiposServicioService;

    public function __construct(
        TiposServicioService $TiposServicioService
    ) {
        $this->tiposServicioService = $TiposServicioService;
    }

    public function registrarTipoServicio(Request $request)
    {
        try {
            return $this->tiposServicioService->registrarTipoServicio($request->all());
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al registrar tipos de servicio');
            Log::alert($error);
            return response()->json(
                [
                    'error'   => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ],
                500
            );
        }
    }

    public function obtenerListaTipoServicio()
    {
        try {
            return $this->tiposServicioService->obtenerListaTipoServicio();
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información del tipo de servicio');
            Log::alert($error);
            return response()->json(
                [
                    'error'   => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ],
                500
            );
        }
    }

    public function obtenerDetalleTipoServicio($pkTipoServicio)
    {
        try {
            return $this->tiposServicioService->obtenerDetalleTipoServicio($pkTipoServicio);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información del tipo de servicio por pk}');
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

    public function actualizarTipoServicio(Request $request)
    {
        try {
           return  $this->tiposServicioService->actualizarTipoServicio($request->all());
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al actualizar tipo de servicio');
            Log::alert($error->getMessage());
            return response()->json([
                'mensaje' => 'Ocurrió un error interno'
            ], 500);
        }
    }

    public function cambiarStatustiposServicio($pkTipoServicio)
    {
        try {
            return $this->tiposServicioService->cambiarStatustiposServicio($pkTipoServicio);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al cambiar Status De tipo de servicio ');
            Log::alert($error);
            return response()->json(
                [
                    'error'   => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ],
                500
            );
        }
    }
}
