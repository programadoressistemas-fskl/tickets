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

    public function registrarArea($areas) {

        $areas = $this->areasRepository->registrarArea($areas);

        return response()->json(
            [
                'areas' => $areas, 
                'mensaje' => 'Se Registro Correctamente el Area'
            ]
        );
    }

    public function obtenerListaAreas() {
        $areas = $this->areasRepository->obtenerListaAreas();

        return response()->json(
            [
                'areas' => $areas,
                'mensaje' => 'Se obtuvo la informacion de Areas',
            ]
        );
    }

    public function obtenerDetalleArea($pkArea) {
        $areas = $this->areasRepository->obtenerDetalleArea($pkArea);

        return response()->json(
            [
                'areas' => $areas,
                'mensaje' => 'Se obtuvo la informacion correcta'
            ]
        );
    }

    public function actualizarAreas($areas) {
        $this->areasRepository->actualizarAreas($areas['pkArea'], $areas['areas']);

        return response()->json(
            [
                'mensajes' => 'Se actualizo correctamente el area'
            ]
        ); 
    } 

    public function cambiarStatusArea($pkArea) {
        $this->areasRepository->cambiarStatusArea($pkArea);

        return response()->json(
            [
                'mensaje' => 'Se cambio el status de Area con exito',
            ]
        );
    }
}
