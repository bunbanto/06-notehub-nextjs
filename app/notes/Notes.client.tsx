'use client';

import type { Note } from '@/types/note';

interface NotesProps {
  notes: Note[];
  totalPages: number;
}

export default function Notes({ notes, totalPages }: NotesProps) {
  // Тут клієнтська логіка: фільтрація, пагінація, тощо
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <span>{note.tag}</span>
          </li>
        ))}
      </ul>
      <p>Total pages: {totalPages}</p>
    </div>
  );
}
