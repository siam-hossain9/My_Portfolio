"use client";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-primary no-print"
      style={{ borderRadius: 8 }}
    >
      <Printer size={15} aria-hidden="true" />
      Print / Save as PDF
    </button>
  );
}
