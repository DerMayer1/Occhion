import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">Fale Conosco</span>
                <h1 className="text-5xl font-serif text-primary">Estamos aqui para ajudar.</h1>
                <p className="text-secondary text-lg leading-relaxed">
                  Tem alguma dúvida sobre nossos produtos, sua receita ou precisa de ajuda com um pedido? Nossa equipe está pronta para atender você.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-surface p-3 rounded-lg">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Telefone e WhatsApp</h4>
                    <p className="text-secondary">(11) 99999-9999</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-surface p-3 rounded-lg">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">E-mail</h4>
                    <p className="text-secondary">contato@oticapremium.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-surface p-3 rounded-lg">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Endereço</h4>
                    <p className="text-secondary">Av. Paulista, 1000 - Bela Vista, São Paulo - SP</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-surface p-3 rounded-lg">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Horário de Funcionamento</h4>
                    <p className="text-secondary">Segunda a Sexta: 09h às 19h<br />Sábado: 09h às 14h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface p-10 rounded-2xl shadow-sm border border-gray-100">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">Nome Completo</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">E-mail</label>
                    <input
                      type="email"
                      className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="joao@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Assunto</label>
                  <select className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors">
                    <option>Dúvida sobre Produto</option>
                    <option>Status do Pedido</option>
                    <option>Envio de Receita</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Mensagem</label>
                  <textarea
                    rows={5}
                    className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Como podemos ajudar?"
                  />
                </div>
                <button className="w-full bg-primary text-white py-4 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-secondary transition-colors">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
