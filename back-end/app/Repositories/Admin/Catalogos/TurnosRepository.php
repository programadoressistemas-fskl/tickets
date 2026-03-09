<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatTurnos;
use Illuminate\Support\Facades\DB;

class TurnosRepository
{
    public function registrarTurno($turnos) {
        $registro = new CatTurnos();
        $registro->turno  = $turnos['turno'];
        $registro->activo = 1;
        $registro->save();

        return $registro->id_turno;
    }

    public function obtenerListaTurnos() {
        $query = CatTurnos::select(
                              'id_turno',
                              'turno',
                              DB::raw("
                                  CASE 
                                      WHEN activo = 1 THEN 'Activo'
                                      ELSE 'Inactivo'
                                  END as estado
                              ")
                          );

        return $query->get();
    }

    public function obtenerDetalleTurno($pkTurno) {
        $query  = CatTurnos::select(
                                'id_turno',
                                'turno',
                                'activo'
                            )
                            ->where('id_turno', $pkTurno);        

                            return $query->get();
                        }

    public function actualizarTurno($id, $turno) {
        $actualizar = CatTurnos::findOrFail($id);
        $actualizar->turno = $turno['turno'];
        $actualizar->save();
    } 

    public function cambiarStatusTurno($pkTurno) {
        $turno = CatTurnos::findOrFail($pkTurno);
        $turno->activo = $turno->activo ? 0 : 1;
        $turno->save(); 
    }
}
