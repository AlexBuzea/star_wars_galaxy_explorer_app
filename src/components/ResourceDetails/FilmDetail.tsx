import { 
  Film, 
  Calendar, 
  User,
  Users,
  Globe,
  Zap,
  Rocket,
  Car
} from 'lucide-react';
import { useFilm } from '../../hooks/useSwapi';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import RelatedResourcesList from './RelatedResourcesList';
import DetailContainer from '../UI/DetailContainer';
import DetailHeader from '../UI/DetailHeader';
import DetailCard from '../UI/DetailCard';

interface FilmDetailProps {
  id: string;
}

const FilmDetail = ({ id }: FilmDetailProps) => {
  const { data: film, isLoading, isError, error, refetch } = useFilm(id);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <LoadingSpinner size="lg" text="Loading film details..." />
      </div>
    );
  }

  if (isError || !film) {
    return (
      <ErrorMessage
        message={error?.message || 'Failed to load film'}
        onRetry={() => refetch()}
      />
    );
  }

  const filmInfo = [
    { icon: Film, label: 'Episode', value: `Episode ${film.episode_id}` },
    { icon: Calendar, label: 'Release Date', value: film.release_date },
    { icon: User, label: 'Director', value: film.director },
    { icon: User, label: 'Producer', value: film.producer },
  ];

  return (
    <DetailContainer>
      {/* Film Header */}
      <DetailHeader
        title={film.title}
        icon={Film}
        infoItems={filmInfo}
      />

      {/* Opening Crawl */}
      <DetailCard title="Opening Crawl">
        <p style={{
          color: 'var(--sw-space-200)',
          fontFamily: "'Rajdhani', sans-serif",
          lineHeight: '1.6',
          fontSize: '1rem'
        }}>
          {film.opening_crawl}
        </p>
      </DetailCard>

      <div className="row g-4">
        {/* Characters */}
        {film.characters.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Characters"
              icon={Users}
              urls={film.characters}
              resourceType="people"
              maxDisplay={8}
            />
          </div>
        )}

        {/* Planets */}
        {film.planets.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Planets"
              icon={Globe}
              urls={film.planets}
              resourceType="planets"
            />
          </div>
        )}

        {/* Starships */}
        {film.starships.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Starships"
              icon={Rocket}
              urls={film.starships}
              resourceType="starships"
            />
          </div>
        )}

        {/* Vehicles */}
        {film.vehicles.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Vehicles"
              icon={Car}
              urls={film.vehicles}
              resourceType="vehicles"
            />
          </div>
        )}

        {/* Species */}
        {film.species.length > 0 && (
          <div className="col-12 col-lg-6">
            <RelatedResourcesList
              title="Species"
              icon={Zap}
              urls={film.species}
              resourceType="species"
            />
          </div>
        )}
      </div>
    </DetailContainer>
  );
};

export default FilmDetail;