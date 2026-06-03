import type { Note } from '../notes/noteType';
import type { Project } from '../projects/projectType';
import type { Skill } from '../skills/skillType';
import type { Task } from '../tasks/taskType';

export interface Profile {
  _id?: string;
  fullname: string;
  email: string;
  contact?: number | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipcode?: number | null;
  skill: (Skill | string)[];
  project: (Project | string)[];
  tasks: (Task | string)[];
  note: (Note | string)[];
  picture?: string;
}

export interface ProfileInput {
  fullname: string;
  contact?: number;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: number;
  picture?: string;
}

export interface ProfileState {
  profile: Profile;
  loading: boolean;
  error: string | null;
  message: string | null;
}