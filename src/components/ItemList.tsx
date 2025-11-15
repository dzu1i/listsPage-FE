import ItemRow, { Item } from "./ItemRow";

type Props = {
  items: Item[];
  edit: boolean;
  onToggle: (id: string) => void;
  onChange: (id: string, patch: Partial<Item>) => void;
};

export default function ItemList({ items, edit, onToggle, onChange }: Props) {
  return (
    <div>
      {items.map((it) => (
        <ItemRow key={it.id} item={it} edit={edit} onToggle={onToggle} onChange={onChange} />
      ))}
    </div>
  );
}

export type { Item };
