export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
  }
  
  export interface SkillPos {
    id: string;
    consensus_score: number;
  }
  
  export interface Skill {
    id: string;
    name: string;
    pos: SkillPos[];
  }
  
  export interface SkillSet {
    id: string;
    name: string;
    skills: Skill[];
  }
  
  export interface UserDetails {
    data: {
      data: {
        skillset: SkillSet[];
      };
    };
  }