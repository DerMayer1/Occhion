import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511499767350-a1590f65838a?auto=format&fit=crop&q=80&w=1920"
            alt="Hero Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-serif leading-tight">
              A clareza que você merece, <br />
              <span className="italic">o estilo que você define.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light max-w-lg leading-relaxed">
              Descubra nossa coleção exclusiva de armações premium e lentes de alta tecnologia. Qualidade e sofisticação em cada detalhe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/colecao/solar"
                className="bg-white text-primary px-8 py-4 rounded-md font-bold uppercase tracking-wider text-sm hover:bg-accent transition-colors flex items-center justify-center"
              >
                Ver Coleção Solar <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/colecao/grau"
                className="bg-transparent border border-white text-white px-8 py-4 rounded-md font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                Óculos de Grau
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/colecao/${category.id}`}
              className="group relative h-[400px] overflow-hidden rounded-xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white space-y-2">
                <h3 className="text-3xl font-serif">{category.name}</h3>
                <p className="text-white/70 text-sm max-w-xs">{category.description}</p>
                <div className="pt-4 flex items-center text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Explorar <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-4 md:space-y-0">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">Destaques</span>
            <h2 className="text-4xl font-serif text-primary">Nossa Vitrine</h2>
          </div>
          <Link to="/colecao/solar" className="text-sm font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors">
            Ver Tudo
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Institutional / Trust */}
      <section className="bg-surface py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
                Compromisso com sua <br /> saúde visual.
              </h2>
              <p className="text-secondary leading-relaxed text-lg">
                Na Ótica Premium, acreditamos que óculos são mais do que um acessório; são uma extensão da sua personalidade e uma ferramenta essencial para o seu bem-estar.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <ShieldCheck className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Garantia de Qualidade</h4>
                    <p className="text-secondary text-sm">Trabalhamos apenas com materiais certificados e as melhores marcas do mercado.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Star className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Atendimento Especializado</h4>
                    <p className="text-secondary text-sm">Nossa equipe está pronta para ajudar você a encontrar a armação perfeita para o seu rosto.</p>
                  </div>
                </div>
              </div>
              <Link to="/sobre" className="inline-block bg-primary text-white px-8 py-4 rounded-md font-bold uppercase tracking-wider text-sm hover:bg-secondary transition-colors">
                Conheça Nossa História
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
                alt="Institutional"
                className="rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-xl shadow-xl hidden md:block max-w-xs">
                <p className="font-serif text-2xl text-primary italic">"A melhor experiência que já tive em uma ótica."</p>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mt-4">— Mariana Silva</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Truck size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-serif">Entrega Segura</h3>
            <p className="text-secondary text-sm">Enviamos para todo o Brasil com embalagens reforçadas e seguro total.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <ShieldCheck size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-serif">Pagamento Facilitado</h3>
            <p className="text-secondary text-sm">Parcele suas compras em até 10x sem juros no cartão de crédito.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Star size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-serif">Troca Grátis</h3>
            <p className="text-secondary text-sm">Não gostou? A primeira troca é por nossa conta em até 7 dias.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
