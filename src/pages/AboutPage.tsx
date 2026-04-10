import InfoItem from '../components/ui/InfoItem';
import SectionHeading from '../components/ui/SectionHeading';
import { ABOUT_POINTS, COLLECTION_HIGHLIGHTS, SITE_NAME, SITE_TAGLINE } from '../config/site';

export default function AboutPage() {
  return (
    <div className="section-shell pb-20 pt-10 md:pt-16">
      <section className="grid gap-8 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="surface-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Sobre a marca</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-slate-950">{SITE_NAME} em uma apresentação mais madura.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{SITE_TAGLINE}</p>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            O site agora apresenta a marca como operação de catálogo óptico com curadoria, não como vitrine genérica. A navegação
            foi reorganizada para apoiar o entendimento das linhas, dos materiais e do fluxo de receita sem perder o tom comercial.
          </p>
        </div>

        <div className="surface-card p-8">
          <SectionHeading eyebrow="Direção de marca" title="Pontos que a apresentação precisa sustentar" />
          <div className="mt-8 grid gap-4">
            {ABOUT_POINTS.map((item) => (
              <InfoItem description={item.description} key={item.title} title={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          description="A organização por família, material e função ajuda o site a parecer uma operação real pronta para migrar à plataforma."
          eyebrow="Estrutura comercial"
          title="Como a coleção passa a se sustentar"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {COLLECTION_HIGHLIGHTS.map((item) => (
            <InfoItem description={item.description} key={item.title} title={item.title} />
          ))}
        </div>
      </section>
    </div>
  );
}
