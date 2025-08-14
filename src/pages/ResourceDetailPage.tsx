import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ResourceType, resourceTypeLabels } from '../types/swapi';
import PersonDetail from '../components/ResourceDetails/PersonDetail';
import PlanetDetail from '../components/ResourceDetails/PlanetDetail';
import SpeciesDetail from '../components/ResourceDetails/SpeciesDetail';
import StarshipDetail from '../components/ResourceDetails/StarshipDetail';
import VehicleDetail from '../components/ResourceDetails/VehicleDetail';
import FilmDetail from '../components/ResourceDetails/FilmDetail';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

interface ResourceDetailPageProps {
  resourceType: ResourceType;
}

const ResourceDetailPage = ({ resourceType }: ResourceDetailPageProps) => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <ErrorMessage 
        message="Invalid resource ID" 
        onRetry={() => window.history.back()} 
      />
    );
  }

  const renderDetailComponent = () => {
    switch (resourceType) {
      case 'people':
        return <PersonDetail id={id} />;
      case 'planets':
        return <PlanetDetail id={id} />;
      case 'species':
        return <SpeciesDetail id={id} />;
      case 'starships':
        return <StarshipDetail id={id} />;
      case 'vehicles':
        return <VehicleDetail id={id} />;
      case 'films':
        return <FilmDetail id={id} />;
      default:
        return (
          <ErrorMessage 
            message="Unknown resource type" 
            onRetry={() => window.history.back()} 
          />
        );
    }
  };

  return (
    <div className="relative z-10">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          to={`/${resourceType}`}
          className="inline-flex items-center space-x-2 text-space-300 hover:text-sw-yellow transition-colors font-jedi"
        >
          <ArrowLeft size={20} />
          <span>Back to {resourceTypeLabels[resourceType]}</span>
        </Link>
      </div>

      {/* Detail Content */}
      {renderDetailComponent()}
    </div>
  );
};

export default ResourceDetailPage;