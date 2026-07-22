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
        Schema::create('mechanics', function (Blueprint $table) {
            $table->id();

            $table->string('name');                       // mechanic's full name
            $table->string('employee_id')->unique();       // internal staff ID, must be unique
            $table->string('specialization')->nullable();  // e.g. "Engine", "Electrical" — optional
            $table->string('contact');                      // phone number or contact info

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mechanics');
    }
};