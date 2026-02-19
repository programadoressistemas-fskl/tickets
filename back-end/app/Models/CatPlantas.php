<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatPlantas extends Model
{
    use HasFactory;
    public $timestamps  = false;
    public $table       = 'cat_plantas';

    protected $fillable = [
        'id_planta',
        'planta',
        'abrev',
        'direccion',
        'activo'
    ];
}
