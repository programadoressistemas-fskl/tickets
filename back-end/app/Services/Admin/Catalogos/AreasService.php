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

    public function registrarAreas($areas) {

        $areas = $this->areasRepository->registrarAreas($areas);

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

    public function obtenerDetalleArea($pkAreas) {
        $areas = $this->areasRepository->obtenerDetalleArea($pkAreas);

        return response()->json(
            [
                'areas' => $areas,
                'mensaje' => 'Se obtuvo la informacion correcta'
            ]
        );
    }

    public function actualizarAreas($areas) {
        $this->areasRepository->actualizarAreas($areas['pkAreas'], $areas['areas']);

        return response()->json(
            [
                'mensajes' => 'Se actualizo correctamente el area'
            ]
        ); 
    } 

    public function cambiarStatusArea($id) {
        $this->areasRepository->cambiarStatusArea($id);

        return response()->json(
            [
                'mensaje' => 'Se cambio el status de Area con exito',
            ]
        );
    }
}
