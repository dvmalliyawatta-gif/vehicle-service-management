<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();

            // Foreign key linking this vehicle to its owner (customer).
            // constrained() automatically references customers.id
            // onDelete('cascade') means: if a customer is deleted, their vehicles are deleted too
            $table->foreignId('customer_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('registration_no')->unique(); // legal plate number, must be unique
            $table->string('make');                       // e.g. Toyota, Honda
            $table->string('model');                       // e.g. Corolla, Civic
            $table->year('year');                           // manufacture year
            $table->string('vin')->unique();                // Vehicle Identification Number, globally unique
            $table->integer('mileage')->default(0);         // current odometer reading, starts at 0
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};