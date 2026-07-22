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
                Rule::unique('customers', 'email')->ignore($this->customer),
            ],

            'phone' => ['required', 'string', 'max:20'],
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
            'phone.required' => 'Customer phone number is required.',
        ];
    }
}