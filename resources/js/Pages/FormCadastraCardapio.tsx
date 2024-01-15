import React, { useState,useEffect, FormEventHandler, ReactNode } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { PageProps } from '@/types';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Select from '@/Components/Select';
import PrimaryButton from '@/Components/PrimaryButton';

export default function FormCadastraCardapio({ auth }: PageProps){
    const { data, setData, post, processing, errors, reset }:any = useForm({
        nome_cardapio: '',  
        categoria_cardapio:'',
        dynamicFields: [],
        preco_cardapio:'',
        serve_quantos:'',
    });
    //
    const optionsSelect = [
        { label: '-----------------',value:'' },
        { label: 'Marmita', value: 'marmita' },
        { label: 'Prato Executivo', value: 'executivo' },
        { label: 'Prato Familia', value: 'porteiro' },
        { label: 'Larica', value: 'seguranca' },
      ];
    //
    const [error,setError]:any = useState([])
    const updatedDynamicFields: { titulo_item_cardapio: string; }[] = [];

    const handleDynamicFieldChange = (index: number, fieldName: any, value: any) => {
        const updatedDynamicFields = [...data.dynamicFields];
        updatedDynamicFields[index][fieldName] = value;
        setData('dynamicFields', updatedDynamicFields);
        
    };

    const addDynamicField = () => {
        setData('dynamicFields', [...data.dynamicFields, { titulo_item_cardapio: '',quantidade_item_cardapio: '' }]);
    }
      
    const removeDynamicField = (index: number) => {
        const updatedDynamicFields = [...data.dynamicFields];
        updatedDynamicFields.splice(index, 1);
        setData('dynamicFields', updatedDynamicFields);
       
    }
    const submitForm: FormEventHandler = (e) => {
        e.preventDefault(); 
        if (data.dynamicFields.length === 0) {
            setError('Adicione pelo menos um item do cardápio antes de enviar o formulário');
            return;
          }
        post(route('cadastracardapio'));
    }
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
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
                        <a href="listarcardapios" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Listar Cardápios</a>
                    </div>
                    </li>
                    <li aria-current="page">
                    <div className="flex items-center">
                        <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Cadastrar Cardápio</span>
                    </div>
                    </li>
                </ol>
            </nav>
            </>
            <form onSubmit={submitForm}>
            <div className="p-12 m-5 bg-white shadow rounded">
            <p className="text-xl">Cadastrar Cardapio</p>
            <a onClick={addDynamicField} className='flex gap-2 float-right py-2 cursor-pointer'>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  Adicionar item do cardápio
                </a>
                <div className='mt-4'>
                    <InputLabel htmlFor="nome_cardapio" value="Titulo do Cardápio" />
                    <TextInput
                        id="nome_cardapio"
                        name="nome_cardapio"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="nome_cardapio"
                        isFocused={true}
                        onChange={(e) => setData('nome_cardapio', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className='mt-4'>
                    <InputLabel htmlFor="name" value={`Categoria ${data.type_user}`} /> 
                    <>
                    <Select name="categoria_cardapio" id="categoria_cardapio"
                        options={optionsSelect}
                        value={data.categoria_cardapio}
                        onChange={(e: { target: { value: string; }; }) => setData('categoria_cardapio', e.target.value)}
                        className="mt-1 border border-gray-300 block w-full"
                    />
                    </>
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                {data.dynamicFields.map((field:any, index:number) => (
                <div className="flex justify-between border-b-2 border-solid" key={index} >
                   <div className="w-[50%] ">
                    <p className="t">Adic</p>
                    <InputLabel htmlFor="titulo_item_cardapio" value="Item do cardápio" />
                    <TextInput
                            id="titulo_item_cardapio"
                            name="titulo_item_cardapio"
                            value={field.titulo_item_cardapio}
                            className="mt-1 block w-full"
                            autoComplete="titulo_item_cardapio"
                            isFocused={true}
                            onChange={(e) => handleDynamicFieldChange(index, 'titulo_item_cardapio', e.target.value)}
                            required
                        />
                    </div> 
                    <div className="">
                        <InputLabel htmlFor="quantidade_item_cardapio" value="Quantidade" />
                        <TextInput
                            id="quantidade_item_cardapio"
                            name="quantidade_item_cardapio"
                            value={field.quantidade_item_cardapio}
                            className="mt-1 block w-full"
                            autoComplete="quantidade_item_cardapio"
                            isFocused={true}
                            maxLength={10}
                            onChange={(e) => handleDynamicFieldChange(index, 'quantidade_item_cardapio', e.target.value)}
                            required
                        />
                    </div> 
                    <div className="">
                        <a onClick={() => removeDynamicField(index)}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer mt-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                ))}
                </div>
                <div className="">
                        <InputLabel htmlFor="serve_quantos" value="Serve Quantas Pessoas" />
                        <TextInput
                            id="serve_quantos"
                            name="serve_quantos"
                            value={data.serve_quantos}
                            className="mt-1 block w-full"
                            autoComplete="serve_quantos"
                            isFocused={true}
                            maxLength={10}
                            type='number'
                            onChange={(e) => setData('serve_quantos', e.target.value)}
                            required
                        />
                </div>
                <div className="">
                        <InputLabel htmlFor="preco_cardapio" value="Preço" />
                        <TextInput
                            id="preco_cardapio"
                            name="preco_cardapio"
                            value={data.preco_cardapio}
                            className="mt-1 block w-full"
                            autoComplete="preco_cardapio"
                            isFocused={true}
                            maxLength={10}
                            type='number'
                            onChange={(e) => setData('preco_cardapio', e.target.value)}
                            required
                        />
                </div> 
                <div className="mt-4">
                   {error}
                </div>
                <div className="flex justify-end">
                    <PrimaryButton className="ml-4 mt-5">
                        <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
                        </svg>  <span className="px-3">Cadastrar</span>
                    </PrimaryButton>
                </div>    
            </div>
            
            </form>
        </AuthenticatedLayout>
    )
}