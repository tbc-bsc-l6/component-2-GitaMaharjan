<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        // Create the 'Token' table
        Schema::create('Token', function (Blueprint $table) {
            $table->id(); // Auto-incremental primary key
            $table->integer("user_id"); // Foreign key to associate with users
            $table->longText("token_id"); // Token data
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    public function down(): void
    {
        // Drop the 'Token' table if it exists
        Schema::dropIfExists('Token');
    }
};