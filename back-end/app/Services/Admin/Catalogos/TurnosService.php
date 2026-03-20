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
                'mensaje' => 'Se registro el turno con éxito',
                'title'   => 'Registro exitoso'
            ]
        );
    } 

    public function obtenerListaTurnos() {
         $turno = $this->turnosRepository->obtenerListaTurnos();

        return response()->json(
            [
                'turnos'  =>  $turno,
                'title'   => 'Se obtuvo la informacion correctamente de Turnos'
            ]
        );
    }

    public function obtenerDetalleTurno($pkTurno) {
        $turno = $this->turnosRepository->obtenerDetalleTurno($pkTurno);

        return response()->json(
            [
                'turno'   => $turno[0],
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
        $status = $this->turnosRepository->cambiarStatusTurno($pkTurno);

        return response()->json(
            [
                'title'   => ($status ? 'Activar' : 'Inactivar').' turno',
                'mensaje' => 'Se '.($status ? 'activo' : 'inactivo').' el turno con éxito'
            ]
        );
    }
}
