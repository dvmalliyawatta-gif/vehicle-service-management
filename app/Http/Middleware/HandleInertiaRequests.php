<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     * These are available on EVERY Inertia page automatically,
     * accessible in React via usePage().props
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                // The logged-in user's basic info (name, email, id, etc.)
                'user' => $user,

                // The user's role names as a simple list, e.g. ['admin']
                // Comes from Spatie's HasRoles trait on the User model.
                // If no user is logged in, default to an empty array.
                'roles' => $user ? $user->getRoleNames() : [],
            ],
        ];
    }
}