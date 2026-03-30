<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\TblSessions;

class AuthTokenMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // 🔹 Obtener header Authorization
        $header = $request->header('Authorization');

        // 🔹 Validar formato Bearer
        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->json([
                'success' => false,
                'message' => 'Token no proporcionado o formato inválido'
            ], 401);
        }

        // 🔹 Extraer token limpio
        $token = trim(str_replace('Bearer ', '', $header));

        // 🔹 Buscar sesión en BD (token hasheado)
        $session = TblSessions::where('token', hash('sha256', $token))->first();

        // 🔹 Validar existencia de sesión
        if (!$session) {
            return response()->json([
                'success' => false,
                'message' => 'Token inválido o sesión no existe'
            ], 401);
        }

        // Aqui este lo dejo como opcional para Validar expiración
        /*
        if ($session->created_at && now()->diffInHours($session->created_at) > 2) {
            return response()->json([
                'success' => false,
                'message' => 'Sesión expirada'
            ], 401);
        }
        */
        $request->merge([
            'id_usuario_auth' => $session->id_usuario
        ]);

        return $next($request);
    }
}