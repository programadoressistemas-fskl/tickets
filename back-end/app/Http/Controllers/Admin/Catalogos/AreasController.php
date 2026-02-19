<?php

namespace App\Http\Controllers\Admin\Catalogos;

use App\Http\Controllers\Controller;
use App\Services\Admin\Catalogos\AreasService;
use Illuminate\Http\Request;

class AreasController extends Controller
{
    protected $areasService;
    
    public function __construct(
        AreasService $AreasService
    ) {
        $this->areasService = $AreasService;
    }
}
