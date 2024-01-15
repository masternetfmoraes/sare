export default function CardapioNotFound(){
    return(
        <>
        <div className="max-w-1xl mx-auto sm:px-6 lg:px-8 p-12">
            <div className="bg-white overflow-hidden text-center shadow-sm sm:rounded-lg">
                <p className="text-6xl pt-12">Erro</p>
                <p className="p-6 text-green-900 text-xl ">Cardapio Não encontrado!</p>
                <p className="pb-6 text-center"><a href="/dashboard" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Voltar</a></p>
            </div>
        </div>
        </>
    )
}