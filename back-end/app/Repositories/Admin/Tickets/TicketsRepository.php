<?php

namespace App\Repositories\Admin\Tickets;

use Illuminate\Support\Facades\Auth;

use App\Models\TblTickets;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TicketsRepository
{
    public function registrarTicket($ticket, $files)
    {
        $registro = new TblTickets();
        $userId = request()->id_usuario_auth;

        $registro->id_area                 = $ticket['id_area'];
        $registro->id_planta               = $ticket['id_planta'];
        $registro->id_turno                = $ticket['id_turno'];
        $registro->id_tipo_servicio        = $ticket['id_tipo_servicio'];
        $registro->id_status_ticket        = 1;
        $registro->descripcion_problema    = $ticket['descripcion_problema'];
        $registro->id_usuario_registro     = $userId;
        $registro->fecha_registro          = Carbon::now();
        $registro->id_usuario_inicio       = 1;
        $registro->fecha_inicio            = Carbon::now();
        $registro->id_usuario_cancelacion  = 1;
        $registro->fecha_cancelacion       = Carbon::now();
        $registro->id_usuario_finalizacion = 1;
        $registro->fecha_finalizacion      = Carbon::now();
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

    public function obtenerDetalleTicket($pkTicket)
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
            'fecha_finalizacion'
        )
            ->where('tbl_tickets.id_ticket', $pkTicket);
        return $query->get();
    }

    public function obtenerEvidenciasTicket($pkTicket)
    {
        $query = DB::table('tbl_tickets_evidencia')
            ->select('url_evidencia')
            ->where('id_ticket', $pkTicket);

        return $query->pluck('url_evidencia');
    }

    public function actualizarTicket($id, $ticket)
    {
        $ticket = TblTickets::findOrFail($id);

        $ticket->id_area              = $ticket['id_area'];
        $ticket->id_planta            = $ticket['id_planta'];
        $ticket->id_turno             = $ticket['id_turno'];
        $ticket->id_tipo_servicio     = $ticket['id_tipo_servicio'];
        $ticket->id_status_ticket     = $ticket['id_status_ticket'];
        $ticket->descripcion_problema = $ticket['descripcion_problema'];

        $ticket->save();
    }

    public function actualizarEvidencias($id_ticket, $evidencias)
    {

        DB::table('tbl_tickets_evidencia')
            ->where('id_ticket', $id_ticket)
            ->delete();

        foreach ($evidencias as $url_evidencia) {

            DB::table('tbl_tickets_evidencia')->insert([
                'id_ticket'     => $id_ticket,
                'url_evidencia' => $url_evidencia
            ]);
        }
    }

    public function cambiarStatusTicket($pkTicket, $status)
    {
        $ticket = TblTickets::findOrFail($pkTicket);

        $ticket->id_status_ticket = $status;
        $ticket->save();
    }
}
