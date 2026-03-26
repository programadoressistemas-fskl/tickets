<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class StaticTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');

        if (!$token || $token !== 'Bearer ' . env('API_STATIC_TOKEN')) {
            return response()->json([
                'title'   => 'Acceso no autorizado',
                'message' => 'Token invalido'], 401);
        }
       
        return $next($request);
    }
}
