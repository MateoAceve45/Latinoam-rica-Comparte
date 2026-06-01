import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getPublicNoticias } from '../../services/publicService';

const ITEMS_PER_PAGE = 6;

export default function PublicNoticiasPage() {
  const { paisSlug } = useParams();

  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadNoticias() {
      try {
        setLoading(true);
        setError('');

        const data = await getPublicNoticias(paisSlug);
        setNoticias(data);
      } catch (err) {
        setError(
          err.response?.data?.error || 'Error al cargar noticias públicas'
        );
      } finally {
        setLoading(false);
      }
    }

    if (paisSlug) {
      localStorage.setItem('publicCountry', paisSlug);
      loadNoticias();
    }
  }, [paisSlug]);

  const filteredNoticias = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return noticias.filter((noticia) => {
      return (
        !searchValue ||
        noticia.titulo?.toLowerCase().includes(searchValue) ||
        noticia.resumen?.toLowerCase().includes(searchValue)
      );
    });
  }, [noticias, search]);

  const totalPages =
    Math.ceil(filteredNoticias.length / ITEMS_PER_PAGE) || 1;

  const paginatedNoticias = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return filteredNoticias.slice(start, end);
  }, [filteredNoticias, currentPage]);

  function handlePageChange(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  function formatCountryName(slug) {
    if (!slug) return '';

    return slug.charAt(0).toUpperCase() + slug.slice(1);
  }

  if (loading) {
    return (
      <main className="public-page">
        <div className="container py-5">
          <h1 className="fw-bold">Noticias</h1>
          <div className="alert alert-info">Cargando noticias...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="public-page">
      <section className="public-section-header">
        <span>Noticias públicas</span>
        <h1>Noticias de {formatCountryName(paisSlug)}</h1>
        <p>
          Consulta novedades, historias y actualizaciones publicadas para este
          país.
        </p>
      </section>

      <section className="container pb-5">
        <div className="public-filter-card mb-4">
          <div>
            <label className="form-label">Buscar noticia</label>
            <input
              className="form-control"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar por título o resumen..."
            />
          </div>

          <div className="public-filter-info">
            <strong>{filteredNoticias.length}</strong>
            <span>resultado(s)</span>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {filteredNoticias.length === 0 ? (
          <div className="alert alert-warning">
            No hay noticias publicadas para este país.
          </div>
        ) : (
          <>
            <div className="public-news-grid">
              {paginatedNoticias.map((noticia) => (
                <article key={noticia.id} className="public-news-card">
                  <div className="public-news-image">
                    {noticia.imagen_principal_url ? (
                      <img
                        src={noticia.imagen_principal_url}
                        alt={noticia.titulo}
                      />
                    ) : (
                      <div className="public-image-placeholder">
                        <i className="bi bi-newspaper" />
                      </div>
                    )}
                  </div>

                  <div className="public-news-body">
                    <span className="public-news-badge">
                      {noticia.pais?.nombre || formatCountryName(paisSlug)}
                    </span>

                    <h3>{noticia.titulo}</h3>

                    <p>{noticia.resumen}</p>

                    <div className="public-news-footer">
                      <small>
                        {noticia.fecha_publicacion
                          ? new Date(
                              noticia.fecha_publicacion
                            ).toLocaleDateString()
                          : 'Publicado'}
                      </small>

                      <Link
                        to={`/paises/${paisSlug}/noticias/${noticia.slug}`}
                        className="public-read-link"
                      >
                        Leer más
                        <i className="bi bi-arrow-right ms-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-5">
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? 'disabled' : ''
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Anterior
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${
                        currentPage === index + 1 ? 'active' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? 'disabled' : ''
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </>
        )}
      </section>
    </main>
  );
}