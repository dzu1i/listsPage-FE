type Props = {
  title: string;
  dateStr: string;
  allDone: boolean;
  onToggleAll: () => void;
  edit: boolean;
  onToggleEdit: () => void;
};

export default function ListHeader({ title, dateStr, allDone, onToggleAll, edit, onToggleEdit }: Props) {
  return (
    <header className="header">
      <button
        className={`icon-btn ${allDone ? "icon-done" : "icon-idle"}`}
        onClick={onToggleAll}
        aria-label="Mark all done/undone"
        title="Toggle all"
      >
        ✓
      </button>

      <div>
        <h1 className="title">{title}</h1>
        <div className="date">{dateStr}</div>
      </div>
    </header>
  );
}
