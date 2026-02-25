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

    public function registrarTurno(Request $request) {
        try {
            return $this->turnosService->registrarTurno($request->all());
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

    public function obtenerListaTurnos() {
        try {
            return $this->turnosService->obtenerListaTurnos();
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de los turnos');
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

    public function obtenerDetalleTurno($pkTurno) {
        try {
            return $this->turnosService->obtenerDetalleTurno($pkTurno);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información del turno');
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

    public function actualizarTurno(Request $request) {
        try {

            $turno = $this->turnosService->actualizarTurno($request->all());

            return response()->json([
                'data' => $turno,
                'mensaje' => 'Turno actualizada correctamente'
            ]);
        } catch (\Throwable $error) {

            Log::alert('*********************************************');
            Log::alert('Error al actualizar turno');
            Log::alert($error->getMessage());

            return response()->json([
                'mensaje' => 'Ocurrió un error interno'
            ], 500);
        }
    }

    public function cambiarStatusTurno($pkTurno) {
        try {
            return $this->turnosService->cambiarStatusTurno($pkTurno);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al cambiar Status De Turno');
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
