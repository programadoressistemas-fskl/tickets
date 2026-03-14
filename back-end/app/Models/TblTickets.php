<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblTickets extends Model
{
    use HasFactory;
    public $timestamps    = false;
    protected $primaryKey = 'id_ticket';
    protected $table      = 'tbl_tickets';

    protected $fillable   = [
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
        'id_status_ticket'
    ];
}
