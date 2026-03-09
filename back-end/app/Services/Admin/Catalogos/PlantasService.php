<?php

namespace App\Services\Admin\Catalogos;

use App\Repositories\Admin\Catalogos\PlantasRepository;

class PlantasService
{
    protected $plantasRepository;

    public function __construct(
        PlantasRepository $PlantasRepository
    ) {
        $this->plantasRepository = $PlantasRepository;
    }

    public function registrarPlanta($plantas) {
       $pkPlanta = $this->plantasRepository->registrarPlanta($plantas);

        return response()->json(
            [
                'pkPlanta' => $pkPlanta,
                'mensaje'  => 'Se registro correctamente la planta',
                'title'    => 'Registro exitoso'
            ]
        );
    }

    public function obtenerListaPlantas() {
        $plantas = $this->plantasRepository->obtenerListaPlantas();

        return response()->json(
            [
                'plantas' => $plantas,
                'mensaje' => 'Se obtuvo la informacion correctamente'
            ]
        );
    }

    public function obtenerDetallePlanta($pkPlantas) {
        $plantas = $this->plantasRepository->obtenerDetallePlanta($pkPlantas);

        return response()->json(
            [
                'planta' => $plantas[0],
                'mensaje' => 'Se obtuvo correctamente la informacion'
            ]
        );
    }

    public function actualizarPlanta($planta) {
        $this->plantasRepository->actualizarPlanta($planta['pkPlanta'], $planta['planta']);

        return response()->json(
            [
                'title'   => 'Actualización exitosa',
                'mensaje' => 'Se actualizo correctamente la planta'
            ]
        );
    }

    public function cambiarStatusPlanta($pkPlantas) {
       $status = $this->plantasRepository->cambiarStatusPlanta($pkPlantas);

        return response()->json(
            [
                'title'   => ($status ? 'Activar' : 'Inactivar').' planta',
                'mensaje' => 'Se '.($status ? 'activo' : 'inactivo').' la planta con éxito'
            ]
        );
    }
}
