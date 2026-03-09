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
        $pkTurno = $this->turnosRepository->registrarTurno($turnos);

        return response()->json(
            [
                'pkTurno' => $pkTurno,
                'mensaje' => 'Se registro corectamente el turno',
                'title'   => 'Registro exitoso'
            ]
        );
    } 

    public function obtenerListaTurnos() {
         $turno = $this->turnosRepository->obtenerListaTurnos();

        return response()->json(
            [
                'turnos' =>  $turno,
                'title'   => 'Se obtuvo la informacion correctamente'
            ]
        );
    }

    public function obtenerDetalleTurno($pkTurno) {
        $turno = $this->turnosRepository->obtenerDetalleTurno($pkTurno);

        return response()->json(
            [
                'turno' => $turno[0],
                'mensaje' => ' Se obtuvo corectamente la informacion'
            ]
        );
    }
    
    public function actualizarTurno($turno) {
        $this->turnosRepository->actualizarTurno($turno['pkTurno'], $turno['turno']);

        return response()->json(
            [
                'title'   => 'Actualización con exitó',
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
