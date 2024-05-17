<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('/offre',\App\Http\Controllers\OffreController::class);
Route::resource('/conversation',\App\Http\Controllers\ConversationController::class);
Route::resource('/message',\App\Http\Controllers\MessageController::class);
Route::middleware('auth:sanctum')->group(function () {
});
