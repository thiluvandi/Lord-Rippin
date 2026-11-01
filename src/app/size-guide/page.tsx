"use client";

import { useState } from "react";

const sizeData = {
  cm: [
    { size: "XS", chest: "96", length: "68", shoulder: "50", sleeve: "22" },
    { size: "S", chest: "100", length: "70", shoulder: "52", sleeve: "23" },
    { size: "M", chest: "106", length: "72", shoulder: "54", sleeve: "24" },
    { size: "L", chest: "112", length: "74", shoulder: "56", sleeve: "25" },
    { size: "XL", chest: "118", length: "76", shoulder: "58", sleeve: "26" },
    { size: "XXL", chest: "124", length: "78", shoulder: "60", sleeve: "27" },
  ],
  in: [
    { size: "XS", chest: "37.8", length: "26.8", shoulder: "19.7", sleeve: "8.7" },
    { size: "S", chest: "39.4", length: "27.6", shoulder: "20.5", sleeve: "9.1" },
    { size: "M", chest: "41.7", length: "28.3", shoulder: "21.3", sleeve: "9.4" },
    { size: "L", chest: "44.1", length: "29.1", shoulder: "22.0", sleeve: "9.8" },
    { size: "XL", chest: "46.5", length: "29.9", shoulder: "22.8", sleeve: "10.2" },
    { size: "XXL", chest: "48.8", length: "30.7", shoulder: "23.6", sleeve: "10.6" },
  ],
};

export default function SizeGuidePage() {
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const data = sizeData[unit];

  return (
    <div className="max-w-[800px] mx-auto px-6 md:px-10 py-12 md:py-20">
      <h1 className="text-[28px] md:text-[36px] font-light tracking-tight mb-2">
        Size Guide
      </h1>
      <p className="text-[11px] font-mono tracking-[0.2em] text-muted mb-10 md:mb-14">
        All measurements are in {unit === "cm" ? "centimetres" : "inches"}
      </p>

      {/* Unit toggle */}
      <div className="flex gap-1 mb-8">
        <button
          onClick={() => setUnit("cm")}
          className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${
            unit === "cm" ? "bg-foreground text-white" : "text-muted hover:text-foreground"
          }`}
        >
          CM
        </button>
        <button
          onClick={() => setUnit("in")}
          className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${
            unit === "in" ? "bg-foreground text-white" : "text-muted hover:text-foreground"
          }`}
        >
          IN
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-foreground">
              {["Size", "Chest", "Length", "Shoulder", "Sleeve"].map((h) => (
                <th
                  key={h}
                  className="py-3 text-[11px] font-mono tracking-[0.15em] uppercase text-muted font-normal"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.size} className="border-b border-border">
                <td className="py-4 text-[13px] font-medium">{row.size}</td>
                <td className="py-4 text-[13px] font-mono text-muted">{row.chest}</td>
                <td className="py-4 text-[13px] font-mono text-muted">{row.length}</td>
                <td className="py-4 text-[13px] font-mono text-muted">{row.shoulder}</td>
                <td className="py-4 text-[13px] font-mono text-muted">{row.sleeve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Model info */}
      <div className="mt-10 p-6 bg-panel">
        <p className="text-[12px] font-mono tracking-wider text-muted">
          Model is 6&apos;0&quot; / 183cm, wearing size L.
        </p>
      </div>

      {/* Fit guide */}
      <div className="mt-12">
        <h2 className="text-[16px] tracking-wide mb-6">How Should It Fit?</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { fit: "Regular", desc: "True to body with room to move." },
            { fit: "Relaxed", desc: "Slightly oversized. Comfortable all day.", active: true },
            { fit: "Oversized", desc: "Generous drop. Street-ready." },
          ].map((f) => (
            <div
              key={f.fit}
              className={`p-4 border text-center ${
                f.active ? "border-accent" : "border-border"
              }`}
            >
              <h3 className={`text-[12px] tracking-[0.1em] uppercase mb-2 ${
                f.active ? "text-accent" : "text-foreground"
              }`}>
                {f.fit}
              </h3>
              <p className="text-[11px] text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] font-mono text-muted mt-4 tracking-wider">
          Most Lord Rippin&apos; pieces sit between Relaxed and Oversized.
        </p>
      </div>
    </div>
  );
}
