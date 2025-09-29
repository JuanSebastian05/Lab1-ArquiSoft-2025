import React, { useState } from 'react';
import axios from 'axios';
import { formatCOP, formatDate } from './utils/format';

function HistoricoView() {
  const [account, setAccount] = useState('');
  const [historico, setHistorico] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const consultar = async () => {
    if (!account.trim()) {
      setError('Ingresa un número de cuenta.');
      setHistorico([]);
      return;
    }
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`http://localhost:8080/api/transactions/history/${account.trim()}`);
      const data = res.data || [];
      setHistorico(data);
      if (data.length === 0) setError('No hay transacciones para esta cuenta.');
    } catch (e) {
      setHistorico([]);
      setError('Hubo un problema al consultar el histórico. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      consultar();
    }
  };

  return (
    <div className="mt-3">
      <h2 className="mb-3">Histórico de Transacciones</h2>

      <div className="input-group mb-3">
        <input className="form-control" placeholder="Número de cuenta"
               value={account} onChange={e => setAccount(e.target.value)} onKeyDown={onKeyDown} />
        <button className="btn btn-secondary" onClick={consultar} disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm" /> : 'Consultar'}
        </button>
      </div>

      {loading && (
        <div className="alert alert-info d-flex align-items-center gap-2">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          <span>Buscando transacciones…</span>
        </div>
      )}

      {!!error && !loading && <div className="alert alert-warning">{error}</div>}

      {!loading && !error && historico.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Origen</th>
                <th>Destino</th>
                <th className="text-end">Monto</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((t, i) => (
                <tr key={i}>
                  <td>{formatDate(t.transactionDate)}</td>
                  <td>{t.senderAccountNumber}</td>
                  <td>{t.receiverAccountNumber}</td>
                  <td className="text-end">{formatCOP(t.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoricoView;