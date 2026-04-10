import SectionHeading from '../components/ui/SectionHeading';
import { POLICY_SECTIONS } from '../config/site';

export default function PoliciesPage() {
  return (
    <div className="section-shell pb-20 pt-10 md:pt-16">
      <SectionHeading
        description="A apresentação resume os pontos mais relevantes das políticas com foco em privacidade, receita, atendimento e limites do processo."
        eyebrow="Políticas"
        title="Conteúdo institucional com linguagem mais profissional"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {POLICY_SECTIONS.map((section) => (
          <section className="surface-card p-8" key={section.title}>
            <h2 className="font-serif text-3xl text-slate-950">{section.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{section.description}</p>
            <ul className="mt-6 space-y-3">
              {section.bullets.map((bullet) => (
                <li className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700" key={bullet}>
                  {bullet}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
