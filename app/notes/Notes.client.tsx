'use client';

import type { Note } from '@/types/note';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteModal from '@/components/NoteModal/NoteModal';
import { useDebounce } from 'use-debounce';
import css from '@/app/notes/Notes.client.module.css';
import Loader from '@/components/Loader/Loader';

interface NotesClientProps {
  notes: Note[];
  totalPages: number;
}

export default function NotesClient({ notes, totalPages }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes({ search: debouncedSearch, page }),
    placeholderData: prev => prev,
    initialData: { notes, totalPages },
  });

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          onChange={query => {
            setSearchQuery(query);
            setPage(1);
          }}
        />
        {data?.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {isLoading && <Loader />}
      {error && <p>Failed to load notes.</p>}
      {isFetching && !isLoading && <Loader />}

      {data?.notes?.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <NoteModal
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
