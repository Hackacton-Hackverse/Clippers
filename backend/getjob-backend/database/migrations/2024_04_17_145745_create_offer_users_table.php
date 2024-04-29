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
        Schema::create('offer_users', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->unsignedBigInteger('id_offer');
            $table->uuid('uuid_user');
            $table->string('state')->default('pending');
            $table->timestamps();

            $table->unique(['id_offer', 'uuid_user']);

            $table->foreign('id_offer')
                ->references('id')->on('offres')
                ->onDelete('cascade')
                ->onUpdate('cascade');

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
        Schema::dropIfExists('offer_users');
    }
};
