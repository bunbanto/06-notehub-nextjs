import { fetchNotes } from '@/lib/api';
import NoteClient from './Notes.client';

const Notes = async () => {
  const response = await fetchNotes({});

  return (
    <section>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && (
        <>
          <NoteClient />
          {/* Передаємо notes у клієнтський компонент */}
        </>
      )}
    </section>
  );
};

export default Notes;
