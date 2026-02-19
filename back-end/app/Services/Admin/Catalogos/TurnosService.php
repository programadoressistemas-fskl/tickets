<?php

namespace App\Services\Admin\Catalogos;

use App\Repositories\Admin\Catalogos\TurnosRepository;

class TurnosService
{
    protected $turnosRepository;

    public function __construct(
        TurnosRepository $TurnosRepository
    )
    {
        $this->turnosRepository = $TurnosRepository;
    }

    public function registrarTurnos($turnos){
        $turnos = $this->turnosRepository->registrarTurnos($turnos);

        return response()->json(
            [
                'turnos'  => $turnos,
                'mensaje' => 'Se registro corectamente el turno',
            ]
        );
    }
}
