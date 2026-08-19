import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import articleSeeds from '../data/articleSeeds';
import eventSeeds from '../data/eventSeeds';
import mentorSeeds from '../data/mentorSeeds';
import { db, fetchCollection } from '../firebase';
import './AdminPanel.css';

const EMPTY_RESOURCE = { title: '', category: '', summary: '', content: '' };
const EMPTY_MENTOR = { name: '', bio: '', specialty: '', contactEmail: '' };
const EMPTY_EVENT = {
  name: '',
  category: '',
  description: '',
  isOnline: false,
  city: '',
  region: '',
  country: '',
  startDate: '',
  endDate: '',
  link: '',
};

const AdminPanel = () => {
  const [resource, setResource] = useState(EMPTY_RESOURCE);
  const [resources, setResources] = useState([]);
  const [networkingEvent, setNetworkingEvent] = useState(EMPTY_EVENT);
  const [networkingEvents, setNetworkingEvents] = useState([]);
  const [mentor, setMentor] = useState(EMPTY_MENTOR);
  const [mentors, setMentors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [seeding, setSeeding] = useState(null); // which collection is seeding, if any
  const [loading, setLoading] = useState(true);

  // Maps a collection name to the setter that holds its documents, so the
  // reload/delete paths don't need a branch per collection.
  const setters = useMemo(
    () => ({ resources: setResources, events: setNetworkingEvents, mentors: setMentors, bookings: setBookings }),
    []
  );

  const reload = useCallback(
    async (collectionName) => setters[collectionName](await fetchCollection(collectionName)),
    [setters]
  );

  useEffect(() => {
    const loadAll = async () => {
      try {
        // Independent reads — no reason to wait for each one in turn.
        const [resourcesData, eventsData, mentorsData, bookingsData, usersData] = await Promise.all([
          fetchCollection('resources'),
          fetchCollection('events'),
          fetchCollection('mentors'),
          fetchCollection('bookings'),
          fetchCollection('users'),
        ]);
        setResources(resourcesData);
        setNetworkingEvents(eventsData);
        setMentors(mentorsData);
        setBookings(bookingsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const handleChange = (e, setState, state) => {
    const { name, value, type, checked } = e.target;
    setState({ ...state, [name]: type === 'checkbox' ? checked : value });
  };

  const notifyAllUsers = async (type, message) => {
    const batch = writeBatch(db);
    users.forEach((user) => {
      batch.set(doc(collection(db, 'notifications')), {
        userId: user.id,
        type,
        message,
        timestamp: serverTimestamp(),
      });
    });
    await batch.commit();
  };

  /** Adds one document, resets its form, and refreshes that collection's list. */
  const addItem = async ({ collectionName, value, reset, notifyType, describe }) => {
    try {
      await addDoc(collection(db, collectionName), value);
      reset();
      await reload(collectionName);
      await notifyAllUsers(notifyType, describe(value));
    } catch (error) {
      console.error(`Error adding to ${collectionName}: `, error);
    }
  };

  /** Batch-writes any starter documents not already present, matched on `keyField`. */
  const seedCollection = async ({ collectionName, seeds, keyField, existing, notifyType, label }) => {
    setSeeding(collectionName);
    try {
      const existingKeys = new Set(existing.map((item) => item[keyField]));
      const missing = seeds.filter((seed) => !existingKeys.has(seed[keyField]));
      if (missing.length === 0) return;

      const batch = writeBatch(db);
      missing.forEach((seed) => batch.set(doc(collection(db, collectionName)), seed));
      await batch.commit();

      await reload(collectionName);
      await notifyAllUsers(
        notifyType,
        `${missing.length} starter ${label}${missing.length === 1 ? '' : 's'} added`
      );
    } catch (error) {
      console.error(`Error seeding ${collectionName}: `, error);
    } finally {
      setSeeding(null);
    }
  };

  const handleBookingStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
      await reload('bookings');
    } catch (error) {
      console.error('Error updating booking status: ', error);
    }
  };

  const handleDelete = async (collectionName, id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      await reload(collectionName);
    } catch (error) {
      console.error(`Error deleting from ${collectionName}: `, error);
    }
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <div className="admin-section">
        <h2>Add Resource</h2>
        <input type="text" name="title" value={resource.title} onChange={(e) => handleChange(e, setResource, resource)} placeholder="Title" />
        <input type="text" name="category" value={resource.category} onChange={(e) => handleChange(e, setResource, resource)} placeholder="Category (e.g. Interviewing)" />
        <textarea name="summary" value={resource.summary} onChange={(e) => handleChange(e, setResource, resource)} placeholder="Summary (1-2 sentences shown on the card)"></textarea>
        <textarea name="content" value={resource.content} onChange={(e) => handleChange(e, setResource, resource)} placeholder="Article content (Markdown supported)" rows={8}></textarea>
        <button
          onClick={() => addItem({
            collectionName: 'resources',
            value: resource,
            reset: () => setResource(EMPTY_RESOURCE),
            notifyType: 'resource',
            describe: (r) => `New resource added: ${r.title}`,
          })}
        >
          Add Resource
        </button>
        <button
          className="secondary-action-button"
          disabled={seeding === 'resources'}
          onClick={() => seedCollection({
            collectionName: 'resources',
            seeds: articleSeeds,
            keyField: 'title',
            existing: resources,
            notifyType: 'resource',
            label: 'article',
          })}
        >
          {seeding === 'resources' ? 'Loading…' : 'Load starter articles'}
        </button>
        <h3>Existing Resources</h3>
        <ul>
          {resources.map((res) => (
            <li key={res.id}>
              {res.title} <button onClick={() => handleDelete('resources', res.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h2>Add Networking Event</h2>
        <input type="text" name="name" value={networkingEvent.name} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Name" />
        <input type="text" name="category" value={networkingEvent.category} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Category (e.g. Technology, Women in Tech)" />
        <textarea name="description" value={networkingEvent.description} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Description"></textarea>
        <label className="admin-checkbox-label">
          <input type="checkbox" name="isOnline" checked={networkingEvent.isOnline} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} />
          This is an online event
        </label>
        {!networkingEvent.isOnline && (
          <>
            <input type="text" name="city" value={networkingEvent.city} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="City" />
            <input type="text" name="region" value={networkingEvent.region} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="State / Region" />
            <input type="text" name="country" value={networkingEvent.country} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Country" />
          </>
        )}
        <label className="admin-field-label">Start date</label>
        <input type="date" name="startDate" value={networkingEvent.startDate} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} />
        <label className="admin-field-label">End date (optional — defaults to start date)</label>
        <input type="date" name="endDate" value={networkingEvent.endDate} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} />
        <input type="text" name="link" value={networkingEvent.link} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Link" />
        <button
          onClick={() => addItem({
            collectionName: 'events',
            value: { ...networkingEvent, endDate: networkingEvent.endDate || networkingEvent.startDate },
            reset: () => setNetworkingEvent(EMPTY_EVENT),
            notifyType: 'event',
            describe: (e) => `New networking event: ${e.name}`,
          })}
        >
          Add Event
        </button>
        <button
          className="secondary-action-button"
          disabled={seeding === 'events'}
          onClick={() => seedCollection({
            collectionName: 'events',
            seeds: eventSeeds,
            keyField: 'name',
            existing: networkingEvents,
            notifyType: 'event',
            label: 'event',
          })}
        >
          {seeding === 'events' ? 'Loading…' : 'Load starter events'}
        </button>
        <h3>Existing Networking Events</h3>
        <ul>
          {networkingEvents.map((event) => (
            <li key={event.id}>
              {event.name} <button onClick={() => handleDelete('events', event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h2>Add Mentor</h2>
        <input type="text" name="name" value={mentor.name} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Name" />
        <textarea name="bio" value={mentor.bio} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Bio"></textarea>
        <input type="text" name="specialty" value={mentor.specialty} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Specialty" />
        <input type="email" name="contactEmail" value={mentor.contactEmail} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Contact Email" />
        <button
          onClick={() => addItem({
            collectionName: 'mentors',
            value: mentor,
            reset: () => setMentor(EMPTY_MENTOR),
            notifyType: 'mentor',
            describe: (m) => `New mentor added: ${m.name}`,
          })}
        >
          Add Mentor
        </button>
        <button
          className="secondary-action-button"
          disabled={seeding === 'mentors'}
          onClick={() => seedCollection({
            collectionName: 'mentors',
            seeds: mentorSeeds,
            keyField: 'name',
            existing: mentors,
            notifyType: 'mentor',
            label: 'mentor',
          })}
        >
          {seeding === 'mentors' ? 'Loading…' : 'Load starter mentors'}
        </button>
        <h3>Existing Mentors</h3>
        <ul>
          {mentors.map((mnt) => (
            <li key={mnt.id}>
              {mnt.name} <button onClick={() => handleDelete('mentors', mnt.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h2>Mentorship Bookings</h2>
        {bookings.length === 0 ? (
          <p className="admin-empty">No booking requests yet.</p>
        ) : (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id} className="admin-booking-item">
                <div>
                  <strong>{booking.mentorName}</strong> with {booking.name} ({booking.email}) on {booking.date}
                  <span className={`booking-status booking-status-${booking.status || 'pending'}`}>
                    {booking.status || 'pending'}
                  </span>
                </div>
                <div className="admin-booking-actions">
                  {booking.status !== 'confirmed' && (
                    <button className="secondary-action-button" onClick={() => handleBookingStatus(booking.id, 'confirmed')}>Confirm</button>
                  )}
                  {booking.status !== 'declined' && (
                    <button className="secondary-action-button" onClick={() => handleBookingStatus(booking.id, 'declined')}>Decline</button>
                  )}
                  <button onClick={() => handleDelete('bookings', booking.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
