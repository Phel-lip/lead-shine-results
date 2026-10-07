import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookingModal } from "@/components/BookingModal";
import { PROFESSIONALS, SALON, SERVICES, TESTIMONIALS, type Category, type Service } from "@/lib/salon";
import before from "@/assets/hair-before.png.asset.json";
import after from "@/assets/hair-after.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entre Elas Studio de Beleza · Cabelos, unhas e sobrancelhas" },
      { name: "description", content: "Cabelos, unhas e design de sobrancelhas em Cabo de Santo Agostinho. Solicite seu horário pelo WhatsApp." },
      { property: "og:title", content: "Entre Elas Studio de Beleza" },
      { property: "og:description", content: "Cabelos, unhas e sobrancelhas. Solicite seu horário pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FILTERS: ("Todos" | Category)[] = ["Todos", "Cabelos", "Unhas", "Sobrancelhas"];

function Index() {
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState<Service | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");
  const book = (s: Service | null = null) => { setInitial(s); setOpen(true); };
  const list = filter === "Todos" ? SERVICES : SERVICES.filter((s) => s.category === filter);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#" className="leading-none">
            <span className="block font-display text-2xl italic text-primary">Entre Elas</span>
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase">Studio de Beleza</span>
          </a>
          <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
            <a href="#servicos" className="hover:text-foreground">Serviços</a>
            <a href="#resultados" className="hover:text-foreground">Resultados</a>
            <a href="#duvidas" className="hover:text-foreground">Dúvidas</a>
          </nav>
          <Button variant="salon" size="natural" onClick={() => book()} className="px-4! py-2.5! text-sm">Solicitar horário</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="eyebrow">{SALON.city}</p>
          <h1 className="mt-4 text-5xl leading-[1.02] text-primary md:text-7xl">
            O lugar perfeito para você se sentir <em className="text-rose">ainda mais deslumbrante.</em>
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Cabelos, unhas e design de sobrancelhas feitos por profissionais especialistas — tudo num só studio, entre elas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="salon" size="natural" onClick={() => book()} className="">Solicitar horário</Button>
            <a href="#servicos" className="btn-outline">Ver serviços</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {Object.values(PROFESSIONALS).map((p) => (
              <span key={p.name}><span className="text-gold">✦</span> {p.role}</span>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="absolute -inset-3 -z-10 rotate-3 rounded-[2rem] bg-secondary" />
          <img src={SALON.hero} alt="Cabelo castanho liso finalizado no Entre Elas" className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
          <div className="absolute -bottom-5 left-5 rounded-2xl bg-card px-5 py-3 shadow-lg">
            <p className="font-display text-lg italic text-primary">Manu Alves</p>
            <p className="text-xs text-muted-foreground">Cabeleireira do studio</p>
          </div>
        </div>
      </section>

      {/* Letreiro */}
      <div className="overflow-hidden border-y bg-espresso py-4 text-espresso-foreground" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {["Cabelos", "Unhas", "Sobrancelhas", "Coloração", "Escova modelada", "Shadow Line", "Unhas magnéticas", "Cabelos", "Unhas", "Sobrancelhas", "Coloração", "Escova modelada", "Shadow Line", "Unhas magnéticas"].map((t, i) => (
                <span key={i} className="flex items-center px-6 font-display text-2xl italic">{t}<span className="ml-12 text-base not-italic text-gold">✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="servicos" className="bg-secondary/60 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow">O que fazemos</p>
          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="text-4xl text-primary md:text-5xl">Trabalhos reais, <em>feitos aqui.</em></h2>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => <Button variant="salonChip" size="natural" key={f} data-active={filter === f} onClick={() => setFilter(f)} className="">{f}</Button>)}
            </div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <article key={s.id} className="group flex flex-col overflow-hidden rounded-2xl bg-card">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs">{s.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-2xl text-primary">{s.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{s.copy}</p>
                  <p className="mt-3 text-xs tracking-wide text-gold uppercase">Valor sob consulta</p>
                  <Button variant="salonOutline" size="natural" onClick={() => book(s)} className="mt-4 w-full">{s.cta}</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section id="resultados" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <BeforeAfter />
        <div>
          <p className="eyebrow">Antes & depois</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">Antes e depois que mostram o trabalho.</h2>
          <p className="mt-4 text-muted-foreground">Brilho, movimento e um novo visual. Cada detalhe faz a diferença para realçar a sua beleza.</p>
          <Button variant="salon" size="natural" onClick={() => book(SERVICES.find((s) => s.id === "coloracao") ?? null)} className="mt-6">Quero um resultado assim</Button>
        </div>
      </section>

      {/* Reviews */}
      <section id="avaliacoes" className="bg-espresso py-16 text-espresso-foreground md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow">Avaliações</p>
          <h2 className="mt-3 text-4xl md:text-5xl">O que as clientes dizem</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.category} className="rounded-2xl border border-espresso-foreground/15 p-6">
                <p className="text-gold">★★★★★</p>
                <blockquote className="mt-3 font-display text-xl italic">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-xs tracking-widest uppercase opacity-60">{t.category}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Google review */}
      <section className="mx-auto max-w-3xl px-5 py-14 text-center">
        <p className="text-gold">★★★★★</p>
        <h2 className="mt-2 text-3xl text-primary">Gostou do seu atendimento?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Conte como foi sua experiência no Google — leva menos de um minuto.</p>
        <Button variant="salon" size="natural" asChild className="mt-5">
          <a href={SALON.google} target="_blank" rel="noopener noreferrer">Avaliar no Google</a>
        </Button>
      </section>

      {/* Instagram letreiro */}
      <section className="border-y bg-secondary/60 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow">Veja mais de perto</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">Nosso dia a dia,<br /> no seu feed.</h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-muted-foreground">Trabalhos, novidades e detalhes do salão no perfil oficial.</p>
          <Button variant="salon" size="natural" asChild className="mt-7">
            <a href={SALON.instagram} target="_blank" rel="noopener noreferrer">Conhecer @entreelas.studiobeleza <span aria-hidden="true">→</span></a>
          </Button>
        </div>
        <div className="mt-12 overflow-hidden text-primary/25" aria-hidden="true">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="flex items-center px-6 font-display text-2xl italic">@entreelas.studiobeleza<span className="ml-12 text-base not-italic text-gold">✦</span></span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="duvidas" className="mx-auto max-w-3xl px-5 pb-20">
        <p className="eyebrow">Dúvidas</p>
        <h2 className="mt-3 mb-6 text-4xl text-primary">Perguntas frequentes</h2>
        {[
          ["Como funciona a solicitação de horário?", "Você escolhe o serviço, a profissional e, se quiser, uma data e período. A solicitação vai pronta para o WhatsApp da profissional."],
          ["O horário já fica confirmado?", "Ainda não. É uma solicitação — a confirmação é feita pela profissional do Entre Elas pelo WhatsApp."],
          ["Preciso escolher data e período?", "Não. Os dois são opcionais; se deixar em branco, fica “A combinar”."],
          ["Como funcionam os valores sob consulta?", "Os valores são informados pela profissional no WhatsApp, de acordo com o serviço e o seu cabelo, unhas ou sobrancelhas."],
        ].map(([q, a]) => (
          <details key={q} className="group border-b py-4">
            <summary className="flex cursor-pointer list-none justify-between gap-4 font-medium">{q}<span className="text-gold transition group-open:rotate-45">+</span></summary>
            <p className="mt-2 text-sm text-muted-foreground">{a}</p>
          </details>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm md:grid-cols-3">
          <div>
            <p className="font-display text-2xl italic text-primary">Entre Elas</p>
            <p className="text-muted-foreground">Studio de Beleza · {SALON.city}</p>
          </div>
          <div className="space-y-1">
            <p className="eyebrow mb-2">WhatsApp</p>
            {Object.values(PROFESSIONALS).map((p) => (
              <a key={p.name} href={p.whatsapp} target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground">{p.role} — {p.name}</a>
            ))}
          </div>
          <div className="space-y-1">
            <p className="eyebrow mb-2">Redes</p>
            <a href={SALON.instagram} target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground">@entreelas.studiobeleza</a>
            <a href={SALON.linktree} target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-foreground">Links oficiais</a>
          </div>
        </div>
      </footer>

      <BookingModal open={open} initial={initial} onClose={() => setOpen(false)} />
    </div>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] select-none">
      <img src={after.url} alt="Depois" className="absolute inset-0 h-full w-full object-cover" />
      <img src={before.url} alt="Antes" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-card" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card text-primary shadow">↔</div>
      </div>
      <span className="absolute top-4 left-4 rounded-full bg-card/90 px-3 py-1 text-xs">Antes</span>
      <span className="absolute top-4 right-4 rounded-full bg-card/90 px-3 py-1 text-xs">Depois</span>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Comparar antes e depois" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  );
}
