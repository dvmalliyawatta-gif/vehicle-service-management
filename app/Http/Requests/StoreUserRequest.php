<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    // actual permission check is handled by UserPolicy
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            // must be unique across all users
            'email' => ['required', 'email', 'unique:users,email'],

            // Password::defaults() applies Laravel's standard security rules
            // (min length, etc.) — consistent with how Breeze validates passwords
            'password' => ['required', Password::defaults()],

            // must be one of our 3 defined roles — nothing else allowed
            'role' => ['required', 'in:admin,service-advisor,mechanic'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',
            'email.required' => 'Email is required.',
            'email.unique' => 'This email is already registered to another user.',
            'password.required' => 'Password is required.',
            'role.required' => 'Please select a role.',
            'role.in' => 'Please select a valid role.',
        ];
    }
}