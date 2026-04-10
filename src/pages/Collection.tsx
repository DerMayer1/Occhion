import { useParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { SlidersHorizontal } from 'lucide-react';

export default function Collection() {
  const { categoryId } = useParams();
  
  const category = categories.find(c => c.id === categoryId);
  const filteredProducts = categoryId 
    ? products.filter(p => p.category === categoryId)
    : products;

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">Coleção</span>
          <h1 className="text-5xl font-serif text-primary">
            {category ? category.name : 'Todos os Produtos'}
          </h1>
          {category && (
            <p className="text-secondary max-w-2xl leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        {/* Filters & Grid */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 space-y-8">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Categorias</h4>
              <ul className="space-y-3 text-sm text-secondary">
                <li><button className="hover:text-primary transition-colors">Todos</button></li>
                <li><button className="hover:text-primary transition-colors">Óculos de Grau</button></li>
                <li><button className="hover:text-primary transition-colors">Óculos Solar</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Preço</h4>
              <ul className="space-y-3 text-sm text-secondary">
                <li><button className="hover:text-primary transition-colors">Até R$ 400</button></li>
                <li><button className="hover:text-primary transition-colors">R$ 400 - R$ 600</button></li>
                <li><button className="hover:text-primary transition-colors">Acima de R$ 600</button></li>
              </ul>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between py-4 border-y border-gray-100 mb-8">
            <span className="text-sm font-medium">{filteredProducts.length} produtos</span>
            <button className="flex items-center text-sm font-bold uppercase tracking-widest">
              Filtros <SlidersHorizontal size={16} className="ml-2" />
            </button>
          </div>

          {/* Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-24 space-y-4">
                <p className="text-secondary">Nenhum produto encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
