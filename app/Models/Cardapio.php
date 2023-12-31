<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cardapio extends Model
{
    use HasFactory;
    protected $table = 'cardapios';
    protected $fillable = [
        'cod_cardapio',
        'nome_cardapio',
        'categoria_cardapio',
        'preco_cardapio',
        'disponivel_cardapio',
        'serve_quantos',
    ]; 
    /*
    public function items()
    {
        return $this->hasMany(ItemsCardapio::class, 'cod_cardapio', 'cod_cardapio');
    }
    */
}
