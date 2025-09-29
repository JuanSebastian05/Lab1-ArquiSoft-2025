// frontend-lab1/src/utils/format.js
export const formatCOP = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
    .format(Number(n || 0));

export const formatDate = (value) => {
  if (!value) return '';
  const date = typeof value === 'string' && value.length <= 10
    ? new Date(value + 'T00:00:00')
    : new Date(value);
  if (isNaN(date)) return value;
  return date.toLocaleDateString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit' });
};