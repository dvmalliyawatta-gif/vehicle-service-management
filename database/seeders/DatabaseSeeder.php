<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create the 3 roles: admin, service-advisor, mechanic
        $this->call([
            RoleSeeder::class,
        ]);

        // Admin test user
        $admin = User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'test@example.com',
        ]);
        $admin->assignRole('admin');

        // Service Advisor test user
        $advisor = User::factory()->create([
            'name' => 'Test Advisor',
            'email' => 'advisor@example.com',
        ]);
        $advisor->assignRole('service-advisor');

        // Mechanic test user
        $mechanic = User::factory()->create([
            'name' => 'Test Mechanic',
            'email' => 'mechanic@example.com',
        ]);
        $mechanic->assignRole('mechanic');
    }
}