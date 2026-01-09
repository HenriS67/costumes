import { component$ } from '@builder.io/qwik';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default component$<ProductCardProps>(({ product, onAddToCart }) => {
  return (
    <article class="group relative rounded-xl overflow-hidden bg-white shadow hover:shadow-xl transition duration-300">
      {/* Image container */}
      <div class="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image || '/images/placeholder.jpg'}
          alt={product.name}
          class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        
        {/* Overlay on hover */}
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />
        
        {/* Badge */}
        <div class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white" style="background: #8B3A3A;">
          {product.category || 'Premium'}
        </div>

        {/* Bouton au hover */}
        <button
          onClick$={() => onAddToCart(product)}
          aria-label={`Ajouter ${product.name} au panier`}
          class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300" 
          style="background: rgba(0,0,0,0.3);"
        >
          <span class="px-4 py-2 rounded-lg font-semibold text-white" style="background: #8B3A3A;">
            + Ajouter au panier
          </span>
        </button>
      </div>

      {/* Info */}
      <div class="p-3">
        <h3 class="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
        <p class="text-xs text-gray-600 line-clamp-1 mt-1">{product.description}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="text-base font-bold text-gray-900">{product.price} €</span>
          <span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Stock</span>
        </div>
      </div>
    </article>
  );
});