<?php

namespace App\Services\Admin\Tickets;

use Illuminate\Http\Request;
use App\Repositories\Admin\Catalogos\AreasRepository;
use App\Repositories\Admin\Catalogos\PlantasRepository;
use App\Repositories\Admin\Catalogos\TiposServicioRepository;
use App\Repositories\Admin\Catalogos\TurnosRepository;
use App\Repositories\Admin\Tickets\TicketsRepository;
use Illuminate\Support\Facades\Log;

class TicketsService
{
    protected $ticketsRepository;
    protected $areasRepository;
    protected $plantasRepository;
    protected $turnosRepository;
    protected $tiposServicioRepository;

    public function __construct(
        TicketsRepository $TicketsRepository,
        AreasRepository   $AreasRepository,
        PlantasRepository $PlantasRepository,
        TurnosRepository  $TurnosRepository,
        TiposServicioRepository $TiposServicioRepository
    ) {
        $this->ticketsRepository = $TicketsRepository;
        $this->areasRepository   = $AreasRepository;
        $this->plantasRepository = $PlantasRepository;
        $this->turnosRepository  = $TurnosRepository;
        $this->tiposServicioRepository = $TiposServicioRepository;
    }

    public function obtenerRecursosRegistroTicket()
    {
        $areas   = $this->areasRepository->obtenerListaAreas();
        $plantas = $this->plantasRepository->obtenerListaPlantas();
        $turnos  = $this->turnosRepository->obtenerLIstaTurnos();
        $tiposServicio = $this->tiposServicioRepository->obtenerListaTipoServicio();

        return response()->json(
            [
                'mensaje'  => 'Se obtuvo los recursos correctamente',
                'recursos' => [
                    'listaareas'   => $areas,
                    'listaplantas' => $plantas,
                    'listaturnos'  => $turnos,
                    'listatiposServicio' => $tiposServicio,
                ]
            ]
        );
    }

    public function registrarTicket($ticket, $files)
    {

        $this->ticketsRepository->registrarTicket($ticket, $files);

        return response()->json(
            [
                'mensaje' => 'Se registro el ticket con éxito',
                'title'   => 'Registro exitoso'
            ]
        );
    } 

    public function cancelarTicket($id_ticket) {
        $tickets = $this->ticketsRepository->cancelarTicket($id_ticket);

        return response()->json(
            [
                'tickets' => $tickets,
                'mensaje' => 'Se ha cancelado con exito el ticket'
            ]
        );
    } 

    public function obtenerStatusTickets()
    {
        $tickets = $this->ticketsRepository->obtenerStatusTickets();

        return response()->json(
            [
                'tickets' => $tickets,
                'mensaje' => 'Se obtuvo la informacion de tickets',
            ]
        );
    }


    public function obtenerListaGeneralTickets($pkArea, $pkStatus)
    {
        $tickets = $this->ticketsRepository->obtenerListaGeneralTickets($pkArea, $pkStatus);

        return response()->json([
            'tickets' => $tickets,
            'mensaje' => 'Se obtuvo la informacion de tickets',
        ]);
    }

    public function obtenerDetalleTicket($pkTickets)
    {
        $ticket = $this->ticketsRepository->obtenerDetalleTicket($pkTickets);
        $evidencias = $this->ticketsRepository->obtenerEvidenciasTicket($pkTickets);

        return response()->json(
            [
                'ticket'      => $ticket[0],
                'evidencias'  => $evidencias,
                'mensaje'     => 'Se obtuvo la informacion correcta'
            ]
        );
    } 

    public function eliminarEvidenciaTicket($id) {
        $evidencia = $this->ticketsRepository->eliminarEvidenciaTicket($id);

        return response()->json(
            [
                'evidencias' => $evidencia,
                'mensaje'    => 'Evidencia eliminada correctamente'
            ]
        );
    }

    public function actualizarTicket($ticket)
    {
        $id = $ticket['pkTicket'];

        $this->ticketsRepository->actualizarTicket($id, $ticket);

        if (request()->hasFile('images')) {
            $rutas = [];

            foreach (request()->file('images') as $file) {
                $ruta = $file->store('tickets', 'public');
                $rutas[] = $ruta;
            }

            $this->ticketsRepository->actualizarEvidencias($id, $rutas);
        }

        return response()->json([
            'title'    => 'Actualización exitosa',
            'mensajes' => 'Se actualizó correctamente el ticket',
            'pkTicket' => $id
        ]);
    } 

    public function cambiarStatusTicket($pkTicket, $status)
    {
        $status = $this->ticketsRepository->cambiarStatusTicket($pkTicket, $status);

        return response()->json(
            [
                'title'   => ($status ? '' : '') . ' ticket',
                'mensaje' => 'Se' . ($status ? '' : '') . ' el ticket con éxito'
            ]
        );
    } 
}