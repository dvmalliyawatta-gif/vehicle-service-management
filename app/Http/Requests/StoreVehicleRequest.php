<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    // actual permission check is handled by VehiclePolicy
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // must be a real, existing customer
            'customer_id' => ['required', 'exists:customers,id'],

            // legal plate number, must be unique across all vehicles
            'registration_no' => ['required', 'string', 'max:20', 'unique:vehicles,registration_no'],

            'make' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],

            // reasonable year range: 1900 to current year
            'year' => ['required', 'integer', 'min:1900', 'max:' . date('Y')],

            // VIN is typically 17 characters, must be unique
            'vin' => ['required', 'string', 'max:17', 'unique:vehicles,vin'],

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