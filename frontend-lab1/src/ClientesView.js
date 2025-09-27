import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatCOP } from './utils/format';

function ClientesView() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8080/api/customers');
        if (!cancel) {
          setClientes(res.data || []);
          setError('');
        }
      } catch (e) {
        if (!cancel) setError('No pudimos cargar los clientes. Intenta de nuevo en unos segundos.');
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  return (
    <div className="mt-3">
      <h2 className="mb-3">Clientes</h2>

      {loading && (
        <div className="d-flex align-items-center gap-2 alert alert-info">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          <span>Cargando clientes…</span>
        </div>
      )}

      {!!error && !loading && <div className="alert alert-warning">{error}</div>}

      {!loading && !error && clientes.length === 0 && (
        <div className="alert alert-secondary">No hay clientes registrados.</div>
      )}

      {!loading && !error && clientes.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cuenta</th>
                <th className="text-end">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.accountNumber}>
                  <td>{c.firstName} {c.lastName}</td>
                  <td>{c.accountNumber}</td>
                  <td className="text-end">{formatCOP(c.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ClientesView;
