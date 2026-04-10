import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { formatCurrency, joinList } from '../../lib/formatters';
import { getProductImageSources } from '../../lib/product-images';
import type { Product } from '../../types/catalog';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSources = getProductImageSources(product);
  const [imageIndex, setImageIndex] = useState(0);
  const activeImage = imageSources[imageIndex];
  const showImage = Boolean(activeImage);

  return (
    <Link
      className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5"
      to={ROUTES.productDetail(product.id)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        {showImage ? (
          <img
            alt={product.imageAlt}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            onError={() => {
              const nextIndex = imageIndex + 1;
              if (nextIndex < imageSources.length) {
                setImageIndex(nextIndex);
              }
            }}
            src={activeImage}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-slate-100/50 p-10 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{product.badge}</span>
            <p className="mt-4 font-serif text-xl text-slate-900">{product.displayName}</p>
          </div>
        )}
        
        <div className="absolute right-5 top-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-md">
            <span className="text-xs font-bold leading-none text-slate-950">→</span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8 lg:p-10">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{product.categoryLabel}</p>
              <h3 className="mt-3 font-serif text-2xl tracking-tight text-slate-950 group-hover:text-emerald-700 transition-colors">{product.displayName}</h3>
            </div>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-500 line-clamp-2">{product.overview}</p>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-50">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-serif text-3xl text-slate-950">{formatCurrency(product.basePriceCents)}</p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
              {product.subcategoryLabel}
            </span>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {product.features.slice(0, 2).map((feature) => (
              <span
                className="rounded-full bg-slate-50 px-4 py-1.5 text-[11px] font-semibold text-slate-500"
                key={feature}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
