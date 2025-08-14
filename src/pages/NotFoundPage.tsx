import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] text-center">
      {/* 404 Error */}
      <div className="mb-8">
        <h1 className="font-star-wars text-8xl md:text-9xl font-bold text-sw-yellow mb-4 animate-pulse-glow">
          404
        </h1>
        <h2 className="font-star-wars text-2xl md:text-3xl text-space-200 mb-4">
          LOCATION NOT FOUND
        </h2>
        <p className="text-lg text-space-300 max-w-md mx-auto font-jedi leading-relaxed">
          The coordinates you're looking for don't exist in this galaxy. 
          Perhaps the archives are incomplete?
        </p>
      </div>

      {/* Yoda Quote */}
      <div className="mb-8 bg-space-800/50 rounded-xl border border-space-600 p-6 backdrop-blur-sm max-w-lg">
        <blockquote className="font-jedi text-space-300 italic mb-3">
          "Lost a planet, Master Obi-Wan has. How embarrassing..."
        </blockquote>
        <cite className="font-jedi text-sm text-space-400">
          - Yoda
        </cite>
      </div>

      {/* Navigation Options */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-sw-yellow text-space-900 px-6 py-3 rounded-lg font-jedi font-semibold hover:bg-yellow-300 transition-colors"
        >
          <Home size={20} />
          <span>Return to Base</span>
        </Link>
        
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center space-x-2 border border-space-600 text-space-300 px-6 py-3 rounded-lg font-jedi font-semibold hover:border-sw-yellow hover:text-sw-yellow transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Go Back</span>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="mt-16 text-space-600 text-sm font-jedi">
        <p>Error Code: ORDER_66_NOT_FOUND</p>
        <p>May the Force guide you back</p>
      </div>
    </div>
  );
};

export default NotFoundPage;