import type { ContentCard, PolicySection } from '../types/catalog';

export const SITE_NAME = "OCCHI'ON";
export const SITE_TAGLINE = 'Armações e solares com curadoria contemporânea e orientação óptica.';
export const SITE_DESCRIPTION =
  'Catálogo de apresentação da OCCHI\'ON com armações de grau, solares, linhas infantis e fluxo de envio de receita.';

export const CONTACT_DETAILS = {
  email: 'occhion7@gmail.com',
  city: 'Mairiporã, SP',
  serviceModel: 'Atendimento consultivo com validação humana de prescrição e composição de lentes.',
};

export const HOME_PILLARS: ContentCard[] = [
  {
    eyebrow: 'Catálogo real',
    title: 'Linhas organizadas por material e uso',
    description:
      'A apresentação usa a estrutura real enviada pela cliente: acetato, metal, TR90, solar, infantil e variações clip-on.',
  },
  {
    eyebrow: 'Fluxo óptico',
    title: 'Receita e lentes entram como parte da jornada',
    description:
      'O site apresenta envio de receita, opção de enviar depois e observação de avaliação manual para casos específicos.',
  },
  {
    eyebrow: 'Tom comercial',
    title: 'Marca mais clara, sóbria e premium',
    description:
      'A linguagem prioriza confiança, curadoria e clareza técnica sem cair em excesso clínico ou informalidade.',
  },
];

export const COLLECTION_HIGHLIGHTS: ContentCard[] = [
  {
    title: 'Acetato',
    description: 'Modelos com presença visual mais marcante, equilíbrio entre cor, estrutura e acabamento.',
  },
  {
    title: 'Metal',
    description: 'Linhas leves e elegantes para propostas mais discretas, limpas e refinadas.',
  },
  {
    title: 'TR90',
    description: 'Peças confortáveis, leves e flexíveis para uso diário, incluindo opções infantis.',
  },
  {
    title: 'Solar',
    description: 'Coleções com assinatura de estilo própria, incluindo modelos OCCHI\'ON e Bell\'occhio.',
  },
];

export const PRESCRIPTION_STEPS: ContentCard[] = [
  {
    eyebrow: '01',
    title: 'Escolha a armação',
    description: 'O cliente navega por material, coleção e estilo até encontrar a base ideal para o pedido.',
  },
  {
    eyebrow: '02',
    title: 'Defina a necessidade de lente',
    description: 'A composição óptica entra no fluxo do produto com orientação clara para prescrição e tratamentos.',
  },
  {
    eyebrow: '03',
    title: 'Envie a receita ou sinalize pendência',
    description:
      'O pedido pode receber a prescrição por upload ou seguir com a opção de enviar a receita depois.',
  },
  {
    eyebrow: '04',
    title: 'Validação humana antes da produção',
    description:
      'Graus elevados, combinações especiais e dúvidas técnicas passam por conferência operacional antes da liberação.',
  },
];

export const LENS_NOTES: ContentCard[] = [
  {
    title: 'Visão simples e apoio digital',
    description:
      'A apresentação contempla lentes para rotina diária, conforto visual e tratamentos alinhados à tabela comercial.',
  },
  {
    title: 'Fotossensível e proteção adicional',
    description:
      'Tratamentos e materiais podem ser apresentados como complementos da armação, mantendo a escolha assistida.',
  },
  {
    title: 'Multifocal sob avaliação',
    description:
      'Combinações especiais pedem validação humana antes da produção, conforme o fluxo previsto no contrato.',
  },
];

export const ABOUT_POINTS: ContentCard[] = [
  {
    title: 'Curadoria de linhas',
    description:
      'A marca trabalha com famílias visuais distintas para grau e solar, com atenção especial às variações de acabamento.',
  },
  {
    title: 'Experiência orientada à conversão',
    description:
      'A navegação precisa facilitar a escolha da armação e preparar o pedido para a etapa de lente e prescrição.',
  },
  {
    title: 'Operação com supervisão humana',
    description:
      'O site organiza o processo, mas a validação final da prescrição e da produção permanece assistida pela equipe.',
  },
];

export const FAQ_ITEMS: ContentCard[] = [
  {
    title: 'Posso enviar minha receita depois da compra?',
    description:
      'Sim. O fluxo contempla a opção de enviar a receita depois, com sinalização operacional para acompanhamento.',
  },
  {
    title: 'Todos os modelos aceitam lente de grau?',
    description:
      'Não. O site diferencia produtos de grau, solares e modelos com recursos específicos para orientar a escolha.',
  },
  {
    title: 'Graus altos entram automaticamente?',
    description:
      'Casos com parâmetros fora do padrão comercial podem exigir avaliação manual antes da confirmação final.',
  },
  {
    title: 'A troca cobre erro de receita?',
    description:
      'As políticas precisam deixar claro que prescrição, fabricação e validação técnica dependem de conferência humana.',
  },
];

export const POLICY_SECTIONS: PolicySection[] = [
  {
    title: 'Privacidade e LGPD',
    description: 'Receitas e prescrições devem ser tratadas como dados sensíveis durante a jornada de compra.',
    bullets: [
      'Coleta mínima de dados para composição do pedido.',
      'Uso das informações apenas para análise, produção e atendimento.',
      'Transparência sobre retenção, contato e canal para solicitações do titular.',
    ],
  },
  {
    title: 'Trocas e devoluções',
    description: 'O conteúdo institucional precisa separar produto padrão de composição óptica personalizada.',
    bullets: [
      'Prazo e condições comerciais apresentados de forma clara.',
      'Itens com personalização óptica dependem de análise específica.',
      'Ocorrências logísticas e de fabricação devem ser tratadas por fluxo operacional.',
    ],
  },
  {
    title: 'Receita e conferência técnica',
    description: 'O site organiza o envio da prescrição, mas não substitui validação humana.',
    bullets: [
      'Upload de receita em etapa vinculada ao produto de grau.',
      'Opção de envio posterior para não travar o pedido.',
      'Graus máximos e casos especiais sujeitos a análise manual.',
    ],
  },
  {
    title: 'Entrega de catálogo',
    description: 'A apresentação mostra a lógica real do projeto antes da implantação total na plataforma.',
    bullets: [
      'Estrutura preparada para Shopify sem migrar o projeto nesta etapa.',
      'Coleções, nomenclaturas e descrição comercial já alinhadas ao material da cliente.',
      'Aplicativos, checkout e integrações seguem como etapa posterior de plataforma.',
    ],
  },
];
