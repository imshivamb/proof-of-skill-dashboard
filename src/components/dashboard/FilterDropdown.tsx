import { Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterDropdownProps {
  allSkills: string[];
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export const FilterDropdown = ({
  allSkills,
  selectedSkills,
  onSkillsChange,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 bg-[#f6f6ef] w-36 justify-between rounded flex items-center gap-2 text-sm"
      >
        Filter {selectedSkills.length > 0 && `(${selectedSkills.length})`}
        <Filter className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white shadow-lg rounded-md border border-gray-200 z-50">
          <div className="p-2 bg-white">
            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 text-sm px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    {skill}
                    <button
                      onClick={() => toggleSkill(skill)}
                      className="hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="max-h-80 bg-white overflow-y-auto">
              {allSkills.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                    className="rounded"
                  />
                  <span className="text-sm">{skill}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
