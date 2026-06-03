// Full Skill type (backend se aata hai)
export interface Skill {
  _id: string;
  name: string;
  proficiency: number;
  dateOfCompletion: string;
}

// Form ke liye (backend ko bhejne se pehle)
export interface SkillInput {
  name: string;
  proficiency: number;
  dateOfCompletion: string;
};

export interface SkillState{
    skills: Skill[];
    selectedSkill: Skill | null;
    loading: boolean;
    error: string | null;
    message: string | null;
}
