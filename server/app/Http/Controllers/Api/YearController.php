<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class YearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(),[
            'name' => ['required','unique:years'],
            'start_date' => ['required','date','before_or_equal:end_date'],
            'end_date' => ['required']
        ]);

        if($validator->fails()){
            return response()->json(['status' => 422,
                                     'message' => 'validation error.Check your input and try again.',
                                    'errors' => $validator->errors()],422);
        }

        $year = Year::create([
            'name'=> $request->name,
            'start_date' => date('Y-m-d',strtotime($request->start_date)),
            'end_date' => date('Y-m-d',strtotime($request->end_date)),
            'created_by' => $request->user()->id,
        ]);

        return response()->json(['message' => 'Year created successfully.','data' => $year],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
