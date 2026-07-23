<?php

namespace App\Policies;

use App\Models\User;

class MechanicPolicy
{
    // Admin & Advisor can see the mechanic list
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service-advisor']);
    }

    // Admin & Advisor can view a single mechanic's details
    public function view(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service-advisor']);
    }

    // Only Admin can add new mechanics
    public function create(User $user): bool
    {
        return $user->hasRole('admin');
    }

    // Only Admin can edit mechanic details
    public function update(User $user): bool
    {
        return $user->hasRole('admin');
    }

    // Only Admin can delete a mechanic
    public function delete(User $user): bool
    {
        return $user->hasRole('admin');
    }
}