import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { PRIMARY_NAVIGATION, ROUTES } from '../../config/routes';
import { SITE_NAME } from '../../config/site';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100/50 bg-white/60 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <Link className="flex items-center gap-4 transition-opacity hover:opacity-80" to={ROUTES.home}>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-[10px] font-bold tracking-[0.3em] text-white">
            OC
          </span>
          <div>
            <p className="font-serif text-xl tracking-tight text-slate-950 sm:text-2xl">{SITE_NAME}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {PRIMARY_NAVIGATION.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `text-[13px] font-medium tracking-wide transition-all ${
                  isActive ? 'text-slate-950' : 'text-slate-400 hover:text-slate-950'
                }`
              }
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            aria-label="Ver carrinho"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-950 transition-all hover:bg-slate-950 hover:text-white"
            to={ROUTES.home}
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[9px] font-bold text-white ring-2 ring-white transition-all group-hover:bg-emerald-500">
              0
            </span>
          </Link>

          <button
            aria-expanded={isOpen}
            aria-label="Abrir navegação"
            className="inline-flex h-10 items-center justify-center rounded-full bg-slate-50 px-5 text-[13px] font-semibold tracking-wide text-slate-950 transition-all hover:bg-slate-100 md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            {isOpen ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-6">
            {PRIMARY_NAVIGATION.map((item) => (
              <NavLink
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                key={item.to}
                onClick={() => setIsOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
