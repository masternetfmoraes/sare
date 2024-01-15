import React, { useState, useEffect } from 'react';
import Select from "./Select";

export default function SelectCardapios(){
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
    const options = [
        { value: ' ', label: '--------------' },
      { value: 'option1', label: 'Coca Cola (350ml)' },
      { value: 'option1a', label: 'Coca Cola (2 Litros)' },
      { value: 'option2', label: 'Fanta (350ml)' },,
      { value: 'option3', label: 'Suco Natural de Laranja' },
      { value: 'option4', label: 'Caldo de cana pequeno' },
      // Adicione mais opções conforme necessário
    ];
  
    return (
      <div>
        <Select
            options={options}
            value={selectedValue}
            onChange={handleChange} className="mt-1 block w-full" 
        />
        {/* Adicione outros elementos ou lógica conforme necessário */}
      </div>
    );
  };