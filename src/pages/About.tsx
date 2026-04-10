export default function About() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-6 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">Nossa História</span>
            <h1 className="text-5xl font-serif text-primary">Excelência em cada olhar.</h1>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1556740734-7f95626904ff?auto=format&fit=crop&q=80&w=1200"
              alt="Nossa Loja"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-secondary leading-relaxed text-lg">
            <div className="space-y-6">
              <p>
                Fundada em 2010, a Ótica Premium nasceu com o propósito de transformar a maneira como as pessoas cuidam de sua visão. Combinamos a precisão técnica da óptica tradicional com o design contemporâneo das melhores marcas mundiais.
              </p>
              <p>
                Nossa curadoria é feita pensando na diversidade de estilos e necessidades. De armações clássicas em acetato italiano a estruturas ultra-leves em titânio, cada peça em nosso catálogo é selecionada por sua qualidade e durabilidade.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                Investimos constantemente em tecnologia de ponta para a medição e produção de lentes, garantindo que sua prescrição seja seguida com exatidão milimétrica.
              </p>
              <p>
                Mais do que vender óculos, nosso compromisso é com a sua saúde visual e sua autoestima. Venha nos visitar e descubra por que somos referência em atendimento personalizado e sofisticação.
              </p>
            </div>
          </div>

          <div className="bg-surface p-12 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-serif text-primary mb-2">15+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">Anos de Mercado</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-primary mb-2">50k+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">Clientes Felizes</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-primary mb-2">20+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">Marcas Premium</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-primary mb-2">100%</p>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">Garantia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
