import { atom } from 'nanostores';

export const activeTab = atom<'experience' | 'projects' | 'example-projects'>(
  'experience'
);
