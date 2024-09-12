<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Member;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function members(Request $request)
    {
        $query = Member::query();
        
        if($request->report_type === 'by-status'){
            $query->where('status',$request->status);
        }elseif($request->report_type === 'by-registration'){
            $query->where('joining_date','>=',date('Y-m-d',strtotime($request->from)))
                  ->where('joining_date','<=',date('Y-m-d',strtotime($request->to)));
        }
        
        $members = $query->where('is_deleted',0)->get();
        return response()->json(['data' => $members],200);
    }

    public function expenses(Request $request)
    {
        $query = Expense::query()->select('date','amount',
                                         'payment_method',
                                         'vote_heads.name as votehead_name',
                                         'members.name as member_name',
                                         'payment_reference',
                                         'reference',
                                         'description',
                                        )
                                 ->join('vote_heads','vote_heads.id','expenses.votehead_id')
                                 ->join('members','members.id','expenses.member_id')
                                 ->where('expenses.is_deleted',0)
                                 ->where('date','>=',date('Y-m-d',strtotime($request->from)))
                                 ->where('date','<=',date('Y-m-d',strtotime($request->to)));
        if($request->report_type === 'by-method'){
            $query->where('payment_method',$request->params);
        }elseif($request->report_type === 'by-votehead'){
            $query->where('votehead_id',$request->params);
        }
        $expenses = $query->orderBy('date','asc')->get();
        return response()->json(['data' => $expenses],200);
    }
        
}
