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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('cod_user')->unique();
            $table->string('type_user');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('status_user')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });
        //adicionar ass foreign keys
        /*
        Schema::table('tabela1', function (Blueprint $table) {
            $table->foreign('cod_user')->references('cod_user')->on('users');
        });

        Schema::table('tabela2', function (Blueprint $table) {
            $table->foreign('cod_user')->references('cod_user')->on('users');
        });
        */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
