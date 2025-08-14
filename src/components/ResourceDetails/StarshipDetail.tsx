import { 
  Rocket, 
  Users, 
  Package, 
  Gauge, 
  DollarSign, 
  Zap,
  Clock,
  Settings,
  Film,
  User
} from 'lucide-react';
import { useStarship } from '../../hooks/useSwapi';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import RelatedResourcesList from './RelatedResourcesList';
import DetailContainer from '../UI/DetailContainer';
import DetailHeader from '../UI/DetailHeader';
import DetailCard from '../UI/DetailCard';
import DetailSpecCard from '../UI/DetailSpecCard';

interface StarshipDetailProps {
  id: string;
}

const StarshipDetail = ({ id }: StarshipDetailProps) => {
  const { data: starship, isLoading, isError, error, refetch } = useStarship(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading starship details..." />
      </div>
    );
  }

  if (isError || !starship) {
    return (
      <ErrorMessage
        message={error?.message || 'Failed to load starship'}
        onRetry={() => refetch()}
      />
    );
  }

  const starshipInfo = [
    { icon: Settings, label: 'Model', value: starship.model },
    { icon: Settings, label: 'Manufacturer', value: starship.manufacturer },
    { icon: DollarSign, label: 'Cost', value: starship.cost_in_credits === 'unknown' ? 'Unknown' : `${starship.cost_in_credits} credits` },
    { icon: Gauge, label: 'Length', value: starship.length === 'unknown' ? 'Unknown' : `${starship.length} m` },
    { icon: Gauge, label: 'Max Speed', value: starship.max_atmosphering_speed === 'unknown' ? 'Unknown' : `${starship.max_atmosphering_speed} km/h` },
    { icon: Users, label: 'Crew', value: starship.crew },
    { icon: Users, label: 'Passengers', value: starship.passengers },
    { icon: Package, label: 'Cargo Capacity', value: starship.cargo_capacity === 'unknown' ? 'Unknown' : `${starship.cargo_capacity} kg` },
    { icon: Clock, label: 'Consumables', value: starship.consumables },
    { icon: Zap, label: 'Hyperdrive Rating', value: starship.hyperdrive_rating },
    { icon: Zap, label: 'MGLT', value: starship.MGLT === 'unknown' ? 'Unknown' : starship.MGLT },
    { icon: Rocket, label: 'Starship Class', value: starship.starship_class },
  ];

  return (
    <DetailContainer>
      {/* Starship Header */}
      <DetailHeader
        title={starship.name}
        icon={Rocket}
        infoItems={starshipInfo}
      />

      <div className="row g-4">
        {/* Pilots */}
        {starship.pilots.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Known Pilots"
              icon={User}
              urls={starship.pilots}
              resourceType="people"
            />
          </div>
        )}

        {/* Films */}
        {starship.films.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Featured in Films"
              icon={Film}
              urls={starship.films}
              resourceType="films"
            />
          </div>
        )}
      </div>

      {/* Starship Specifications */}
      <DetailCard title="Technical Specifications">
        <div className="row g-3">
          <DetailSpecCard
            icon={Gauge}
            title="Length"
            value={starship.length === 'unknown' ? 'Unknown' : `${starship.length} m`}
          />
          <DetailSpecCard
            icon={Users}
            title="Crew"
            value={starship.crew}
          />
          <DetailSpecCard
            icon={Zap}
            title="Hyperdrive"
            value={`Class ${starship.hyperdrive_rating}`}
          />
          <DetailSpecCard
            icon={Package}
            title="Cargo"
            value={starship.cargo_capacity === 'unknown' ? 'Unknown' : `${starship.cargo_capacity} kg`}
          />
        </div>
      </DetailCard>
    </DetailContainer>
  );
};

export default StarshipDetail;