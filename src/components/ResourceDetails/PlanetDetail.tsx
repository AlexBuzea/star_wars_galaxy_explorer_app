import { 
  Globe, 
  Users, 
  Cloud, 
  Mountain, 
  Droplets,
  MapPin,
  Film,
  User
} from 'lucide-react';
import { usePlanet } from '../../hooks/useSwapi';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import RelatedResourcesList from './RelatedResourcesList';
import DetailContainer from '../UI/DetailContainer';
import DetailHeader from '../UI/DetailHeader';
import DetailCard from '../UI/DetailCard';
import DetailSpecCard from '../UI/DetailSpecCard';

interface PlanetDetailProps {
  id: string;
}

const PlanetDetail = ({ id }: PlanetDetailProps) => {
  const { data: planet, isLoading, isError, error, refetch } = usePlanet(id);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <LoadingSpinner size="lg" text="Loading planet details..." />
      </div>
    );
  }

  if (isError || !planet) {
    return (
      <ErrorMessage
        message={error?.message || 'Failed to load planet'}
        onRetry={() => refetch()}
      />
    );
  }

  const planetInfo = [
    { icon: MapPin, label: 'Climate', value: planet.climate },
    { icon: Mountain, label: 'Terrain', value: planet.terrain },
    { icon: Users, label: 'Population', value: planet.population },
    { icon: Droplets, label: 'Surface Water', value: `${planet.surface_water}%` },
    { icon: Globe, label: 'Diameter', value: planet.diameter === 'unknown' ? 'Unknown' : `${planet.diameter} km` },
    { icon: Cloud, label: 'Gravity', value: planet.gravity },
  ];

  return (
    <DetailContainer>
      {/* Planet Header */}
      <DetailHeader
        title={planet.name}
        icon={Globe}
        infoItems={planetInfo}
      />

      <div className="row g-4">
        {/* Residents */}
        {planet.residents.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Notable Residents"
              icon={User}
              urls={planet.residents}
              resourceType="people"
            />
          </div>
        )}

        {/* Films */}
        {planet.films.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Featured in Films"
              icon={Film}
              urls={planet.films}
              resourceType="films"
            />
          </div>
        )}
      </div>

      {/* Planet Specifications */}
      <DetailCard title="Planetary Data">
        <div className="row g-3">
          <DetailSpecCard
            icon={Globe}
            title="Rotation Period"
            value={planet.rotation_period === 'unknown' ? 'Unknown' : `${planet.rotation_period} hours`}
          />
          <DetailSpecCard
            icon={MapPin}
            title="Orbital Period"
            value={planet.orbital_period === 'unknown' ? 'Unknown' : `${planet.orbital_period} days`}
          />
          <DetailSpecCard
            icon={Users}
            title="Population"
            value={planet.population}
          />
          <DetailSpecCard
            icon={Droplets}
            title="Surface Water"
            value={`${planet.surface_water}%`}
          />
        </div>
      </DetailCard>
    </DetailContainer>
  );
};

export default PlanetDetail;