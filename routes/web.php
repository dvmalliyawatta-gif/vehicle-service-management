<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public welcome page — anyone can see this, logged in or not
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard — any logged-in, verified user can see this
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile management — any logged-in user can edit their own profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Customer management — ONLY Admin and Service Advisor can access these routes.
// The 'role:' middleware checks against the roles we seeded earlier.
// Mechanics will be blocked from even loading these pages.
Route::middleware(['auth', 'role:admin,service-advisor'])->group(function () {
    Route::resource('customers', CustomerController::class);
});

require __DIR__.'/auth.php';