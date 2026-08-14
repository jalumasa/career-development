import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import LoadingIndicator from '../components/LoadingIndicator';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './ArticleView.css';

const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const snapshot = await getDoc(doc(db, 'resources', id));
        if (snapshot.exists()) {
          setArticle({ id: snapshot.id, ...snapshot.data() });
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="container article-page">
        <LoadingIndicator />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="container article-page">
        <p>We couldn't find that resource.</p>
        <Link to="/resources" className="article-back-link"><FaArrowLeft /> Back to Resources</Link>
      </div>
    );
  }

  return (
    <div className="container article-page">
      <Link to="/resources" className="article-back-link"><FaArrowLeft /> Back to Resources</Link>

      <article className="article-body">
        <header className="article-header">
          {article.category && <span className="card-category">{article.category}</span>}
          <h1>{article.title}</h1>
          {article.readTime && <p className="article-meta">{article.readTime}</p>}
        </header>

        <div className="article-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content || article.summary || ''}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default ArticleView;
