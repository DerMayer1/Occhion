import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import PurchaseFlowOverlay, { type CompletedPurchaseFlow } from '../components/product/PurchaseFlowOverlay';
import SectionHeading from '../components/ui/SectionHeading';
import { ROUTES } from '../config/routes';
import {
  DEFAULT_PURCHASE_DRAFT,
  calculatePurchaseTotal,
  getLensPackageOption,
  getLensTypeOption,
  getThicknessOption,
  normalizePurchaseDraft,
} from '../data/purchase-flow';
import { FEATURED_PRODUCTS, PRODUCTS, getProductById, getRelatedProducts } from '../data/products';
import { formatCurrency, joinList } from '../lib/formatters';
import { getProductImageSources } from '../lib/product-images';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = getProductById(productId ?? '') ?? FEATURED_PRODUCTS[0] ?? PRODUCTS[0];
  const relatedProducts = getRelatedProducts(product.id);
  const imageSources = getProductImageSources(product);
  const [imageIndex, setImageIndex] = useState(0);
  const [isFlowOpen, setIsFlowOpen] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<CompletedPurchaseFlow | null>(null);
  const [showToast, setShowToast] = useState(false);
  const activeImage = imageSources[imageIndex];

  useEffect(() => {
    setImageIndex(0);
  }, [product.id]);

  useEffect(() => {
    setPurchaseResult(null);
    setIsFlowOpen(false);
    setShowToast(false);
  }, [product.id]);

  useEffect(() => {
    if (purchaseResult) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [purchaseResult]);

  const normalizedPurchaseDraft = purchaseResult?.mode === 'glasses' ? normalizePurchaseDraft(purchaseResult.draft) : null;
  const purchaseSummary = normalizedPurchaseDraft ? calculatePurchaseTotal(product, normalizedPurchaseDraft) : null;
  const selectedLensType = normalizedPurchaseDraft ? getLensTypeOption(normalizedPurchaseDraft.lensTypeId) : null;
  const selectedThickness = normalizedPurchaseDraft ? getThicknessOption(normalizedPurchaseDraft.thicknessId) : null;
  const selectedPackage = normalizedPurchaseDraft ? getLensPackageOption(normalizedPurchaseDraft.packageId) : null;
  const frameOnlyLabel = product.category === 'solar' ? 'Comprar este solar' : 'Comprar somente armação';

  return (
    <div className="section-shell pb-32 pt-10 lg:pt-20">
      <Link className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 transition-colors hover:text-slate-950" to={ROUTES.collection}>
        <span className="text-lg">←</span> Voltar para a Coleção
      </Link>

      <section className="mt-12 grid gap-16 lg:grid-cols-[1fr,0.8fr] lg:items-start">
        <div className="surface-card group overflow-hidden bg-slate-50 border-none rounded-[3rem]">
          <div className="aspect-[4/5] md:aspect-square">
            {activeImage ? (
              <img
                alt={product.imageAlt}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={() => {
                  const nextIndex = imageIndex + 1;
                  if (nextIndex < imageSources.length) {
                    setImageIndex(nextIndex);
                  }
                }}
                src={activeImage}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-10 text-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{product.badge}</span>
                  <p className="mt-6 font-serif text-4xl text-slate-950 md:text-5xl">{product.displayName}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col pt-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-emerald-600">{product.categoryLabel}</span>
          <h1 className="mt-6 font-serif text-5xl tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">{product.displayName}</h1>
          
          <div className="mt-10 flex flex-baseline gap-4 border-b border-slate-100 pb-10">
            <p className="font-serif text-5xl text-slate-950">{formatCurrency(product.basePriceCents)}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Armação avulsa</p>
          </div>

          <div className="mt-12 space-y-8">
            <p className="text-lg leading-relaxed text-slate-500">{product.overview}</p>
            
            <div className="flex flex-wrap gap-3">
              {product.features.map((feature) => (
                <span
                  className="rounded-full bg-slate-50 px-5 py-2 text-xs font-semibold text-slate-600 border border-slate-100"
                  key={feature}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-4 grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Material</p>
              <p className="mt-3 font-serif text-2xl text-slate-950">{product.material}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100">
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Coleção</p>
               <p className="mt-3 font-serif text-2xl text-slate-950">{product.line}</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <button
              className="flex-1 inline-flex h-14 items-center justify-center rounded-full bg-slate-950 px-8 text-[13px] font-bold tracking-wide text-white transition-all hover:bg-slate-800 shadow-xl shadow-slate-950/20"
              onClick={() => {
                setPurchaseResult({
                  mode: 'frame-only',
                  draft: DEFAULT_PURCHASE_DRAFT,
                });
              }}
              type="button"
            >
              {frameOnlyLabel}
            </button>
            {product.prescriptionFlow.enabled ? (
              <button
                className="flex-1 inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-[13px] font-bold tracking-wide text-slate-950 transition-all hover:border-slate-950"
                onClick={() => setIsFlowOpen(true)}
                type="button"
              >
                Comprar com Lentes
              </button>
            ) : null}
          </div>

          {purchaseResult ? (
            <div
              className={`mt-8 rounded-[1.8rem] border p-6 shadow-sm transition-all duration-500 animate-in fade-in slide-in-from-top-4 ${
                purchaseResult.mode === 'glasses'
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {purchaseResult.mode === 'glasses' ? 'Composição pronta para checkout' : 'Armação selecionada'}
                  </p>
                  {purchaseResult.mode === 'glasses' && purchaseSummary && selectedLensType && selectedThickness && selectedPackage ? (
                    <>
                      <h2 className="mt-3 font-serif text-3xl text-slate-950">{formatCurrency(purchaseSummary.totalCents)}</h2>
                      <p className="mt-3 text-sm leading-7 text-slate-700">
                        {selectedLensType.title}, espessura {selectedThickness.title.toLowerCase()} e pacote {selectedPackage.title.toLowerCase()}.
                      </p>
                      <p className="mt-3 text-xs leading-6 text-slate-500 italic">
                        Receita: {purchaseResult.draft.prescriptionMethod === 'upload-now' ? 'Anexada' : 'Enviar depois'}
                        {' • '}
                        Foto: {purchaseResult.draft.facePhotoMethod === 'upload-now' ? 'Anexada' : 'Enviar depois'}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="mt-3 font-serif text-3xl text-slate-950">{formatCurrency(product.basePriceCents)}</h2>
                      <p className="mt-3 text-sm leading-7 text-slate-700">
                        {product.category === 'solar'
                          ? 'Caminho simplificado para levar o produto final sem entrar em composição óptica.'
                          : 'Caminho simplificado para quem quer levar apenas a armação e decidir as lentes com a ótica depois.'}
                      </p>
                    </>
                  )}
                </div>
                <button 
                  className="text-slate-400 transition hover:text-slate-950"
                  onClick={() => setPurchaseResult(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : null}

          {showToast && (
            <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-8">
              <div className="flex items-center gap-3 rounded-full bg-slate-950 px-6 py-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium pr-2">Item adicionado com sucesso!</p>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <div>
              <h2 className="font-serif text-2xl text-slate-950">Descrição comercial</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{product.description}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-slate-950">Papel na coleção</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{product.story}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-8 xl:grid-cols-[0.95fr,1.05fr]">
        <div className="surface-card p-8">
          <SectionHeading eyebrow="Ficha técnica" title="Atributos relevantes para o site" />
          <dl className="mt-8 grid gap-4">
            {[
              ['Medidas', product.technical.measurements],
              ['Formato', product.technical.format],
              ['Ajuste', product.technical.fit],
              ['Ponte', product.technical.bridge],
              ['Hastes', product.technical.temples],
              ['Compatibilidade', product.technical.lensCompatibility],
            ].map(([label, value]) => (
              <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5" key={label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</dt>
                <dd className="mt-2 text-sm leading-7 text-slate-700">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="surface-card p-8">
          <SectionHeading
            eyebrow={product.prescriptionFlow.enabled ? 'Receita e lentes' : 'Produto final'}
            title={product.prescriptionFlow.enabled ? 'Fluxo óptico apresentado para este item' : 'Leitura comercial do produto'}
          />
          <p className="mt-6 text-sm leading-7 text-slate-600">{product.prescriptionFlow.note}</p>
          <div className="mt-8 grid gap-4">
            {product.prescriptionFlow.lensNotes.map((note) => (
              <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5" key={note}>
                <p className="text-sm leading-7 text-slate-700">{note}</p>
              </div>
            ))}
          </div>
          {product.prescriptionFlow.enabled ? (
            <div className="mt-6 rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm leading-7 text-slate-700">
                A jornada desta PDP agora replica a lógica comercial que faz sentido para ótica: o cliente pode comprar só a armação
                ou entrar num fluxo guiado de composição com lente, receita e foto.
              </p>
            </div>
          ) : null}
          {product.technical.productionNote ? (
            <div className="mt-6 rounded-[1.6rem] border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm leading-7 text-amber-950">{product.technical.productionNote}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          actionLabel="Ver catálogo completo"
          actionTo={ROUTES.collection}
          description="Itens próximos por subcategoria ou linha, para que a apresentação também funcione como navegação de coleção."
          eyebrow="Relacionados"
          title="Outras peças para comparar"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>

      <PurchaseFlowOverlay
        onClose={() => setIsFlowOpen(false)}
        onComplete={(payload) => setPurchaseResult(payload)}
        open={isFlowOpen}
        product={product}
      />
    </div>
  );
}
