import React, { useState, useEffect, FormEventHandler} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

//import React from "react";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Select from '@/Components/Select';

type VisualizarCardapioProps = PageProps & {
  sel: Array<{
    cod_cardapio: string;
    nome_cardapio: string;
    preco_cardapio: string;
    categoria_cardapio: string;
    serve_quantos: string;
    cod_item_cardapio: string;
    titulo_item_cardapio: string;
    quantidade_item_cardapio: string;
  }>;
};
//

//
export default function FormEditarCardapio({ auth, sel }: VisualizarCardapioProps) {
  const [loading, setLoading] = useState(true);
  const nomesVistos = new Set<string>();
  const [quantidade,setQuantidade]= useState('')
  const[codCardapio,setCodCardapio]= useState('')
  const [categoria,setCategoria] = useState('')
  const {data,setData,post}:any= useForm({
    cod_cardapio :sel[0].cod_cardapio,  
    nome_cardapio:sel[0].nome_cardapio,
    preco_cardapio: sel[0].preco_cardapio,
    cod_item_cardapio:sel.map(item=>item.cod_item_cardapio),
    titulo_item_cardapio: sel.map(item => item.titulo_item_cardapio),
    quantidade_item_cardapio: sel.map(item => item.quantidade_item_cardapio),
    serve_quantos: sel[0].serve_quantos,
    categoria_cardapio:sel[0].categoria_cardapio,
  })
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },1000)
    setQuantidade(sel[0].serve_quantos)
    setCodCardapio(sel[0].cod_cardapio)
    setCategoria(sel[0].categoria_cardapio)
  },[])
  const submitForm: FormEventHandler = (e) => {
    e.preventDefault(); 
    console.log(e)
    post(route('editarcardapio'));
  }
  const optionsSelect = [
    { label: '-----------------',value:'' },
    { label: 'Marmita', value: 'marmita' },
    { label: 'Prato Executivo', value: 'executivo' },
    { label: 'Prato Familia', value: 'porteiro' },
    { label: 'Larica', value: 'seguranca' },
  ];
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
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Editar Cardápio</span>
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
        <form onSubmit={submitForm}>
          <div className="p-12 m-5 bg-white shadow rounded">
        <div className="">
          <p className="text-2xl font-bold mb-3 border-b-2">Editar Cardápio</p>
        </div>
        <div className="flex justify-content gap-5">
          <div className="mt-4 w-[75%]">
            <TextInput 
              id='cod_cardapio' 
              name="cod_cardapio" 
              type="hidden"
              value={data.cod_cardapio}
              onChange={(e)=>setData('cod_cardapio',e.target.value)} 
            />
            <InputLabel htmlFor="nome_cardapio" value="Nome do Cardápio" />
            <TextInput
              id="nome_cardapio"
              name="nome_cardapio"
              value={data.nome_cardapio}
              className="mt-1 block w-full"
              autoComplete="nome_cardapio"
              isFocused={true}
              onChange={(e) => setData('nome_cardapio', e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="preco_cardapio" value="Preço do Cardápio" />
            <TextInput
              id="preco_cardapio"
              name="preco_cardapio"
              type="number"
              value={data.preco_cardapio}
              className="mt-1 block w-full"
              autoComplete="preco_cardapio"
              isFocused={true}
              onChange={(e) => setData('preco_cardapio', e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="flex justify-between gap-5">
          <div className="mt-4 w-full">
          {data.titulo_item_cardapio.map((titulo, index) => (
            <div className='mt-4'>
              <TextInput type='hidden' name="cod_item_cardapio" id="cod_item_cardapio" 
              value={data.cod_item_cardapio}
              onChange={(e)=>setData('cod_item_cardapio',e.target.value)}
              />
            <InputLabel htmlFor={`titulo_item_cardapio_${index}`} value="Titulo do Cardápio" />
              <TextInput
                key={index}
                id={`titulo_item_cardapio_${index}`}
                // outras propriedades
                value={titulo}
                onChange={(e) => {
                  const newData = [...data.titulo_item_cardapio];
                  newData[index] = e.target.value;
                  setData('titulo_item_cardapio', newData);
                }}
                className='w-full'
              />
              </div>
          ))}
          </div>
          <div className="mt-4 w-[350px]">
            
          {data.quantidade_item_cardapio.map((qt,num)=> (
            <div className="mt-4 w-15">
              <>
              <InputLabel htmlFor={`titulo_item_cardapio_${num}`} value="Quantidade Cardápio" />
              <TextInput
                key={num}
                id={`titulo_item_cardapio_${num}`}
                // outras propriedades
                value={qt}
                onChange={(e) => {
                  const newData = [...data.quantidade_item_cardapio];
                  newData[num] = e.target.value;
                  setData('quantidade_item_cardapio', newData);
                }}
                className='w-full'
              />
              </>
            </div>
          ))}
          </div>
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="serve_quantos" value="Serve Quantos" />
            <TextInput
              id="serve_quantos"
              name="serve_quantos"
              value={data.serve_quantos}
              className="mt-1 block w-full"
              autoComplete="serve_quantos"
              isFocused={true}
              onChange={(e) => setData('serve_quantos', e.target.value)}
              required
            />
        </div>
        <div className='mt-4'>
          <InputLabel htmlFor="name" value={`Categoria`} /> 
          <>
          <Select name="categoria_cardapio" id="categoria_cardapio"
          options={optionsSelect}
          value={data.categoria_cardapio}
          onChange={(e: { target: { value: string; }; }) => setData('categoria_cardapio', e.target.value)}
          className="mt-1 border border-gray-300 block w-full"
          />
          </>
        </div>
        <div className="mt-4 mb-12 px-5">
        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Editar Cardapio
        </button>
        </div>
        </div>
        <p className="t">
          
        </p>
        </form>
        </>)}
      </>
    </AuthenticatedLayout>
  );
}
