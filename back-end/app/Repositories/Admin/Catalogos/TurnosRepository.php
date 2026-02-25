<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatTurnos;

class TurnosRepository
{
    public function registrarTurno($turnos) {
        $registro = new CatTurnos();

        $registro->turno  = $turnos['turno'];
        $registro->activo = 1;
        $registro->save();
    }

    public function obtenerListaTurnos() {
        $query = CatTurnos::select(
            'id_turnos',
            'turno',
            'activo'
        )
            ->where('activo', 1);

        return $query->get();
    }

    public function obtenerDetalleTurno() {
        $query  = CatTurnos::select(
            'id_turnos',
            'turno',
            'activo'
        )
            ->where([
                ['id_turno', 'pkTurno'],
                ['activo', 1]
            ]);

        return $query->get();
    }

    public function actualizarTurno($id, $turno) {
        $actualizar = CatTurnos::finOrFail($id);

        $actualizar->turno = $turno['turno'];
        $actualizar->save();
    }

    public function cambiarStatusTurno($pkTurno) {
        $turno = CatTurnos::findOrFail($pkTurno);
        $turno->activo = $turno->activo ? 0 : 1;
        $turno->save(); 
    }
}
