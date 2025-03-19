<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = 'cart';
    protected $fillable = [
        'user_id', 'quantity', 'product_id'
    ];
    public function cartProducts(){
        return $this->belongsTo('App\Models\Product', "product_id", "id");
    }

}