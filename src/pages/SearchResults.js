import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import EventItem from '../components/EventItem';
import LoadingIndicator from '../components/LoadingIndicator';
import MentorItem from '../components/MentorItem';
import ResourceItem from '../components/ResourceItem';
import { fetchCollection } from '../firebase';
import { formatEventLocation } from '../utils/events';

// One entry per searchable collection: where its documents come from, which
// of its fields count as searchable text, and how a hit is rendered. Adding a
// new searchable content type means adding an entry here — not editing a
// predicate and a renderer in two other places.
const SEARCHABLE = [
  {
    type: 'resource',
    collectionName: 'resources',
    searchableText: (item) => [item.title, item.category, item.summary].filter(Boolean).join(' '),
    render: (item) => <ResourceItem resource={item} />,
  },
  {
    type: 'event',
    collectionName: 'events',
    searchableText: (item) => [item.name, item.category, item.description, formatEventLocation(item)].filter(Boolean).join(' '),
    render: (item) => <EventItem event={item} />,
  },
  {
    type: 'mentor',
    collectionName: 'mentors',
    searchableText: (item) => [item.name, item.specialty, item.bio].filter(Boolean).join(' '),
    render: (item) => <MentorItem mentor={item} />,
  },
];

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery().get('query') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const perCollection = await Promise.all(
        SEARCHABLE.map(async (config) => {
          const items = await fetchCollection(config.collectionName);
          return items.map((item) => ({ item, config }));
        })
      );
      setResults(perCollection.flat());
    } catch (err) {
      console.error('Error fetching search data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const term = query.trim().toLowerCase();
  const matches = term
    ? results.filter(({ item, config }) => config.searchableText(item).toLowerCase().includes(term))
    : results;

  return (
    <div className="container">
      <h1>Search Results</h1>
      <p>Showing results for: <strong>{query}</strong></p>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorState message="We couldn't run that search right now." onRetry={fetchAll} />
      ) : matches.length > 0 ? (
        <div className="card-grid">
          {matches.map(({ item, config }) => (
            <React.Fragment key={`${config.type}-${item.id}`}>{config.render(item)}</React.Fragment>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
