export default function StatCard({ valor, titulo, icono }) {
  return (
    <div className="stat-card p-3 h-100">
      {icono && <i className={`bi ${icono} panel-icono`}></i>}
      <h2 className="fw-bold text-accent h3">{valor}</h2>
      <p className="mb-0">{titulo}</p>
    </div>
  );
}
