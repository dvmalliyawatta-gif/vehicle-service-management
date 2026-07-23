<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVehicleRequest extends FormRequest
{
    // actual permission check is handled by VehiclePolicy
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_id' => ['required', 'exists:customers,id'],

            // unique, but ignore this vehicle's own current row
            // ($this->vehicle refers to the vehicle being updated,
            // passed in automatically via route model binding)
            'registration_no' => [
                'required',
                'string',
                'max:20',
                Rule::unique('vehicles', 'registration_no')->ignore($this->vehicle),
            ],

            'make' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'year' => ['required', 'integer', 'min:1900', 'max:' . date('Y')],

            'vin' => [
                'required',
                'string',
                'max:17',
                Rule::unique('vehicles', 'vin')->ignore($this->vehicle),
            ],

            'mileage' => ['required', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'customer_id.required' => 'Please select a customer.',
            'customer_id.exists' => 'The selected customer does not exist.',
            'registration_no.required' => 'Registration number is required.',
            'registration_no.unique' => 'This registration number is already registered to another vehicle.',
            'make.required' => 'Vehicle make is required.',
            'model.required' => 'Vehicle model is required.',
            'year.required' => 'Vehicle year is required.',
            'year.min' => 'Please enter a valid year.',
            'year.max' => 'Year cannot be in the future.',
            'vin.required' => 'VIN is required.',
            'vin.unique' => 'This VIN is already registered to another vehicle.',
            'mileage.required' => 'Mileage is required.',
            'mileage.min' => 'Mileage cannot be negative.',
        ];
    }
}