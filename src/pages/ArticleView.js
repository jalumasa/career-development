import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import ErrorState from '../components/ErrorState';
import LoadingIndicator from '../components/LoadingIndicator';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './ArticleView.css';

const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  const fetchArticle = useCallback(async () => {
    setLoading(true);
    setNotFound(false);
    setError(false);
    try {
      const snapshot = await getDoc(doc(db, 'resources', id));
      if (snapshot.exists()) {
        setArticle({ id: snapshot.id, ...snapshot.data() });
      } else {
        setNotFound(true);
      }
    } catch (err) {
      // A read that fails isn't the same as an article that doesn't exist —
      // telling someone "not found" when the request errored sends them
      // looking for a missing article that is actually there.
      console.error('Error fetching article:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (loading) {
    return (
      <div className="container article-page">
        <LoadingIndicator />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container article-page">
        <ErrorState message="We couldn't load this article right now." onRetry={fetchArticle} />
        <Link to="/resources" className="article-back-link"><FaArrowLeft /> Back to Resources</Link>
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
