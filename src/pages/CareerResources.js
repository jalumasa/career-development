import React, { useEffect, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import LoadingIndicator from '../components/LoadingIndicator';
import ResourceItem from '../components/ResourceItem';
import { fetchCollection } from '../firebase';

const CareerResources = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        setResources(await fetchCollection('resources'));
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const term = searchTerm.toLowerCase();
  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
    const haystack = `${resource.title || ''} ${resource.summary || ''}`.toLowerCase();
    return matchesCategory && haystack.includes(term);
  });

  return (
    <div className="container filter-page">
      <h1>Career Resources</h1>
      <p className="page-subtitle">Original guides written to help you do something specific — not links out to somewhere else.</p>

      <input
        type="text"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <CategoryFilter items={resources} active={activeCategory} onChange={setActiveCategory} />

      {loading ? (
        <LoadingIndicator />
      ) : filteredResources.length === 0 ? (
        <p className="empty-state">No resources match your search yet.</p>
      ) : (
        <div className="card-grid">
          {filteredResources.map((resource) => (
            <ResourceItem key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerResources;
