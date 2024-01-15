<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Encomenda extends Model
{
    use HasFactory;
    protected $table = 'encomendas';

    protected $fillable = [
        'cod_encomenda',
        'dados_cliente',
        'dados_entrega',
        'dynamicCardapio',
        'observacao',
        'dataentrega',
        'horaentrega',
        'preco',
        'situacao',
        'entregue',
    ];
}
