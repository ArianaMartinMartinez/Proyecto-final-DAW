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
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('animal_type', ['dog', 'cat', 'rodent', 'bird']);
            $table->string('breed');
            $table->enum('gender', ['male', 'female']);
            $table->date('date_birth');
            $table->text('description');
            $table->string('photo')->nullable();
            $table->bigInteger('shelter_id')->unsigned();
            $table->timestamps();

            $table->foreign('shelter_id')->references('id')->on('shelters')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
