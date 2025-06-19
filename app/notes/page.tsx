import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';

const Notes = async () => {
  const response = await fetchNotes({});

  return (
    <section>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </section>
  );
};

export default Notes;
