

// Event type (renamed to avoid DOM Event clash)
export interface Event {
  id?: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  type: string;
  description: string;
  classroom?: string;
  backgroundColor?: string;
  registrationLink?: string;
}

// User type
export interface CustomUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'admin' | 'student';
}