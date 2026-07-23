<?php

namespace App\Services;

use App\Models\Mechanic;

class MechanicService
{
    /**
     * Create a new mechanic record.
     */
    public function create(array $data): Mechanic
    {
        return Mechanic::create($data);
    }

    /**
     * Update an existing mechanic record.
     */
    public function update(Mechanic $mechanic, array $data): Mechanic
    {
        $mechanic->update($data);

        return $mechanic;
    }

    /**
     * Delete a mechanic record.
     */
    public function delete(Mechanic $mechanic): void
    {
        $mechanic->delete();
    }
}