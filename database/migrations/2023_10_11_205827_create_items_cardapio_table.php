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
        Schema::create('items_cardapio', function (Blueprint $table) {
            $table->id();
            $table->string('cod_item_cardapio', 255);
            $table->string('cod_cardapio', 255);
            $table->string('titulo_item_cardapio');
            $table->string('quantidade_item_cardapio')->nullable();

            $table->timestamps();

            // Chave estrangeira
            $table->foreign('cod_cardapio')->references('cod_cardapio')->on('cardapios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items_cardapio');
    }
};
