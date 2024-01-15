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
        Schema::create('cardapios', function (Blueprint $table) {
            $table->id();
            $table->string('cod_cardapio', 255)->unique(); // Adicione um índice único aqui
            $table->string('nome_cardapio', 60);
            $table->string('categoria_cardapio');
            $table->decimal('preco_cardapio', 10, 2);
            $table->string('serve_quantos')->nullable();
            $table->boolean('disponivel_cardapio')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cardapios');
    }
};
