import { Link } from 'react-router-dom';
import type { User } from '../type/user';
import '../styles/UserCard.css';
import { useFavorites } from '../context/FavoritesContext';
import { Star } from 'lucide-react';

interface Props {
    user: User;
}

export default function UserCard({ user }: Props) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(user.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Empêcher la navigation vers la page de détails
        e.stopPropagation();
        toggleFavorite(user.id);
    };

    return (
        <Link to={`/user/${user.id}`} className="user-card">
            <button
                className={`favorite-btn ${isFav ? 'is-favorite' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
                <Star
                    width={20}
                    height={20}
                    fill={isFav ? 'currentColor' : 'none'}
                    strokeWidth={2}
                    color={isFav ? '#fbbf24' : '#94a3b8'}
                />
            </button>
            <img
                className="user-avatar"
                src={user.image ?? ''}
                alt={`${user.firstName} ${user.lastName}`}
                width={64}
                height={64}
            />
            <div className="user-info">
                <div className="user-name">
                    {user.firstName} {user.lastName}
                </div>
                <div className="user-email">{user.email}</div>
                {user.age && (
                    <div className="user-age">{user.age} ans</div>
                )}
            </div>
        </Link>
    );
}