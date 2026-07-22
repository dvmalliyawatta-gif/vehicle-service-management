<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * We return true here because the actual permission check
     * (who can create a customer) is already handled by CustomerPolicy.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // Name is required, must be text, max 255 characters (standard DB limit)
            'name' => ['required', 'string', 'max:255'],

            // Email is required, must look like a valid email, and must be
            // unique in the customers table (no duplicate customer records)
            'email' => ['required','email','regex:/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/','unique:customers,email'],

            // regex ensures exactly 10 digits, numbers only — matches Sri Lankan phone format
            'phone' => ['required', 'string', 'regex:/^[0-9]{10}$/'],

            // Address is optional (nullable) — customer may not provide it immediately
            'address' => ['nullable', 'string'],

            // Notes is optional (nullable) — advisor may add notes later
            'notes' => ['nullable', 'string'],
        ];
    }

    /**
     * Custom error messages (optional, but improves user experience
     * by showing clearer messages than Laravel's generic defaults).
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Customer name is required.',
            'email.required' => 'Customer email is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email is already registered to another customer.',
            'email.regex' => 'Please enter a complete email address (e.g. name@example.com).',
            'phone.required' => 'Customer phone number is required.',
            'phone.regex' => 'Phone number must be exactly 10 digits.',
        ];
    }
}