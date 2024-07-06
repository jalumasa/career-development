import React, { useEffect, useState } from 'react';
import ResourceItem from '../components/ResourceItem';
import { db } from '../firebase'; // Import Firebase config

const CareerResources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    db.collection('resources').get().then((querySnapshot) => {
      const resourcesData = [];
      querySnapshot.forEach((doc) => {
        resourcesData.push(doc.data());
      });
      setResources(resourcesData);
    });
  }, []);

  return (
    <div className="container">
      <h1>Career Resources</h1>
      {resources.map((resource, index) => (
        <ResourceItem key={index} resource={resource} />
      ))}
    </div>
  );
};

export default CareerResources;
