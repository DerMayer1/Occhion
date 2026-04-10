<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Policies from './pages/Policies';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colecao" element={<Collection />} />
          <Route path="/colecao/:categoryId" element={<Collection />} />
          <Route path="/produto/:productId" element={<ProductDetail />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/politicas" element={<Policies />} />
        </Routes>
      </Layout>
    </Router>
=======
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import { ROUTES } from './config/routes';
import AboutPage from './pages/AboutPage';
import CollectionPage from './pages/CollectionPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import PoliciesPage from './pages/PoliciesPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <SiteLayout>
        <Routes>
          <Route element={<HomePage />} path={ROUTES.home} />
          <Route element={<CollectionPage />} path={ROUTES.collection} />
          <Route element={<CollectionPage />} path="/colecao/:categoryId" />
          <Route element={<ProductDetailPage />} path="/produto/:productId" />
          <Route element={<AboutPage />} path={ROUTES.about} />
          <Route element={<ContactPage />} path={ROUTES.contact} />
          <Route element={<PoliciesPage />} path={ROUTES.policies} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
>>>>>>> edacafd (feat: initial Occhion site (clean structure + catalog))
  );
}
