import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/dummy';
import type { User } from '../type/user';
import UserCard from './UserCard';
import ThemeToggle from './ThemeToggle';
import { SkeletonCardGrid } from './SkeletonCard';
import '../styles/UserList.css';

type SortOption = 'none' | 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc';

const USERS_PER_PAGE = 10;

export default function UserList() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOption, setSortOption] = useState<SortOption>('none');
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        const startTime = Date.now();

        fetchUsers({ limit: 30 })
            .then((res) => {
                if (!mounted) return;

                // Calculer le temps écoulé
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, 1000 - elapsedTime);

                // Attendre au moins 1 seconde au total
                setTimeout(() => {
                    if (!mounted) return;
                    setUsers(res);
                    setLoading(false);
                }, remainingTime);
            })
            .catch((err) => {
                if (!mounted) return;

                // Calculer le temps écoulé même en cas d'erreur
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, 1000 - elapsedTime);

                setTimeout(() => {
                    if (!mounted) return;
                    setError(err?.message ?? String(err));
                    setLoading(false);
                }, remainingTime);
            });

        return () => {
            mounted = false;
        };
    }, []);

    // Filtrer les utilisateurs en fonction de la recherche
    const filteredUsers = users?.filter((user) => {
        try {
            const query = searchQuery.toLowerCase();
            return (
                user.firstName?.toLowerCase().includes(query) ||
                user.lastName?.toLowerCase().includes(query) ||
                user.email?.toLowerCase().includes(query) ||
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
            );
        } catch (err) {
            console.error('Erreur lors du filtrage de l\'utilisateur:', user, err);
            return false;
        }
    });

    // Trier les utilisateurs filtrés
    const sortedUsers = filteredUsers ? [...filteredUsers].sort((a, b) => {
        try {
            switch (sortOption) {
                case 'name-asc':
                    return `${a.firstName ?? ''} ${a.lastName ?? ''}`.localeCompare(`${b.firstName ?? ''} ${b.lastName ?? ''}`);
                case 'name-desc':
                    return `${b.firstName ?? ''} ${b.lastName ?? ''}`.localeCompare(`${a.firstName ?? ''} ${a.lastName ?? ''}`);
                case 'age-asc':
                    return (a.age ?? 0) - (b.age ?? 0);
                case 'age-desc':
                    return (b.age ?? 0) - (a.age ?? 0);
                default:
                    return 0;
            }
        } catch (err) {
            console.error('Erreur lors du tri:', err);
            return 0;
        }
    }) : null;

    // Pagination
    const totalUsers = sortedUsers?.length ?? 0;
    const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    const paginatedUsers = (() => {
        try {
            return sortedUsers?.slice(startIndex, endIndex) ?? null;
        } catch (err) {
            console.error('Erreur lors de la pagination:', err);
            return null;
        }
    })();

    // Réinitialiser la page à 1 quand la recherche ou le tri change
    useEffect(() => {
        try {
            setCurrentPage(1);
        } catch (err) {
            console.error('Erreur lors de la réinitialisation de la page:', err);
        }
    }, [searchQuery, sortOption]);
    if (loading) return (
        <div className="user-list">
            <ThemeToggle />
            <h1 className="user-list__title">Utilisateurs</h1>
            <div className="user-list__grid">
                <SkeletonCardGrid count={10} />
            </div>
        </div>
    );
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="user-list">
            <ThemeToggle />
            <h1 className="user-list__title">Utilisateurs</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher un utilisateur (nom, prénom, email)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="search-clear"
                    >
                        ✕
                    </button>
                )}
            </div>

            <div className="sort-bar">
                <label htmlFor="sort-select">Trier par :</label>
                <select
                    id="sort-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="sort-select"
                >
                    <option value="none">Aucun tri</option>
                    <option value="name-asc">Nom (A → Z)</option>
                    <option value="name-desc">Nom (Z → A)</option>
                    <option value="age-asc">Âge (croissant)</option>
                    <option value="age-desc">Âge (décroissant)</option>
                </select>
            </div>

            {searchQuery && (
                <div className="search-results-info">
                    {sortedUsers?.length ?? 0} résultat(s) trouvé(s)
                </div>
            )}

            <div className="user-list__grid">
                {paginatedUsers && paginatedUsers.length > 0 ? (
                    paginatedUsers.map((u) => <UserCard key={u.id} user={u} />)
                ) : (
                    <div className="empty">
                        {searchQuery ? 'Aucun utilisateur ne correspond à votre recherche' : 'No users found'}
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        ← Précédent
                    </button>

                    <div className="pagination-info">
                        Page {currentPage} sur {totalPages}
                        <span className="pagination-count">
                            ({startIndex + 1}-{Math.min(endIndex, totalUsers)} sur {totalUsers})
                        </span>
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Suivant →
                    </button>
                </div>
            )}
        </div>
    );
}
