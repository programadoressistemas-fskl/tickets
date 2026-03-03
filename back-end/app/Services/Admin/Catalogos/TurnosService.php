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

    public function registrarTurno($turnos) {
        $turnos = $this->turnosRepository->registrarTurno($turnos);

        return response()->json(
            [
                'turnos'  => $turnos,
                'mensaje' => 'Se registro corectamente el turno',
            ]
        );
    } 

    public function obtenerListaTurnos() {
         $turnos = $this->turnosRepository->obtenerListaTurnos();

        return response()->json(
            [
                'mensaje' => 'Se obtuvo la informacion correctamente',
                'title'   => 'Registro exitoso'
            ]
        );
    }

    public function obtenerDetalleTurno($pkTurno) {
        $pkTurno = $this->turnosRepository->obtenerDetalleTurno($pkTurno);

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

    public function cambiarStatusTurno($pkTurno) {
        $this->turnosRepository->cambiarStatusTurno($pkTurno);

        return response()->json(
            [
                'mensaje' => 'Se actualizo correctamente el status del turno con exito'
            ]
        );
    }
}
