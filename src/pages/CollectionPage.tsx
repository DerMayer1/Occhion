import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import SectionHeading from '../components/ui/SectionHeading';
import { ROUTES } from '../config/routes';
import { CATALOG, getProductsByCategory } from '../data/products';

export default function CollectionPage() {
  const params = useParams();
  const categoryId = params.categoryId === 'grau' || params.categoryId === 'solar' ? params.categoryId : undefined;
  const products = getProductsByCategory(categoryId);
  const category = CATALOG.find((item) => item.id === categoryId);

  return (
    <div className="section-shell pb-32 pt-12 lg:pt-20">
      <SectionHeading
        description={
          category?.description ??
          'Curadoria completa de armações organizadas por material, tecnologia e assinatura visual para uma decisão de compra precisa.'
        }
        eyebrow="A Coleção"
        title={category?.label ?? 'Nosso Catálogo'}
      />

      <div className="mt-16 flex flex-wrap gap-4">
        <Link
          className={`rounded-full px-8 py-3 text-[13px] font-bold tracking-wide transition-all ${
            !categoryId 
              ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20' 
              : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300 hover:text-slate-950'
          }`}
          to={ROUTES.collection}
        >
          Tudo
        </Link>
        {CATALOG.map((item) => (
          <Link
            className={`rounded-full px-8 py-3 text-[13px] font-bold tracking-wide transition-all ${
              categoryId === item.id
                ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20'
                : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300 hover:text-slate-950'
            }`}
            key={item.id}
            to={ROUTES.collectionCategory(item.id)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {CATALOG.map((item) => (
          <article className="surface-card p-10 hover:border-slate-200" key={item.id}>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-slate-500">{item.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {item.subcategories.map((subcategory) => (
                <span
                  className="rounded-full bg-slate-50 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400"
                  key={subcategory.id}
                >
                  {subcategory.label}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-32 pt-16 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
        <div className="max-w-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Total de Peças</p>
          <p className="mt-4 font-serif text-6xl text-slate-950">{products.length}</p>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-slate-400 italic">
          "A simplicidade é o último grau da sofisticação." — Apresentamos o catálogo OCCHI'ON com a clareza e organização que definem nossa marca.
        </p>
      </div>

      <div className="mt-24 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
