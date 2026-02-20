<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatTurnos;

class TurnosRepository
{
    public function registrarTurnos($turnos) {
        $registro = new CatTurnos();

        $registro->turno  = $turnos['turno'];
        $registro->activo = 1;
        $registro->save();
    }

    public function obtnerInformacionTurnos() {
        $query = CatTurnos::select(
            'id_turnos',
            'turno',
            'activo'
        )
            ->where('activo', 1);

        return $query->get();
    }

    public function obtenerDetalleTurnosPorPk() {
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

    public function cambiarStatusTurno($id) {
        $turno = CatTurnos::findOrFail($id);
        $turno->activo = $turno->activo ? 0 : 1;
        $turno->save();
    }
}
