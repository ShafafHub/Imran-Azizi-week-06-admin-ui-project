import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProfile, updateProfile, clearError, clearSuccess,
} from '../features/auth/authSlice.js';
import Navbar from '../components/Navbar.jsx';
import Loader from '../components/Loader.jsx';

const InfoRow = ({ label, value }) => (
  <div className="flex items-start justify-between py-3 border-b border-canvas-100 last:border-0 gap-4">
    <span className="text-xs font-mono text-ink-400 uppercase tracking-widest flex-shrink-0 pt-0.5">{label}</span>
    <span className="text-sm text-ink-800 font-body text-right break-all">{value || '—'}</span>
  </div>
);

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error, successMessage } = useSelector((s) => s.auth);

  const {
    register, handleSubmit, reset, watch,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    dispatch(fetchProfile());
    return () => { dispatch(clearError()); dispatch(clearSuccess()); };
  }, [dispatch]);

  useEffect(() => {
    if (user) reset({ name: user.name, email: user.email, password: '', confirmPassword: '' });
  }, [user, reset]);

  const password = watch('password');

  const onSubmit = (data) => {
    const payload = { name: data.name, email: data.email };
    if (data.password) payload.password = data.password;
    dispatch(updateProfile(payload));
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  const updatedAt = user?.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '—';

  return (
    <div className="min-h-screen bg-canvas-50">
      <Navbar />
      <div className="dot-grid min-h-screen">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Page header */}
          <div className="mb-8 animate-fade-up">
            <p className="text-indigo-600 text-xs font-mono tracking-widest uppercase mb-1">Account</p>
            <h1 className="text-2xl font-display font-bold text-ink-900 tracking-tight">Profile Settings</h1>
            <p className="text-ink-500 text-sm font-body mt-1">Update your name, email and password</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left: summary */}
            <div className="space-y-4 animate-fade-up delay-100">
              {/* Avatar card */}
              <div className="surface rounded-2xl p-6 text-center">
                <div className="w-20 h-20 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 text-2xl font-display font-bold">{initials}</span>
                </div>
                <h3 className="text-ink-900 font-display font-bold text-lg truncate leading-tight">{user?.name || '—'}</h3>
                <p className="text-ink-500 text-sm mt-1 truncate font-body">{user?.email || '—'}</p>
              </div>

              {/* Details */}
              <div className="surface rounded-2xl p-5">
                <p className="text-xs font-display font-bold text-ink-400 uppercase tracking-widest mb-3">Account Info</p>
                <InfoRow label="ID"      value={user?._id ? user._id.slice(-10).toUpperCase() : '—'} />
                <InfoRow label="Joined"  value={joinDate}  />
                <InfoRow label="Updated" value={updatedAt} />
                <InfoRow label="Auth"    value="JWT · bcrypt" />
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-2 animate-fade-up delay-200">
              <div className="surface-raised rounded-2xl p-6 sm:p-8">
                <h2 className="text-base font-display font-bold text-ink-900 mb-6">Edit Information</h2>

                {successMessage && (
                  <div className="alert-success mb-6">
                    <svg className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p className="text-sage-800 text-sm font-display">{successMessage}</p>
                  </div>
                )}

                {error && (
                  <div className="alert-error mb-6">
                    <svg className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"/>
                    </svg>
                    <p className="text-rose-700 text-sm font-display">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="label-text">Full name</label>
                      <input
                        type="text"
                        className={`input-field ${errors.name ? 'error' : ''}`}
                        {...register('name', {
                          required: 'Name is required',
                          minLength: { value: 2, message: 'Min 2 characters' },
                          maxLength: { value: 50, message: 'Max 50 characters' },
                        })}
                      />
                      {errors.name && <p className="field-error">⚡ {errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="label-text">Email address</label>
                      <input
                        type="email"
                        className={`input-field ${errors.email ? 'error' : ''}`}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                        })}
                      />
                      {errors.email && <p className="field-error">⚡ {errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Password section divider */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex-1 h-px bg-canvas-200" />
                    <span className="text-ink-400 text-xs font-mono tracking-wider px-1">CHANGE PASSWORD</span>
                    <div className="flex-1 h-px bg-canvas-200" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* New password */}
                    <div>
                      <label className="label-text">
                        New password
                        <span className="text-ink-400 normal-case font-normal ml-1">(optional)</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Leave blank to keep current"
                        className={`input-field ${errors.password ? 'error' : ''}`}
                        {...register('password', {
                          minLength: { value: 6, message: 'At least 6 characters' },
                          validate: (v) => !v || /\d/.test(v) || 'Must contain a number',
                        })}
                      />
                      {errors.password && <p className="field-error">⚡ {errors.password.message}</p>}
                    </div>

                    {/* Confirm */}
                    <div>
                      <label className="label-text">Confirm new password</label>
                      <input
                        type="password"
                        placeholder="Re-enter new password"
                        className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
                        {...register('confirmPassword', {
                          validate: (v, fv) =>
                            !fv.password || v === fv.password || 'Passwords do not match',
                        })}
                      />
                      {errors.confirmPassword && (
                        <p className="field-error">⚡ {errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isLoading || !isDirty}
                      className="btn-primary"
                    >
                      {isLoading ? <><Loader size="sm" /> Saving…</> : 'Save changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="btn-ghost"
                    >
                      Discard
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Profile;
