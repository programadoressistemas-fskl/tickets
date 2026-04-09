<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblTicketsAsignacion extends Model
{
    use HasFactory;
    public $timestamps    = false;
    protected $primaryKey = 'id_ticket_asignacion';
    protected $table      = 'tbl_tickets_asignacion';

    protected $fillable   = [
        'id_ticket_asignacion', 
        'id_ticket',
        'id_usuario',
        'fecha_finalizacion'
    ];
}
