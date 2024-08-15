<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Parables\Cuid\CuidAsPrimaryKey;

class VoteHead extends Model
{
    use HasFactory;
    use SoftDeletes;

    use CuidAsPrimaryKey;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['name','voteheadType','isActive'];
    protected $hidden = ['created_at','updated_at'];
}
