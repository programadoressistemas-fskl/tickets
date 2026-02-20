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

    public function registrartiposServicios(Request $request) {
        try {
            return $this->tiposServicioService->registrartiposServicio($request->all());
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

    public function obtenerInformaciontiposServicio() {
        try {
            return $this->tiposServicioService->obtenerInformaciontiposServicio();
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

    public function obtenerDetalletiposServicioPorPk($pktiposServicio) {
        try {
            return $this->tiposServicioService->obtenerDetalletiposServicioPorPk($pktiposServicio);
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

   public function actualizartiposServicio(Request $request) {
       try {
           $tiposServicio= $this->tiposServicioService->actualizartiposServicio($request->all());
           return response()->json([
               'data'    => $tiposServicio,
               'mensaje' => 'tipo de servicio actualizado correctamente'
           ]);
       } catch (\Throwable $error) {
           Log::alert('*********************************************');
           Log::alert('Error al actualizar tipo de servicio');
           Log::alert($error->getMessage());
           return response()->json([
               'mensaje' => 'Ocurrió un error interno'
           ], 500);
       }
   }

    public function cambiarStatustiposServicio($id) {
        try {
            return $this->tiposServicioService->cambiarStatustiposServicio($id);
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