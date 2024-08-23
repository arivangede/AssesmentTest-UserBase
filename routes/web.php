<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// homepage
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// auth
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/register', [AuthController::class, 'register']);
Route::get('/verify-email/{token}', [AuthController::class, 'verifyEmail']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::post('/logout', [AuthController::class, 'logout']);
