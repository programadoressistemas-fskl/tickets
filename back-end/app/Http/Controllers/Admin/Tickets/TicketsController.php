<?php

namespace App\Http\Controllers\Admin\Tickets;

use App\Http\Controllers\Controller;
use App\Services\Admin\Tickets\TicketsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TicketsController extends Controller
{
    protected $ticketsService;

    public function __construct(
        TicketsService $TicketsService
    ) {
        $this->ticketsService = $TicketsService;
    }

    public function obtenerRecursosRegistroTicket()
    {
        try {
            return $this->ticketsService->obtenerRecursosRegistroTicket();
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de Recursos registro tickets');
            Log::alert($error);
            return response()->json(
                [
                    'error' => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ],
                500
            );
        }
    }

    public function registrarTicket(Request $request)
    {
        try {

            $ticket = $request->all();
            $files  = $request->file('images');

            return $this->ticketsService->registrarTicket($ticket, $files);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al registrar el Ticket');
            Log::alert($error);

            return response()->json([
                'error' => $error,
                'mensaje' => 'Ocurrió un error interno'
            ], 400);
        }
    }

    public function cancelarTicket($id_ticket)
    {
        try {

            $ticket = $this->ticketsService->cancelarTicket($id_ticket);

            return response()->json([
                'ticket' => $ticket,
                'mensaje' => 'Se ha cancelado con éxito el ticket'
            ]);
        } catch (\Throwable $error) {

            Log::alert('*********************************************');
            Log::alert('Error al cancelar ticket');
            Log::alert($error->getMessage());

            return response()->json([
                'mensaje' => $error->getMessage()
            ], 400);
        }
    }

    public function obtenerStatusTickets()
    {
        try {
            return $this->ticketsService->obtenerStatusTickets();
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de Status Ticket');
            Log::alert($error);
            return response()->json(
                [
                    'error' => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ],
                500
            );
        }
    }

    public function obtenerListaGeneralTickets(Request $request)
    {
        try {
            $pkArea = $request->all()['pkArea'];
            $pkStatus = $request->all()['pkStatus'];

            return $this->ticketsService->obtenerListaGeneralTickets($pkArea, $pkStatus);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de Tickets');
            Log::alert($error);

            return response()->json(
                [
                    'error' => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ],
                500
            );
        }
    }

    public function obtenerDetalleTicket($pkTicket)
    {
        try {
            return $this->ticketsService->obtenerDetalleTicket($pkTicket);
        } catch (\Throwable $error) {
            Log::alert('*********************************************');
            Log::alert('Error al obtener información de Ticket porPK');
            Log::alert($error);

            return response()->json(
                [
                    'error' => $error,
                    'mensaje' => 'Ocurrió un error interno'
                ],
                500
            );
        }
    }

    public function actualizarTicket(Request $request)
    {
        try {

            $data = $request->all();

            return $this->ticketsService->actualizarTicket($data);
        } catch (\Throwable $error) {

            Log::alert('*********************************************');
            Log::alert('Error al actualizar ticket');
            Log::alert($error->getMessage());

            return response()->json([
                'mensaje' => 'Ocurrió un error interno'
            ], 500);
        }
    }
}
