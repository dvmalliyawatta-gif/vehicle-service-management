<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * Actual permission check is handled separately by CustomerPolicy.
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
            'name' => ['required', 'string', 'max:255'],

            // Email must be unique, BUT we ignore the current customer's
            // own row — otherwise saving without changing the email
            // would incorrectly fail as "duplicate".
            // $this->customer refers to the customer being updated,
            // passed in automatically via route model binding.
            'email' => [
                            'required',
                            'email',
                            'regex:/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/',
                            Rule::unique('customers', 'email')->ignore($this->customer),
                        ],

            'phone' => ['required', 'string', 'regex:/^[0-9]{10}$/'],
            'address' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ];
    }

    /**
     * Custom error messages for clearer feedback.
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