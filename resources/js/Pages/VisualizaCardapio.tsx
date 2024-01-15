import React, { useState, useEffect} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head } from "@inertiajs/react";
//import React from "react";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

type VisualizarCardapioProps = PageProps & {
  sel: Array<{
    cod_cardapio: string;
    nome_cardapio: string;
    preco_cardapio: string;
    serve_quantos: string;
    titulo_item_cardapio: string;
    quantidade_item_cardapio: string;
  }>;
};

export default function VisualizarCardapio({ auth, sel }: VisualizarCardapioProps) {
  const [loading, setLoading] = useState(true);
  const nomesVistos = new Set<string>();
  const [quantidade,setQuantidade]= useState('')
  const[codCardapio,setCodCardapio]= useState('')
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },100)
    setQuantidade(sel[0].serve_quantos)
    setCodCardapio(sel[0].cod_cardapio)
  },[])

  //
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
  //
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Visualiza Cardápio</h2>}
    >
      <Head title="Visualiza Cardápio" />
      <>
      <>
      <nav className="flex p-5 m-5 bg-white shadow rounded" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                    <a href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                        </svg>
                        Home
                    </a>
                    </li>
                    <li>
                    <div className="flex items-center">
                        <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <a href="/listarcardapios" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Lista Cardapios</a>
                    </div>
                    </li>
                    <li aria-current="page">
                    <div className="flex items-center">
                        <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Visualiza Cardápio</span>
                    </div>
                    </li>
                </ol>
            </nav>
      </>
      {loading ? (<>
      <div className="flex justify-center p-12">
        <div className='' role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        </div>
        </>):(<>
        <div className="p-12 m-5 bg-white shadow rounded">
          <div className="t">
            <p className="text-2xl font-bold mb-3 border-b-2">VisualizaCardápio</p>
            {sel.map(
              (
                cardapio: {
                  nome_cardapio: string;
                  preco_cardapio: string;
                  serve_quantos: string;
                  titulo_item_cardapio: string;
                  quantidade_item_cardapio: string;
                },
                index: number
              ) => {
                // Verificar se o nome já foi visto
                if (!nomesVistos.has(cardapio.nome_cardapio)) {
                  nomesVistos.add(cardapio.nome_cardapio);
                  return (
                    <React.Fragment key={index}>
                      <div className="t">
                      <div className="flex justify-between">
                          <p className="text-xl font-bold">{cardapio.nome_cardapio}</p>
                        <div>
                          
                        </div>
                          <p>{`Preço: R$ ${cardapio.preco_cardapio}`}</p>
                          
                      </div>
                      <div className="flex justify-between pt-6 p-2">
                      <p className=''>{cardapio.titulo_item_cardapio}</p>
                      <p>{cardapio.quantidade_item_cardapio}</p>
                      </div>
                      </div>
                    </React.Fragment>
                  );
                } else {
                  // Se o nome já foi visto, apenas renderize os itens relacionados
                  return (
                    <React.Fragment key={index}>
                      <div className="flex justify-between  p-2">
                        <div>{cardapio.titulo_item_cardapio}</div>
                        <div>{cardapio.quantidade_item_cardapio}</div>
                      </div>
                    </React.Fragment>
                  );
                }
              }
            )}
          </div>
          <p className="pt-6 text-end">Serve <span className="font-bold">{quantidade}</span> pessoas</p>
          <>
          <hr className="mt-4" />
          <div className="flex justify-end mt-4">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <a href={`/formeditarcardapio/${codCardapio}`} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                Editar
              </a>
              <button onClick={() => showModal(codCardapio)} type='button' className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-gray-200 rounded-r-md hover:bg-red-600 hover:text-yellow-300  focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                Apagar
              </button>
            </div>
          </div>
          </>
        </div>
        <>
        
        </>
        {Object.keys(showPopups).map((codCardapio) => (
        <>
        <div 
        key={codCardapio}
        id={`popup-modal-${codCardapio}`}
         className={`${showPopups[codCardapio] ? 'block' : 'hidden '} fixed inset-0 top-0 left-0 z-50 
         inset-0 bg-opacity-50 backdrop-blur-lg flex justify-center h-screen
         `}>
            <div className="relative w-full max-w-md max-h-full top-[40%] left-0 ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={() => closeModal(codCardapio)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="red" fill='transparent' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
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
        </>)}
      </>
    </AuthenticatedLayout>
  );
}
