export default function DragGhost({ gene, x, y }) {
  if (!gene) return null;
  return (
    <div className="drag-ghost mono" style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }} aria-hidden="true">
      {gene.symbol}
    </div>
  );
}
