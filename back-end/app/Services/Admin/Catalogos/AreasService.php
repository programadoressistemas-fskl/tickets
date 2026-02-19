<?php

namespace App\Services\Admin\Catalogos;

use App\Repositories\Admin\Catalogos\AreasRepository;

class AreasService
{
    protected $areasRepository;

    public function __construct(
        AreasRepository $AreasRepository
    ) {
        $this->areasRepository = $AreasRepository;
    }

    public function registrarAreas($areas)
    {

        $areas = $this->areasRepository->registrarAreas($areas);

        return response()->json(
            [
                'areas' => $areas, 
                'mensaje' => 'Se Registro Correctamente el Area'
            ]
        );
    }

    public function obtenerInformacionAreas()
    {
        $areas = $this->areasRepository->obtenerInformacionAreas();

        return response()->json(
            [
                'areas' => $areas,
                'mensaje' => 'Se obtuvo la informacion de Areas',
            ]
        );
    }

    public function obtenerInformacionAreasPorPk($pkAreas)
    {
        $areas = $this->areasRepository->obtenerDetallesAreasPorpk($pkAreas);

        return response()->json(
            [
                'areas' => $areas,
                'mensaje' => 'Se obtuvo la informacion correcta'
            ]
        );
    }

    public function actualizarArea($areas)
    {
        $this->areasRepository->actualizarArea($areas['pkAreas'], $areas['areas']);
    }

    public function cambiarStatusArea($id)
    {
        $this->areasRepository->cambiarStatusArea($id);

        return response()->json(
            [
                'mensaje' => 'Se cambio el status de Area con exito',
            ]
        );
    }
}
