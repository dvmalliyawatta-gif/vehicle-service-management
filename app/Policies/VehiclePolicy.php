<?php

namespace App\Policies;

use App\Models\User;

class VehiclePolicy
{
    // Admin, Advisor & Mechanic can all view vehicles
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service-advisor', 'mechanic']);
    }

    public function view(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service-advisor', 'mechanic']);
    }

    // Only Admin & Advisor can add new vehicles
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service-advisor']);
    }

    // Only Admin & Advisor can edit vehicle details
    public function update(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service-advisor']);
    }

    // Only Admin can delete a vehicle
    public function delete(User $user): bool
    {
        return $user->hasRole('admin');
    }
}