import { 
  collection, 
  addDoc, 
  getDocs, 
  query,
  where,
  updateDoc,
  doc,
  Timestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Event } from '../data/types';  // rename your Event type to avoid DOM clash

// Get all events
export const getEvents = async (): Promise<Event[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'events'));
    const events = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.date ? (data.date as Timestamp).toDate() : new Date(),
      };
    }) as Event[];
    console.log('Fetched events:', events);
    return events;
  } catch (error) {
    console.error('Error getting events:', error);
    return [];
  }
};

// Add a new event
export const addEvent = async (eventData: Omit<Event, 'id'>) => {
  try {
    const eventWithTimestamp = {
      ...eventData,
      date: Timestamp.fromDate(eventData.date)
    };
    const docRef = await addDoc(collection(db, 'events'), eventWithTimestamp);
    return docRef;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

// Update an existing event
export const updateEvent = async (eventId: string, data: Partial<Event>) => {
  const eventRef = doc(db, 'events', eventId);

  const updatePayload: { [key: string]: any } = { ...data };
  if (data.date instanceof Date) {
    updatePayload.date = Timestamp.fromDate(data.date);
  }

  await updateDoc(eventRef, updatePayload);
};

// Delete an event
export const deleteEvent = async (eventId: string) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    await deleteDoc(eventRef);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Cleanup past events
export const cleanupPastEvents = async (): Promise<number> => {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('date', '<', Timestamp.fromDate(now)));
    const querySnapshot = await getDocs(q);

    let deletedCount = 0;
    const deletePromises: Promise<void>[] = [];

    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
      deletedCount++;
    });

    await Promise.all(deletePromises);
    console.log(`Cleaned up ${deletedCount} past events`);
    return deletedCount;
  } catch (error) {
    console.error('Error cleaning up past events:', error);
    throw error;
  }
};