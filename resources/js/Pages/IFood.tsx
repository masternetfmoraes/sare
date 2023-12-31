import React, { useEffect, useState } from 'react';

const SuaComponente = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token';
        const token = 'eyJraWQiOiJlZGI4NWY2Mi00ZWY5LTExZTktODY0Ny1kNjYzYmQ4NzNkOTMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIxYjYxODY0Ny1jZGJlLTQwN2EtOTY3Ni0xYjRjZTQ3ODRhMGQiLCJvd25lcl9uYW1lIjoiMWI2MTg2NDctY2RiZS00MDdhLTk2NzYtMWI0Y2U0Nzg0YTBkIiwiaXNzIjoiaUZvb2QiLCJjbGllbnRfaWQiOiIxYjYxODY0Ny1jZGJlLTQwN2EtOTY3Ni0xYjRjZTQ3ODRhMGQiLCJhdWQiOlsic2hpcHBpbmciLCJjYXRhbG9nIiwiZmluYW5jaWFsIiwicmV2aWV3IiwibWVyY2hhbnQiLCJvcmRlciIsIm9hdXRoLXNlcnZlciJdLCJhcHBfbmFtZSI6IjFiNjE4NjQ3LWNkYmUtNDA3YS05Njc2LTFiNGNlNDc4NGEwZCIsInNjb3BlIjpbIm1lcmNoYW50Iiwic2hpcHBpbmciLCJjYXRhbG9nIiwicmV2aWV3IiwiY29uY2lsaWF0b3IiLCJvcmRlciJdLCJ0dmVyIjoidjIiLCJtZXJjaGFudF9zY29wZSI6WyJmMGE4M2NkYy02YTI2LTQ2YmMtOTI2NC02ZTU3N2JiODgxMzc6Y2F0YWxvZyIsImYwYTgzY2RjLTZhMjYtNDZiYy05MjY0LTZlNTc3YmI4ODEzNzpjb25jaWxpYXRvciIsImYwYTgzY2RjLTZhMjYtNDZiYy05MjY0LTZlNTc3YmI4ODEzNzpvcmRlciIsImYwYTgzY2RjLTZhMjYtNDZiYy05MjY0LTZlNTc3YmI4ODEzNzptZXJjaGFudCIsImYwYTgzY2RjLTZhMjYtNDZiYy05MjY0LTZlNTc3YmI4ODEzNzpyZXZpZXciLCJmMGE4M2NkYy02YTI2LTQ2YmMtOTI2NC02ZTU3N2JiODgxMzc6c2hpcHBpbmciXSwiZXhwIjoxNjk4NzkxOTAxLCJpYXQiOjE2OTg3NzAzMDEsImp0aSI6IjFiNjE4NjQ3LWNkYmUtNDA3YS05Njc2LTFiNGNlNDc4NGEwZCIsIm1lcmNoYW50X3Njb3BlZCI6dHJ1ZX0.GdnqSlWrvXHi3EIqSHJJg7bZNKSkJWlpor7-SY9fuvK-gQaf6lMOZmij3qGjW_gRmbmTBKdACAMYTnOqd7xCtbGUJqU_0wFU2Wm6RyOup9YurYmv5wk0XA3Ti-okJ1kX-dgPxhz8zH9AT-79y4usgV7KlZ3srfJTKDIe_bhcdv4';

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
 
  return (
    <div>
      <h2>Dados da Requisição</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default SuaComponente;
