import React, { useState,useEffect, FormEventHandler,SetStateAction  } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm  } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
//
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
//import SelectCardapios from '@/Components/SelectCardapios';

import SelectBebidas from '@/Components/SelectBebidas';
import Select from '@/Components/Select';
interface Address {
    uf: string;
    localidade:string;
    logradouro: string;
    cep: string;
    bairro: string;
    complemento: string;
    // outras propriedades...
  }
  
export default function DashboardPedidos({ auth }: PageProps){
    const [loading , setLoading]=useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        cod_cardapio:'',
        dados_cliente:[],      
        dados_entrega:[],
        dynamicCardapio:[],
        observacao:'',
        numero:'',
        complemento:'',
    });
    const [cep, setCep] = useState('');
    const [address, setAddress ] =useState<Address | null>({ uf: '',localidade:'',logradouro:'',cep:'',bairro:'' ,complemento:'' });
    const [error, setError] = useState<null | string>(null);
    //
    const [selectedValue, setSelectedValue] = useState('');
    const [options, setOptions] = useState([]);
    const [preco, setPreco] = useState('');
    const [codcardapio,setCodCardapio]  = useState('')
    const updatedDynamicCardapio: { cod_cardapio: string; }[] = [];
    
    //
    const handleCepChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCep(event.target.value);
        //setTimeout(handleSearch, 5000);
    };
    
    const handleSearch = async (e) => {
        setIsLoading(true);
        
        try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            setAddress(null);
            setError('CEP não encontrado. Verifique o CEP e tente novamente.');
        } else {
            setAddress(response.data);
            setError(null);
            setData({...data,
                dados_cliente: [
                    ...data.dados_cliente,
                    {
                        nome:data.name,
                        telefone:data.telefone,
                    }
                ],/*
                dynamicCardapio: [
                    ...data.dynamicCardapio,{
                        //cod_cardapio: data.cod_cardapio,
                        cod_cardapio: data.cod_cardapio
                    }
                ],*/
                dados_entrega: [
                    ...data.dados_entrega,
                    {
                      // insira os dados que deseja adicionar ao array aqui
                      uf:response.data.uf,
                      logradouro:response.data.logradouro,
                      bairro:response.data.bairro,
                      cep:response.data.cep,
                      complemento:data.complemento,
                      numero:data.numero
                    }
                  ],
            })
            //setData({...data,dados_entrega:response.data})
            
        }
        } catch (error) {
        console.error('Erro ao buscar CEP', error);
        setAddress(null);
        setError('Erro ao buscar CEP. Tente novamente mais tarde.');
        } finally {
        setIsLoading(false);
        }
    };

    useEffect(()=>{
        // Função para buscar dados da API
    const fetchData = async () => {
        try {
          const response = await fetch('/comboselectcardapio');
          const data = await response.json();
  
          // Se a resposta estiver no formato esperado, atualize as opções
          if (Array.isArray(data)) {
            const formattedOptions = data.map(item => ({
              value: item.cod_cardapio,
              label: item.nome_cardapio,
              preco: item.preco_cardapio,
              codcardapio: item.cod_cardapio,
            }));
            setOptions([{ value: '', label: 'Selecione o Cardápio' }, ...formattedOptions]);
          }
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      };
  
      // Chame a função de busca quando o componente for montado
      fetchData();
        setTimeout(()=>{
            setLoading(false)
            
        },1000)
    })
    //
    const handleChange = (event) => {
        const selectedOption = options.find(option => option.value === event.target.value);
        setSelectedValue(event.target.value);
        setPreco(selectedOption ? selectedOption.preco : '');
        setCodCardapio(selectedOption ? selectedOption.codcardapio : '')       
        
      };
    //

    const date = new Date();
  
    //
    //
    const addDynamicCardapio = () => {
        setData('dynamicCardapio', [...data.dynamicCardapio, { cod_cardapio: ''}]);
        
    }
    const removeDynamicField = (index: number) => {
        const updatedDynamicCardapio = [...data.dynamicCardapio];
        updatedDynamicCardapio.splice(index, 1);
        setData('dynamicCardapio', updatedDynamicCardapio);
       
    }
    const handleDynamicFieldChange = (index: number, fieldName: any, value: any) => {
        const updatedDynamicCardapio = [...data.dynamicCardapio];
        updatedDynamicCardapio[index][fieldName] = value;
        setData('dynamicCardapio', updatedDynamicCardapio);
    };
    //
    const submit=(e)=>{
        e.preventDefault()
        //
        
        if(data.dynamicCardapio.length === 0){
            setError('Adicione pelo menos um item do cardápio antes de enviar o formulário');
            return;
        }else{
            setError('')
        }
        post(route('cadastrapedido'));
    }
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
        >
            <Head title={`Cadastra Pedido`} />
            <>
            <nav className="flex px-5 py-3 mt-5 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                <a href="../dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                    Home
                </a>
                </li>
                <li aria-current="page">
                <div className="flex items-center">
                    <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Cadastra Pedido</span>
                </div>
                </li>
            </ol>
            </nav>
            </>{loading ? (
            // Exiba um indicador de carregamento enquanto os dados estão sendo buscados
          <div role="status" className="flex items-center justify-center py-12">
          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
      //
      ):(<>
            <div className="max-w-7xl mx-auto sm:px-6 mt-5 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <p className="text-2xl font-bold">Cadastrar Pedidos</p>
                    {date.toLocaleDateString()}
                    <a onClick={addDynamicCardapio} className='flex gap-2 float-right py-2 cursor-pointer'>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  Adicionar Cardápio ao Pedido
            </a>
           
                </div>
                <div className="py-1">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg ">
                        <p className="text-2xl font-bold">Dados do pedido</p>
                        
                        <form onSubmit={submit}>
                            <div className='mb-12'>
                                
                                <InputLabel htmlFor="select" value="Selecione o cardápio" />
                                {data.dynamicCardapio.map((field:any, index:number) => (
                                    <>
                                    <div className="flex justy-between w-[100%] gap-5 border border-b-5 p-5">
                                        <p className="font-bold tex-xl">{index+1}.</p>
                                        <div className="t w-[90%]">
                                     <Select
                                    options={options}
                                    value={selectedValue}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                    />
                                    <TextInput
                                        id="cod_cardapio"
                                        name="cod_cardapio"
                                        value={codcardapio}
                                        //value={field.titulo_item_cardapio}
                                        className="mt-1 block w-full"
                                        autoComplete="cod_cardapio"
                                        isFocused={true}
                                        onChange={(e) => handleDynamicFieldChange(index, 'cod_cardapio', e.target.value)}
                                        required
                                    />
                                    </div>
                                    <div className="t">
                                    <a onClick={() => removeDynamicField(index)}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer mt-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                    </svg>
                                    </a>
                                    </div>
                                    </div>
                                    </>
                                ))}
                               
                                {preco && <p className='text-start font-bold'>Preço: {preco}</p>}
                                <InputError message={errors.cod_cardapio} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor="select" value="Selecione a Bebida" />
                                <SelectBebidas />

                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            
                            <div className='mt-4'>
                                <hr />
                                <p className="text-2xl">Dados do Cliente</p>
                                    <InputLabel htmlFor="name" value="Nome do Cliente" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="telefone" value="Telefone do Cliente" />

                                    <TextInput
                                        id="telefone"
                                        name="telefone"
                                        value={data.telefone}
                                        className="mt-1 block w-full"
                                        autoComplete="telefone"
                                        isFocused={true}
                                        onChange={(e) => setData('telefone', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                            <div className='mt-4'>
                                <hr className='' />
                                <p className="text-2xl">Dados de entrega</p>
                                <InputLabel htmlFor="name" value="CEP" />
                                <TextInput 
                                    id="postal_code_employee_address"
                                    name="postal_code_employee_address"
                                    className="mt-1 block w-full"
                                    autoComplete="cep"
                                    isFocused={true}
                                    value={cep}
                                    onChange={handleCepChange}
                                    maxLength={8}
                                    required
                                />
                                <InputError message={errors.cep} className="mt-2" />
                                <a 
                                    className="cursor-pointer mt-3 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" 
                                    onClick={handleSearch}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        <span className="px-2">Buscar CEP</span>
                                </a>
                            </div>
                            {isLoading && <>
                                <div role="status" className="flex items-center justify-center py-12">
                                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </>}
                           
                            {
                            address && !error && (<>
                            {address.uf &&(<>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="uf" value="Estado" />

                                    <TextInput
                                        id="uf"
                                        name="uf"
                                        value={address.uf}
                                        className="mt-1 block w-full"
                                        autoComplete="uf"
                                        isFocused={true}
                                        onChange={(e) => setData('uf', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.uf} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="localidade" value="Cidade" />

                                    <TextInput
                                        id="localidade"
                                        name="localidade"
                                        value={address.localidade}
                                        className="mt-1 block w-full"
                                        autoComplete="localidade"
                                        isFocused={true}
                                        onChange={(e) => setData('localidade', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="bairro" value="Bairro" />

                                    <TextInput
                                        id="bairro"
                                        name="bairro"
                                        value={address.bairro}
                                        className="mt-1 block w-full"
                                        autoComplete="bairro"
                                        isFocused={true}
                                        onChange={(e) => setData('bairro', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="logradouro" value="Rua" />

                                    <TextInput
                                        id="logradouro"
                                        name="logradouro"
                                        value={address.logradouro}
                                        className="mt-1 block w-full"
                                        autoComplete="logradouro"
                                        isFocused={true}
                                        //onChange={(e) => setData('logradouro', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.logradouro} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="complemento" value="Complemento" />

                                    <TextInput
                                        id="complemento"
                                        name="complemento"
                                        //value="122"
                                        className="mt-1 block w-full"
                                        autoComplete="complemento"
                                        isFocused={true}
                                        value={data.complemento}
                                        //onChange={handleCepChange}
                                        onChange={(e) => setData((prevData) => ({ ...prevData, complemento: e.target.value }))}
                                        //onChange={(e) => setData('complemento', e.target.value)}
                                        //required
                                    />
                                    <InputError message={errors.complemento} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="numero" value="Numero" />

                                    <TextInput
                                        id="numero"
                                        name="numero"
                                        value={data.numero}
                                        className="mt-1 block w-full"
                                        autoComplete="numero"
                                        isFocused={true}
                                        onChange={(e) => setData('numero', e.target.value)}
                                        //required
                                    />
                                    <InputError message={errors.numero} className="mt-2" />
                                </div>
                            </>)}
                            </>)}
                            <hr />
                            <div className='mt-4'>
                                <InputLabel htmlFor="observacao" value="Observação" />

                                <TextInput
                                    id="observacao"
                                    name="observacao"
                                    value={data.observacao}
                                    className="mt-1 block w-full"
                                    autoComplete="observacao"
                                    isFocused={true}
                                    onChange={(e) => setData('observacao', e.target.value)}
                                    required
                                    />
                                <InputError message={errors.observacao} className="mt-2" />
                            </div>
                            <div className="mt-4">
                            {error && <p style={{ color: 'red' }}>{error}</p>}


                                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </>)}
            </AuthenticatedLayout>
    )
}