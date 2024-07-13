import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResourceItem from '../components/ResourceItem';
import { collection, db, getDocs } from '../firebase'; // Import Firebase config and Firestore functions

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get('query') || '';
  const [resources, setResources] = useState([]);
  const [networkingEvents, setNetworkingEvents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const resourcesData = [];
      const resourcesSnapshot = await getDocs(collection(db, 'resources'));
      resourcesSnapshot.forEach((doc) => {
        resourcesData.push({ ...doc.data(), type: 'Resource' });
      });
      setResources(resourcesData);
    };

    const fetchNetworkingEvents = async () => {
      const networkingData = [];
      const networkingSnapshot = await getDocs(collection(db, 'networking'));
      networkingSnapshot.forEach((doc) => {
        networkingData.push({ ...doc.data(), type: 'Networking' });
      });
      setNetworkingEvents(networkingData);
    };

    const fetchMentors = async () => {
      const mentorsData = [];
      const mentorsSnapshot = await getDocs(collection(db, 'mentorship'));
      mentorsSnapshot.forEach((doc) => {
        mentorsData.push({ ...doc.data(), type: 'Mentor' });
      });
      setMentors(mentorsData);
    };

    fetchResources();
    fetchNetworkingEvents();
    fetchMentors();
  }, []);

  useEffect(() => {
    if (query) {
      const allData = [...resources, ...networkingEvents, ...mentors];
      setFilteredResults(
        allData.filter(item =>
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.name?.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredResults([...resources, ...networkingEvents, ...mentors]);
    }
  }, [query, resources, networkingEvents, mentors]);

  return (
    <div className="container">
      <h1>Search Results</h1>
      <p>Showing results for: <strong>{query}</strong></p>
      {filteredResults.length > 0 ? (
        filteredResults.map((item, index) => (
          <ResourceItem key={index} resource={item} />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
