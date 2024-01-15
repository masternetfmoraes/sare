import React, { useState,useEffect, FormEventHandler,SetStateAction  } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
export default function DashboardPedidos({ auth }: PageProps){
    const [loading , setLoading]=useState(true);
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
        >
            <Head title={`Listar Pedidos`} />
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
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Dashboard Pedidos</span>
                </div>
                </li>
            </ol>
            </nav>
            </>
            <div className="max-w-7xl mx-auto sm:px-6 mt-5 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <p className="text-2xl font-bold">Dashboard Pedidos</p>
                </div>
                <div className="py-1">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <p className="text-2xl font-bold">Cadastrar Pedido</p>
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <p className="text-2xl font-bold">Cadastrar Pedido</p>
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <p className="text-2xl font-bold">Total pedidos</p>
                    </div>
                </div>
            </div>
            </AuthenticatedLayout>
    )
}