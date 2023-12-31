<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
//
use App\Models\Cardapio;
use App\Models\ItemCardapio;

use GuzzleHttp\Client;

class CardapioController extends Controller
{
    //
    public function formCadastraCardapio(){
        return Inertia::render('FormCadastraCardapio');
    }


    public function cadastraCardapio(Request $request){
        function generateCode($length) {
            $characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            $code = '';
            $charactersLength = strlen($characters);
            
            for ($i = 0; $i < $length; $i++) {
                $code .= $characters[rand(0, $charactersLength - 1)];
            }
            
            return $code;
        }
        $cod_cardapio = generateCode(18);
        
        
        $gravaCardapio= Cardapio::create([
            'cod_cardapio'=>$cod_cardapio,
            'nome_cardapio'=>$request->nome_cardapio,
            'categoria_cardapio'=>$request->categoria_cardapio,
            'preco_cardapio'=>$request->preco_cardapio,
            'serve_quantos'=>$request->serve_quantos,
        ]);
        
        $dadosDinamicos = $request->dynamicFields;

        foreach ($dadosDinamicos as $dados) {
            // Adicione os campos necessários ao array $dados
            $cod_item_cardapio = generateCode(18);
            $dados['cod_cardapio'] = $cod_cardapio;  // Substitua 'valor_cod_cardapio' pelo valor desejado
            $dados['cod_item_cardapio'] = $cod_item_cardapio;  // Substitua 'valor_cod_item_cardapio' pelo valor desejado
        
            // Crie o item do cardápio no banco de dados
            ItemCardapio::create($dados);
            //
        }
        return Inertia::render('Msg/MsgCadastroSuccesso');      
    }

    public function cardListCardapio(){
        //$sel = Cardapio::all();
      $sel = Cardapio::join('items_cardapio','cardapios.cod_cardapio','=','items_cardapio.cod_cardapio')
      ->select('cardapios.*','items_cardapio.*')
      //->disctinct()
      //->groupBy('cardapios.nome_cardapio')
      ->orderBy('cardapios.nome_cardapio','asc')
      ->get();
        return response()->json($sel);
    }
    public function visualizarCardapio($code){
        $sel = Cardapio::join('items_cardapio','cardapios.cod_cardapio','=','items_cardapio.cod_cardapio')
      ->select('cardapios.*','items_cardapio.*')
      //->disctinct()
      //->groupBy('cardapios.nome_cardapio')
      ->where('cardapios.cod_cardapio','=',$code)
      ->orderBy('cardapios.nome_cardapio','asc')
      ->get();
        //return response()->json($sel);
        if(count($sel)===0){
            return Inertia::render('Msg/CardapioNotFound');
          }else{
            return Inertia::render('VisualizaCardapio',['sel'=>$sel]);
          }
    }
    public function formEditarCardapio($code){
        $sel = Cardapio::join('items_cardapio','cardapios.cod_cardapio','=','items_cardapio.cod_cardapio')
      ->select('cardapios.*','items_cardapio.*')
      ->where('cardapios.cod_cardapio','=',$code)
      ->orderBy('cardapios.nome_cardapio','asc')
      ->get();
      if(count($sel)===0){
        return Inertia::render('Msg/CardapioNotFound');
      }else{
        return Inertia::render('FormEditarCardapio',['sel'=>$sel]);
      }
    }
    public function editarCardapio(Request $request){
      $dadosPedido = $request->cod_item_cardapio;
      $verificaCardapio = Cardapio::where('cod_cardapio','=',$request->cod_cardapio)
      ->first();
      if($verificaCardapio){
        $conditionUpdateCardapio = ['cod_cardapio'=>$request->cod_cardapio];
        $arrayCardapio = [
          'cod_cardapio'=>$request->cod_cardapio,
          'nome_cardapio'=>$request->nome_cardapio,
          'preco_cardapio'=>$request->preco_cardapio,
          'categoria_cardapio'=>$request->categoria_cardapio,
          'serve_quantos'=>$request->serve_quantos,
        ];

        Cardapio::updateOrInsert($conditionUpdateCardapio, $arrayCardapio);
        foreach ($dadosPedido as $index => $codItemCardapio) {
          $item = [
            'cod_cardapio' => $request->cod_cardapio,
            'cod_item_cardapio' => $codItemCardapio,
            'titulo_item_cardapio' => $request->titulo_item_cardapio[$index],
            'quantidade_item_cardapio' => $request->quantidade_item_cardapio[$index],
          ];
          // Condição para a atualização: onde 'cod_item_cardapio' é igual a $codItemCardapio
          $condition = ['cod_item_cardapio' => $codItemCardapio];
          // Atualizar ou inserir
          ItemCardapio::updateOrInsert($condition, $item);
        }
        return Inertia::render('Msg/CardapioAtualizadoSucesso');
      }else{
        return Inertia::render('Msg/CardapioNotFound');
      }
      /*
      foreach ($dadosPedido as $index => $codItemCardapio) {
        $item = [
          'cod_cardapio' => $request->cod_cardapio,
          'cod_item_cardapio' => $codItemCardapio,
          'titulo_item_cardapio' => $request->titulo_item_cardapio[$index],
          'quantidade_item_cardapio' => $request->quantidade_item_cardapio[$index],
        ];
        // Condição para a atualização: onde 'cod_item_cardapio' é igual a $codItemCardapio
        $condition = ['cod_item_cardapio' => $codItemCardapio];
        // Atualizar ou inserir
        ItemCardapio::updateOrInsert($condition, $item);
      }
      */
    }
    public function apagaCardapio($code){
        $sel = Cardapio::join('items_cardapio','cardapios.cod_cardapio','=','items_cardapio.cod_cardapio')
      ->select('cardapios.*','items_cardapio.*')
      ->where('cardapios.cod_cardapio','=',$code)
      ->orderBy('cardapios.nome_cardapio','asc')
      ->get();
      if(count($sel)===0){
        return Inertia::render('Msg/CardapioNotFound');
      }else{
        ItemCardapio::where('cod_cardapio', '=', $code)->delete();
        Cardapio::where('cod_cardapio', '=', $code)->delete();
        return Inertia::render('Msg/MsgCardapioSucessoApagado');
      }
        //return Inertia::render('FormEditarCardapio',['sel'=>$sel]);
    }
    
    //Passar dadso para o Select "Combo" de Cardapios
    public function ComboSelectCardapios(){
      $sel = Cardapio::
      orderBy('nome_cardapio','asc')
      ->get();
        //return response()->json($sel);
        if(count($sel)===0){
            return Inertia::render('Msg/CardapioNotFound');
          }else{
            //return Inertia::render('VisualizaCardapio',['sel'=>$sel]);
            return response()->json($sel);
          }
    }
    //
    //ifood
    public function getStatus()
    {
        //$url = 'https://merchant-api.ifood.com.br/merchant/v1.0/merchants?page=1&size=2';
        //$url = 'https://merchant-api.ifood.com.br/order/v1.0/events:polling?types=PLC%2CREC%2CCFM&groups=ORDER_STATUS%2CDELIVERY';
        $url ='https://merchant-api.ifood.com.br/order/v1.0/orders/ebcf06a2-67ab-40cd-b77e-8758eabb38ed';
        //$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJlNjkwYjczZC01OTI4LTRkMTctODE2ZC01Y2Y5YjgyZTJhOWUiLCJhdWQiOiJvcmRlciIsInVzZXJfbmFtZSI6ImU2OTBiNzNkLTU5MjgtNGQxNy04MTZkLTVjZjliODJlMmE5ZSIsInNjb3BlIjpbIm9yZGVyIl0sInRlbmFudElkIjoiNmFjNjkxZDEtMjZjNi00ZmVkLWJmN2ItOTEwMzJkNTM4NWZkIiwiaXNzIjoiaUZvb2QiLCJtZXJjaGFudF9zY29wZSI6WyI2YjQ4N2EyNy1jNGZjLTRmMjYtYjA1ZS0zOTY3YzIzMzE4ODI6b3JkZXIiXSwiZXhwIjoxNjEyMjMwNDU5LCJpYXQiOjE2MTIyMDg4NTksIm1lcmNoYW50X3Njb3BlZCI6dHJ1ZSwiY2xpZW50X2lkIjoiZTY5MGI3M2QtNTkyOC00ZDE3LTgxNmQtNWNmOWI4MmUyYTllIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DTElFTlQiXX0.lYqdxjHoOksq8COqJ-VZxzd524MhVzH7hkMfp5zGTpqzp26z5XJwOPHAy7L6oyagUgRfxntKeu0Up_JHgJ-Vr0h5Y9wY4XHcK1yxpFXFB5f5ilGDB0hVN3UGa4GBqeVpCbAPQUl4VhbF2byeL9PuO4TfTZmoWyuec9-xEH_nbHg'; // Substitua pelo seu token real
        $token ='eyJraWQiOiJlZGI4NWY2Mi00ZWY5LTExZTktODY0Ny1kNjYzYmQ4NzNkOTMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJjM2JjOGFhMS1lZWVkLTRjNTgtOWZkMS1lOTc3ZDYxYzIwODciLCJvd25lcl9uYW1lIjoiYWNtZSIsImlzcyI6ImlGb29kIiwiY2xpZW50X2lkIjoiOTExMjFlZGItZGViMC00NjkxLTkxOWMtODk2NjI3YWNkMzYzIiwiYXBwX25hbWUiOiJhY21lLXRlc3RlLWQiLCJhdWQiOlsic2hpcHBpbmciLCJjYXRhbG9nIiwiZmluYW5jaWFsIiwicmV2aWV3IiwibWVyY2hhbnQiLCJvcmRlciIsIm9hdXRoLXNlcnZlciJdLCJzY29wZSI6WyJtZXJjaGFudCIsInNoaXBwaW5nIiwiY2F0YWxvZyIsInJldmlldyIsImNvbmNpbGlhdG9yIiwib3JkZXIiXSwidHZlciI6InYyIiwibWVyY2hhbnRfc2NvcGUiOlsiZjBhODNjZGMtNmEyNi00NmJjLTkyNjQtNmU1NzdiYjg4MTM3Om1lcmNoYW50IiwiZjBhODNjZGMtNmEyNi00NmJjLTkyNjQtNmU1NzdiYjg4MTM3Om9yZGVyIiwiZjBhODNjZGMtNmEyNi00NmJjLTkyNjQtNmU1NzdiYjg4MTM3OmNhdGFsb2ciLCJmMGE4M2NkYy02YTI2LTQ2YmMtOTI2NC02ZTU3N2JiODgxMzc6Y29uY2lsaWF0b3IiLCJmMGE4M2NkYy02YTI2LTQ2YmMtOTI2NC02ZTU3N2JiODgxMzc6cmV2aWV3IiwiZjBhODNjZGMtNmEyNi00NmJjLTkyNjQtNmU1NzdiYjg4MTM3OnNoaXBwaW5nIl0sImV4cCI6MTY5OTMwMDAwOSwiaWF0IjoxNjk5Mjc4NDA5LCJqdGkiOiJjM2JjOGFhMS1lZWVkLTRjNTgtOWZkMS1lOTc3ZDYxYzIwODc6OTExMjFlZGItZGViMC00NjkxLTkxOWMtODk2NjI3YWNkMzYzIiwibWVyY2hhbnRfc2NvcGVkIjp0cnVlfQ.glMy2FeueJq3g-4XTct74sVNejXqSnDvN1su0Vh7uABa3rYSEcwK0GTdB2_W4bBGfPV2ID0Xy42WUjhGWOaFsjzR9ofDKUVNT0NPk6RmR1kS_EFr6PsDJlA--2yIIADcTlsJnOUJak0zzGv88j3zqMx03GzLUGj0HNtTGYxov4Y';
        $client = new Client();

        try {
            $response = $client->get($url, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Content-Type' => 'application/json',
                ],
            ]);
            $data = json_decode($response->getBody(), true);
            //dd($data);
            //return response()->json($data);
            return response()->json($data, 200, [], JSON_PRETTY_PRINT);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
