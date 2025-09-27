import React, { useState } from 'react';
import ClientesView from './ClientesView';
import TransferenciaView from './TransferenciaView';
import HistoricoView from './HistoricoView';

function App() {
  const [vista, setVista] = useState('clientes');

  const NavButton = ({ id, children }) => (
    <button
      className={`btn ${vista === id ? 'btn-primary' : 'btn-outline-primary'}`}
      aria-current={vista === id ? 'page' : undefined}
      onClick={() => setVista(id)}
    >
      {children}
    </button>
  );

  return (
    <div className="container py-3">
      <nav className="mb-3 d-flex gap-2">
        <NavButton id="clientes">Consultar Clientes</NavButton>
        <NavButton id="transferencia">Transferencia</NavButton>
        <NavButton id="historico">Histórico</NavButton>
      </nav>

      {vista === 'clientes' && <ClientesView />}
      {vista === 'transferencia' && <TransferenciaView />}
      {vista === 'historico' && <HistoricoView />}
    </div>
  );
}

export default App;
