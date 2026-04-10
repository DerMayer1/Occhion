import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { motion } from 'motion/react';
import { ShoppingCart, MessageCircle, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find(p => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-2xl font-serif">Produto não encontrado</h2>
        <Link to="/" className="text-primary underline mt-4 inline-block">Voltar ao início</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[4/5] bg-surface rounded-xl overflow-hidden"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">
                {product.category === 'grau' ? 'Óculos de Grau' : 'Óculos Solar'}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-primary">{product.name}</h1>
              <p className="text-2xl font-medium text-primary">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </p>
            </div>

            <p className="text-secondary leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest">Destaques</h4>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-secondary">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 space-y-4">
              <button className="w-full bg-primary text-white py-5 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-secondary transition-colors flex items-center justify-center">
                <ShoppingCart size={20} className="mr-2" /> Adicionar ao Carrinho
              </button>
              
              <div className="bg-surface p-6 rounded-xl border border-gray-100 space-y-4">
                <div className="flex items-start space-x-3">
                  <MessageCircle size={20} className="text-primary mt-1" />
                  <div>
                    <h5 className="font-bold text-sm text-primary">Envio de Receita</h5>
                    <p className="text-xs text-secondary leading-relaxed mt-1">
                      Após a compra, envie sua receita pelo WhatsApp ou e-mail para que possamos iniciar a produção das suas lentes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="text-center space-y-2">
                <Truck size={24} className="mx-auto text-secondary" />
                <p className="text-[10px] uppercase font-bold tracking-widest text-secondary">Frete Grátis</p>
              </div>
              <div className="text-center space-y-2">
                <RefreshCw size={24} className="mx-auto text-secondary" />
                <p className="text-[10px] uppercase font-bold tracking-widest text-secondary">Troca Fácil</p>
              </div>
              <div className="text-center space-y-2">
                <ShieldCheck size={24} className="mx-auto text-secondary" />
                <p className="text-[10px] uppercase font-bold tracking-widest text-secondary">Garantia 1 Ano</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
