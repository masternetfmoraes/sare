import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import CardListCardapios from '../Components/CardListCardapios';

export default function Cardapios({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-1">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8">
                    <>
                    <nav className="flex py-5 px-5 bg-white shadow rounded" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                            <a href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                Home
                            </a>
                            </li>
                            
                            <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Listar Cardápio</span>
                            </div>
                            </li>
                        </ol>
                    </nav>
                    </>
                    <div className="flex justify-between py-1 gap-12">
                        <div className="w-full">
                            <div className="flex justify-between p-5 my-2 bg-white shadow rounded">
                                <p className="text-xl">Listar Cardápios</p>
                            <a href="/formcadastracardapio" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" >
                                        Cadastrar Cardápio
                                    </a>
                            </div>
                            <CardListCardapios   nome_cardapio='' preco_cardapio='' serve_quantos=''
                            titulo_item_cardapio='' quantidade_item_cardapio='' cod_cardapio='' />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
