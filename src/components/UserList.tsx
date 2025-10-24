import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/dummy';
import type { User } from '../type/user';
import UserCard from './UserCard';
import '../styles/UserList.css';

export default function UserList() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchUsers({ limit: 30 })
            .then((res) => {
                if (!mounted) return;
                setUsers(res);
            })
            .catch((err) => {
                if (!mounted) return;
                setError(err?.message ?? String(err));
            })
            .finally(() => {
                if (!mounted) return;
                setLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, []);

    // Filtrer les utilisateurs en fonction de la recherche
    const filteredUsers = users?.filter((user) => {
        const query = searchQuery.toLowerCase();
        return (
            user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
        );
    });

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="user-list">
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

            {searchQuery && (
                <div className="search-results-info">
                    {filteredUsers?.length ?? 0} résultat(s) trouvé(s)
                </div>
            )}

            <div className="user-list__grid">
                {filteredUsers && filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => <UserCard key={u.id} user={u} />)
                ) : (
                    <div className="empty">
                        {searchQuery ? 'Aucun utilisateur ne correspond à votre recherche' : 'No users found'}
                    </div>
                )}
            </div>
        </div>
    );
}
