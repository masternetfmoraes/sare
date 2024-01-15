import React, { useState,useEffect } from 'react';

import Modal from "@/Components/Modal";

export default function Success(){
    const [modalOpen, setModalOpen] = useState(false);

    const abrirModal = () => {
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        //window.location.href = '/dashboard';
        location.replace("/dashboard");
    };
    useEffect(()=>{
        setModalOpen(true);
        
    },[])
    return(
        <>
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
                        <svg className="mx-auto mb-4 text-green-600 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Gravado com sucesso</h3>
                        <button onClick={fecharModal} type="button" className="text-green-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Ok</button>
                    </div>
                </div>
            </div>
        </div>
        </>
      </Modal>
        <p className="text-center py-12 text-green-600 font bold">Gravado com sucesso !!</p>
        </>
    )
}