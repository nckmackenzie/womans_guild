<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Parables\Cuid\CuidAsPrimaryKey;

class Member extends Model
{
    protected $keyType = 'string';

    use HasFactory, CuidAsPrimaryKey;

    public $incrementing = false;
    
    protected $fillable = ['member_no','name','status','contact','birth_date','id_number','joining_date','is_deleted'];
    protected $hidden = ['created_at','updated_at','is_deleted'];
}
