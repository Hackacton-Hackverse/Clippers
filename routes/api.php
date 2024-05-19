<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user/token', [UserController::class, 'getUserFromToken'])->middleware('auth:sanctum');


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/token/verify', [UserController::class, 'verifyToken'])->middleware('auth:sanctum');
Route::get('/offres',[\App\Http\Controllers\OffreController::class,'index']);

Route::middleware('auth:sanctum')->group(function () {
	Route::apiResource('/offre',\App\Http\Controllers\OffreController::class);
	Route::apiResource('/conversation',\App\Http\Controllers\ConversationController::class);
	Route::apiResource('/message',\App\Http\Controllers\MessageController::class);
    Route::apiResource('/offre-cv',\App\Http\Controllers\OffreCvController::class);
    Route::apiResource('cv',\App\Http\Controllers\CvController::class);
});
