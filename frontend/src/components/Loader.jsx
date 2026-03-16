const Loader = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-7 h-7 border-2',
    lg: 'w-11 h-11 border-[3px]',
  };
  return (
    <div
      className={`${sizes[size]} rounded-full border-indigo-100 border-t-indigo-500 animate-spin flex-shrink-0`}
    />
  );
};

export const PageLoader = () => (
  <div className="min-h-screen bg-canvas-50 dot-grid flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 rounded-full border-[3px] border-canvas-200 border-t-indigo-500 animate-spin mx-auto mb-4" />
      <p className="text-ink-500 font-display text-xs tracking-widest uppercase animate-pulse">
        Loading…
      </p>
    </div>
  </div>
);

export default Loader;
