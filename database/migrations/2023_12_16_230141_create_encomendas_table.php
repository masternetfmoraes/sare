<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('encomendas', function (Blueprint $table) {
            $table->id();
            $table->string('cod_encomenda');
            $table->json('dados_cliente');
            $table->json('dados_entrega');
            $table->json('dynamicCardapio');
            $table->string('observacao')->nullable();
            $table->date('dataentrega');
            $table->time('horaentrega');
            $table->decimal('preco', 10, 2);
            $table->string('situacao'); // preparando, empacotando
            $table->boolean('entregue')->default(false); // Define o padrão como false
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('encomendas');
    }
};
