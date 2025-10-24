import { Link } from 'react-router-dom';
import type { User } from '../type/user';
import '../styles/UserCard.css';

interface Props {
    user: User;
}

export default function UserCard({ user }: Props) {
    return (
        <Link to={`/user/${user.id}`} className="user-card">
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