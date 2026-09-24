import { useEffect, useId, useRef, useState } from "react";

// Small "?" button that toggles an explanatory popover. The popover is
// absolutely positioned against the nearest positioned ancestor (the panel),
// so it overlays the panel content rather than pushing it around.
export default function InfoTip({ label, children }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <span ref={rootRef} className="info-tip">
      <button
        className="info-btn info-btn--sm"
        aria-expanded={open}
        aria-controls={id}
        title={label}
        onClick={() => setOpen((v) => !v)}
      >
        ?
        <span className="sr-only">{label}</span>
      </button>

      {open && (
        <div id={id} className="info-popover info-tip__popover" role="note">
          {children}
        </div>
      )}
    </span>
  );
}
