import axios from 'axios';
import type { Note } from '../types/note';

const KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${KEY}`;
axios.defaults.headers.common['Accept'] = 'application/json';

interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
  sortBy?: string;
  perPage?: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes({
  search,
  page = 1,
  tag,
  sortBy = 'created',
}: FetchNotesParams) {
  const params: FetchNotesParams = {
    page: page,
    perPage: 12,
    sortBy: sortBy,
  };

  if (search) params.search = search;
  if (tag) params.tag = tag;

  const { data } = await axios.get<FetchNotesHTTPResponse>('/notes', {
    params,
  });
  return data;
}

export async function createNote({ title, content, tag }: CreateNoteParams) {
  const response = await axios.post<Note>('/notes', {
    title,
    content,
    tag,
  });
  return response.data;
}

export async function deleteNote(noteId: number) {
  const response = await axios.delete<Note>(`notes/${noteId}`);
  return response.data;
}

export async function getNoteById(noteId: number) {
  const response = await axios<Note>(`notes/${noteId}`);
  return response.data;
}
