import React, { useState, useEffect } from 'react';
import Select from "./Select";
import TextInput from './TextInput';

export default function SelectCardapios() {
  const [selectedValue, setSelectedValue] = useState('');
  const [options, setOptions] = useState([]);
  const [preco, setPreco] = useState('');
  const [codcardapio,setCodCardapio]  = useState('')

  useEffect(() => { 
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
  }, []); // O segundo argumento vazio faz com que o efeito seja executado apenas uma vez, equivalente ao componentDidMount

  const handleChange = (event) => {
    const selectedOption = options.find(option => option.value === event.target.value);
    setSelectedValue(event.target.value);
    setPreco(selectedOption ? selectedOption.preco : '');
    setCodCardapio(selectedOption ? selectedOption.codcardapio : '')
    
  };

  function setData(arg0: string, value: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
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
        className="mt-1 block w-full"
        autoComplete="cod_cardapio"
        isFocused={true}
        onChange={(e) => setData('cod_cardapio', e.target.value)}
        required
      />
      {preco && <p className='text-start font-bold'>Preço: {preco}</p>}
    </>
  );
}
