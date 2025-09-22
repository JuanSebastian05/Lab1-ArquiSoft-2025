import React, { useState } from 'react';
import axios from 'axios';

function TransferenciaView() {
  const [form, setForm] = useState({
    senderAccountNumber: '',
    receiverAccountNumber: '',
    amount: ''
  });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/transactions/transfer', form)
      .then(res => setMsg(res.data))
      .catch(err => setMsg('Error: ' + err.response.data));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Transferencia de Dinero</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input className="form-control" name="senderAccountNumber" placeholder="Cuenta origen" onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="receiverAccountNumber" placeholder="Cuenta destino" onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="amount" type="number" placeholder="Monto" onChange={handleChange} required />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Transferir</button>
        </div>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}

export default TransferenciaView;