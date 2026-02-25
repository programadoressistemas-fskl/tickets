<?php

namespace App\Services\Admin\Catalogos;

use App\Repositories\Admin\Catalogos\TurnosRepository;

class TurnosService
{
    protected $turnosRepository;

    public function __construct(
        TurnosRepository $TurnosRepository
    )
    {
        $this->turnosRepository = $TurnosRepository;
    }

    public function registrarTurnos($turnos) {
        $turnos = $this->turnosRepository->registrarTurnos($turnos);

        return response()->json(
            [
                'turnos'  => $turnos,
                'mensaje' => 'Se registro corectamente el turno',
            ]
        );
    } 

    public function obtenerListaTurnos() {
         $turno = $this->turnosRepository->obtenerListaTurnos();

        return response()->json(
            [
                'turno' => $turno,
                'mensaje' => 'Se obtuvo la informacion correctamente'
            ]
        );
    }

    public function obtenerDetalleTurno($pkTurno) {
        $pkTurno = $this->turnosRepository->obtenerDetalleTurno();

        return response()->json(
            [
                'pkTurno' => '$pkTurno',
                'mensaje' => ' Se obtuvo corectamente la informacion'
            ]
        );
    }
    
    public function actualizarTurno($turno) {
        $this->turnosRepository->actualizarTurno($turno['pkTurno'], $turno['turno']);

        return response()->json(
            [
                'mensaje' => 'Se actualizo correctamente el turno'
            ]
        );
    }

    public function cambiarStatusTurno($id) {
        $this->turnosRepository->cambiarStatusTurno($id);

        return response()->json(
            [
                'mensaje' => 'Se actualizo correctamente el status del turno con exito'
            ]
        );
    }
}
