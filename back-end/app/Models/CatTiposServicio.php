<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatTiposServicio extends Model
{
    use HasFactory;
    public  $timestamps = false;
    protected $primaryKey = 'id_tipo_servicio';
    public  $table      = 'cat_tipo_servicio';

    protected $fillable = [
        'id_tipo_servicio',
        'tipo_servicio',
        'descripcion',
        'activo'
    ];
}
