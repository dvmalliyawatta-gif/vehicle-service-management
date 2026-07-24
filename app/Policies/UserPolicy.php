<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    // Only Admin can see the full user list
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin');
    }

    // Only Admin can view a single user's details
    public function view(User $user): bool
    {
        return $user->hasRole('admin');
    }

    // Only Admin can create new user accounts
    public function create(User $user): bool
    {
        return $user->hasRole('admin');
    }

    // Only Admin can edit a user's role/details
    public function update(User $user): bool
    {
        return $user->hasRole('admin');
    }

    // Only Admin can delete a user account,
    // but an Admin cannot delete their own account
    // (prevents accidental system lockout — see targetUser param below)
    public function delete(User $user, User $targetUser): bool
    {
        return $user->hasRole('admin') && $user->id !== $targetUser->id;
    }
}