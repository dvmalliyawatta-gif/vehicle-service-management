<?php

namespace App\Services;

use App\Models\Customer;

class CustomerService
{
    /**
     * Create a new customer record.
     *
     * @param array $data Already-validated data from StoreCustomerRequest
     */
    public function create(array $data): Customer
    {
        // Customer::create() uses the $fillable array we defined
        // in the Customer model to safely mass-assign these fields
        return Customer::create($data);
    }

    /**
     * Update an existing customer record.
     *
     * @param Customer $customer The customer being updated
     * @param array $data Already-validated data from UpdateCustomerRequest
     */
    public function update(Customer $customer, array $data): Customer
    {
        $customer->update($data);

        return $customer;
    }

    /**
     * Delete a customer record.
     * Note: vehicles belonging to this customer will also be deleted,
     * because of the onDelete('cascade') rule set in the vehicles migration.
     */
    public function delete(Customer $customer): void
    {
        $customer->delete();
    }
}