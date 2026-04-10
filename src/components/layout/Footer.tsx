import { Link } from 'react-router-dom';
import { PRIMARY_NAVIGATION } from '../../config/routes';
import { CONTACT_DETAILS, SITE_NAME, SITE_TAGLINE } from '../../config/site';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.2fr,0.8fr,0.8fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Apresentação local</p>
          <h2 className="mt-3 font-serif text-3xl text-white">{SITE_NAME}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">{SITE_TAGLINE}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Navegação</p>
          <div className="mt-4 flex flex-col gap-3">
            {PRIMARY_NAVIGATION.map((item) => (
              <Link className="text-sm text-slate-200 transition hover:text-white" key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Contato</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>{CONTACT_DETAILS.email}</p>
            <p>{CONTACT_DETAILS.city}</p>
            <p>{CONTACT_DETAILS.serviceModel}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
