import { 
  Users, 
  Globe, 
  Zap, 
  Rocket, 
  Car, 
  Film,
  Home
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store';
import type { ResourceType } from '../../types/swapi';
import { resourceTypeLabels } from '../../types/swapi';

const navigationItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/people', icon: Users, label: resourceTypeLabels.people, resourceType: 'people' as ResourceType },
  { to: '/planets', icon: Globe, label: resourceTypeLabels.planets, resourceType: 'planets' as ResourceType },
  { to: '/species', icon: Zap, label: resourceTypeLabels.species, resourceType: 'species' as ResourceType },
  { to: '/starships', icon: Rocket, label: resourceTypeLabels.starships, resourceType: 'starships' as ResourceType },
  { to: '/vehicles', icon: Car, label: resourceTypeLabels.vehicles, resourceType: 'vehicles' as ResourceType },
  { to: '/films', icon: Film, label: resourceTypeLabels.films, resourceType: 'films' as ResourceType },
];

const Sidebar = () => {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-space-900/95 backdrop-blur-sm border-r border-sw-yellow/20 transition-all duration-300 ease-in-out z-40 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-sw-yellow/20 text-sw-yellow border border-sw-yellow/30'
                    : 'text-space-300 hover:text-sw-yellow hover:bg-space-800/50'
                }`
              }
            >
              <Icon 
                size={20} 
                className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200" 
              />
              
              {sidebarOpen && (
                <span className="font-jedi font-medium text-sm whitespace-nowrap">
                  {item.label}
                </span>
              )}
              
              {!sidebarOpen && (
                <div className="absolute left-16 bg-space-800 text-space-100 px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 border border-space-600">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar footer */}
      {sidebarOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-center text-xs text-space-400 font-jedi">
            <p>May the Force</p>
            <p>be with you</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;