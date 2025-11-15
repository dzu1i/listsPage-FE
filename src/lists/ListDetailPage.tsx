import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ListDetail.css";
import ItemList, { Item } from "../components/ItemList";
import ListHeader from "../components/ListHeader";
import ActionButtons from "../components/ActionButtons";

export type ShoppingList = {
  id: string;
  title: string;
  createdAt: string;
  items: Item[];
};

// constant data (resets on refresh)
const LISTS: Record<string, ShoppingList> = {
  groceries: {
    id: "groceries",
    title: "Groceries",
    createdAt: "2025-11-01",
    items: [
      { id: "i1", name: "Chicken", qty: "500 g", done: true },
      { id: "i2", name: "Toilet paper", qty: "1 pack", done: true },
      { id: "i3", name: "Sour cream", qty: "1", done: true },
      { id: "i4", name: "Pasta", qty: "500 g", done: false },
      { id: "i5", name: "Garlic", qty: "1", done: false },
    ],
  },
};

export default function ListDetailPage() {
  const { listId } = useParams();
  const navigate = useNavigate();

  const base = LISTS[listId ?? "groceries"] ?? LISTS.groceries;
  const [list, setList] = useState<ShoppingList>(structuredClone(base));
  const [backup, setBackup] = useState<ShoppingList>(structuredClone(base)); // backup for cancel
  const [edit, setEdit] = useState(false);

  const allDone = useMemo(() => list.items.every((i) => i.done), [list.items]);
  const dateStr = new Date(list.createdAt).toLocaleDateString("cs-CZ");

  const toggleItem = (id: string) =>
    setList((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
    }));

  const changeItem = (id: string, patch: Partial<Item>) =>
    setList((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    }));

  const toggleAll = () =>
    setList((prev) => ({
      ...prev,
      items: prev.items.map((i) => ({ ...i, done: !allDone })),
    }));

  const handleEdit = () => {
    setBackup(structuredClone(list)); // save current before edit
    setEdit(true);
  };

  const handleDone = () => {
    setEdit(false); // just exit edit mode — list is already updated
  };

  const handleCancel = () => {
    setList(structuredClone(backup)); // revert to backup
    setEdit(false);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this list? (demo)")) navigate("/");
  };

  const handleArchive = () => {
    alert("Archived (demo). Data se po reloadu vrátí.");
    navigate("/");
  };

  return (
    <div className="detail-page">
      <div className="detail-card">
        <ListHeader
          title={list.title}
          dateStr={dateStr}
          allDone={allDone}
          onToggleAll={toggleAll}
          edit={edit}
          onToggleEdit={handleEdit}
        />
        <div className="detail-panel">
          <ItemList
            items={list.items}
            edit={edit}
            onToggle={toggleItem}
            onChange={changeItem}
          />
          <ActionButtons
            edit={edit}
            onEdit={handleEdit}
            onDone={handleDone}
            onCancel={handleCancel}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
