<?php

use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VoteheadController;
use App\Http\Controllers\Api\YearController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/users',[UserController::class,'store']);
    Route::get('/users',[UserController::class,'index']);
    Route::get('members/memberNo', [MemberController::class, 'getNextMemberNo']);

    Route::apiResource('years',YearController::class);
    Route::apiResource('voteheads',VoteheadController::class);
    Route::apiResource('members',MemberController::class);
    Route::get('members/memberNo', [MemberController::class, 'getNextMemberNo']);
});