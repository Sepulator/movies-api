import { fetchMovie } from '@/services/api';
import { CardInfo } from '@/components/card-info';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await fetchMovie(id);

  return (
    <div className="movie-details">
      <CardInfo data={movie} />
    </div>
  );
}
