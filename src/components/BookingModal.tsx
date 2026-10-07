import { useEffect, useState } from "react";
import { PERIODS, PROFESSIONALS, SALON, SERVICES, buildMessage, buildWhatsAppUrl, type Service } from "@/lib/salon";

const STEPS = ["Serviço", "Profissional", "Preferências", "Resumo"];

export function BookingModal({ open, initial, onClose }: { open: boolean; initial?: Service | null; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [pro, setPro] = useState<string>("");
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      setService(initial ?? null); setStep(initial ? 1 : 0);
      setPro(""); setDate(""); setPeriod(""); setNote("");
    }
  }, [open, initial]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open) return null;
  const p = service ? PROFESSIONALS[service.category] : null;
  const msg = service ? buildMessage({ service: service.title, professional: pro || "Sem preferência", date, period, note }) : "";
  const url = p ? buildWhatsAppUrl(p.whatsapp, p.prefill, msg) : "#";

  const send = () => {
    if (p && !p.prefill) navigator.clipboard?.writeText(msg).catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/60 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div role="dialog" aria-label="Solicitar horário" className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-card sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="border-b px-6 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Solicitação de horário</p>
            <button aria-label="Fechar" onClick={onClose} className="text-2xl leading-none text-muted-foreground hover:text-foreground">×</button>
          </div>
          <div className="mt-3 flex gap-1.5">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-1 rounded-full ${i <= step ? "bg-gold" : "bg-muted"}`} />
                <p className={`mt-1 text-[11px] ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 0 && (
            <div className="space-y-2">
              <h3 className="text-2xl">Qual serviço você deseja?</h3>
              {SERVICES.map((s) => (
                <button key={s.id} onClick={() => { setService(s); setPro(""); setStep(1); }}
                  className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition hover:border-gold ${service?.id === s.id ? "border-gold bg-secondary" : ""}`}>
                  <img src={s.img} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div><p className="text-sm font-medium">{s.title}</p><p className="text-xs text-muted-foreground">{s.category} · Valor sob consulta</p></div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && p && (
            <div className="space-y-3">
              <h3 className="text-2xl">Com quem você prefere?</h3>
              {[{ name: p.name, role: p.role }, { name: "", role: "O salão indica a melhor profissional" }].map((o) => (
                <button key={o.name || "none"} onClick={() => setPro(o.name)}
                  className={`w-full rounded-xl border p-4 text-left transition hover:border-gold ${pro === o.name ? "border-gold bg-secondary" : ""}`}>
                  <p className="font-medium">{o.name || "Sem preferência"}</p>
                  <p className="text-xs text-muted-foreground">{o.role}</p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl">Suas preferências</h3>
                <p className="text-sm text-muted-foreground">Tudo opcional — se preferir, combine direto pelo WhatsApp.</p>
              </div>
              <label className="block text-sm">Data de preferência <span className="text-muted-foreground">(opcional)</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-xl border bg-background px-3 py-2.5" />
              </label>
              <div>
                <p className="text-sm">Período <span className="text-muted-foreground">(opcional)</span></p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PERIODS.map((x) => (
                    <button key={x} data-active={period === x} onClick={() => setPeriod(period === x ? "" : x)} className="chip">{x}</button>
                  ))}
                </div>
              </div>
              <label className="block text-sm">Observações <span className="text-muted-foreground">(opcional)</span>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Ex.: quero uma cor mais iluminada" className="mt-1 w-full rounded-xl border bg-background px-3 py-2.5" />
              </label>
            </div>
          )}

          {step === 3 && service && p && (
            <div className="space-y-4">
              <h3 className="text-2xl">Resumo da solicitação</h3>
              <dl className="divide-y rounded-xl border text-sm">
                {[["Serviço", service.title], ["Profissional", pro || "Sem preferência"], ["Data", date ? date.split("-").reverse().join("/") : "A combinar"], ["Período", period || "A combinar"], ["Valor", "Sob consulta"], ...(note.trim() ? [["Observação", note.trim()]] : [])].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-4 py-2.5"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
                ))}
              </dl>
              <p className="rounded-xl bg-accent px-4 py-3 text-xs text-accent-foreground">
                Isto é uma <strong>solicitação</strong>, não um agendamento confirmado. O {SALON.name} confirma a disponibilidade com você pelo WhatsApp.
              </p>
              {!p.prefill && <p className="text-xs text-muted-foreground">Ao enviar, a mensagem é copiada — é só colar na conversa com a {p.name}.</p>}
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t px-6 py-4">
          {step > 0 && <button onClick={() => setStep(step - 1)} className="btn-outline">Voltar</button>}
          {step < 3 ? (
            <button disabled={!service} onClick={() => setStep(step + 1)} className="btn-primary flex-1">Continuar</button>
          ) : (
            <a href={url} target="_blank" rel="noopener noreferrer" onClick={send} data-testid="wa-link" className="btn-primary flex-1">Enviar solicitação pelo WhatsApp</a>
          )}
        </div>
      </div>
    </div>
  );
}
