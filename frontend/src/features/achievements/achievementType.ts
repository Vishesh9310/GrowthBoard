export interface Achievement {
  preview: any;
  previewUrl: string;
  _id: string;
  file: string;
  skillId: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export interface AchievementInput {
  file: File | null;
  skillId: string;
  date: string;
  previewUrl: string;
};

export interface AchievementState {
  achievements: Achievement[];
  selectedAchivement: Achievement | null;
  loading: boolean;
  error: string | null;
  message: string | null;
};