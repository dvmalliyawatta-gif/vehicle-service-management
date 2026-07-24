<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    /**
     * Create a new user account and assign them a role.
     *
     * @param array $data Contains: name, email, password, role
     */
    public function create(array $data): User
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // assign the selected role (admin / service-advisor / mechanic)
        $user->assignRole($data['role']);

        return $user;
    }

    /**
     * Update a user's details and/or role.
     * Password is only updated if a new one was provided.
     */
    public function update(User $user, array $data): User
    {
        $user->name = $data['name'];
        $user->email = $data['email'];

        if (!empty($data['password'])) {
            $user->password = bcrypt($data['password']);
        }

        $user->save();

        // syncRoles replaces all current roles with the new one —
        // ensures a user only ever has exactly one role at a time
        $user->syncRoles([$data['role']]);

        return $user;
    }

    /**
     * Delete a user account.
     */
    public function delete(User $user): void
    {
        $user->delete();
    }
}