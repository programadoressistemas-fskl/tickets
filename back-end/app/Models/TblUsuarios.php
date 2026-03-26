<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class TblUsuarios extends Model
{
    use HasFactory;
    public $timestamps    = false;
    protected $primaryKey = 'id_usuario';
    protected $table      = 'tbl_usuarios';

    protected $fillable   = [
        'id_usuario',
        'nombre',
        'a_paterno',
        'a_materno',
        'numero_telefono',
        'correo_electronico',
        'password',
        'id_area',
        'puesto',
        'id_usuario_registro',
        'fecha_registro',
        'activo',
    ];
}
