import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsService } from '../services/posts.service';
import type { Post } from '../types/post';
import './DetailPage.css';

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    postsService
      .getById(id)
      .then(setPost)
      .catch(() => setError('Publicación no encontrada'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('¿Estás seguro de eliminar esta publicación?')) return;
    try {
      await postsService.remove(id);
      navigate('/posts');
    } catch {
      setError('Error al eliminar la publicación');
    }
  };

  if (loading) return <div className="state-msg">Cargando...</div>;
  if (error) return <div className="state-msg error">{error}</div>;
  if (!post) return null;

  return (
    <div className="detail-container">
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate('/posts')}>
          ← Volver
        </button>
        <div className="detail-actions">
          <button
            className="btn-action edit"
            onClick={() => navigate(`/posts/${id}/edit`)}
          >
            Editar
          </button>
          <button className="btn-action delete" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-top">
          <h1 className="detail-title">{post.title}</h1>
          <span className={`status-badge ${post.status}`}>
            {post.status === 'active' ? 'Activo' : 'Inactivo'}
          </span>
        </div>

        <div className="detail-meta">
          <span>Autor: <strong>{post.author}</strong></span>
          <span>
            Creado:{' '}
            <strong>
              {new Date(post.createdAt).toLocaleDateString('es-GT', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </strong>
          </span>
        </div>

        <div className="detail-description">
          <h2>Descripción</h2>
          <p>{post.description}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;