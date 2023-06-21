<?php

namespace Database\Factories;

use App\Models\Shelter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Animal>
 */
class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'animal_type' => fake()->randomElement(['dog', 'cat', 'rodent', 'bird']),
            'breed' => ucfirst(fake()->words(rand(2, 5), true)),
            'gender' => fake()->randomElement(['male', 'female']),
            'date_birth' => fake()->date('Y-m-d', 'now'),
            'description' => fake()->text(300),
            'shelter_id' => Shelter::all()->random()->id,
        ];
    }
}
