<?php

namespace App\Repositories\Admin\Tickets;

use App\Models\TblTickets;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TicketsRepository
{
    public function registrarTicket($ticket, $files)
    {
        $registro = new TblTickets();

        $registro->id_area              = $ticket['id_area'];
        $registro->id_planta            = $ticket['id_planta'];
        $registro->id_turno             = $ticket['id_turno'];
        $registro->id_tipo_servicio     = $ticket['id_tipo_servicio'];
        $registro->id_status_ticket     = 1;
        $registro->descripcion_problema = $ticket['descripcion_problema'];
        $registro->fecha_registro       = Carbon::now();
        $registro->save();

        if ($files) {
            foreach ($files as $file) {

                $filename = time() . '_' . $file->getClientOriginalName();

                $path = $file->storeAs('tickets', $filename, 'public');

                DB::table('tbl_tickets_evidencia')->insert([
                    'id_ticket'     => $registro->id_ticket,
                    'url_evidencia' => $path
                ]);
            }
        }

        return $registro;
    }

    public function obtenerStatusTickets()
    {
        return DB::table('Cat_Status_Ticket')
            ->get();
    }

    public function obtenerListaGeneralTickets($pkArea, $pkStatus)
    {
        $query = TblTickets::select(
            'tbl_tickets.id_ticket',
            'cat_areas.area',
            'cat_plantas.planta',
            'cat_tipo_servicio.tipo_servicio',
            'Cat_Status_Ticket.status',
            'tbl_tickets.descripcion_problema',
            'tbl_tickets.fecha_registro',
            'tbl_tickets.fecha_inicio',
            'tbl_tickets.fecha_finalizacion',
        )
            ->join('cat_areas',         'cat_areas.id_area',                  'tbl_tickets.id_area')
            ->join('cat_plantas',       'cat_plantas.id_planta',              'tbl_tickets.id_planta')
            ->join('cat_tipo_servicio', 'cat_tipo_servicio.id_tipo_servicio', 'tbl_tickets.id_tipo_servicio')
            ->join('Cat_Status_Ticket', 'Cat_Status_Ticket.id_status_ticket', 'tbl_tickets.id_status_ticket')
            ->where([
                ['tbl_tickets.id_area', $pkArea],
                ['tbl_tickets.id_status_ticket', $pkStatus]
            ]);
        return $query->get();
    }

    public function obtenerDetalleTicketPorId($pkTicket)
    {
        $query = TblTickets::select(
            'id_ticket',
            'id_area',
            'id_planta',
            'id_turno',
            'id_tipo_servicio',
            'id_status_ticket',
            'descripcion_problema',
            'fecha_registro',
            'fecha_inicio',
            'fecha_finalizacion',
        )

        ->where('id_usuario', $pkTicket);
        return $query->get();
    }

    public function actualizarTicket($id, $ticket)
    {
        $actualizar = TblTickets::findOrFail($id);
        $actualizar->ticket = $ticket['ticket'];
        $actualizar->save();
    }

    public function cambiarStatusTicket($pkTicket, $status)
    {
        $ticket = TblTickets::findOrFail($pkTicket);

        $ticket->id_status_ticket = $status;
        $ticket->save();
    }
}
