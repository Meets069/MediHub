interface Appointment {
  _id?: string;
  doctorName: string;
  specialization: string;
  name: string; // Patient name
  status: string; // <-- Make 'status' optional
  date?: string;
  time?: string;
}