<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // public function up(): void
    // {
    //     Schema::create('products', function (Blueprint $table) {
    //         $table->id();
    //         $table->string('name');
    //         $table->longText("description");
    //         $table->integer("price");
    //         $table->integer("quantity");
    //         $table->string('file')->nullable(); // Add this line for the file path
    //         $table->timestamps();
    //     });
    // }

    // /**
    //  * Reverse the migrations.
    //  */
    // public function down(): void
    // {
    //     Schema::dropIfExists('products');
    // }

    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string("image");
            // $table->string('image')->nullable();

            
            $table->longText("description");
            $table->integer("quantity");
            $table->integer("price");
            $table->foreignId('category_id');
            $table->integer('discount_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }


};