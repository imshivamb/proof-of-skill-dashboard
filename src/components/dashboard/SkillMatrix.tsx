
import { getSkillColor } from "@/lib/colors";
import { User, UserDetails } from "@/types";
import { useState } from "react";
import { FilterDropdown } from "./FilterDropdown";

interface SkillMatrixProps {
  selectedUsers: string[];
  userSkills: Record<string, UserDetails>;
  users: User[];
}

export const SkillMatrix = ({
  selectedUsers,
  userSkills,
  users,
}: SkillMatrixProps) => {
  const [view, setView] = useState<"compare" | "individual" | "shortlisted">(
    "compare"
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const getAllSkills = () => {
    const skills = new Set<string>();
    selectedUsers.forEach((userId) => {
      const userSkillsets = userSkills[userId]?.data?.data?.skillset || [];
      userSkillsets.forEach((skillset) => {
        skillset.skills.forEach((skill) => {
          skills.add(skill.name);
        });
      });
    });
    return Array.from(skills);
  };

  const getSkillScore = (userId: string, skillName: string): number => {
    const userSkillsets = userSkills[userId]?.data?.data?.skillset || [];
    for (const skillset of userSkillsets) {
      for (const skill of skillset.skills) {
        if (skill.name === skillName && skill.pos?.[0]) {
          return skill.pos[0].consensus_score;
        }
      }
    }
    return 0;
  };

  const getUserName = (userId: string): string => {
    const user = users.find((user) => user.id === userId);
    return user?.name || "User";
  };

  const skills = getAllSkills();
  const displaySkills = selectedSkills.length > 0 ? selectedSkills : skills;

  return (
    <div className="flex-1 pl-8 overflow-x-auto">
      <div className="mb-4 flex justify-between items-start">
        {/* View Toggle */}
        <div className="flex border border-black mb-6">
          <button
            onClick={() => setView("compare")}
            className={`px-4 py-2 border border-black ${
              view === "compare" ? "bg-green-600 text-white" : "bg-gray-100"
            }`}
          >
            Compare View
          </button>
          <button
            onClick={() => setView("individual")}
            className={`px-4 py-2 border border-black ${
              view === "individual" ? "bg-green-600 text-white" : "bg-gray-100"
            }`}
          >
            Individual view
          </button>
          <button
            onClick={() => setView("shortlisted")}
            className={`px-4 py-2 border border-black ${
              view === "shortlisted" ? "bg-green-600 text-white" : "bg-gray-100"
            }`}
          >
            Shortlisted candidates
          </button>
        </div>
        <div>
          <div className="flex gap-2 justify-center">
            <button className="p-2 px-3 font-bold border-2 border-black bg-white transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[0_0_0_0_#000000] shadow-[4px_4px_0_0_#000000]">
              ←
            </button>
            <button className="p-2 px-3 font-bold border-2 border-black bg-white transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[0_0_0_0_#000000] shadow-[4px_4px_0_0_#000000]">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <table className="border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="text-left p-2 w-48 sticky left-0 bg-inherit z-40">
                <FilterDropdown
                  allSkills={skills}
                  selectedSkills={selectedSkills}
                  onSkillsChange={setSelectedSkills}
                />
              </th>
              {selectedUsers.map((userId) => (
                <th key={userId} className="p-1 align-bottom">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                    {getUserName(userId).charAt(0)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displaySkills.map((skillName) => (
              <tr key={skillName}>
                <td className="text-sm text-gray-800 h-6 pl-2 sticky left-0 bg-inherit whitespace-nowrap">
                  {skillName}
                </td>
                {selectedUsers.map((userId) => (
                  <td key={`${userId}-${skillName}`} className="p-0">
                    <div
                      className="w-8 h-5"
                      style={{
                        backgroundColor: getSkillColor(
                          getSkillScore(userId, skillName)
                        ),
                      }}
                      title={`${skillName}: ${getSkillScore(
                        userId,
                        skillName
                      )}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
