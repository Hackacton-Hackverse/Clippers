<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */


    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */

    public function boot()
    {
        Validator::extend('unique_user_pair', function ($attribute, $value, $parameters, $validator) {
            $otherUserId = $validator->getData()[$parameters[0]];

            // Vérifier si le couple de valeurs n'existe pas déjà dans la base de données
            return !DB::table('conversations')
                ->where(function ($query) use ($value, $otherUserId) {
                    $query->where('user_id1', $value)
                        ->where('user_id2', $otherUserId);
                })
                ->orWhere(function ($query) use ($value, $otherUserId) {
                    $query->where('user_id1', $otherUserId)
                        ->where('user_id2', $value);
                })
                ->exists();
        });
    }

}
