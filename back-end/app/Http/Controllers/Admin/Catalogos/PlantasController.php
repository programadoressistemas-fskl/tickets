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

    public function registrarPlantas(Request $request) {
        try {
            return $this->plantasService->registrarPlantas($request->all());
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al registrar planta');
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

    public function obtenerListaPlantas() {
        try {
            return $this->plantasService->obtenerListaPlantas();
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de Planta');
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

    public function obtenerDetallePlanta($pkPlantas) {
        try {
            return $this->plantasService->obtenerDetallePlanta($pkPlantas);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener detalle de la Planta PorPK');
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

    public function actualizarPlanta(Request $request) {
        try {

            $usuario = $this->plantasService->actualizarPlanta($request->all());

            return response()->json([
                'data' => $usuario,
                'mensaje' => 'Planta actualizado correctamente'
            ]);
        } catch (\Throwable $error) {

            Log::alert('*********************************************');
            Log::alert('Error al actualizar planta');
            Log::alert($error->getMessage());

            return response()->json([
                'mensaje' => 'Ocurrió un error interno'
            ], 500);
        }
    }

    public function cambiarStatusPlanta($id) {
        try {
            return $this->plantasService->cambiarStatusPlanta($id);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al cambiar Status De Planta');
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
