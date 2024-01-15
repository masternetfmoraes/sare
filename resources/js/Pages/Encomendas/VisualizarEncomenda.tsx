import React, { useState,useEffect, FormEventHandler,SetStateAction  } from 'react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';

import axios from 'axios';

interface Tipos {
    cod_encomenda: any;
  };
export default function({ auth }: PageProps){
    const { cod_encomenda }:any= route().params;
    const [data, setData] = useState<any>(null); // Altere o tipo conforme necessário

    const [loading , setLoading]=useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)         
        },500)
        //
        const fetchData = async () => {
            try {
              const response = await axios.get(`/jsonvisualizarencomenda/${cod_encomenda}`);
              setData(response.data);
            } catch (error) {
              console.error('Erro ao obter dados:', error);
              alert(error)
            }
          };
      
          fetchData();
        //
    },[])
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <>
                <nav className="flex my-5 py-5 px-5 bg-white shadow rounded" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                Home
                            </a>
                        </li>
                        <li className="inline-flex items-center">
                            <a href="/encomendas" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                Listar Encomendas
                            </a>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Visuaizar Encomenda </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </>
            <>
            {loading?(
                // Exiba um indicador de carregamento enquanto os dados estão sendo buscados
                    <div role="status" className="flex items-center justify-center py-12">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                //
            ):(
            <div className="my-5 w-full  py-5 px-5 bg-white shadow rounded gap-1">
                <>
                <div className="mb-4 sm:ml-4 xl:mr-4">
                <p className="font-bold">Visualizar Encomenda</p>
                    <div className="bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                        <div className="flex border-b items-center justify-between px-4 py-2 text-gray-600">
                            <p className="flex items-center text-xs pt-5 dark:text-white">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
                                </svg>
                                <span className="mx-2">{JSON.parse(data.dados_cliente)[0].nome}</span>
                            </p>
                            <div className="flex items-center border-l">
                                <div>
                                <p><span className="ml-2 mr-2 text-xs text-gray-400 md:ml-4">Entregar:{data.dataentrega} - {data.horaentrega} hrs</span></p>
                                </div>
                                <div className="">
                                <button className="p-1 mr-4 text-sm text-gray-400 border border-gray-50 rounded">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"/>
                                    </svg>
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2 text-gray-600 border-b border-gray-100">
                            <p className="flex items-center text-xs dark:text-white">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 21">
                                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    <path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z"/>
                                </g>
                                </svg>
                                Rua: {JSON.parse(data.dados_entrega)[0].logradouro}
                            </p>
                            <div className="flex items-center">
                                <p className="flex items-center text-xs dark:text-white">
                                nº:{JSON.parse(data.dados_entrega)[0].numero}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2 text-gray-600 border-b border-gray-100">
                            <p className="flex items-center text-xs dark:text-white">
                                Cep:&nbsp;{JSON.parse(data.dados_entrega)[0].cep}
                            </p>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2 text-gray-600 border-b border-gray-100">
                            <ul className="max-w-md space-y-1 text-xs text-gray-500 list-disc list-inside dark:text-gray-400">
                                <label className="block text-gray-700 text-xs font-bold mb-2" for="itensLista">Itens da Encomenda:</label>
                                {JSON.parse(data.dynamicCardapio).map((item,index)=>(
                            <li key={index}>{item.itempedido}</li>)
                        )}
                            </ul>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2 text-gray-600 border-b-2 border-gray-100">
                            <p className="flex items-center text-xs font-bold dark:text-white">
                                Preço:&nbsp;R$ {data.preco}
                            </p>
                            <div className="flex items-center">
                                <p className="flex items-center text-xs dark:text-white">
                                Situação: {data.situacao}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            </div>
            )}
            </>
    </AuthenticatedLayout>
    )
}