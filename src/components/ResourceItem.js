import React from 'react';
import { Link } from 'react-router-dom';
import './ResourceItem.css';

const ResourceItem = ({ resource }) => {
  return (
    <Link to={`/resources/${resource.id}`} className="card resource-card">
      {resource.category && <span className="card-category">{resource.category}</span>}
      <h2>{resource.title}</h2>
      <p>{resource.summary}</p>
      <span className="resource-card-meta">
        {resource.readTime ? `${resource.readTime} · ` : ''}Read article
      </span>
    </Link>
  );
};

export default ResourceItem;
