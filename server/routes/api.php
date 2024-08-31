<?php

use App\Http\Controllers\Api\BudgetController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\SmsController;
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
    Route::get('members/activeMembers', [MemberController::class, 'activeMembers']);
    Route::get('voteheads/byType',[VoteheadController::class,'voteheadByType']);
    Route::get('years/activeYears', [YearController::class, 'activeYears']);

    Route::apiResource('years',YearController::class);
    Route::apiResource('voteheads',VoteheadController::class);
    Route::apiResource('members',MemberController::class);
    Route::apiResource('expenses',ExpenseController::class);
    Route::apiResource('budgets',BudgetController::class);

    Route::post('/send-sms',[SmsController::class,'sendSms']);
});

Route::get('/test',[BudgetController::class,'index']);