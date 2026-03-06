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

        $pkArea = $this->areasRepository->registrarArea($areas);

        return response()->json(
            [
                'pkArea'  => $pkArea,
                'mensaje' => 'Se Registro Correctamente el Area',
                'title'   => 'Registro exitoso'
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
        $area = $this->areasRepository->obtenerDetalleArea($pkArea);

        return response()->json(
            [
                'area' => $area[0],
                'mensaje' => 'Se obtuvo la informacion correcta'
            ]
        );
    }

    public function actualizarArea($area) {
        $this->areasRepository->actualizarArea($area['pkArea'], $area['area']);

        return response()->json(
            [
                'title'    => 'Actualización exitosa',
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
