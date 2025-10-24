import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/dummy';
import type { User } from '../type/user';
import UserCard from './UserCard';
import '../styles/UserList.css';

export default function UserList() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="user-list">
            <h1 className="user-list__title">Users</h1>
            <div className="user-list__grid">
                {users && users.length > 0 ? (
                    users.map((u) => <UserCard key={u.id} user={u} />)
                ) : (
                    <div className="empty">No users found</div>
                )}
            </div>
        </div>
    );
}
