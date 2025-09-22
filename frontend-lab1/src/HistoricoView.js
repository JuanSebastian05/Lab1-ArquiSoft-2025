import React, { useState } from 'react';
import axios from 'axios';

function HistoricoView() {
  const [account, setAccount] = useState('');
  const [historico, setHistorico] = useState([]);
  const [error, setError] = useState('');

  const consultar = () => {
    axios.get(`http://localhost:8080/api/transactions/history/${account}`)
      .then(res => {
        setHistorico(res.data);
        setError('');
      })
      .catch(() => {
        setHistorico([]);
        setError('No se encontraron transacciones o hubo un error.');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Histórico de Transacciones</h2>
      <div className="input-group mb-3">
        <input className="form-control" placeholder="Número de cuenta" value={account} onChange={e => setAccount(e.target.value)} />
        <button className="btn btn-secondary" onClick={consultar}>Consultar</button>
      </div>
      {error && <div className="alert alert-warning">{error}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((t, i) => (
            <tr key={i}>
              <td>{t.transactionDate}</td>
              <td>{t.senderAccountNumber}</td>
              <td>{t.receiverAccountNumber}</td>
              <td>${t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoricoView;