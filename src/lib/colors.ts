type SkillScore = 0 | 1 | 2 | 3 | 4;

type ColorMap = {
    [K in SkillScore]: string;
  };

  export const getSkillColor = (score: number): string => {
    const colors: ColorMap = {
      0: '#ecfff1',
      1: '#f8f8a7',
      2: '#a6d96a',
      3: '#1a9641',
      4: '#003f0b'
    };

const isValidScore = (s: number): s is SkillScore => 
        Number.isInteger(s) && s >= 0 && s <= 4;
    
      return isValidScore(score) ? colors[score] : '#f5f5f5';
    };