import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../features/auth/authSlice.js';
import Loader from '../components/Loader.jsx';

const Login = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isLoading, error, isAuthenticated } = useSelector((s) => s.auth);
  const from = location.state?.from?.pathname || '/dashboard';

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, from, dispatch]);

  const onSubmit = (data) => dispatch(loginUser(data));

  return (
    <div className="auth-page dot-grid">
      {/* Decorative blobs */}
      <div className="blob w-96 h-96 bg-indigo-100 top-[-6rem] right-[-8rem]" />
      <div className="blob w-72 h-72 bg-amber-100  bottom-[-4rem] left-[-6rem]" />

      <div className="relative w-full max-w-[420px] animate-fade-up">

        {/* Brand mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 shadow-md mb-5">
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.9"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <h1 className="text-[1.875rem] font-display font-bold text-ink-900 tracking-tight leading-tight">
            Welcome back
          </h1>
          <p className="text-ink-500 mt-1.5 text-[0.9375rem] font-body">
            Sign in to your admin panel
          </p>
        </div>

        {/* Card */}
        <div className="surface-raised rounded-2xl p-8">

          {error && (
            <div className="alert-error mb-6">
              <svg className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"/>
              </svg>
              <p className="text-rose-700 text-sm font-display">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div>
              <label className="label-text">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`input-field ${errors.email ? 'error' : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
              />
              {errors.email && <p className="field-error">⚡ {errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label-text" style={{ marginBottom: 0 }}>Password</label>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className={`input-field ${errors.password ? 'error' : ''}`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'At least 6 characters' },
                })}
              />
              {errors.password && <p className="field-error">⚡ {errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full mt-1">
              {isLoading ? <><Loader size="sm" /> Signing in…</> : 'Sign in'}
            </button>
          </form>

          <p className="divider text-ink-400 text-xs font-mono my-6">or</p>

          <p className="text-center text-sm text-ink-500 font-body">
            No account?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-display font-semibold transition-colors">
              Create one free
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
