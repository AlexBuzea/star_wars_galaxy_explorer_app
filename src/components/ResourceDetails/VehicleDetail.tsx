import { 
  Car, 
  Users, 
  Settings, 
  Gauge,
  Package,
  Zap,
  Film,
  User
} from 'lucide-react';
import { useVehicle } from '../../hooks/useSwapi';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import RelatedResourcesList from './RelatedResourcesList';
import DetailContainer from '../UI/DetailContainer';
import DetailHeader from '../UI/DetailHeader';
import DetailCard from '../UI/DetailCard';
import DetailSpecCard from '../UI/DetailSpecCard';

interface VehicleDetailProps {
  id: string;
}

const VehicleDetail = ({ id }: VehicleDetailProps) => {
  const { data: vehicle, isLoading, isError, error, refetch } = useVehicle(id);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <LoadingSpinner size="lg" text="Loading vehicle details..." />
      </div>
    );
  }

  if (isError || !vehicle) {
    return (
      <ErrorMessage
        message={error?.message || 'Failed to load vehicle'}
        onRetry={() => refetch()}
      />
    );
  }

  const vehicleInfo = [
    { icon: Settings, label: 'Manufacturer', value: vehicle.manufacturer },
    { icon: Gauge, label: 'Length', value: vehicle.length === 'unknown' ? 'Unknown' : `${vehicle.length} m` },
    { icon: Zap, label: 'Max Speed', value: vehicle.max_atmosphering_speed === 'unknown' ? 'Unknown' : `${vehicle.max_atmosphering_speed} km/h` },
    { icon: Users, label: 'Crew', value: vehicle.crew },
    { icon: Users, label: 'Passengers', value: vehicle.passengers },
    { icon: Package, label: 'Cargo Capacity', value: vehicle.cargo_capacity === 'unknown' ? 'Unknown' : `${vehicle.cargo_capacity} kg` },
    { icon: Package, label: 'Consumables', value: vehicle.consumables },
    { icon: Car, label: 'Vehicle Class', value: vehicle.vehicle_class },
  ];

  return (
    <DetailContainer>
      {/* Vehicle Header */}
      <DetailHeader
        title={vehicle.name}
        icon={Car}
        infoItems={vehicleInfo}
      />

      <div className="row g-4">
        {/* Pilots */}
        {vehicle.pilots.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Known Pilots"
              icon={User}
              urls={vehicle.pilots}
              resourceType="people"
            />
          </div>
        )}

        {/* Films */}
        {vehicle.films.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Featured in Films"
              icon={Film}
              urls={vehicle.films}
              resourceType="films"
            />
          </div>
        )}
      </div>

      {/* Vehicle Specifications */}
      <DetailCard title="Technical Specifications">
        <div className="row g-3">
          <DetailSpecCard
            icon={Gauge}
            title="Length"
            value={vehicle.length === 'unknown' ? 'Unknown' : `${vehicle.length} m`}
          />
          <DetailSpecCard
            icon={Users}
            title="Crew"
            value={vehicle.crew}
          />
          <DetailSpecCard
            icon={Zap}
            title="Max Speed"
            value={vehicle.max_atmosphering_speed === 'unknown' ? 'Unknown' : `${vehicle.max_atmosphering_speed} km/h`}
          />
          <DetailSpecCard
            icon={Package}
            title="Cargo"
            value={vehicle.cargo_capacity === 'unknown' ? 'Unknown' : `${vehicle.cargo_capacity} kg`}
          />
        </div>
      </DetailCard>
    </DetailContainer>
  );
};

export default VehicleDetail;