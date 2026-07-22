<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'registration_no',
        'make',
        'model',
        'year',
        'vin',
        'mileage',
    ];

    /**
     * Each vehicle belongs to exactly one customer.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}