<?php

namespace App\Repositories\Admin\Tickets;

use App\Models\TblTickets;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TicketsRepository
{
    public function registrarTicket($ticket)
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
    }

    public function obtenerListaGeneralTickets()
    {
        $query = TblTickets::select(
            'id_ticket',
            'id_area',
            'id_planta',
            'id_turno',
            'id_tipo_servicio',
            'id_cat_status',
            'descripcion_problema',
            'fecha_registro',
            'fecha_inicio',
            'fecha_finalizacion',
            'activo',
            DB::ram("        
                            CASE 
                            WHEN activo = 1 THEN 'Activo'
                            ELSE 'Inactivo'
                            END as estado
            ")
        );

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
            'id_cat_status',
            'descripcion_problema',
            'fecha_registro',
            'fecha_inicio',
            'fecha_finalizacion',
        );
        return $query->get();
    }

    public function actualizarTicket($id, $ticket)
    {
        $actualizar = TblTickets::findOrFail($id);
        $actualizar->ticket = $ticket['ticket'];
        $actualizar->save();
    }

    public function cambiarStatusTicket($pkTicket, $status) {
        $ticket = TblTickets::findOrFail($pkTicket);

        $ticket->id_status_ticket = $status;
        $ticket->save();
    }
}
