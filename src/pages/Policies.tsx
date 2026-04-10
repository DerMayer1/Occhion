export default function Policies() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">Institucional</span>
            <h1 className="text-5xl font-serif text-primary">Políticas da Loja</h1>
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif text-primary">Trocas e Devoluções</h2>
            <div className="text-secondary leading-relaxed space-y-4">
              <p>
                Nossa política de trocas e devoluções é baseada no Código de Defesa do Consumidor. Você tem até 7 dias corridos após o recebimento para solicitar a troca ou devolução de produtos sem uso.
              </p>
              <p>
                <strong>Observação importante:</strong> Para óculos com lentes de grau personalizadas, a devolução do valor das lentes pode não ser integral, uma vez que são produzidas sob medida para o cliente. A armação pode ser trocada ou devolvida normalmente.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif text-primary">Privacidade e Segurança</h2>
            <div className="text-secondary leading-relaxed space-y-4">
              <p>
                Seus dados estão seguros conosco. Utilizamos criptografia de ponta a ponta para proteger suas informações pessoais e de pagamento. Nunca compartilhamos seus dados com terceiros sem sua autorização explícita.
              </p>
              <p>
                As receitas enviadas são tratadas com sigilo médico e utilizadas exclusivamente para a produção das suas lentes.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif text-primary">Prazos de Entrega</h2>
            <div className="text-secondary leading-relaxed space-y-4">
              <p>
                O prazo de entrega varia de acordo com a sua região e o tipo de produto:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Óculos Solar: 3 a 7 dias úteis após confirmação do pagamento.</li>
                <li>Óculos de Grau: 7 a 15 dias úteis (inclui o tempo de laboratório para produção das lentes).</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
