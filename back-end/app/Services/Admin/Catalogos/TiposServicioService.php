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

    public function registrarTipoServicio($tiposServicios) {
        $this->tiposServicioRepository->registrarTipoServicio($tiposServicios);

        return response()->json(
            [
                'mensaje' => 'Se registro correctamente el tipo de servicio',
                'title'   => 'Registro exitoso'
            ]
        );
    }

     public function obtenerListaTipoServicio() {
        $tiposServicio = $this->tiposServicioRepository->obtenerListaTipoServicio();

        return response()->json(
            [
                'tiposServicio' => $tiposServicio,
                'mensaje' => 'Se obtuvo la informacion correctamente'
            ]
        );
    }

     public function obtenerDetalleTipoServicio($pkTipoServicio) {
        $tipoServicio = $this->tiposServicioRepository->obtenerDetalleTipoServicio($pkTipoServicio);

        return response()->json(
            [
                'tipoServicio' => $tipoServicio[0],
                'mensaje' => 'Se obtuvo correctamente la informacion'
            ]
        ); 
    }

    public function actualizarTipoServicio($tiposServicio) {
        $this->tiposServicioRepository->actualizarTipoServicio($tiposServicio['pktipoServicio'], $tiposServicio['tiposServicios']);

        return response()->json( 
            [
                'mensaje' => 'Se actualizo correctamente el tipo de servicio'
            ]
        );
    } 

    public function cambiarStatustiposServicio($pkTipoServicio) {
        $this->tiposServicioRepository->cambiarStatustiposServicio($pkTipoServicio);

        return response()->json(
            [
                'mensaje' => 'Se cambio el status del tipo servicio con exito',
            ]
        ); 
    }



}
