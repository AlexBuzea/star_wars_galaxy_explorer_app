import { 
  User, 
  Calendar, 
  Ruler, 
  Weight, 
  Eye, 
  Palette, 
  MapPin, 
  Users,
  Film,
  Rocket,
  Car
} from 'lucide-react';
import { usePerson, useRelatedResource } from '../../hooks/useSwapi';
import { Planet, Species, Film as FilmType, Starship, Vehicle } from '../../types/swapi';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import RelatedResourcesList from './RelatedResourcesList';
import DetailContainer from '../UI/DetailContainer';
import DetailHeader from '../UI/DetailHeader';
import DetailCard from '../UI/DetailCard';

interface PersonDetailProps {
  id: string;
}

const PersonDetail = ({ id }: PersonDetailProps) => {
  const { data: person, isLoading, isError, error, refetch } = usePerson(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading character details..." />
      </div>
    );
  }

  if (isError || !person) {
    return (
      <ErrorMessage
        message={error?.message || 'Failed to load character'}
        onRetry={() => refetch()}
      />
    );
  }

  const personalInfo = [
    { icon: Calendar, label: 'Birth Year', value: person.birth_year },
    { icon: Ruler, label: 'Height', value: person.height === 'unknown' ? 'Unknown' : `${person.height} cm` },
    { icon: Weight, label: 'Mass', value: person.mass === 'unknown' ? 'Unknown' : `${person.mass} kg` },
    { icon: Users, label: 'Gender', value: person.gender },
    { icon: Eye, label: 'Eye Color', value: person.eye_color },
    { icon: Palette, label: 'Hair Color', value: person.hair_color },
    { icon: Palette, label: 'Skin Color', value: person.skin_color },
  ];

  return (
    <DetailContainer>
      {/* Character Header */}
      <DetailHeader
        title={person.name}
        icon={User}
        infoItems={personalInfo}
      />

      {/* Homeworld */}
      {person.homeworld && (
        <DetailCard title="Homeworld" icon={MapPin}>
          <HomeworldCard url={person.homeworld} />
        </DetailCard>
      )}

      <div className="row g-4">
        {/* Species */}
        {person.species.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Species"
              icon={Users}
              urls={person.species}
              resourceType="species"
            />
          </div>
        )}

        {/* Films */}
        {person.films.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Films"
              icon={Film}
              urls={person.films}
              resourceType="films"
            />
          </div>
        )}

        {/* Starships */}
        {person.starships.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Starships"
              icon={Rocket}
              urls={person.starships}
              resourceType="starships"
            />
          </div>
        )}

        {/* Vehicles */}
        {person.vehicles.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Vehicles"
              icon={Car}
              urls={person.vehicles}
              resourceType="vehicles"
            />
          </div>
        )}
      </div>
    </DetailContainer>
  );
};

// Homeworld card component
const HomeworldCard = ({ url }: { url: string }) => {
  const { data: planet, isLoading } = useRelatedResource<Planet>(url);

  if (isLoading) {
    return <LoadingSpinner size="sm" text="Loading homeworld..." />;
  }

  if (!planet) {
    return (
      <div className="text-space-400 text-sm">
        Homeworld information unavailable
      </div>
    );
  }

  return (
    <div className="bg-space-700/50 rounded-lg p-4 border border-space-600">
      <h3 className="font-jedi text-lg font-semibold text-space-200 mb-3">
        {planet.name}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-space-400">Climate:</span>
          <span className="text-space-200 ml-2">{planet.climate}</span>
        </div>
        <div>
          <span className="text-space-400">Terrain:</span>
          <span className="text-space-200 ml-2">{planet.terrain}</span>
        </div>
        <div>
          <span className="text-space-400">Population:</span>
          <span className="text-space-200 ml-2">
            {planet.population === 'unknown' ? 'Unknown' : planet.population}
          </span>
        </div>
        <div>
          <span className="text-space-400">Gravity:</span>
          <span className="text-space-200 ml-2">{planet.gravity}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;