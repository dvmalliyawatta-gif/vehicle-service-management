<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    // Fields allowed to be mass-assigned (e.g. Customer::create([...]))
    // Security best practice: only these fields can be set this way
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'notes',
    ];

    /**
     * A customer can own many vehicles.
     */
    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }
}