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
import Modal from "@/Components/Modal";
import { request } from 'http';

interface Address {
    uf: string;
    localidade:string;
    logradouro: string;
    cep: string;
    bairro: string;
    //complemento: string;
    // outras propriedades...
  }
  
export default function DashboardPedidos({ auth }: PageProps){
    const [loading , setLoading]=useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        dados_cliente:[],      
        dados_entrega:[],
        dynamicCardapio:[],
        observacao:'',
        dataentrega:''
        /*
        numero:'',
        complemento:'',
        preco:'',
        itempedido:''
        */
    });
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);
    const [cepi,setCepi] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    
    const handleCepChange = (e: { target: { value: any; }; }) => {
        const novoCep = e.target.value;
        setCep(novoCep);
      
        // Verificar se o comprimento do CEP é exatamente 8 caracteres
        if (novoCep.length === 8) {
          // Se sim, realizar a busca
         
            handleSearch(novoCep);
            }
      };

    const abrirModal = () => {
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        //window.location.href = '/dashboard';
        //location.replace("/dashboard");
    };

    const handleSearch = async (novoCep: any) => {
        setIsLoading(true);
        try {
        const response = await axios.get(`https://viacep.com.br/ws/${novoCep}/json/`);
        if (response.data.erro) {
            setAddress(null);
            setError('CEP não encontrado. Verifique o CEP e tente novamente.');
        } else {
            setAddress(response.data);
            setError(null);
            // Adicione os dados ao array dados_entrega
            // Certifique-se de que "data" está sendo obtido de algum lugar no seu componente
            setData({
            ...data,
            dados_cliente: [
                ...data.dados_cliente,
                {
                    nome: data.name,  // Verifique se "data.name" está sendo obtido de algum lugar no seu componente
                    telefone: data.telefone,  // Verifique se "data.telefone" está sendo obtido de algum lugar no seu componente
                },
            ],
            dados_entrega: [
                ...data.dados_entrega,
                {
                uf: response.data.uf,
                logradouro: response.data.logradouro,
                bairro: response.data.bairro,
                cep: response.data.cep,
                },
            ],
            });
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
        setTimeout(()=>{
            setLoading(false)         
        },1000)
    })
    //
    const date = new Date();
  
    //
    const loadInfo=()=>{
        setData({
            ...data,

            // Inserir os campos complemento e numero no array dados_entrega
            dados_entrega: data.dados_entrega.map(item => ({
                ...item,
                complemento: data.complemento,  // Verifique se "data.complemento" está sendo obtido de algum lugar no seu componente
                numero: data.numero,  // Verifique se "data.numero" está sendo obtido de algum lugar no seu componente
            })),
        });
    }
    //
    //const updatedDynamicCardapio: { itempedido: string; tipo: string; }[] = [];
    
    const addDynamicCardapio = () => {
        setData('dynamicCardapio', [...data.dynamicCardapio, { itempedido: ''}]);
        
    }
    
    
    const removeDynamicField = (index: number) => {
        const updatedDynamicCardapio = [...data.dynamicCardapio];
        updatedDynamicCardapio.splice(index, 1);
        console.log('Before update:', data.dynamicCardapio);
        console.log('After update:', updatedDynamicCardapio);
        setData('dynamicCardapio', updatedDynamicCardapio);
    };
      //
    const handleDynamicFieldChange = (index: number, fieldName: any, value: any) => {
        const updatedDynamicCardapio = [...data.dynamicCardapio];
        updatedDynamicCardapio[index][fieldName] = value;
        setData('dynamicCardapio', updatedDynamicCardapio);
    };
    //
    //data maior
    const dataAtual = new Date().toISOString().split('T')[0];
    //
    const submit=(e)=>{
        e.preventDefault()
        //
        //
        const dataSelecionada = data.dataentrega;
        if (dataSelecionada < dataAtual) {
            abrirModal()
        }else{
            if(data.dynamicCardapio.length === 0){
                setError('Adicione pelo menos um item do do pedido antes de enviar o formulário');
                return;
            }else{
                setError('')
            }
            setData({
                ...data,

                // Inserir os campos complemento e numero no array dados_entrega
                dados_entrega: data.dados_entrega.map(item => ({
                    ...item,
                    complemento: data.complemento,  // Verifique se "data.complemento" está sendo obtido de algum lugar no seu componente
                    numero: data.numero,  // Verifique se "data.numero" está sendo obtido de algum lugar no seu componente
                })),
            });
            post(route('cadastraencomenda'));
        }
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
                    <p className="text-2xl font-bold">Cadastrar Encomenda</p>
                    {date.toLocaleDateString()}
                    <a onClick={addDynamicCardapio} className='flex gap-2 float-right py-2 cursor-pointer'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        Adicionar Item do Pedido
                    </a>
                </div>
                <div className="py-1">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg ">
                        <p className="text-2xl font-bold">Dados do pedido</p>
                        
                        <form onSubmit={submit}>
                            <div className='mb-12'>
                                {data.dynamicCardapio.length === 0 ? ( <InputLabel htmlFor="select" className='text-base font-bold text-red-600' value="Insira items do Pedido (Clique em Adicionar Item Pedido acima)" />):(<p className='text-green-600'></p>)}
                                {data.dynamicCardapio.map((field:any, index:number) => (
                                    <>
                                    <div key={index} className="flex justy-between w-[100%] gap-5 border border-b-5 p-5">
                                        <p className="font-bold tex-xl">{index+1}.</p>
                                        <div className="t w-[90%]">
                                        <InputLabel htmlFor="select" className='' value="Item do Pedido" />
                                    <TextInput
                                        id="itempedido"
                                        name="itempedido"
                                        //value={data.itempedido}
                                        value={field.itempedido}
                                        className="mt-1 block w-full"
                                        autoComplete="cod_cardapio"
                                        isFocused={true}
                                        onChange={(e) => handleDynamicFieldChange(index, 'itempedido', e.target.value)}
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
                                <div className='mt-4'>
                                <InputLabel htmlFor="preco" value="Preco" />

                                <TextInput
                                    id="preco"
                                    name="preco"
                                    type='number'
                                    value={data.preco}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('preco', e.target.value)}
                                    required
                                    />
                                <InputError message={errors.observacao} className="mt-2" />
                            </div>
                                <InputError message={errors.cod_cardapio} className="mt-2" />
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
                                    <InputError message={errors.telefone} className="mt-2" />
                                </div>
                                
                                <div className='mt-4'>
                                <hr className='' />
                                    <p className="text-2xl py-5">Dados de entrega</p>
                                    <InputLabel htmlFor="dataentrega" value="Data de Entrega" />

                                    <TextInput
                                        id="dataentrega"
                                        name="dataentrega"
                                        type='date'
                                        value={data.dataentrega}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('dataentrega', e.target.value)}
                                        required
                                        />
                                    <InputError message={errors.dataentrega} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="horaentrega" value="Hora de Entrega" />
                                    <TextInput
                                        id="horaentrega"
                                        name="horaentrega"
                                        type='time'
                                        value={data.horaentrega}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('horaentrega', e.target.value)}
                                        required
                                        />
                                    <InputError message={errors.horaentrega} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                
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
                                        placeholder='Digite o cep aqui'
                                        required
                                    />
                                    <InputError message={errors.cep} className="mt-2" />
                                    <a 
                                        className="cursor-pointer hidden mt-3 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" 
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
                                        readOnly={true}
                                        onChange={(e) => setData('uf', e.target.value)}
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
                                        readOnly={true}
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
                                        //onChange={(e) => setData('bairro', e.target.value)}
                                        readOnly={true}
                                    />
                                    <InputError message={errors.bairro} className="mt-2" />
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
                                        readOnly={true}
                                    />
                                    <InputError message={errors.logradouro} className="mt-2" />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor="complemento" value="Complemento" />

                                    <TextInput
                                        id="complemento"
                                        name="complemento"
                                        className="mt-1 block w-full"
                                        autoComplete="complemento"
                                        isFocused={true}
                                        value={data.complemento}
                                        onChange={(e) => setData('complemento', e.target.value )}
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
                                    onBlur={loadInfo}
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
            <Modal show={modalOpen} onClose={fecharModal} maxWidth="md" closeable>
        {/* Conteúdo do seu modal */}
        <>
        <div id="popup-modal"  className={``}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={fecharModal} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-red-600 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                       </svg>
                        <h3 className="mb-5 text-lg font-normal text-red-600 dark:text-gray-400">A data de Entrega tem que ser superior a data atual</h3>
                        <button onClick={fecharModal} type="button" className="text-red-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Ok</button>
                    </div>
                </div>
            </div>
        </div>
        </>
      </Modal>
            </>)}
            </AuthenticatedLayout>
    )
}