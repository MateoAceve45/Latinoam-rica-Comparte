import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [blockedSeconds, setBlockedSeconds] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState({ show: false, type: 'danger', message: '' });

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => setToast(p => ({ ...p, show: false })), 5000);
    return () => clearTimeout(timer);
  }, [toast.show, toast.message]);

  useEffect(() => {
    if (blockedSeconds <= 0) return;
    const timer = setInterval(() => {
      setBlockedSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setFailedAttempts(0);
          setForm({ username: '', password: '' });
          closeToast();
          window.location.reload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [blockedSeconds]);

  function showToast(message, type = 'danger') {
    setToast({ show: true, type, message });
  }

  function closeToast() {
    setToast(p => ({ ...p, show: false }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (name === 'username') {
      setFailedAttempts(0);
      setBlockedSeconds(0);
      closeToast();
    }
  }

  function getBlockedSeconds(msg) {
    const match = msg.match(/(\d+)\s*segundos/i);
    return match ? Number(match[1]) : 10;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (blockedSeconds > 0) {
      showToast(`Cuenta bloqueada. Intenta en ${blockedSeconds}s.`, 'warning');
      return;
    }
    setLoading(true);
    try {
      await login(form.username, form.password);
      setFailedAttempts(0);
      setBlockedSeconds(0);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.error || 'Error al iniciar sesión';
      if (msg.includes('bloqueada temporalmente')) {
        const secs = getBlockedSeconds(msg);
        setBlockedSeconds(secs);
        setFailedAttempts(3);
        showToast(`Cuenta bloqueada. Intenta en ${secs}s.`, 'warning');
        return;
      }
      if (msg.includes('Usuario o contraseña incorrectos')) {
        setFailedAttempts(prev => {
          const next = Math.min(prev + 1, 3);
          const remaining = Math.max(3 - next, 0);
          if (next >= 3) {
            setBlockedSeconds(10);
            showToast('Máximo de intentos alcanzado. Espera 10 segundos.', 'warning');
          } else {
            showToast(`Credenciales incorrectas. ${remaining} intento(s) restante(s).`, 'danger');
          }
          return next;
        });
        return;
      }
      showToast(msg, 'danger');
    } finally {
      setLoading(false);
    }
  }

  const isBlocked = blockedSeconds > 0;

  return (
    <main className="login-page">
      {/* Toast */}
      {toast.show && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999, minWidth: '340px' }}>
          <div className={`alert alert-${toast.type} alert-dismissible shadow`} role="alert">
            <i className={`bi bi-${toast.type === 'warning' ? 'exclamation-triangle' : 'x-circle'} me-2`} />
            {toast.message}
            <button type="button" className="btn-close" onClick={closeToast} />
          </div>
        </div>
      )}

      {/* Left panel */}
      <div className="login-left">
        <div className="login-brand-icon">LC</div>
        <h1>CMS Multipaís</h1>
        <p>Plataforma administrativa para gestionar contenidos, testimonios y solicitudes en toda Latinoamérica.</p>

        <div className="login-features">
          <div className="login-feature">
            <i className="bi bi-globe-americas" />
            <span>Gestión multipaís centralizada</span>
          </div>
          <div className="login-feature">
            <i className="bi bi-shield-lock-fill" />
            <span>Acceso seguro por roles</span>
          </div>
          <div className="login-feature">
            <i className="bi bi-activity" />
            <span>Auditoría de actividad en tiempo real</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-card">
          <Link to="/" className="back-link">
            <i className="bi bi-arrow-left" />
            Volver al portal
          </Link>

          <h2>Bienvenido de nuevo</h2>
          <p>Ingresa tus credenciales para acceder al panel.</p>

          {/* Attempt dots */}
          {failedAttempts > 0 && !isBlocked && (
            <div className="attempt-indicator mb-3">
              {[1, 2, 3].map(n => (
                <div key={n} className={`attempt-dot ${n <= failedAttempts ? 'used' : ''}`} />
              ))}
              <span className="ms-2 text-muted" style={{ fontSize: '.8rem', fontWeight: 600 }}>
                {failedAttempts}/3 intentos
              </span>
            </div>
          )}

          {isBlocked && (
            <div className="alert alert-warning d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-clock-history" />
              <span>Bloqueado por <strong>{blockedSeconds}s</strong></span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label>Usuario</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="tu_usuario"
                disabled={isBlocked}
                required
                autoComplete="username"
              />
              <i className="bi bi-person input-icon" />
            </div>

            <div className="login-input-group">
              <label>Contraseña</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isBlocked}
                required
                autoComplete="current-password"
                style={{ paddingRight: '2.8rem' }}
              />
              <i className="bi bi-lock input-icon" />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                style={{
                  position: 'absolute', right: 12, bottom: 11,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--muted)', fontSize: '1rem', padding: 0
                }}
                tabIndex={-1}
              >
                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`} />
              </button>
            </div>

            <button className="login-submit-btn" disabled={loading || isBlocked}>
              {isBlocked ? (
                <><i className="bi bi-clock-history" /> Bloqueado {blockedSeconds}s</>
              ) : loading ? (
                <><span className="spinner-border spinner-border-sm" /> Ingresando...</>
              ) : (
                <><i className="bi bi-box-arrow-in-right" /> Ingresar</>
              )}
            </button>

            <div className="login-footer-link">
              <Link to="/admin/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
