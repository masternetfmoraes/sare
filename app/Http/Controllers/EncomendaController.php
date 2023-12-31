<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Encomenda;

class EncomendaController extends Controller
{
    //
    public function CadastraEncomenda(Request $request){
        function generateCode($length) {
            $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            $code = '';
            $charactersLength = strlen($characters);
            
            for ($i = 0; $i < $length; $i++) {
                $code .= $characters[rand(0, $charactersLength - 1)];
            }
            
            return $code;
        } 
    
        $GenerateCodEncomenda = generateCode(35);
    
        $gravaencomenda = Encomenda::create([
            'cod_encomenda' => $GenerateCodEncomenda,
            'dados_cliente' => json_encode($request->dados_cliente),
            'dados_entrega' => json_encode($request->dados_entrega),
            'dynamicCardapio' => json_encode($request->dynamicCardapio),
            'observacao' => $request->observacao,
            'dataentrega' => $request->dataentrega,
            'horaentrega' => $request->horaentrega,
            'preco' => $request->preco,
            'situacao'=>'pedido',
            'entregue'=>false
        ]);
    
        return redirect()->route('sucesso');
    }

    public function CardListEncomendas(){
        //$sel = Encomenda::get()->orderBy(desc);
        $sel = Encomenda::orderBy('dataentrega', 'asc')->get();
        return response()->json($sel);
    }
}
