import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand-box">
          <div className="brand-icon">LC</div>
          <div>
            <h4>CMS Multipaís</h4>
            <span>Panel administrativo</span>
          </div>
        </div>

        <nav className="admin-menu">
          <div className="admin-menu-section">General</div>

          <NavLink to="/admin/dashboard" className="admin-link">
            <i className="bi bi-grid-1x2-fill" />
            Dashboard
          </NavLink>

          <div className="admin-menu-section">Contenido</div>

          <NavLink to="/admin/noticias" className="admin-link">
            <i className="bi bi-newspaper" />
            Noticias
          </NavLink>

          <NavLink to="/admin/testimonios" className="admin-link">
            <i className="bi bi-chat-quote-fill" />
            Testimonios
          </NavLink>

          {['superadmin', 'admin_pais'].includes(user?.rol) && (
            <NavLink to="/admin/solicitudes" className="admin-link">
              <i className="bi bi-envelope-paper-fill" />
              Solicitudes
            </NavLink>
          )}

          <div className="admin-menu-section">Mi cuenta</div>

          <NavLink to="/admin/profile" className="admin-link">
            <i className="bi bi-person-circle" />
            Mi perfil
          </NavLink>

          <NavLink to="/admin/change-password" className="admin-link">
            <i className="bi bi-key-fill" />
            Contraseña
          </NavLink>

          <NavLink to="/admin/security-question" className="admin-link">
            <i className="bi bi-shield-lock-fill" />
            Pregunta de seguridad
          </NavLink>

          {user?.rol === 'superadmin' && (
            <>
              <div className="admin-menu-section">Administración</div>

              <NavLink to="/admin/users" className="admin-link">
                <i className="bi bi-people-fill" />
                Usuarios
              </NavLink>

              <NavLink to="/admin/auditoria" className="admin-link">
                <i className="bi bi-activity" />
                Auditoría
              </NavLink>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <small>Latinoamérica Comparte</small>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="topbar-label">Bienvenido</p>
            <h5>{user?.nombre} {user?.apellido}</h5>
            <span>{user?.rol}</span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right" />
            Cerrar sesión
          </button>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
