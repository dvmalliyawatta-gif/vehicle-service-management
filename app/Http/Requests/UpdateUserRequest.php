<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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

            // unique, but ignore this user's own current row
            // ($this->user refers to the user being updated,
            // passed in automatically via route model binding)
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($this->user),
            ],

            // password is OPTIONAL when editing — only validated if provided
            // (admin might just want to change the role, not reset the password)
            'password' => ['nullable', Password::defaults()],

            'role' => ['required', 'in:admin,service-advisor,mechanic'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',
            'email.required' => 'Email is required.',
            'email.unique' => 'This email is already registered to another user.',
            'role.required' => 'Please select a role.',
            'role.in' => 'Please select a valid role.',
        ];
    }
}