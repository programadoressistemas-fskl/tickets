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

    public function registrarTicket(Request $request) {
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
            $pkArea = $request->pkArea;
            $pkStatus = $request->pkStatus;

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
}
