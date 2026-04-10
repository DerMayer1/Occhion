import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-serif font-bold tracking-tight">
              ÓTICA<span className="font-light text-accent">PREMIUM</span>
            </Link>
            <p className="text-accent text-sm leading-relaxed max-w-xs">
              Excelência em saúde visual e estilo. Oferecemos as melhores marcas e tecnologia em lentes para você enxergar o mundo com clareza.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Navegação</h4>
            <ul className="space-y-4 text-sm text-accent">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/colecao/grau" className="hover:text-white transition-colors">Óculos de Grau</Link></li>
              <li><Link to="/colecao/solar" className="hover:text-white transition-colors">Óculos Solar</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Suporte</h4>
            <ul className="space-y-4 text-sm text-accent">
              <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              <li><Link to="/politicas" className="hover:text-white transition-colors">Trocas e Devoluções</Link></li>
              <li><Link to="/politicas" className="hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Localização</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-accent mb-4">Receba novidades e ofertas exclusivas.</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="bg-white/10 border border-white/20 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-white text-primary font-medium py-2 rounded-md hover:bg-accent transition-colors text-sm">
                Inscrever
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[12px] text-accent uppercase tracking-widest">
          <p>© 2026 Ótica Premium. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center"><Phone size={14} className="mr-2" /> (11) 99999-9999</span>
            <span className="flex items-center"><Mail size={14} className="mr-2" /> contato@oticapremium.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
