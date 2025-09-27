import React, { useState } from 'react';
import axios from 'axios';

function TransferenciaView() {
  const [form, setForm] = useState({
    senderAccountNumber: '',
    receiverAccountNumber: '',
    amount: ''
  });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const isValid = () => {
    const { senderAccountNumber, receiverAccountNumber, amount } = form;
    if (!senderAccountNumber || !receiverAccountNumber || !amount) return false;
    const a = Number(amount);
    return a > 0 && senderAccountNumber !== receiverAccountNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      setMsg({ type: 'warning', text: 'Verifica que las cuentas sean distintas y el monto sea mayor a 0.' });
      return;
    }
    try {
      setLoading(true);
      setMsg({ type: '', text: '' });
      const res = await axios.post('http://localhost:8080/api/transactions/transfer', {
        senderAccountNumber: form.senderAccountNumber.trim(),
        receiverAccountNumber: form.receiverAccountNumber.trim(),
        amount: Number(form.amount)
      });
      setMsg({ type: 'success', text: res.data || 'Transacción realizada exitosamente.' });
      // UX: limpiar formulario
      setForm({ senderAccountNumber: '', receiverAccountNumber: '', amount: '' });
    } catch (err) {
      const text = err?.response?.data || 'Hubo un error al realizar la transacción.';
      setMsg({ type: 'danger', text: String(text) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <h2 className="mb-3">Transferencia de Dinero</h2>

      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input className="form-control" name="senderAccountNumber" placeholder="Cuenta origen"
                 value={form.senderAccountNumber} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="receiverAccountNumber" placeholder="Cuenta destino"
                 value={form.receiverAccountNumber} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input className="form-control" name="amount" type="number" min="1" placeholder="Monto"
                 value={form.amount} onChange={handleChange} required />
        </div>
        <div className="col-md-1 d-grid">
          <button className="btn btn-primary" type="submit" disabled={!isValid() || loading}>
            {loading ? <span className="spinner-border spinner-border-sm" /> : 'Transferir'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransferenciaView;