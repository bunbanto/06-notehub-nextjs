import { fetchNotes } from '@/lib/api';
import NoteClient from './Notes.client';

const Notes = async () => {
  const response = await fetchNotes({});

  return (
    <section>
      <h1>Notes List</h1>
      <NoteClient notes={response.notes} totalPages={response.totalPages} />
    </section>
  );
};

export default Notes;
