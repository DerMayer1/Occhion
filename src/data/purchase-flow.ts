import type { Product } from '../types/catalog';

export type PurchaseStepId = 'type' | 'thickness' | 'package' | 'prescription' | 'photo';
export type DeliveryMethod = 'upload-now' | 'send-later';

export interface PurchaseChoiceOption {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  priceCents: number;
  badge?: string;
  warning?: string;
}

export interface PurchaseFlowDraft {
  lensTypeId: string;
  thicknessId: string;
  packageId: string;
  prescriptionMethod: DeliveryMethod;
  prescriptionFileName?: string;
  facePhotoMethod: DeliveryMethod;
  facePhotoFileName?: string;
}

export const PURCHASE_STEPS: Array<{ id: PurchaseStepId; label: string }> = [
  { id: 'type', label: 'Selecione o tipo' },
  { id: 'thickness', label: 'Selecione a espessura' },
  { id: 'package', label: 'Selecione a lente' },
  { id: 'prescription', label: 'Envie sua receita' },
  { id: 'photo', label: 'Envie sua foto' },
];

export const LENS_TYPE_OPTIONS: PurchaseChoiceOption[] = [
  {
    id: 'single-vision',
    title: 'Visão simples',
    subtitle: 'Miopia, hipermetropia e astigmatismo',
    description: 'Entrada mais direta da tabela comercial da cliente para quem quer montar o grau com leitura clara.',
    bullets: ['Base comercial de visão simples', 'Permite evoluir por espessura', 'Boa porta de entrada para o fluxo óptico'],
    priceCents: 0,
  },
  {
    id: 'blue-light',
    title: 'Luz azul',
    subtitle: 'Rotina digital',
    description: 'Direciona o cliente para combinações da tabela que já incluem proteção para telas e leitura comercial moderna.',
    bullets: ['Foco em telas', 'Preço puxado da planilha real', 'Leitura fácil para venda assistida'],
    priceCents: 0,
  },
  {
    id: 'photochromic',
    title: 'Fotossensível',
    subtitle: 'Escurece no sol',
    description: 'Apresenta as combinações da cliente para quem quer praticidade entre ambientes internos e externos.',
    bullets: ['Transição indoor/outdoor', 'Tabela real da cliente', 'Fluxo mais premium'],
    priceCents: 0,
  },
  {
    id: 'multifocal',
    title: 'Multifocal',
    subtitle: 'Presbiopia',
    description: 'Leva a composição para a parte multifocal pronta, mantendo a venda assistida e a conferência humana no processo.',
    bullets: ['Leitura e distância', 'Precisa de receita bem conferida', 'Atendimento continua importante'],
    priceCents: 0,
    warning: 'Multifocal deve seguir validação técnica antes da produção final.',
  },
];

export const THICKNESS_OPTIONS: PurchaseChoiceOption[] = [
  {
    id: 'standard',
    title: 'Standard',
    subtitle: 'Faixa inicial',
    description: 'Faixa mais objetiva da tabela, boa para visão simples e para começar a jornada com clareza comercial.',
    bullets: ['Até -4.00 / +4.00', 'Cilindro até -2.00', 'Aro fechado'],
    priceCents: 0,
  },
  {
    id: 'classic',
    title: 'Classic',
    subtitle: 'Mais fina',
    description: 'Linha mais fina indicada na tabela para armações fio de nylon, 3 peças e leitura mais leve na face.',
    bullets: ['Ideal para leitura mais discreta', 'Inclui opções 1.59 e Trivex', 'Faixa intermediária'],
    priceCents: 0,
  },
  {
    id: 'premium',
    title: 'Premium',
    subtitle: 'Super fina',
    description: 'Agrupa as opções asféricas mais finas e mais premium da tabela da cliente.',
    bullets: ['Graus mais altos', 'Percepção premium', 'Pode exigir validação adicional'],
    priceCents: 0,
  },
];

const THICKNESS_BY_TYPE: Record<string, string[]> = {
  'single-vision': ['standard', 'classic', 'premium'],
  'blue-light': ['standard', 'classic', 'premium'],
  photochromic: ['standard', 'premium'],
  multifocal: ['standard'],
};

const LENS_PACKAGE_OPTIONS_BY_SELECTION: Record<string, PurchaseChoiceOption[]> = {
  'single-vision:standard': [
    {
      id: 'sv-standard',
      title: 'Standard',
      subtitle: 'Visão simples',
      description: 'Base comercial de visão simples aro fechado, extraída diretamente da tabela enviada pela cliente.',
      bullets: ['Visão simples', 'Faixa inicial de grau', 'Preço de entrada'],
      priceCents: 7500,
      badge: 'Tabela real',
    },
    {
      id: 'sv-standard-ar',
      title: 'Standard com antirreflexo',
      subtitle: 'Visão simples',
      description: 'Versão de entrada com antirreflexo para uma leitura comercial mais forte na apresentação.',
      bullets: ['Antirreflexo', 'Uso cotidiano', 'Boa porta de entrada'],
      priceCents: 9900,
      badge: 'Tabela real',
    },
  ],
  'single-vision:classic': [
    {
      id: 'sv-classic-159-ar',
      title: '1.59 antirreflexo',
      subtitle: 'Classic',
      description: 'Opção mais fina da tabela, indicada para leitura mais leve e uso com maior cuidado estético.',
      bullets: ['Índice 1.59', 'Antirreflexo', 'Até -4.00 / +4.00'],
      priceCents: 29000,
      badge: 'Tabela real',
    },
    {
      id: 'sv-classic-trivex',
      title: '1.53 Trivex antirreflexo',
      subtitle: 'Classic',
      description: 'Combinação mais resistente da tabela para quem quer robustez sem sair da linha classic.',
      bullets: ['Trivex', 'Antirreflexo', 'Mais resistência'],
      priceCents: 29000,
      badge: 'Tabela real',
    },
  ],
  'single-vision:premium': [
    {
      id: 'sv-premium-fastkot',
      title: '1.74 Fastkot',
      subtitle: 'Premium',
      description: 'Linha super fina para graus mais altos e percepção de produto mais premium.',
      bullets: ['Índice 1.74', 'Super fina', 'Faixa mais alta de grau'],
      priceCents: 99000,
      badge: 'Tabela real',
    },
    {
      id: 'sv-premium-hoya',
      title: '1.74 Nulux Hoya Meiryo',
      subtitle: 'Premium',
      description: 'Opção superior da tabela, pensada para composição mais sofisticada e venda consultiva.',
      bullets: ['Linha Hoya', 'Leitura premium', 'Configuração mais avançada'],
      priceCents: 149900,
      badge: 'Tabela real',
      warning: 'Linha superior indicada para validação final com atendimento.',
    },
  ],
  'blue-light:standard': [
    {
      id: 'blue-standard',
      title: 'Standard + Blue',
      subtitle: 'Luz azul',
      description: 'Combinação standard com antirreflexo e blue filter, puxada diretamente da planilha.',
      bullets: ['Antirreflexo', 'Blue filter', 'Faixa inicial de grau'],
      priceCents: 15000,
      badge: 'Tabela real',
    },
  ],
  'blue-light:classic': [
    {
      id: 'blue-classic-pentax',
      title: '1.59 Pentax Blue',
      subtitle: 'Classic',
      description: 'Linha classic com proteção azul e leitura comercial mais refinada.',
      bullets: ['Índice 1.59', 'Pentax Blue', 'Classic'],
      priceCents: 39500,
      badge: 'Tabela real',
    },
  ],
  'blue-light:premium': [
    {
      id: 'blue-premium-pentax',
      title: '1.67 Pentax Blue Super Hidro',
      subtitle: 'Premium',
      description: 'Combinação premium da tabela com proteção azul e acabamento superior.',
      bullets: ['Índice 1.67', 'Blue', 'Super hidro'],
      priceCents: 69900,
      badge: 'Tabela real',
    },
  ],
  'photochromic:standard': [
    {
      id: 'photo-standard',
      title: 'Standard + Blue + Fotossensível',
      subtitle: 'Fotossensível',
      description: 'Linha standard com blue filter e resposta ao sol, como veio descrito na planilha.',
      bullets: ['Fotossensível', 'Blue', 'Entrada comercial completa'],
      priceCents: 32000,
      badge: 'Tabela real',
    },
  ],
  'photochromic:premium': [
    {
      id: 'photo-premium-pentax',
      title: '1.67 Pentax Blue Foto',
      subtitle: 'Premium',
      description: 'Composição premium fotossensível da tabela, voltada para venda com maior ticket.',
      bullets: ['Índice 1.67', 'Blue Foto', 'Fluxo premium'],
      priceCents: 89900,
      badge: 'Tabela real',
    },
  ],
  'multifocal:standard': [
    {
      id: 'mf-blue',
      title: '1.56 Fastkot Blue',
      subtitle: 'Multifocal pronta',
      description: 'Opção multifocal pronta aro fechado com blue filter, conforme tabela enviada.',
      bullets: ['Multifocal pronta', 'Blue', 'Adição +1.00 a +3.00'],
      priceCents: 32000,
      badge: 'Tabela real',
      warning: 'Multifocal segue validação manual antes da produção.',
    },
    {
      id: 'mf-photo',
      title: '1.56 Fastkot Blue Fotossensível',
      subtitle: 'Multifocal pronta',
      description: 'Versão multifocal pronta com blue e fotossensível, extraída da linha multifocal da planilha.',
      bullets: ['Multifocal pronta', 'Blue', 'Fotossensível'],
      priceCents: 52000,
      badge: 'Tabela real',
      warning: 'Multifocal segue validação manual antes da produção.',
    },
  ],
};

const ALL_LENS_PACKAGE_OPTIONS = Object.values(LENS_PACKAGE_OPTIONS_BY_SELECTION).flat();

export const DEFAULT_PURCHASE_DRAFT: PurchaseFlowDraft = {
  lensTypeId: LENS_TYPE_OPTIONS[0].id,
  thicknessId: THICKNESS_BY_TYPE[LENS_TYPE_OPTIONS[0].id][0],
  packageId: LENS_PACKAGE_OPTIONS_BY_SELECTION[`${LENS_TYPE_OPTIONS[0].id}:${THICKNESS_BY_TYPE[LENS_TYPE_OPTIONS[0].id][0]}`][0].id,
  prescriptionMethod: 'send-later',
  facePhotoMethod: 'send-later',
};

export function getLensTypeOption(optionId: string) {
  return LENS_TYPE_OPTIONS.find((option) => option.id === optionId) ?? LENS_TYPE_OPTIONS[0];
}

export function getAvailableThicknessOptions(lensTypeId: string) {
  const availableIds = THICKNESS_BY_TYPE[lensTypeId] ?? THICKNESS_BY_TYPE[LENS_TYPE_OPTIONS[0].id];
  return THICKNESS_OPTIONS.filter((option) => availableIds.includes(option.id));
}

export function getThicknessOption(optionId: string) {
  return THICKNESS_OPTIONS.find((option) => option.id === optionId) ?? THICKNESS_OPTIONS[0];
}

export function getAvailableLensPackageOptions(lensTypeId: string, thicknessId: string) {
  return LENS_PACKAGE_OPTIONS_BY_SELECTION[`${lensTypeId}:${thicknessId}`] ?? [];
}

export function getDefaultLensPackageOption(lensTypeId: string, thicknessId: string) {
  return getAvailableLensPackageOptions(lensTypeId, thicknessId)[0] ?? ALL_LENS_PACKAGE_OPTIONS[0];
}

export function getLensPackageOption(optionId: string) {
  return ALL_LENS_PACKAGE_OPTIONS.find((option) => option.id === optionId) ?? ALL_LENS_PACKAGE_OPTIONS[0];
}

export function normalizePurchaseDraft(draft: PurchaseFlowDraft): PurchaseFlowDraft {
  const availableThicknessOptions = getAvailableThicknessOptions(draft.lensTypeId);
  const thicknessId = availableThicknessOptions.some((option) => option.id === draft.thicknessId)
    ? draft.thicknessId
    : availableThicknessOptions[0]?.id ?? THICKNESS_OPTIONS[0].id;

  const availablePackageOptions = getAvailableLensPackageOptions(draft.lensTypeId, thicknessId);
  const packageId = availablePackageOptions.some((option) => option.id === draft.packageId)
    ? draft.packageId
    : availablePackageOptions[0]?.id ?? ALL_LENS_PACKAGE_OPTIONS[0].id;

  return {
    ...draft,
    thicknessId,
    packageId,
  };
}

export function calculatePurchaseTotal(product: Product, draft: PurchaseFlowDraft) {
  const normalizedDraft = normalizePurchaseDraft(draft);
  const packageOption = getLensPackageOption(normalizedDraft.packageId);

  return {
    framePriceCents: product.basePriceCents,
    lensTypePriceCents: 0,
    thicknessPriceCents: 0,
    packagePriceCents: packageOption.priceCents,
    totalCents: product.basePriceCents + packageOption.priceCents,
  };
}
