<?php

namespace App\Services;

use App\Models\Vehicle;

class VehicleService
{
    /**
     * Create a new vehicle record.
     */
    public function create(array $data): Vehicle
    {
        return Vehicle::create($data);
    }

    /**
     * Update an existing vehicle record.
     */
    public function update(Vehicle $vehicle, array $data): Vehicle
    {
        $vehicle->update($data);

        return $vehicle;
    }

    /**
     * Delete a vehicle record.
     */
    public function delete(Vehicle $vehicle): void
    {
        $vehicle->delete();
    }
}