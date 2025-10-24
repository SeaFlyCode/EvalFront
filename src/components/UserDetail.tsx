import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserById } from '../api/dummy';
import type { User } from '../type/user';
import '../styles/UserDetail.css';
import { Mail, Calendar, Phone, MapPin, Briefcase, GraduationCap, Cpu, Hash, Heart, Ruler } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID utilisateur manquant');
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const userId = Number(id);
        if (isNaN(userId) || userId <= 0) {
          throw new Error('ID utilisateur invalide');
        }

        const userData = await fetchUserById(userId);
        if (!mounted) return;
        setUser(userData);
      } catch (err) {
        if (!mounted) return;
        console.error('Erreur lors du chargement de l\'utilisateur:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return <div className="empty">No user found</div>;

  return (
    <div className="user-detail">
      <ThemeToggle />
      <Link to="/" className="back-link">← Retour à la liste</Link>

      <div className="user-detail__header">
        <img
          src={user.image ?? ''}
          alt={`${user.firstName} ${user.lastName}`}
          className="user-detail__avatar"
        />
        <div className="user-detail__title">
          <h1 className="user-detail__name">{user.firstName} {user.lastName}</h1>
          <div className="user-detail__meta">
            <span className="user-role-badge">{user.role ?? 'User'}</span>
            {user.age && <span className="user-age-badge">{user.age} ans</span>}
          </div>
        </div>
      </div>

      <div className="user-detail__sections">
        <section className="user-detail__section">
          <h2 className="section-title"><Mail className="title-icon" /> Informations personnelles</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-item__head"><Mail className="info-item__icon" /><span className="info-label">Email</span></div>
              <div className="info-value">{user.email}</div>
            </div>
            <div className="info-item">
              <div className="info-item__head"><Calendar className="info-item__icon" /><span className="info-label">Âge</span></div>
              <div className="info-value">{user.age ? `${user.age} ans` : '—'}</div>
            </div>
            <div className="info-item">
              <div className="info-item__head"><Calendar className="info-item__icon" /><span className="info-label">Date de naissance</span></div>
              <div className="info-value">{user.birthDate ?? '—'}</div>
            </div>
            <div className="info-item">
              <div className="info-item__head"><UserIconPlaceholder /><span className="info-label">Genre</span></div>
              <div className="info-value">{user.gender ?? '—'}</div>
            </div>
            <div className="info-item">
              <div className="info-item__head"><Phone className="info-item__icon" /><span className="info-label">Téléphone</span></div>
              <div className="info-value">{user.phone ?? '—'}</div>
            </div>
            <div className="info-item">
              <div className="info-item__head"><Heart className="info-item__icon" /><span className="info-label">Groupe sanguin</span></div>
              <div className="info-value">{user.bloodGroup ?? '—'}</div>
            </div>
          </div>
        </section>

        <section className="user-detail__section">
          <h2 className="section-title"><Ruler className="title-icon" /> Caractéristiques physiques</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-item__head"><Ruler className="info-item__icon" /><span className="info-label">Taille</span></div>
              <div className="info-value">{user.height ? `${user.height} cm` : '—'}</div>
            </div>
            <div className="info-item">
              <div className="info-item__head"><Hash className="info-item__icon" /><span className="info-label">Poids</span></div>
              <div className="info-value">{user.weight ? `${user.weight} kg` : '—'}</div>
            </div>
            <div className="info-item">
              <div className="info-item__head"><EyeIconPlaceholder /><span className="info-label">Couleur des yeux</span></div>
              <div className="info-value">{user.eyeColor ?? '—'}</div>
            </div>
            <div className="info-item">
              <div className="info-item__head"><Mail className="info-item__icon" /><span className="info-label">Cheveux</span></div>
              <div className="info-value">{user.hair ? `${user.hair.color}, ${user.hair.type}` : '—'}</div>
            </div>
          </div>
        </section>

        {user.company && (
          <section className="user-detail__section">
            <h2 className="section-title"><Briefcase className="title-icon" /> Entreprise</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-item__head"><Briefcase className="info-item__icon" /><span className="info-label">Entreprise</span></div>
                <div className="info-value">{user.company.name ?? '—'}</div>
              </div>
              <div className="info-item">
                <div className="info-item__head"><MapPin className="info-item__icon" /><span className="info-label">Poste</span></div>
                <div className="info-value">{user.company.title ?? '—'}</div>
              </div>
              <div className="info-item">
                <div className="info-item__head"><BuildingPlaceholder /><span className="info-label">Département</span></div>
                <div className="info-value">{user.company.department ?? '—'}</div>
              </div>
            </div>
          </section>
        )}

        {user.address && (
          <section className="user-detail__section">
            <h2 className="section-title"><MapPin className="title-icon" /> Adresse</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-item__head"><MapPin className="info-item__icon" /><span className="info-label">Adresse</span></div>
                <div className="info-value">{user.address.address ?? '—'}</div>
              </div>
              <div className="info-item">
                <div className="info-item__head"><MapPin className="info-item__icon" /><span className="info-label">Ville</span></div>
                <div className="info-value">{user.address.city ?? '—'}</div>
              </div>
              <div className="info-item">
                <div className="info-item__head"><MapPin className="info-item__icon" /><span className="info-label">État</span></div>
                <div className="info-value">{user.address.state ?? '—'}</div>
              </div>
              <div className="info-item">
                <div className="info-item__head"><Hash className="info-item__icon" /><span className="info-label">Code postal</span></div>
                <div className="info-value">{user.address.postalCode ?? '—'}</div>
              </div>
            </div>
          </section>
        )}

        <section className="user-detail__section">
          <h2 className="section-title"><Cpu className="title-icon" /> Autres informations</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-item__head"><GraduationCap className="info-item__icon" /><span className="info-label">Université</span></div>
              <div className="info-value">{user.university ?? '—'}</div>
            </div>
            <div className="info-item">
              <div className="info-item__head"><Cpu className="info-item__icon" /><span className="info-label">IP</span></div>
              <div className="info-value">{user.ip ?? '—'}</div>
            </div>
            <div className="info-item">
              <div className="info-item__head"><Hash className="info-item__icon" /><span className="info-label">Adresse MAC</span></div>
              <div className="info-value">{user.macAddress ?? '—'}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Note: some small placeholders like `UserIconPlaceholder`, `EyeIconPlaceholder`, `BuildingPlaceholder` above are tiny inline components
// to avoid adding many imports while keeping visual icons. We declare them here and render simple SVGs.

function UserIconPlaceholder() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="info-item__icon">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function EyeIconPlaceholder() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="info-item__icon">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function BuildingPlaceholder() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="info-item__icon">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M7 7h.01M7 11h.01M7 15h.01M11 7h.01M11 11h.01M11 15h.01M15 7h.01M15 11h.01M15 15h.01" />
    </svg>
  );
}
