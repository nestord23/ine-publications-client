import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsService } from '../services/posts.service';
import type { CreatePostDto } from '../types/post';
import './FormPage.css';

interface FormErrors {
  title?: string;
  description?: string;
  author?: string;
}

function FormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState<CreatePostDto>({
    title: '',
    description: '',
    author: '',
    status: 'active',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);

  useEffect(() => {
    if (!id) return;
    postsService
      .getById(id)
      .then((post) => {
        setForm({
          title: post.title,
          description: post.description,
          author: post.author,
          status: post.status,
        });
      })
      .catch(() => navigate('/posts'))
      .finally(() => setFetchLoading(false));
  }, [id, navigate]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (form.title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
    }
    if (!form.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (form.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }
    if (!form.author.trim()) {
      newErrors.author = 'El autor es requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      if (isEditing && id) {
        await postsService.update(id, form);
      } else {
        await postsService.create(form);
      }
      navigate('/posts');
    } catch {
      setErrors({ title: 'Error al guardar. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="state-msg">Cargando...</div>;

  return (
    <div className="form-container">
      <div className="form-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <h1 className="page-title">
          {isEditing ? 'Editar publicación' : 'Nueva publicación'}
        </h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Ingresa el título"
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Autor</label>
            <input
              id="author"
              name="author"
              type="text"
              value={form.author}
              onChange={handleChange}
              placeholder="Nombre del autor"
              className={errors.author ? 'input-error' : ''}
            />
            {errors.author && <span className="error-msg">{errors.author}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ingresa la descripción"
              rows={5}
              className={errors.description ? 'input-error' : ''}
            />
            {errors.description && (
              <span className="error-msg">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          <div className="form-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear publicación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPage;