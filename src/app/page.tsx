"use client";
import { useState, useCallback } from "react";

interface Person { id: number; name: string; amount: string; }
let uid = 1;

export default function Home() {
  const [total, setTotal] = useState("");
  const [people, setPeople] = useState<Person[]>([
    { id: uid++, name: "我", amount: "" },
    { id: uid++, name: "朋友 1", amount: "" },
  ]);
  const [mode, setMode] = useState<"equal" | "custom">("equal");
  const [copied, setCopied] = useState(false);

  const totalNum = parseFloat(total) || 0;

  const results = useCallback(() => {
    if (mode === "equal") {
      const each = totalNum / (people.length || 1);
      return people.map(p => ({ ...p, owes: each }));
    }
    const fixedSum = people.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
    const freeCount = people.filter(p => p.amount === "").length;
    const each = freeCount > 0 ? Math.max(totalNum - fixedSum, 0) / freeCount : 0;
    return people.map(p => ({ ...p, owes: p.amount === "" ? each : (parseFloat(p.amount) || 0) }));
  }, [totalNum, people, mode])();

  const isValid = totalNum > 0 && people.length >= 2;

  const addPerson = () => setPeople(p => [...p, { id: uid++, name: `朋友 ${p.length}`, amount: "" }]);
  const removePerson = (id: number) => setPeople(p => p.filter(x => x.id !== id));
  const update = (id: number, f: keyof Person, v: string) =>
    setPeople(p => p.map(x => x.id === id ? { ...x, [f]: v } : x));

  const copyBill = () => {
    const lines = results.map(r => `${r.name || "未命名"}：¥${r.owes.toFixed(2)}`).join("\n");
    navigator.clipboard.writeText(`【AA 账单】总计 ¥${totalNum.toFixed(2)}\n${lines}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const s = {
    card: { background:"var(--color-surface)", border:"1px solid var(--color-border)", borderRadius:"var(--radius-lg)", padding:"var(--space-5)", marginBottom:"var(--space-4)" } as React.CSSProperties,
    label: { display:"block", fontSize:"0.8125rem", color:"var(--color-text-muted)", marginBottom:"var(--space-2)" } as React.CSSProperties,
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--color-bg)" }}>
      {/* 顶栏 */}
      <header style={{ background:"var(--color-surface)", borderBottom:"1px solid var(--color-border)", padding:"var(--space-4) var(--space-6)", display:"flex", alignItems:"center", gap:"var(--space-3)" }}>
        <span style={{ fontSize:"1.5rem" }}>🍽️</span>
        <div>
          <h1 style={{ fontSize:"1.125rem", fontWeight:700, color:"var(--color-primary)", margin:0 }}>AA 计算器</h1>
          <p style={{ fontSize:"0.75rem", color:"var(--color-text-muted)", margin:0 }}>聚餐分账，一秒搞定</p>
        </div>
      </header>

      <main style={{ maxWidth:500, margin:"0 auto", padding:"var(--space-6) var(--space-4)" }}>
        {/* 总金额 */}
        <div style={s.card}>
          <label style={s.label}>💰 账单总金额（元）</label>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:"var(--space-4)", top:"50%", transform:"translateY(-50%)", color:"var(--color-primary)", fontWeight:700, fontSize:"1.25rem" }}>¥</span>
            <input id="total-input" className="input" type="number" min="0" placeholder="0.00" value={total}
              onChange={e => setTotal(e.target.value)}
              style={{ paddingLeft:"var(--space-8)", fontSize:"1.5rem", fontWeight:700, height:56 }} />
          </div>
        </div>

        {/* 分摊方式 */}
        <div style={s.card}>
          <label style={s.label}>📐 分摊方式</label>
          <div style={{ display:"flex", gap:"var(--space-3)" }}>
            {(["equal","custom"] as const).map(m => (
              <button key={m} id={`mode-${m}`} onClick={() => setMode(m)} className="btn"
                style={{ flex:1, background: mode===m?"var(--color-primary)":"var(--color-surface-2)", color: mode===m?"#fff":"var(--color-text-muted)", border:`1px solid ${mode===m?"var(--color-primary)":"var(--color-border)"}`, fontWeight: mode===m?600:400 }}>
                {m==="equal" ? "👥 人均平摊" : "✏️ 自定义金额"}
              </button>
            ))}
          </div>
        </div>

        {/* 人员列表 */}
        <div style={s.card}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"var(--space-4)" }}>
            <label style={{ ...s.label, margin:0 }}>👤 参与人员（{people.length} 人）</label>
            <button id="add-person-btn" className="btn btn-secondary" onClick={addPerson} style={{ fontSize:"0.8125rem", padding:"6px 12px" }}>+ 添加</button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
            {people.map((p, i) => (
              <div key={p.id} style={{ display:"flex", gap:"var(--space-2)", alignItems:"center" }}>
                <span style={{ width:26, height:26, borderRadius:"50%", background:"var(--color-surface-2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", color:"var(--color-text-muted)", flexShrink:0 }}>{i+1}</span>
                <input id={`person-name-${p.id}`} className="input" placeholder="姓名" value={p.name} style={{ flex:1 }}
                  onChange={e => update(p.id, "name", e.target.value)} />
                {mode === "custom" && (
                  <div style={{ position:"relative", width:110 }}>
                    <span style={{ position:"absolute", left:"var(--space-3)", top:"50%", transform:"translateY(-50%)", color:"var(--color-text-muted)", fontSize:"0.875rem" }}>¥</span>
                    <input id={`person-amount-${p.id}`} className="input" type="number" placeholder="平摊" value={p.amount}
                      onChange={e => update(p.id, "amount", e.target.value)} style={{ paddingLeft:"var(--space-6)", width:"100%" }} />
                  </div>
                )}
                <button id={`remove-${p.id}`} onClick={() => removePerson(p.id)} disabled={people.length <= 2}
                  style={{ background:"none", border:"none", color: people.length<=2?"var(--color-text-faint)":"var(--color-error)", fontSize:"1.25rem", cursor: people.length<=2?"not-allowed":"pointer", padding:"0 4px", lineHeight:1 }}>×</button>
              </div>
            ))}
          </div>
        </div>

        {/* 结果 */}
        {isValid && (
          <div style={{ ...s.card, borderColor:"var(--color-primary)", background:"rgba(74,128,240,0.06)" }} className="animate-in">
            <p style={{ fontSize:"0.875rem", color:"var(--color-primary)", fontWeight:600, marginBottom:"var(--space-4)" }}>🧾 分账结果</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"var(--space-3)" }}>
              {results.map(r => (
                <div key={r.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"var(--space-3) var(--space-4)", background:"var(--color-surface)", borderRadius:"var(--radius-md)", border:"1px solid var(--color-border)" }}>
                  <span>{r.name || "未命名"}</span>
                  <span style={{ fontWeight:700, fontSize:"1.125rem", color:"var(--color-primary)" }}>¥ {r.owes.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:"var(--space-3)", marginTop:"var(--space-5)" }}>
              <button id="copy-btn" className="btn btn-primary" onClick={copyBill} style={{ flex:1 }}>
                {copied ? "✅ 已复制" : "📋 复制账单"}
              </button>
              <button id="reset-btn" className="btn btn-secondary" onClick={() => { setTotal(""); setPeople([{id:uid++,name:"我",amount:""},{id:uid++,name:"朋友 1",amount:""}]); setMode("equal"); }}>
                重置
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
