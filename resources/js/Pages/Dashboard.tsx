import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Calendario from '@/Components/Calendar';
import CardListCardapios from '../Components/CardListCardapios';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-1">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between py-12 gap-12">
                        <div className="w-[450px]">
                            <CardListCardapios nome_cardapio='' preco_cardapio='' serve_quantos=''
                            titulo_item_cardapio='' quantidade_item_cardapio='' cod_cardapio='' />
                        </div>
                        <div className="">
                        <Calendario />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
