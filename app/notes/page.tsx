import { fetchNotes } from '@/lib/api';
import NoteClient from './Notes.client';

const Notes = async () => {
  const response = await fetchNotes({});
  const notes = response?.notes || [];

  return (
    <section>
      <h1>Notes List</h1>
      <NoteClient notes={notes} />
    </section>
  );
};

export default Notes;
