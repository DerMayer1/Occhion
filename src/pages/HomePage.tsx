import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import InfoItem from '../components/ui/InfoItem';
import SectionHeading from '../components/ui/SectionHeading';
import { ROUTES } from '../config/routes';
import {
  COLLECTION_HIGHLIGHTS,
  HOME_PILLARS,
  LENS_NOTES,
  PRESCRIPTION_STEPS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from '../config/site';
import { CATALOG, FEATURED_PRODUCTS, PRODUCTS } from '../data/products';

export default function HomePage() {
  const featuredProducts = FEATURED_PRODUCTS.length > 0 ? FEATURED_PRODUCTS : PRODUCTS.slice(0, 6);
  const spotlightProduct = featuredProducts[0];

  return (
    <div className="pb-32 overflow-hidden">
      {/* Hero Section */}
      <section className="section-shell grid gap-16 pt-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-center lg:pt-24">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-emerald-600">Catálogo Premium</span>
          <h1 className="mt-8 font-serif text-5xl leading-[1.1] tracking-tight text-slate-950 sm:text-7xl lg:text-8xl">
            A nova experiência óptica da {SITE_NAME}.
          </h1>
          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-slate-500">
            {SITE_TAGLINE} Apresentamos uma seleção curada que une design atemporal, materiais de alta performance e a precisão técnica que sua visão exige.
          </p>

          <div className="mt-12 flex flex-wrap gap-6">
            <Link
              className="inline-flex h-14 items-center justify-center rounded-full bg-slate-950 px-10 text-[13px] font-bold tracking-wide text-white transition-all hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-xl shadow-slate-950/20"
              to={ROUTES.collection}
            >
              Explorar Catálogo
            </Link>
            <Link
              className="inline-flex h-14 items-center justify-center rounded-full border border-slate-100 bg-white px-10 text-[13px] font-bold tracking-wide text-slate-950 transition-all hover:border-slate-300 hover:bg-slate-50"
              to={ROUTES.about}
            >
              Conheça a Marca
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="surface-card group aspect-[4/5] overflow-hidden rounded-[3rem] bg-slate-50">
            {spotlightProduct.image ? (
              <img 
                alt={spotlightProduct.imageAlt} 
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                src={spotlightProduct.image} 
              />
            ) : (
              <div className="flex h-full items-center justify-center px-10 text-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{spotlightProduct.badge}</span>
                  <p className="mt-6 font-serif text-4xl text-slate-950">{spotlightProduct.displayName}</p>
                </div>
              </div>
            )}
          </div>
          {/* Subtle Float Label */}
          <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 hidden sm:block max-w-xs">
             <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Lançamento</p>
             <p className="mt-2 font-serif text-lg text-slate-950">{spotlightProduct.displayName}</p>
             <p className="mt-2 text-xs text-slate-500 line-clamp-2">{spotlightProduct.overview}</p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section-shell mt-40">
        <SectionHeading
          description="A estrutura do catálogo foi normalizada para oferecer uma navegação rápida e técnica, refletindo a precisão da sua futura loja."
          eyebrow="Nossa Base"
          title="O catálogo agora é o centro da experiência."
        />
        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {HOME_PILLARS.map((item) => (
            <div key={item.title} className="group">
              <div className="h-1 w-12 bg-slate-100 transition-all group-hover:w-20 group-hover:bg-emerald-500"></div>
              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{item.eyebrow}</p>
              <h3 className="mt-4 font-serif text-2xl text-slate-950">{item.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-shell mt-48">
        <SectionHeading
          actionLabel="Ver Seleção"
          actionTo={ROUTES.collection}
          description="Organizamos nossos produtos por material e assinatura visual, facilitando a decisão de compra baseada no estilo de vida."
          eyebrow="Categorias"
          title="Curadoria inteligente."
        />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTION_HIGHLIGHTS.map((item) => (
             <div key={item.title} className="surface-card p-10 hover:border-slate-200 cursor-default">
                <h3 className="font-serif text-2xl text-slate-950">{item.title}</h3>
                <p className="mt-4 text-[13px] leading-relaxed text-slate-500">{item.description}</p>
             </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-shell mt-48">
        <SectionHeading
          actionLabel="Catálogo Completo"
          actionTo={ROUTES.collection}
          description="Uma amostra dos itens mais desejados da nossa coleção, prontos para serem personalizados com suas lentes."
          eyebrow="Destaques"
          title="Peças que definem tendência."
        />
        <div className="mt-16 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Technical Workflow */}
      <section className="section-shell mt-48 grid gap-8 xl:grid-cols-2">
        <div className="rounded-[3rem] bg-slate-950 p-12 text-white sm:p-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Fluxo Óptico</p>
          <h2 className="mt-8 font-serif text-4xl text-white sm:text-6xl">Sua visão sob medida.</h2>
          <div className="mt-16 space-y-12">
            {PRESCRIPTION_STEPS.map((item, idx) => (
              <div key={item.title} className="flex gap-8">
                <span className="font-serif text-3xl text-emerald-500/30">0{idx + 1}</span>
                <div>
                  <h4 className="font-serif text-xl">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
           <div className="surface-card flex-1 p-12 sm:p-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Lentes</p>
              <h3 className="mt-6 font-serif text-3xl text-slate-950">Tecnologia avançada.</h3>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                 {LENS_NOTES.map(item => (
                    <div key={item.title}>
                       <h5 className="font-serif text-lg text-slate-950">{item.title}</h5>
                       <p className="mt-2 text-xs text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="surface-card p-12 bg-emerald-50/30 border-emerald-100/50">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-700">Dúvidas?</p>
              <h3 className="mt-4 font-serif text-2xl text-slate-950">Suporte especializado OCCHI'ON.</h3>
              <p className="mt-3 text-sm text-slate-600">Nossa equipe de especialistas está pronta para ajudar na leitura da sua receita.</p>
           </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-shell mt-48">
        <div className="surface-card bg-slate-50 border-none p-12 text-center sm:p-24 overflow-hidden relative">
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Newsletter</span>
            <h2 className="mt-8 font-serif text-4xl text-slate-950 sm:text-6xl">Fique por dentro das novidades.</h2>
            <p className="mt-8 max-w-xl text-lg text-slate-500">Receba notícias sobre novos lançamentos, eventos exclusivos e tendências de design óptico.</p>
            
            <div className="mt-12 flex w-full max-w-md flex-col gap-4 sm:flex-row">
              <input
                className="flex-1 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm outline-none transition-all focus:border-slate-950"
                placeholder="Seu melhor e-mail"
                type="email"
              />
              <button
                className="rounded-full bg-slate-950 px-8 py-4 text-[13px] font-bold tracking-wide text-white transition-all hover:bg-slate-800"
                type="button"
              >
                Cadastrar
              </button>
            </div>
            <p className="mt-6 text-[11px] text-slate-400 uppercase tracking-widest">Respeitamos sua privacidade.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
