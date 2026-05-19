import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsService } from '../services/posts.service';
import type { Post } from '../types/post';
import './ListPage.css';

function ListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    postsService.getAll()
      .then((data) => setPosts(data))
      .catch(() => setError('Error al cargar las publicaciones'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar esta publicación?')) return;
    try {
      setDeletingId(id);
      await postsService.remove(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      setError('Error al eliminar la publicación');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="state-msg">Cargando publicaciones...</div>;
  if (error) return <div className="state-msg error">{error}</div>;

  return (
    <div>
      <h1 className="page-title">Publicaciones</h1>

      {posts.length === 0 ? (
        <div className="state-msg">No hay publicaciones registradas.</div>
      ) : (
        <div className="table-wrapper">
          <table className="posts-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>
                    <span className={`status-badge ${post.status}`}>
                      {post.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString('es-GT')}</td>
                  <td className="actions">
                    <button
                      className="btn-action view"
                      onClick={() => navigate(`/posts/${post._id}`)}
                    >
                      Ver
                    </button>
                    <button
                      className="btn-action edit"
                      onClick={() => navigate(`/posts/${post._id}/edit`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-action delete"
                      onClick={() => handleDelete(post._id)}
                      disabled={deletingId === post._id}
                    >
                      {deletingId === post._id ? '...' : 'Eliminar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListPage;