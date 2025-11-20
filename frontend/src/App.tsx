import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './app/page'
import CatalogPage from './app/catalog/page'
import HeroPage from './app/hero/page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/hero" element={<HeroPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App