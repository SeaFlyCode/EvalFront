import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserById } from '../api/dummy';
import type { User } from '../type/user';
import '../styles/UserDetail.css';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    fetchUserById(Number(id))
      .then((u) => {
        if (!mounted) return;
        setUser(u);
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
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return <div className="empty">No user found</div>;

  return (
    <div className="user-detail">
      <Link to="/" className="back-link">← Retour à la liste</Link>

      <div className="user-detail__header">
        <img
          src={user.image ?? ''}
          alt={`${user.firstName} ${user.lastName}`}
          className="user-detail__avatar"
        />
        <div className="user-detail__title">
          <h1 className="user-detail__name">{user.firstName} {user.lastName}</h1>
          <p className="user-detail__role">{user.role ?? 'User'}</p>
        </div>
      </div>

      <div className="user-detail__sections">
        <section className="user-detail__section">
          <h2 className="section-title">Informations personnelles</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Âge</span>
              <span className="info-value">{user.age} ans</span>
            </div>
            <div className="info-item">
              <span className="info-label">Date de naissance</span>
              <span className="info-value">{user.birthDate ?? '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Genre</span>
              <span className="info-value">{user.gender}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Téléphone</span>
              <span className="info-value">{user.phone ?? '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Groupe sanguin</span>
              <span className="info-value">{user.bloodGroup ?? '—'}</span>
            </div>
          </div>
        </section>

        <section className="user-detail__section">
          <h2 className="section-title">Caractéristiques physiques</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Taille</span>
              <span className="info-value">{user.height ? `${user.height} cm` : '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Poids</span>
              <span className="info-value">{user.weight ? `${user.weight} kg` : '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Couleur des yeux</span>
              <span className="info-value">{user.eyeColor ?? '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Cheveux</span>
              <span className="info-value">
                {user.hair ? `${user.hair.color}, ${user.hair.type}` : '—'}
              </span>
            </div>
          </div>
        </section>

        {user.company && (
          <section className="user-detail__section">
            <h2 className="section-title">Entreprise</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Entreprise</span>
                <span className="info-value">{user.company.name ?? '—'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Poste</span>
                <span className="info-value">{user.company.title ?? '—'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Département</span>
                <span className="info-value">{user.company.department ?? '—'}</span>
              </div>
            </div>
          </section>
        )}

        {user.address && (
          <section className="user-detail__section">
            <h2 className="section-title">Adresse</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Adresse</span>
                <span className="info-value">{user.address.address ?? '—'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Ville</span>
                <span className="info-value">{user.address.city ?? '—'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">État</span>
                <span className="info-value">{user.address.state ?? '—'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Code postal</span>
                <span className="info-value">{user.address.postalCode ?? '—'}</span>
              </div>
            </div>
          </section>
        )}

        <section className="user-detail__section">
          <h2 className="section-title">Autres informations</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Université</span>
              <span className="info-value">{user.university ?? '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">IP</span>
              <span className="info-value">{user.ip ?? '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Adresse MAC</span>
              <span className="info-value">{user.macAddress ?? '—'}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

