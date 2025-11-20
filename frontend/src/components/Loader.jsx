import React from 'react';
import { Loader2 } from 'lucide-react';


const Loader = ({
  variant = 'spinner',
  size = 'md',
  color = 'purple',
  text = '',
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    purple: 'text-purple-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    gray: 'text-gray-600',
    white: 'text-white',
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const colorClass = colorClasses[color] || colorClasses.purple;

  const loaders = {
    spinner: (
      <svg
        className={`animate-spin ${sizeClass} ${colorClass}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    ),

    dots: (
      <div className="flex space-x-2">
        <div
          className={`${sizeClass} rounded-full ${colorClass.replace(
            'text-',
            'bg-'
          )} animate-bounce`}
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className={`${sizeClass} rounded-full ${colorClass.replace(
            'text-',
            'bg-'
          )} animate-bounce`}
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className={`${sizeClass} rounded-full ${colorClass.replace(
            'text-',
            'bg-'
          )} animate-bounce`}
          style={{ animationDelay: '300ms' }}
        ></div>
      </div>
    ),

    pulse: (
      <div
        className={`${sizeClass} rounded-full ${colorClass.replace(
          'text-',
          'bg-'
        )} animate-pulse`}
      ></div>
    ),

    bars: (
      <div
        className="flex space-x-1 items-end"
        style={{ height: sizeClasses[size].split(' ')[1] }}
      >
        <div
          className={`w-1 ${colorClass.replace(
            'text-',
            'bg-'
          )} rounded-full animate-pulse`}
          style={{ height: '40%', animationDelay: '0ms' }}
        ></div>
        <div
          className={`w-1 ${colorClass.replace(
            'text-',
            'bg-'
          )} rounded-full animate-pulse`}
          style={{ height: '60%', animationDelay: '150ms' }}
        ></div>
        <div
          className={`w-1 ${colorClass.replace(
            'text-',
            'bg-'
          )} rounded-full animate-pulse`}
          style={{ height: '80%', animationDelay: '300ms' }}
        ></div>
        <div
          className={`w-1 ${colorClass.replace(
            'text-',
            'bg-'
          )} rounded-full animate-pulse`}
          style={{ height: '60%', animationDelay: '450ms' }}
        ></div>
        <div
          className={`w-1 ${colorClass.replace(
            'text-',
            'bg-'
          )} rounded-full animate-pulse`}
          style={{ height: '40%', animationDelay: '600ms' }}
        ></div>
      </div>
    ),

    ring: (
      <div
        className={`${sizeClass} rounded-full border-4 border-gray-200 ${colorClass.replace(
          'text-',
          'border-t-'
        )} animate-spin`}
      ></div>
    ),

    icon: <Loader2 className={`animate-spin ${sizeClass} ${colorClass}`} />,
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      {loaders[variant] || loaders.spinner}
      {text && <p className={`text-sm font-medium ${colorClass}`}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

// Demo Component
const LoaderDemo = () => {
  const [fullScreenLoader, setFullScreenLoader] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Loader Components
        </h1>
        <p className="text-gray-600 mb-8">
          Reusable loader components with multiple variants and sizes
        </p>

        {/* Variants */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Variants
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-3 p-6 border rounded-lg">
              <Loader variant="spinner" size="lg" />
              <span className="text-sm font-medium text-gray-600">Spinner</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 border rounded-lg">
              <Loader variant="dots" size="lg" />
              <span className="text-sm font-medium text-gray-600">Dots</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 border rounded-lg">
              <Loader variant="pulse" size="lg" />
              <span className="text-sm font-medium text-gray-600">Pulse</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 border rounded-lg">
              <Loader variant="bars" size="lg" />
              <span className="text-sm font-medium text-gray-600">Bars</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 border rounded-lg">
              <Loader variant="ring" size="lg" />
              <span className="text-sm font-medium text-gray-600">Ring</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 border rounded-lg">
              <Loader variant="icon" size="lg" />
              <span className="text-sm font-medium text-gray-600">Icon</span>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sizes</h2>
          <div className="flex items-end justify-around gap-8 p-6">
            <div className="flex flex-col items-center gap-3">
              <Loader variant="spinner" size="sm" />
              <span className="text-xs text-gray-600">Small</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Loader variant="spinner" size="md" />
              <span className="text-xs text-gray-600">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Loader variant="spinner" size="lg" />
              <span className="text-xs text-gray-600">Large</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Loader variant="spinner" size="xl" />
              <span className="text-xs text-gray-600">Extra Large</span>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Colors</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <div className="flex flex-col items-center gap-3">
              <Loader variant="spinner" color="purple" />
              <span className="text-xs text-gray-600">Purple</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Loader variant="spinner" color="blue" />
              <span className="text-xs text-gray-600">Blue</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Loader variant="spinner" color="green" />
              <span className="text-xs text-gray-600">Green</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Loader variant="spinner" color="red" />
              <span className="text-xs text-gray-600">Red</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Loader variant="spinner" color="gray" />
              <span className="text-xs text-gray-600">Gray</span>
            </div>
            <div className="flex flex-col items-center gap-3 bg-gray-800 rounded p-3">
              <Loader variant="spinner" color="white" />
              <span className="text-xs text-white">White</span>
            </div>
          </div>
        </div>

        {/* With Text */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            With Text
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <Loader variant="spinner" size="lg" text="Loading..." />
            </div>
            <div className="p-6 border rounded-lg">
              <Loader
                variant="dots"
                size="lg"
                color="blue"
                text="Processing..."
              />
            </div>
            <div className="p-6 border rounded-lg">
              <Loader
                variant="icon"
                size="lg"
                color="green"
                text="Please wait..."
              />
            </div>
          </div>
        </div>

        {/* Full Screen Demo */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Full Screen Loader
          </h2>
          <button
            onClick={() => setFullScreenLoader(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Show Full Screen Loader
          </button>
          <p className="text-sm text-gray-600 mt-3">
            Click to see a full-screen loader overlay (will auto-close after 2
            seconds)
          </p>
        </div>

        {/* Usage Example */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
          <pre className="text-green-400 text-sm overflow-x-auto">
            {`// Basic usage
<Loader />

// With props
<Loader 
  variant="dots" 
  size="lg" 
  color="blue" 
  text="Loading..."
/>

// Full screen
<Loader 
  variant="spinner" 
  fullScreen={true}
  text="Please wait..."
/>`}
          </pre>
        </div>
      </div>

      {/* Full Screen Loader */}
      {fullScreenLoader && (
        <Loader
          variant="spinner"
          size="xl"
          fullScreen={true}
          text="Loading..."
        />
      )}

      {fullScreenLoader && setTimeout(() => setFullScreenLoader(false), 2000)}
    </div>
  );
};

export default LoaderDemo;
