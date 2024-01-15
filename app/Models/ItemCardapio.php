<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemCardapio extends Model
{
    use HasFactory;
    protected $table = 'items_cardapio';
    protected $fillable = [
        'cod_item_cardapio',
        'cod_cardapio',
        'titulo_item_cardapio',
        'quantidade_item_cardapio'
    ];

    public function cardapio()
    {
        return $this->belongsTo(Cardapio::class, 'cod_cardapio', 'cod_cardapio');
    }
}
