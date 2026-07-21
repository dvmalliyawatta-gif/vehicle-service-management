<?php

namespace App\Policies;

use App\Models\User;

class CustomerPolicy
{
    // Admin & Advisor can see the customer list
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service-advisor']);
    }

    // Admin & Advisor can view a single customer
    public function view(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service-advisor']);
    }

    // Admin & Advisor can add new customers
    public function create(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service-advisor']);
    }

    // Admin & Advisor can edit customer details
    public function update(User $user): bool
    {
        return $user->hasAnyRole(['admin', 'service-advisor']);
    }

    // Only Admin can delete a customer (protects against accidental data loss)
    public function delete(User $user): bool
    {
        return $user->hasRole('admin');
    }
}