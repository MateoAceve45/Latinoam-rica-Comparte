import { Link } from 'react-router-dom';

const countries = [
  {
    slug: 'ecuador',
    code: 'EC',
    name: 'Ecuador'
  },
  {
    slug: 'argentina',
    code: 'AR',
    name: 'Argentina'
  },
  {
    slug: 'chile',
    code: 'CH',
    name: 'Chile'
  }
];

export default function HomePage() {
  function saveCountry(slug) {
    localStorage.setItem('publicCountry', slug);
  }

  return (
    <section className="public-hero">
      <div className="public-hero-overlay">
        <div className="public-hero-content">
          <span className="public-badge">
            CMS público multipaís
          </span>

          <h1>
            Un propósito que nació de Colombia
          </h1>

          <p className="public-subtitle">
            Hoy inspira a toda Latinoamérica
          </p>

          <div className="country-selector">
            {countries.map((country) => (
              <Link
                key={country.slug}
                to={`/paises/${country.slug}/noticias`}
                className="country-card"
                onClick={() => saveCountry(country.slug)}
              >
                <strong>{country.code}</strong>
                <span>{country.name}</span>
              </Link>
            ))}

            <div className="country-card country-main">
              <strong>LC</strong>
              <span>Latinoamérica Comparte</span>
            </div>
          </div>

          <p className="public-description">
            Una red que une personas, empresas y comunidades para construir una
            región más humana, productiva y consciente.
          </p>

          <div className="public-actions">
            <Link
              to="/paises/argentina/noticias"
              className="btn btn-light fw-bold"
              onClick={() => saveCountry('argentina')}
            >
              Ver noticias
            </Link>

            <Link
              to="/paises/argentina/solicitudes"
              className="btn btn-outline-light fw-bold"
              onClick={() => saveCountry('argentina')}
            >
              Enviar solicitud
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}