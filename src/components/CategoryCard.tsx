
import { Link } from 'react-router-dom';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`} className="block relative group">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
        <img
          src={category.image}
          alt={category.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-white text-xl">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};
