import { useProducts } from './api/product';
import ProductCard from '~/components/ProductCard';
import { component$, $, useStore } from '@builder.io/qwik';  // Ajoute $ ici
export { useProducts } from './api/product';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;  // ? signifie optionnel
  category?: string;
}
interface CartItem extends Product {
  quantity: number;
}
export default component$(() => {
  const products = useProducts();
  const cart = useStore<{ items: CartItem[] }>({ items: [] });
  const onAddToCart = $((product: Product) => {
    const existing = cart.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;  // Si déjà dans le panier, augmente la quantité
    } else {
      cart.items.push({ ...product, quantity: 1 });  // Sinon, ajoute avec quantité 1
    }
  });
  // Filters store
const filters = useStore({
  category: '',
  minPrice: 0,
  maxPrice: 10000,
  search: '',
});

const setCategory = $((e: Event) => {
  filters.category = (e.target as HTMLSelectElement).value;
});

const setMinPrice = $((e: Event) => {
  filters.minPrice = parseInt((e.target as HTMLInputElement).value) || 0;
});

const setMaxPrice = $((e: Event) => {
  filters.maxPrice = parseInt((e.target as HTMLInputElement).value) || 10000;
});

const setSearch = $((e: Event) => {
  filters.search = (e.target as HTMLInputElement).value;
});
  const filteredProducts = products.value.filter((product: Product) => {
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const q = filters.search.trim().toLowerCase();
    const matchesSearch = !q || product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q);
    return matchesCategory && matchesPrice && matchesSearch;
  });
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <section class="app-root min-h-screen bg-gray-50 flex flex-col">
      {/* Header Moderne */}
      <header class="">
        <div class="justify-center text-red max-w-7xl">
          {/* Titre + Panier */}
          <div class="flex items-center text-red-800 justify-between mb-5">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Costumes Alsaciens</h1>
              <p class="text-sm text-gray-500 mt-1">Sélection premium de costumes traditionnels</p>
            </div>
            <button class="px-5 py-2 rounded-lg font-medium text-white transition hover:shadow-lg" style="background: linear-gradient(135deg, #8B3A3A 0%, #6B2A2A 100%);">
              Panier ({totalItems})
            </button>
          </div>

          {/* Recherche + Filtres */}
          <div class="flex gap-3 flex-col sm:flex-row">
            <div class="flex-1 relative">
              <input
                type="search"
                placeholder="Chercher un costume..."
                value={filters.search}
                onInput$={setSearch}
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
            <button class="px-6 py-2.5 rounded-lg font-medium text-white transition hover:shadow-lg" style="background: #8B3A3A;">
              Chercher
            </button>
          </div>
        </div>
      </header>

      {/* Filtres Modernes */}
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex flex-wrap gap-3 items-center">
          <span class="text-sm font-semibold text-gray-700">Filtrer :</span>
          
          <select
            value={filters.category}
            onChange$={setCategory}
            class="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
          >
            <option value="">Toutes catégories</option>
            <option value="Vintage">Vintage</option>
            <option value="Retro">Retro</option>
          </select>

          <input
            type="number"
            placeholder="Prix min"
            value={filters.minPrice}
            onChange$={setMinPrice}
            class="px-3 py-2 rounded-lg border border-gray-300 text-sm w-24 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
          />

          <input
            type="number"
            placeholder="Prix max"
            value={filters.maxPrice}
            onChange$={setMaxPrice}
            class="px-3 py-2 rounded-lg border border-gray-300 text-sm w-24 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Grille moderne */}
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" style="gap: 16px;">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
});
