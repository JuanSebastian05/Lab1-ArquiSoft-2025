import React, { useState } from 'react';
import ClientesView from './ClientesView';
import TransferenciaView from './TransferenciaView';
import HistoricoView from './HistoricoView';

function App() {
  const [vista, setVista] = useState('clientes');

  return (
    <div>
      <nav>
        <button onClick={() => setVista('clientes')}>Consultar Clientes</button>
        <button onClick={() => setVista('transferencia')}>Transferencia</button>
        <button onClick={() => setVista('historico')}>Histórico</button>
      </nav>
      {vista === 'clientes' && <ClientesView />}
      {vista === 'transferencia' && <TransferenciaView />}
      {vista === 'historico' && <HistoricoView />}
    </div>
  );
}

export default App;
