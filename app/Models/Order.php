<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    //
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'delivery', 'orderType', 'orderTiming', 'displayId',
        'createdAt', 'preparationStartDateTime', 'isTest',
        'merchant', 'customer', 'items', 'salesChannel', 'total',
        'payments', 'additionalInfo',
    ];

    protected $casts = [
        'delivery' => 'json',
        'merchant' => 'json',
        'customer' => 'json',
        'items' => 'json',
        'total' => 'json',
        'payments' => 'json',
        'additionalInfo' => 'json',
    ];
}
