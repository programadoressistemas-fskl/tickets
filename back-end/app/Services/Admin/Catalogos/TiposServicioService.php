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

    public function registrarTipoServicio($tiposServicios)
    {
        $this->tiposServicioRepository->registrarTipoServicio($tiposServicios);

        return response()->json(
            [
                'mensaje' => 'Se registro el tipo de servicio con éxito',
                'title'   => 'Registro exitoso'
            ]
        );
    }

    public function obtenerListaTipoServicio()
    {
        $tiposServicio = $this->tiposServicioRepository->obtenerListaTipoServicio();

        return response()->json(
            [
                'tiposServicio' => $tiposServicio,
                'mensaje'       => 'Se obtuvo la informacion de tipo Servicio'
            ]
        );
    }

    public function obtenerDetalleTipoServicio($pkTipoServicio)
    {
        $tipoServicio = $this->tiposServicioRepository->obtenerDetalleTipoServicio($pkTipoServicio);

        return response()->json(
            [
                'tipoServicio' => $tipoServicio[0],
                'mensaje'      => 'Se obtuvo correctamente la informacion'
            ]
        );
    }
    public function actualizarTipoServicio($tiposServicio)
    {

        $this->tiposServicioRepository->actualizarTipoServicio($tiposServicio['pkTipoServicio'], $tiposServicio['tiposServicio']
        );

        return response()->json([
            'title'   => 'Actualización con éxito',
            'mensaje' => 'Se actualizó correctamente el tipo de servicio'
        ]);
    }

    public function cambiarStatustiposServicio($pkTipoServicio)
    {
      $status =  $this->tiposServicioRepository->cambiarStatustiposServicio($pkTipoServicio);

        return response()->json(
            [
                'title'   => ($status ? 'Activar' : 'Inactivar').' tipo servicio',
                'mensaje' => 'Se '.($status ? 'activo' : 'inactivo').' el tipo servicio con éxito'
            ]
        );
    }
}
