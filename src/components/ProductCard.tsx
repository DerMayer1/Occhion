import { Link } from 'react-router-dom';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/produto/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface mb-4 rounded-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          
          <div className="absolute bottom-4 left-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button className="w-full bg-white text-primary text-xs font-bold py-3 rounded shadow-lg uppercase tracking-wider">
              Ver Detalhes
            </button>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">
            {product.category === 'grau' ? 'Óculos de Grau' : 'Óculos Solar'}
          </p>
          <h3 className="font-serif text-lg text-primary">{product.name}</h3>
          <p className="text-primary font-medium">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
