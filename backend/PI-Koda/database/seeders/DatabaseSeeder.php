<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Animal;
use App\Models\AnimalUser;
use App\Models\Article;
use App\Models\City;
use App\Models\Shelter;
use App\Models\User;
use Database\Factories\AnimalFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        self::seedCities();
        $this->command->info('Cities table filled with data');

        self::seedUsers();
        //User::factory(30)->create();
        $this->command->info('Users table filled with data');

        Shelter::factory(20)->create();
        $this->command->info('Shelters table filled with data');

        Animal::factory(100)->create();
        $this->command->info('Animals table filled with data');

        AnimalUser::factory(20)->create();
        $this->command->info('AnimalUser table filled with data');

        Article::factory(10)->create();
        $this->command->info('Articles table filled with data');
    }

    private function seedCities() {
        foreach ($this->cities as $city) {
            City::factory()->create([
                'name' => $city,
            ]);
        }
    }

    private function seedUsers() {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'user_role' => 'admin',
            'password' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Shelter',
            'email' => 'shelter@example.com',
            'user_role' => 'shelter',
            'password' => 'shelter',
        ]);

        User::factory()->create([
            'name' => 'Adopter',
            'email' => 'adopter@example.com',
            'user_role' => 'adopter',
            'password' => 'adopter',
        ]);
    }

    private $cities = array(
        'A Coruña', 'Alava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Avila',
        'Badajoz', 'Barcelona', 'Burgos',
        'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca',
        'Formentera',
        'Girona', 'Granada', 'Guadalajara', 'Guipuzcoa',
        'Huelva', 'Huesca',
        'Ibiza',
        'Jaén',
        'La Rioja', 'Las Palmas de Gran Canaria', 'León', 'Lérida', 'Lugo',
        'Madrid', 'Málaga', 'Mallorca', 'Menorca', 'Murcia',
        'Navarra',
        'Orense',
        'Palencia', 'Pontevedra',
        'Salamanca', 'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria',
        'Tarragona', 'Teruel', 'Toledo',
        'Valencia', 'Valladolid', 'Vizcaya',
        'Zamora', 'Zaragoza',
    );
}
