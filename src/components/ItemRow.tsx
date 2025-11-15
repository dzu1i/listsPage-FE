import "./ItemRow.css";

export type Item = { id: string; name: string; qty: string; done: boolean };

type Props = {
  item: Item;
  edit: boolean;
  onToggle: (id: string) => void;
  onChange: (id: string, patch: Partial<Item>) => void;
};

export default function ItemRow({ item, edit, onToggle, onChange }: Props) {
  const { id, name, qty, done } = item;

  return (
    <div className={`row ${done ? "done" : ""}`}>
      <label className="check">
        <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
        <span />
      </label>

      {edit ? (
        <>
          <input className="name" value={name} onChange={(e) => onChange(id, { name: e.target.value })} />
          <div className="spacer" />
          <input className="qty" value={qty} onChange={(e) => onChange(id, { qty: e.target.value })} />
        </>
      ) : (
        <>
          <div className="name">{name}</div>
          <div className="spacer" />
          <div className="pill amount">{qty}</div>
        </>
      )}
    </div>
  );
}
