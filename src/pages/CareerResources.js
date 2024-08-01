import React, { useEffect, useState } from 'react';
import ResourceItem from '../components/ResourceItem';
import { collection, db, getDocs } from '../firebase'; // Import Firebase config and Firestore functions

const CareerResources = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const resourcesData = [];
      const querySnapshot = await getDocs(collection(db, 'resources'));
      querySnapshot.forEach((doc) => {
        resourcesData.push(doc.data());
      });
      setResources(resourcesData);
      setFilteredResources(resourcesData);
    };

    fetchResources();
  }, []);

  useEffect(() => {
    setFilteredResources(
      resources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, resources]);

  return (
    <div className="resource-item">
      <h1>Career Resources</h1>
      <input
        type="text"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredResources.map((resource, index) => (
        <ResourceItem key={index} resource={resource} />
      ))}
    </div>
  );
};

export default CareerResources;
