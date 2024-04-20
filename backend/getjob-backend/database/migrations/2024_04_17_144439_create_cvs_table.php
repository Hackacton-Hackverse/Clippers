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
        Schema::create('cvs', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->uuid('uuid_user');
            $table->string('name');
            $table->string('surname')->nullable();
            $table->string('email')->unique();
            $table->Integer('tel')->nullable();
            $table->date('dob');
            $table->string('wakatime')->nullable();
            $table->string('git')->nullable();
            $table->string('facebook')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('instagram')->nullable();
            $table->string('twitter')->nullable();
            $table->string('photo_path')->nullable();
            $table->timestamps();



            $table->foreign('uuid_user')
                ->references('uuid')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cvs');
    }
};
