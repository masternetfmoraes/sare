// src/Calendario.js
import React, { useState } from 'react';
import InputLabel from './InputLabel';

const Calendario = () => {
  const [ano, setAno] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);

  const diasNoMes = new Date(ano, mes, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes - 1, 1).getDay();
  const diaAtual = new Date().getDate();
  const mesAtual = new Date().getMonth() + 1;
  const anoAtual = new Date().getFullYear();
  const diasDaSemana = Array.from({ length: 7 }, (_, i) => i);

  const criarArrayDias = () => {
    let dias = [];
    let contador = 1;

    for (let i = 0; i < 6; i++) {
      let semana = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < primeiroDiaSemana) {
          semana.push('');
        } else if (contador <= diasNoMes) {
          semana.push(contador);
          contador++;
        }
      }
      dias.push(semana);
    }

    return dias;
  };

  const dias = criarArrayDias();

  return (
    <div className='w-full p-2 bg-white rounded-md shadow'>
        <p className="text-xl">Calendário</p>
        <div className="py-2 flex justify-between gap-5">
          <div className="t">
            <InputLabel htmlFor="ano" value="Ano" />
            <input type="number" value={ano} onChange={(e) => setAno(Number(e.target.value))} 
            className='w-[100%] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 '
            //disabled 
            />
          </div>
          <div className="t">
          <InputLabel htmlFor="mes" value="Mês" />
          <input
            type="number"
            value={mes}
            onChange={(e) => setMes(Math.min(12, Math.max(1, Number(e.target.value))))}
            className='w-[100%] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 '
            //disabled
          />
          </div>
      </div>
      <table className='w-full text-sm text-gray-500 dark:text-gray-400 shadow'>
        <thead>
          <tr className=''>
            {diasDaSemana.map((dia) => (
              <th key={dia} className='text-end border-gray-300 py-5 px-2 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1'>{dia === 0 ? 'D' : `STQQSS`[dia - 1]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dias.map((semana, index) => (
            <tr key={index} className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1'>
              {semana.map((dia, index) => (
                <td
                  key={index}
                  className={`${
                    dia === diaAtual && mes === mesAtual && ano===anoAtual
                      ? 'bg-gray-200 text-black border border-gray-300 font-bold py-2'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-2 rounded-md shadow-sm mt-1'
                  } text-end hover:bg-green-200`}
                >
                  {dia}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendario;
