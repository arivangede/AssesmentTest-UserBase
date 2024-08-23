<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class LogHttpRequests
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Log informasi permintaan
        Log::info('Request Log:', [
            'method' => $request->getMethod(),    // Metode HTTP (GET, POST, dll.)
            'url' => $request->fullUrl(),         // URL lengkap dari permintaan
            'body' => $request->all(),            // Semua data body dari permintaan
            'headers' => $request->headers->all() // Semua header dari permintaan
        ]);

        // Lanjutkan ke middleware berikutnya
        return $next($request);
    }
}
