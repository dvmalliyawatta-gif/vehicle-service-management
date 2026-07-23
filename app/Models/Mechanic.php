<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mechanic extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'employee_id',
        'specialization',
        'contact',
        'address',
    ];

    // Relationship to job_cards will be added later,
    // once the job_cards table is built (Day 4)
}