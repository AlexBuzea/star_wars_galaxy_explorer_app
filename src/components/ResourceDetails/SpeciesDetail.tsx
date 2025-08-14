import { 
  Zap, 
  Users, 
  Calendar, 
  Globe,
  Eye,
  Palette,
  Film,
  User
} from 'lucide-react';
import { useSpecies } from '../../hooks/useSwapi';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import RelatedResourcesList from './RelatedResourcesList';
import DetailContainer from '../UI/DetailContainer';
import DetailHeader from '../UI/DetailHeader';
import DetailCard from '../UI/DetailCard';
import DetailSpecCard from '../UI/DetailSpecCard';

interface SpeciesDetailProps {
  id: string;
}

const SpeciesDetail = ({ id }: SpeciesDetailProps) => {
  const { data: species, isLoading, isError, error, refetch } = useSpecies(id);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <LoadingSpinner size="lg" text="Loading species details..." />
      </div>
    );
  }

  if (isError || !species) {
    return (
      <ErrorMessage
        message={error?.message || 'Failed to load species'}
        onRetry={() => refetch()}
      />
    );
  }

  const speciesInfo = [
    { icon: Zap, label: 'Classification', value: species.classification },
    { icon: Users, label: 'Designation', value: species.designation },
    { icon: Calendar, label: 'Average Lifespan', value: `${species.average_lifespan} years` },
    { icon: Globe, label: 'Language', value: species.language },
    { icon: Eye, label: 'Eye Colors', value: species.eye_colors },
    { icon: Palette, label: 'Hair Colors', value: species.hair_colors },
    { icon: Palette, label: 'Skin Colors', value: species.skin_colors },
  ];

  return (
    <DetailContainer>
      {/* Species Header */}
      <DetailHeader
        title={species.name}
        icon={Zap}
        infoItems={speciesInfo}
      />

      <div className="row g-4">
        {/* People */}
        {species.people.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Notable People"
              icon={User}
              urls={species.people}
              resourceType="people"
            />
          </div>
        )}

        {/* Films */}
        {species.films.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Featured in Films"
              icon={Film}
              urls={species.films}
              resourceType="films"
            />
          </div>
        )}
      </div>

      {/* Species Characteristics */}
      <DetailCard title="Physical Characteristics">
        <div className="row g-3">
          <DetailSpecCard
            icon={Users}
            title="Average Height"
            value={species.average_height === 'unknown' ? 'Unknown' : `${species.average_height} cm`}
          />
          <DetailSpecCard
            icon={Calendar}
            title="Lifespan"
            value={`${species.average_lifespan} years`}
          />
          <DetailSpecCard
            icon={Zap}
            title="Classification"
            value={species.classification}
          />
          <DetailSpecCard
            icon={Globe}
            title="Language"
            value={species.language}
          />
        </div>
      </DetailCard>
    </DetailContainer>
  );
};

export default SpeciesDetail;