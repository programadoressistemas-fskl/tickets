<?php

namespace App\Repositories\Admin\Catalogos;

use App\Models\CatPlantas;
use Illuminate\Support\Facades\DB;

class PlantasRepository
{
    public function registrarPlanta($plantas) {
        $registro = new CatPlantas();
        $registro->planta     = $plantas['planta'];
        $registro->abrev      = $plantas['abrev'];
        $registro->direccion  = $plantas['direccion'];
        $registro->activo     = 1;
        $registro->save(); 

        return $registro->id_planta;
    }

    public function obtenerListaPlantas() {
        $query = CatPlantas::select(
                                'id_planta',
                                'planta',
                                'abrev',
                                'direccion',
                                'activo',
                                DB::raw("
                                    CASE 
                                        WHEN activo = 1 THEN 'Activo'
                                        ELSE 'Inactivo'
                                    END as estado
                                ")
                            );

        return $query->get();
    }

    public function obtenerDetallePlanta($pkPlantas) {
        $query = CatPlantas::select(
                                'id_planta',
                                'planta',
                                'abrev',
                                'direccion',
                                'activo'
                            )
                            ->where([
                            ['id_planta', $pkPlantas],
                            ['activo', 1]
                            ]);

        return $query->get();
    }

    public function actualizarPlanta($id, $plantas) {
        $actualizar = CatPlantas::findOrFail($id);
        $actualizar->planta    = $plantas['planta'];
        $actualizar->abrev     = $plantas['abrev'];
        $actualizar->direccion = $plantas['direccion'];
        $actualizar->save();
    }

    public function cambiarStatusPlanta($pkPlantas) {
        $plantas = CatPlantas::findOrFail($pkPlantas);
        $plantas->activo = $plantas->activo ? 0 : 1;
        $plantas->save();
    }
}
