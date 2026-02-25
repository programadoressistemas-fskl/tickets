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

    public function registrarAreas(Request $request){
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

    public function obtenerListaAreas() {
        try {
            return $this->areasService->obtenerListaAreas();
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

    public function obtenerDetalleArea($pkAreas) {
        try {
            return $this->areasService->obtenerDetalleArea($pkAreas);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de detalle de Area');
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

    public function actualizarAreas(Request $request) {
        try {

            $usuario = $this->areasService->actualizarAreas($request->all());

            return response()->json([
                'data' => $usuario,
                'mensaje' => 'Area actualizada correctamente'
            ]);
        } catch (\Throwable $error) {

            Log::alert('*********************************************');
            Log::alert('Error al actualizar Area');
            Log::alert($error->getMessage());

            return response()->json([
                'mensaje' => 'Ocurrió un error interno'
            ], 500);
        }
    }

    public function cambiarStatusArea($id) {
        try {
            return $this->areasService->cambiarStatusArea($id);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al cambiar Status De Area');
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
