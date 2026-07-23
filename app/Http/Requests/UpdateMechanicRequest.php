<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMechanicRequest extends FormRequest
{
    // actual permission check is handled by MechanicPolicy
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            // unique, but ignore this mechanic's own current row
            // ($this->mechanic refers to the mechanic being updated,
            // passed in automatically via route model binding)
            'employee_id' => [
                'required',
                'string',
                'max:50',
                Rule::unique('mechanics', 'employee_id')->ignore($this->mechanic),
            ],

            // optional — may not be assigned immediately
            'specialization' => ['nullable', 'string', 'max:255'],

            // phone number, same 10-digit format as customer phone
            'contact' => ['required', 'string', 'regex:/^[0-9]{10}$/'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Mechanic name is required.',
            'employee_id.required' => 'Employee ID is required.',
            'employee_id.unique' => 'This employee ID is already assigned to another mechanic.',
            'contact.required' => 'Contact number is required.',
            'contact.regex' => 'Contact number must be exactly 10 digits.',
        ];
    }
}