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
        Schema::create('offre_cvs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('offer_id');
            $table->unsignedBigInteger('cv_id');
            $table->string('state')->default('en attente');
            $table->timestamps();

            $table->unique(['offer_id', 'cv_id']);

            $table->foreign('offer_id')
                ->references('id')->on('offres')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('cv_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_cvs');
    }
};
