import React from 'react';

const ResourceItem = ({ resource }) => {
  return (
    <div className="card">
      <h2>{resource.title}</h2>
      <p>{resource.description}</p>
      <a href={resource.link} target="_blank" rel="noopener noreferrer">Click here to learn more</a>
    </div>
  );
};

export default ResourceItem;
