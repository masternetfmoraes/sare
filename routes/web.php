<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CardapioController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\EncomendaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//cardápio
Route::get('/cardlistcardapio',[CardapioController::class,'cardListCardapio'])->middleware(['auth', 'verified'])->name('cardlistcardapio');
Route::get('/formcadastracardapio',[CardapioController::class,'formCadastraCardapio'])->middleware(['auth', 'verified'])->name('formcadastrarcardapio');
Route::post('/cadastracardapio',[CardapioController::class,'cadastraCardapio'])->middleware(['auth', 'verified'])->name('cadastracardapio');
Route::get('/listarcardapios',function(){
    return Inertia::render('Cardapios');
})->middleware(['auth', 'verified'])->name('listarcardapios');
Route::get('/visuazalizarcardapio/{code}',[CardapioController::class,'visualizarCardapio'])->middleware(['auth', 'verified'])->name('visualizarcardapio');
Route::get('/formeditarcardapio/{code}',[CardapioController::class,'formEditarCardapio'])->middleware(['auth', 'verified'])->name('formeditarcardapio');
Route::post('/editarcardapio',[CardapioController::class,'editarCardapio'])->middleware(['auth', 'verified'])->name('editarcardapio');

Route::get('/apagacardapio/{code}',[CardapioController::class,'apagaCardapio'])->middleware(['auth', 'verified'])->name('apagacardapio');
//
//IFood
Route::get('/ifood',[CardapioController::class,'getStatus'])->name('ifood');
/*
Route::get('/ifood',function(){
    return Inertia::render('IFood');
})->name('ifood');
*/
//Pedidos
Route::get('/pedidos',function(){
    return Inertia::render('Encomendas/DashboardPedidos');
})->middleware(['auth', 'verified'])->name('pedidos'); 


Route::get('comboselectcardapio',[CardapioController::class,'ComboSelectCardapios'])->name('comboselectcardapio');
//Encomenda
Route::get('/encomendas',function(){
    return Inertia::render('Encomendas/DashboardEncomendas');
})->middleware(['auth', 'verified'])->name('pedidos'); 

Route::get('/formcadastrarencomendas',function(){
    return Inertia::render('Encomendas/FormCadastraEncomenda');
})->middleware(['auth', 'verified'])->name('formcadastrarencomendas');
Route::post('/cadastraencomenda',[EncomendaController::class,'CadastraEncomenda'])->middleware(['auth', 'verified'])->name('cadastraencomenda');
//CardListEncomenda
Route::get('/cardlistencomenda',[EncomendaController::class,'CardListEncomendas'])->middleware(['auth', 'verified'])->name('cardlistencomenda');

Route::get('/listarencomenda',function(){
    return Inertia::render('CardListEncomenda');
})->name('listarencomenda');

//Visualizar encomenda
Route::get('/jsonvisualizarencomenda/{cod_encomenda}',[EncomendaController::class,'JsonVisualizarEncomenda'])->middleware(['auth', 'verified'])->name('jsonvisualizarencomenda');
Route::get('/visualizarencomenda/{cod_encomenda}',function(){
    return Inertia::render('Encomendas/VisualizarEncomenda');
})->middleware(['auth', 'verified'])->name('visualizarencomenda');
//successo
Route::get('/sucesso',function(){
    return Inertia::render('Success');
})->name('sucesso');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->middleware(['auth', 'verified'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->middleware(['auth', 'verified'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->middleware(['auth', 'verified'])->name('profile.destroy');         
});

require __DIR__.'/auth.php';
