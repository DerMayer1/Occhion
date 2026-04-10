import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, FileImage, FileText, MessageCircleMore, X } from 'lucide-react';
import type { Product } from '../../types/catalog';
import {
  DEFAULT_PURCHASE_DRAFT,
  LENS_TYPE_OPTIONS,
  PURCHASE_STEPS,
  calculatePurchaseTotal,
  getAvailableLensPackageOptions,
  getAvailableThicknessOptions,
  getDefaultLensPackageOption,
  getLensPackageOption,
  getLensTypeOption,
  getThicknessOption,
  normalizePurchaseDraft,
  type DeliveryMethod,
  type PurchaseChoiceOption,
  type PurchaseFlowDraft,
} from '../../data/purchase-flow';
import { formatCurrency } from '../../lib/formatters';
import { getProductImageSources } from '../../lib/product-images';

export interface CompletedPurchaseFlow {
  mode: 'frame-only' | 'glasses';
  draft: PurchaseFlowDraft;
}

interface PurchaseFlowOverlayProps {
  open: boolean;
  product: Product;
  onClose: () => void;
  onComplete: (payload: CompletedPurchaseFlow) => void;
}

function StepOptionCard({
  option,
  priceLabel,
  selected,
  onClick,
}: {
  option: PurchaseChoiceOption;
  priceLabel?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`rounded-[1.8rem] border p-6 text-left transition ${
        selected
          ? 'border-slate-950 bg-slate-950 text-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.75)]'
          : 'border-slate-200 bg-white text-slate-950 hover:border-slate-400'
      }`}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${selected ? 'text-slate-300' : 'text-slate-500'}`}>
            {option.subtitle ?? 'Opção'}
          </p>
          <h3 className="mt-3 font-serif text-3xl">{option.title}</h3>
        </div>
        {option.badge ? (
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${
              selected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {option.badge}
          </span>
        ) : null}
      </div>
      <p className={`mt-4 text-sm leading-7 ${selected ? 'text-slate-200' : 'text-slate-600'}`}>{option.description}</p>
      <ul className="mt-5 space-y-2">
        {option.bullets.map((bullet) => (
          <li className={`text-sm ${selected ? 'text-slate-100' : 'text-slate-600'}`} key={bullet}>
            {bullet}
          </li>
        ))}
      </ul>
      {option.warning ? (
        <p className={`mt-4 text-xs leading-6 ${selected ? 'text-amber-200' : 'text-amber-700'}`}>{option.warning}</p>
      ) : null}
      {priceLabel ? <p className="mt-5 text-2xl font-semibold">{priceLabel}</p> : null}
    </button>
  );
}

function DeliveryChoiceCard({
  title,
  description,
  icon,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  icon: 'file' | 'photo';
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = icon === 'file' ? FileText : FileImage;

  return (
    <button
      className={`rounded-[1.8rem] border p-6 text-left transition ${
        selected ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-950 hover:border-slate-400'
      }`}
      onClick={onClick}
      type="button"
    >
      <Icon className="h-8 w-8" />
      <h3 className="mt-4 font-serif text-3xl">{title}</h3>
      <p className={`mt-3 text-sm leading-7 ${selected ? 'text-slate-200' : 'text-slate-600'}`}>{description}</p>
    </button>
  );
}

export default function PurchaseFlowOverlay({ open, product, onClose, onComplete }: PurchaseFlowOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<PurchaseFlowDraft>(DEFAULT_PURCHASE_DRAFT);
  const prescriptionInputRef = useRef<HTMLInputElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    setStepIndex(0);
    setDraft(DEFAULT_PURCHASE_DRAFT);
  }, [open, product.id]);

  useEffect(() => {
    const normalized = normalizePurchaseDraft(draft);
    if (normalized.thicknessId !== draft.thicknessId || normalized.packageId !== draft.packageId) {
      setDraft((current) => ({
        ...current,
        thicknessId: normalized.thicknessId,
        packageId: normalized.packageId,
      }));
    }
  }, [draft]);

  const normalizedDraft = useMemo(() => normalizePurchaseDraft(draft), [draft]);
  const summary = useMemo(() => calculatePurchaseTotal(product, normalizedDraft), [normalizedDraft, product]);
  const lensType = getLensTypeOption(normalizedDraft.lensTypeId);
  const thickness = getThicknessOption(normalizedDraft.thicknessId);
  const packageOption = getLensPackageOption(normalizedDraft.packageId);
  const thicknessOptions = getAvailableThicknessOptions(normalizedDraft.lensTypeId);
  const packageOptions = getAvailableLensPackageOptions(normalizedDraft.lensTypeId, normalizedDraft.thicknessId);
  const stepId = PURCHASE_STEPS[stepIndex]?.id;
  const imageSources = getProductImageSources(product);
  const heroImage = imageSources[0];

  if (!open) {
    return null;
  }

  const goNext = () => setStepIndex((current) => Math.min(current + 1, PURCHASE_STEPS.length - 1));
  const goBack = () => setStepIndex((current) => Math.max(current - 1, 0));
  const handleClose = () => onClose();

  const setDeliveryMethod = (field: 'prescriptionMethod' | 'facePhotoMethod', method: DeliveryMethod) => {
    setDraft((current) => ({
      ...current,
      [field]: method,
      ...(field === 'prescriptionMethod' && method === 'send-later' ? { prescriptionFileName: undefined } : {}),
      ...(field === 'facePhotoMethod' && method === 'send-later' ? { facePhotoFileName: undefined } : {}),
    }));
  };

  const handleCompleteFrameOnly = () => {
    onComplete({
      mode: 'frame-only',
      draft: DEFAULT_PURCHASE_DRAFT,
    });
    onClose();
  };

  const handleCompleteGlasses = () => {
    onComplete({
      mode: 'glasses',
      draft,
    });
    onClose();
  };

  const canFinish = Boolean(draft.prescriptionMethod && draft.facePhotoMethod);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm">
      <div className="flex h-full flex-col bg-white">
        <header className="border-b border-slate-200 px-5 py-4 sm:px-6 lg:px-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Fluxo guiado de compra</p>
              <h2 className="mt-2 font-serif text-3xl text-slate-950">Monte seus óculos com lentes</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                Agora o fluxo usa a tabela comercial real da cliente: tipo de lente, espessura, combinação final, receita e foto
                entram numa jornada assistida com rota clara para comprar só a armação.
              </p>
            </div>
            <button
              aria-label="Fechar fluxo guiado"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              onClick={handleClose}
              type="button"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-5 md:pb-0">
            {PURCHASE_STEPS.map((step, index) => {
              const completed = index < stepIndex;
              const active = index === stepIndex;

              return (
                <button
                  className={`flex shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 text-left text-xs transition md:shrink md:py-3 md:text-sm ${
                    active
                      ? 'border-slate-950 bg-slate-950 text-white'
                      : completed
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-white text-slate-500'
                  }`}
                  key={step.id}
                  onClick={() => setStepIndex(index)}
                  type="button"
                >
                  <span
                    className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold md:h-7 md:w-7 md:text-xs ${
                      active
                        ? 'border-white/30 bg-white/10 text-white'
                        : completed
                          ? 'border-emerald-300 bg-white text-emerald-700'
                          : 'border-slate-300 bg-slate-50 text-slate-500'
                    }`}
                  >
                    {completed ? <Check className="h-3.5 w-3.5" /> : index + 1}
                  </span>
                  <span className="font-medium">{step.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="overflow-y-auto px-5 py-8 sm:px-6 lg:px-10">
            {stepId === 'type' ? (
              <div>
                <div className="mb-8 flex items-center justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Etapa 1</p>
                    <h3 className="mt-3 font-serif text-4xl text-slate-950">Como você vai usar seus óculos?</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                      Aqui o cliente entra pela necessidade principal. O preço real aparece na etapa seguinte, quando a combinação da
                      planilha fica definida.
                    </p>
                  </div>
                  <div className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 lg:inline-flex">
                    <MessageCircleMore className="mr-2 h-4 w-4" />
                    Suporte humano
                  </div>
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                  {LENS_TYPE_OPTIONS.map((option) => (
                    <StepOptionCard
                      key={option.id}
                      onClick={() => {
                        const fallbackThickness = getAvailableThicknessOptions(option.id)[0]?.id ?? DEFAULT_PURCHASE_DRAFT.thicknessId;
                        const fallbackPackage = getDefaultLensPackageOption(option.id, fallbackThickness).id;
                        setDraft((current) => ({
                          ...current,
                          lensTypeId: option.id,
                          thicknessId: fallbackThickness,
                          packageId: fallbackPackage,
                        }));
                      }}
                      option={option}
                      selected={draft.lensTypeId === option.id}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {stepId === 'thickness' ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Etapa 2</p>
                <h3 className="mt-3 font-serif text-4xl text-slate-950">Agora escolha a família de espessura</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  A tabela da cliente não trabalha tudo no mesmo patamar. Esta etapa filtra a família correta antes de mostrar as
                  combinações reais de lente e preço.
                </p>

                <div className="mt-8 grid gap-5 xl:grid-cols-3">
                  {thicknessOptions.map((option) => (
                    <StepOptionCard
                      key={option.id}
                      onClick={() => {
                        const fallbackPackage = getDefaultLensPackageOption(normalizedDraft.lensTypeId, option.id).id;
                        setDraft((current) => ({
                          ...current,
                          thicknessId: option.id,
                          packageId: fallbackPackage,
                        }));
                      }}
                      option={option}
                      selected={normalizedDraft.thicknessId === option.id}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {stepId === 'package' ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Etapa 3</p>
                <h3 className="mt-3 font-serif text-4xl text-slate-950">Escolha a combinação comercial da tabela</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  Aqui entram os valores reais da planilha da cliente. Em vez de um preço artificial somado por partes, o site mostra
                  a combinação comercial aplicável à seleção feita acima.
                </p>

                <div className="mt-8 grid gap-5 xl:grid-cols-3">
                  {packageOptions.map((option) => (
                    <StepOptionCard
                      key={option.id}
                      onClick={() => setDraft((current) => ({ ...current, packageId: option.id }))}
                      option={option}
                      priceLabel={formatCurrency(option.priceCents)}
                      selected={normalizedDraft.packageId === option.id}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {stepId === 'prescription' ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Etapa 4</p>
                <h3 className="mt-3 font-serif text-4xl text-slate-950">Como você quer enviar sua receita?</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  A lógica comercial certa não trava a compra. Ela dá opção de anexar agora ou continuar e enviar depois com apoio da
                  equipe.
                </p>

                <div className="mt-8 grid gap-5 xl:grid-cols-2">
                  <DeliveryChoiceCard
                    description={draft.prescriptionFileName ? `Arquivo selecionado: ${draft.prescriptionFileName}` : 'Anexe PDF, JPG ou PNG da receita para acelerar a conferência.'}
                    icon="file"
                    onClick={() => prescriptionInputRef.current?.click()}
                    selected={draft.prescriptionMethod === 'upload-now'}
                    title="Enviar agora"
                  />
                  <DeliveryChoiceCard
                    description="Siga com o pedido e envie a receita depois por e-mail ou no atendimento."
                    icon="file"
                    onClick={() => setDeliveryMethod('prescriptionMethod', 'send-later')}
                    selected={draft.prescriptionMethod === 'send-later'}
                    title="Enviar depois"
                  />
                </div>

                <input
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;

                    setDraft((current) => ({
                      ...current,
                      prescriptionMethod: 'upload-now',
                      prescriptionFileName: file.name,
                    }));
                  }}
                  ref={prescriptionInputRef}
                  type="file"
                />
              </div>
            ) : null}

            {stepId === 'photo' ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Etapa 5</p>
                <h3 className="mt-3 font-serif text-4xl text-slate-950">Envie uma foto do rosto ou finalize para mandar depois</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  A foto ajuda na leitura de ajuste e distância pupilar, mas a jornada continua funcional mesmo quando o cliente quer
                  concluir primeiro e complementar depois.
                </p>

                <div className="mt-8 grid gap-5 xl:grid-cols-2">
                  <DeliveryChoiceCard
                    description={draft.facePhotoFileName ? `Arquivo selecionado: ${draft.facePhotoFileName}` : 'Escolha uma foto do rosto em ambiente claro, de preferência segurando um cartão.'}
                    icon="photo"
                    onClick={() => photoInputRef.current?.click()}
                    selected={draft.facePhotoMethod === 'upload-now'}
                    title="Enviar agora"
                  />
                  <DeliveryChoiceCard
                    description="Finalize a composição e deixe a equipe orientar o envio da foto depois."
                    icon="photo"
                    onClick={() => setDeliveryMethod('facePhotoMethod', 'send-later')}
                    selected={draft.facePhotoMethod === 'send-later'}
                    title="Enviar depois"
                  />
                </div>

                <input
                  accept=".png,.jpg,.jpeg,.webp"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;

                    setDraft((current) => ({
                      ...current,
                      facePhotoMethod: 'upload-now',
                      facePhotoFileName: file.name,
                    }));
                  }}
                  ref={photoInputRef}
                  type="file"
                />
              </div>
            ) : null}
          </div>

          <aside className="border-t border-slate-200 bg-slate-50 px-5 py-10 sm:px-6 lg:min-h-0 lg:overflow-y-auto lg:border-l lg:border-t-0 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Resumo da composição</p>
            <div className="mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[3/2] bg-[radial-gradient(circle_at_top,#e2e8f0,white_65%)] lg:aspect-[4/3]">
                {heroImage ? (
                  <img alt={product.imageAlt} className="h-full w-full object-cover" src={heroImage} />
                ) : (
                  <div className="flex h-full items-center justify-center p-8 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Imagem técnica
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">{product.categoryLabel}</p>
                <h3 className="mt-2 font-serif text-2xl text-slate-950">{product.displayName}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-600 line-clamp-2">{product.overview}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Armação</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-700">{product.displayName}</p>
                  <p className="text-sm font-semibold text-slate-950">{formatCurrency(summary.framePriceCents)}</p>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Tipo</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-700">{lensType.title}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Definido no pacote</p>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Espessura</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-700">{thickness.title}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Filtra a tabela</p>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Lente</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-700">{packageOption.title}</p>
                  <p className="text-sm font-semibold text-slate-950">{formatCurrency(summary.packagePriceCents)}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[1.8rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Total da composição</p>
              <div className="mt-3 flex items-baseline gap-2">
                <p className="font-serif text-5xl">{formatCurrency(summary.totalCents)}</p>
              </div>
              <p className="mt-4 text-[11px] leading-5 text-slate-400">
                Valor puxado da tabela comercial enviada pela cliente. Frete, limites finais de grau e validações humanas entram no
                fechamento operacional.
              </p>
            </div>
          </aside>
        </div>

        <footer className="border-t border-slate-200 bg-white px-5 py-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                onClick={handleCompleteFrameOnly}
                type="button"
              >
                Comprar somente armação
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                onClick={handleClose}
                type="button"
              >
                Fechar fluxo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={stepIndex === 0}
                onClick={goBack}
                type="button"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Voltar
              </button>

              {stepIndex < PURCHASE_STEPS.length - 1 ? (
                <button
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  onClick={goNext}
                  type="button"
                >
                  Próximo passo
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              ) : (
                <button
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!canFinish}
                  onClick={handleCompleteGlasses}
                  type="button"
                >
                  Concluir composição
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
