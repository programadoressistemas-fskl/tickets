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

    public function registrarPlantas($plantas)
    {

        $this->plantasRepository->registrarPlantas($plantas);

        return response()->json(
            [
                'plantas' => $plantas,
                'mensaje' => 'Se registro correctamente la planta'
            ]
        );
    }

    public function obtenerInformacionPlantas()
    {
        $plantas = $this->plantasRepository->obtenerInformacionPlantas();

        return response()->json(
            [
                'plantas' => $plantas,
                'mensaje' => 'Se obtuvo la informacion correctamente'
            ]
        );
    }

    public function obtenerDetallePlantasPorPk($pkPlantas)
    {
        $plantas = $this->plantasRepository->obtenerInformacionPlantas($pkPlantas);

        return response()->json(
            [
                'plantas' => $plantas,
                'mensaje' => 'Se obtuvo correctamente la informacion'
            ]
        );
    }

    public function actualizarPlanta($plantas) 
    {
        $this->plantasRepository->actualizarPlanta($plantas['pkPlantas'], $plantas['plantas']);

        return response()->json(
            [
                'mensaje' => 'Se actualizo correctamente la planta'
            ]
        );
    }

    public function cambiarStatusPlanta($id) 
    {
        $this->plantasRepository->cambiarStatusPlanta($id);

        return response()->json(
            [
                'mensaje' => 'Se cambio el status de la planta con exito',
            ]
        );
    }
}
