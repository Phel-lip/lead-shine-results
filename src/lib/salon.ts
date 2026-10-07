import p2 from "@/assets/ee-p2_0.jpg.asset.json";
import p3 from "@/assets/ee-p3_0.jpg.asset.json";
import p4 from "@/assets/ee-p4_0.jpg.asset.json";
import p5 from "@/assets/ee-p5_0.jpg.asset.json";
import p6 from "@/assets/ee-p6_0.jpg.asset.json";
import p8 from "@/assets/ee-p8_0.jpg.asset.json";
import p9 from "@/assets/ee-p9_0.jpg.asset.json";
import p11 from "@/assets/ee-p11_0.jpg.asset.json";

export type Category = "Cabelos" | "Unhas" | "Sobrancelhas";

// Verified from the salon's Instagram bio and official Linktree.
export const PROFESSIONALS: Record<Category, { name: string; role: string; whatsapp: string; prefill: boolean }> = {
  Cabelos: { name: "Manu Alves", role: "Cabeleireira", whatsapp: "https://wa.me/message/7MUPCLP5XMH3I1", prefill: false },
  Sobrancelhas: { name: "Charlene Martins", role: "Design de sobrancelha", whatsapp: "https://wa.me/5581985413552", prefill: true },
  Unhas: { name: "Mércury Nails Designer", role: "Nail designer (manicure)", whatsapp: "https://wa.me/5581993770950", prefill: true },
};

export const SALON = {
  name: "Entre Elas Studio de Beleza",
  city: "Cabo de Santo Agostinho · PE",
  instagram: "https://www.instagram.com/entreelas.studiobeleza/",
  linktree: "https://linktr.ee/Entreelas_2",
  google: "https://www.google.com/maps/search/?api=1&query=Entre+Elas+Studio+de+Beleza+Cabo+de+Santo+Agostinho",
  hero: p8.url,
};

export type Service = { id: string; title: string; category: Category; copy: string; cta: string; img: string };

export const SERVICES: Service[] = [
  { id: "escova", title: "Escova modelada", category: "Cabelos", copy: "Fios alinhados, brilho e movimento com o acabamento da Manu.", cta: "Quero horário para escova", img: p4.url },
  { id: "coloracao", title: "Coloração", category: "Cabelos", copy: "Cor pensada para o seu tom, do castanho ao iluminado.", cta: "Quero horário para coloração", img: p9.url },
  { id: "liso", title: "Liso & finalização", category: "Cabelos", copy: "Cabelo liso, leve e com caimento impecável.", cta: "Quero horário para liso", img: p2.url },
  { id: "shadow", title: "Sobrancelhas Shadow Line", category: "Sobrancelhas", copy: "Efeito delicado e natural que realça o formato do seu olhar.", cta: "Quero horário para sobrancelhas", img: p3.url },
  { id: "manicure", title: "Manicure & esmaltação", category: "Unhas", copy: "Esmaltação caprichada com alicates esterilizados a cada atendimento.", cta: "Quero horário para manicure", img: p11.url },
  { id: "magneticas", title: "Unhas magnéticas", category: "Unhas", copy: "Um brilho que brinca com a luz e muda a cada movimento.", cta: "Quero horário para unhas magnéticas", img: p6.url },
  { id: "maospes", title: "Mãos & pés combinando", category: "Unhas", copy: "O combo completo para o visual ficar ainda mais elegante.", cta: "Quero horário para mãos e pés", img: p5.url },
];

export const PERIODS = ["Manhã (08h–12h)", "Tarde (12h–16h)", "Fim da tarde (16h–19h)"];

export function buildMessage(o: { service: string; professional: string; date?: string; period?: string; note?: string }) {
  const d = o.date ? o.date.split("-").reverse().join("/") : "A combinar";
  const lines = [
    `Olá! Vim pelo site do ${SALON.name} e gostaria de solicitar um horário.`,
    "",
    `• Serviço: ${o.service}`,
    `• Profissional: ${o.professional}`,
    `• Data de preferência: ${d}`,
    `• Período: ${o.period || "A combinar"}`,
  ];
  if (o.note?.trim()) lines.push(`• Observação: ${o.note.trim()}`);
  lines.push("", "Fico no aguardo da confirmação. Obrigada!");
  return lines.join("\n");
}

export function buildWhatsAppUrl(base: string, prefill: boolean, msg: string) {
  return prefill ? `${base}?text=${encodeURIComponent(msg)}` : base;
}
