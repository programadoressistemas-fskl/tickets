<?php

namespace App\Services\Admin\Catalogos;

use App\Repositories\Admin\Catalogos\TiposServicioRepository;

class TiposServicioService
{
    protected $tiposServicioRepository;

    public function __construct(
        TiposServicioRepository $tiposServicioRepository
    ) {
        $this->tiposServicioRepository = $tiposServicioRepository;
    }

    public function registrartiposServicio($tiposServicios) {
        $this->tiposServicioRepository->registrartiposServicio($tiposServicios);

        return response()->json(
            [
                'tiposServicios' => $tiposServicios,
                'mensaje'        => 'Se registro correctamente el tipo de servicio'
            ]
        );
    }

     public function obtenerListatiposServicio() {
        $usuario = $this->tiposServicioRepository->obtenerListatiposServicio();

        return response()->json(
            [
                'usuarios' => $usuario,
                'mensaje' => 'Se obtuvo la informacion correctamente'
            ]
        );
    }

     public function obtenerDetalletiposServicio($pktiposServicio) {
        $pktiposServicio = $this->tiposServicioRepository->obtenerDetalletiposServicio($pktiposServicio);

        return response()->json(
            [
                'pktiposServicio' => $pktiposServicio,
                'mensaje' => 'Se obtuvo correctamente la informacion'
            ]
        ); 
    }

    public function actualizartiposServicio($tiposServicio) {
        $this->tiposServicioRepository->actualizartiposServicio($tiposServicio['pktipoServicio'], $tiposServicio['tiposServicios']);

        return response()->json( 
            [
                'mensaje' => 'Se actualizo correctamente el tipo de servicio'
            ]
        );
    } 

    public function cambiarStatustiposServicio($id) {
        $this->tiposServicioRepository->cambiarStatustiposServicio($id);

        return response()->json(
            [
                'mensaje' => 'Se cambio el status del tipo servicio con exito',
            ]
        );
    }



}
