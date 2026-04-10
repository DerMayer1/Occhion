import InfoItem from '../components/ui/InfoItem';
import SectionHeading from '../components/ui/SectionHeading';
import { CONTACT_DETAILS, FAQ_ITEMS } from '../config/site';

export default function ContactPage() {
  return (
    <div className="section-shell pb-20 pt-10 md:pt-16">
      <section className="grid gap-8 xl:grid-cols-[0.95fr,1.05fr]">
        <div className="surface-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Contato</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-slate-950">Atendimento com orientação comercial e conferência humana.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            A página de contato foi ajustada para um cenário real de ótica: acolhe dúvidas de catálogo, receita, lente e fluxo de
            pedido sem prometer automações que ainda pertencem à implantação de plataforma.
          </p>

          <div className="mt-8 grid gap-4">
            <InfoItem description={CONTACT_DETAILS.serviceModel} eyebrow="Modelo de atendimento" title="Consultivo e assistido" />
            <InfoItem description={CONTACT_DETAILS.email} eyebrow="E-mail oficial" title="Canal principal" />
            <InfoItem description={CONTACT_DETAILS.city} eyebrow="Base de operação" title="Localidade" />
          </div>
        </div>

        <div className="surface-card p-8">
          <SectionHeading
            description="As dúvidas recorrentes já foram alinhadas ao contrato, ao fluxo de receita e ao papel da equipe na validação final."
            eyebrow="FAQ essencial"
            title="Perguntas que o site precisa responder"
          />
          <div className="mt-8 grid gap-4">
            {FAQ_ITEMS.map((item) => (
              <InfoItem description={item.description} key={item.title} title={item.title} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
