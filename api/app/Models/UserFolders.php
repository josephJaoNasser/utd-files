<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFolders extends Model
{
    use HasFactory;

    public $table = 'user_folders';

    protected $fillable = [
        'account_id',
        'uuid'
    ];
}
