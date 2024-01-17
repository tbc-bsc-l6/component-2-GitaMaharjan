<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
use App\Models\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Product::class;

    public function definition(): array
    {
        $category = Category::factory()->create();

        return [
            'name'=>  $this->faker->word,
            'image'=>  $this->faker->imageUrl(),
            'description'=>  $this->faker->word,
            'quantity'=>  $this->faker->numberBetween(1,300),
            'price'=>  $this->faker->randomFloat(2,10,100),
            'category_id' => $category->id, // Use the created category's id
            'discount_id'=>  $this->faker->randomFloat(2,0,10),

        ];
    }
}