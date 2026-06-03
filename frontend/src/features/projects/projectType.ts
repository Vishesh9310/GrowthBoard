export interface Project {
  _id: string;
  title: string;
  desc?: string;
  tags: string[]; // backend stores as array of strings
  githubLink?: string;
  collaboration?: {
    _id: string;
    fullname: string;
    email: string;
  }[]; // populated from backend
  file?: string; // uploaded file path or URL
  user: string; // user id
  createdAt: string;
  updatedAt: string;
};

export interface ProjectInput {
  title: string;
  desc: string;
  tags: string[]; // frontend can use string[] for multiple tags
  githubLink: string;
  collaboration: string[]; // array of user IDs
  file: File | null; // file selected from input
};

export interface ProjectState{
    projects: Project[];
    selectedProject: Project | null;
    loading: boolean;
    error: string | null;
    message: string | null;
}
