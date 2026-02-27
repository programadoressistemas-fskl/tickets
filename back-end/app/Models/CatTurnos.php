<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatTurnos extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'id_turno';
    public $table = 'cat_turnos';

    public $fillable   = [
        'id_turno',
        'turno',
        'activo'
    ];
}
