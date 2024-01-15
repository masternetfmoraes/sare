import React, { useState, useEffect, ReactNode } from 'react';
import PrimaryButton from './PrimaryButton';

// ... (importações omitidas para brevidade)

type CardapioListTypes = {
  nome_cardapio: string;
  preco_cardapio: string;
  titulo_item_cardapio: string;
  cod_cardapio: string;
  serve_quantos:string;
  quantidade_item_cardapio: string;
};

type CardapioAgrupado = {
    [chave: string]: CardapioListTypes[]; // ou qualquer outro tipo que você espera aqui
    
  };

export default function CardListCardapios({}: CardapioListTypes) {
  const [loading, setLoading] = useState(true);
  const [cardapio, setCardapio] = useState<CardapioListTypes[]>([]);
  
  
  const [showPopups, setShowPopups] = useState<{ [codCardapio: string]: boolean }>({});

  const showModal = (codCardapio: string) => {
    setShowPopups((prevShowPopups) => ({
      ...prevShowPopups,
      [codCardapio]: true,
    }));
  };

  const closeModal = (codCardapio: string) => {
    setShowPopups((prevShowPopups) => ({
      ...prevShowPopups,
      [codCardapio]: false,
    }));
  };

  useEffect(() => {
    fetch(`/cardlistcardapio`)
      .then((response) => response.json())
      .then((data) => {
        setCardapio(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  }, []);

  // Função para agrupar os cardápios por nome e preço
  const groupByNomePrecoCardapio = (array: CardapioListTypes[]): CardapioAgrupado => {
    const result: CardapioAgrupado = {};
    
    array.forEach((item) => {
      const chave = `${item.nome_cardapio}*${item.preco_cardapio}*${item.cod_cardapio}*${item.serve_quantos}`;
      if (!result[chave]) {
        result[chave] = [];
      }
      result[chave].push(item);
    });
    return result;
  };
  
  // Obtém os cardápios agrupados por nome e preço
  const cardapiosAgrupados: CardapioAgrupado = groupByNomePrecoCardapio(cardapio);
  //conta o numero de cardapios 
  const contarCardapiosUnicos = () => {
    const nomesCardapio = new Set();

    cardapio.forEach((item: { cod_cardapio: unknown; }) => {
      nomesCardapio.add(item.cod_cardapio);
    });

    return nomesCardapio.size;
  };
  return (
    <>
    <div className="bg-white rounded-xl p-5 shadow-md">
      
      {loading ? (
        // Exiba um indicador de carregamento enquanto os dados estão sendo buscados
        <div className="flex justify-center p-12">
        <div className='' role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        </div>
      ) : (
        // Renderiza os cardápios agrupados
        <>
        <p className="text-sm text-end">Cardápios cadastradados: {contarCardapiosUnicos()}</p>
        {cardapio.length === 0 ?(<div className='py-5'>
        <p className="text-red-600 py-5">Não existe cardápio cadastrado!</p>
        <a href="/formcadastracardapio" 
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Cadastrar Cardápio
        </a>
        </div>):(<>
          {Object.keys(cardapiosAgrupados).map((chave) => {
            const [nomeCardapio, precoCardapio,codCardapio,servequantos] = chave.split('*');
            
            return (
              <div key={chave} className="w-[100%] my-1 p-3 bg-white shadow rounded">
                <div className="flex justify-between">
                <p className="text-xl ">Cardápio: {nomeCardapio}</p>
                <p className="text-lg">Preço: {precoCardapio}</p>
                </div>
                <hr />
                {cardapiosAgrupados[chave].map((item: {
                  quantidade_item_cardapio: ReactNode; cod_cardapio: React.Key | null | undefined; titulo_item_cardapio: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
                }) => (
                    <div key={item.cod_cardapio} className="flex justify-between pt-2">
                      <p className="text-base">{item.titulo_item_cardapio}</p>
                      <p className="text-base">{item.quantidade_item_cardapio}</p>
                    </div>
                ))}
                <>
                <hr className='my-3' />
                <div className="flex justify-end">
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <a href={`/visuazalizarcardapio/${codCardapio}`} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                      Visualizar{}
                    </a>
                    <a href={`/formeditarcardapio/${codCardapio}`} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                      Editar
                    </a>
                    <button onClick={() => showModal(codCardapio)} type='button' className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-gray-200 rounded-r-md hover:bg-red-600 hover:text-yellow-300  focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                      Apagar
                    </button>
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                {/* ... */}
              </div>
                  </div>
                </div>
                <p className="t">Serve {servequantos} pessoas</p>
                </>
              </div>
            );
          })}
          </>)}
        </>
      )}
      </div>
      <>
      {Object.keys(showPopups).map((codCardapio) => (
        <>
        <div 
        key={codCardapio}
        id={`popup-modal-${codCardapio}`}
         className={`${showPopups[codCardapio] ? 'block' : 'hidden '} fixed inset-0 top-0 left-0 z-50 
         inset-0 bg-opacity-50 backdrop-blur-lg flex justify-center h-screen
         `}>
            <div className="relative w-full max-w-md max-h-full top-[50%] left-0 ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={() => closeModal(codCardapio)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Você tem certea que deseja apagar esse cardápio?
                        </h3>
                        <a href={`/apagacardapio/${codCardapio}`} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Sim, tenho certeza
                        </a>
                        <button onClick={() => closeModal(codCardapio)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                         Cancela</button>
                    </div>
                </div>
            </div>
        </div>
        </>
      ))}
      </>
    </>
  );
}
