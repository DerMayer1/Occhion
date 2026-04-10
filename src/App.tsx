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
  );
}
