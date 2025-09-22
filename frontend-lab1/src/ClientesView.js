import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClientesView() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/customers')
      .then(res => setClientes(res.data))
      .catch(err => alert('Error al consultar clientes'));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Clientes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cuenta</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.accountNumber}>
              <td>{c.firstName} {c.lastName}</td>
              <td>{c.accountNumber}</td>
              <td>${c.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientesView;