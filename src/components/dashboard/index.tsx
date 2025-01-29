"use client";

import { useState, useEffect } from "react";
import { User, UserDetails } from "@/types";
import { UserList } from "./UsersList";
import { EmptyState } from "./EmptyState";
import { SkillMatrix } from "./SkillMatrix";

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [userSkills, setUserSkills] = useState<Record<string, UserDetails>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://forinterview.onrender.com/people");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = async (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
      return;
    }

    try {
      const response = await fetch(
        `https://forinterview.onrender.com/people/${userId}`
      );
      const data = await response.json();
      setUserSkills((prev) => ({
        ...prev,
        [userId]: data,
      }));
      setSelectedUsers((prev) => [...prev, userId]);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-0 pr-6">
      {/* Header */}
      <div className="max-w-[1300px] mb-5 mt-8 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600"
          >
            <span className="mr-2">←</span> Back to My Jobs
          </button>
        </div>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-4xl text-gray-600 font-semibold">
            Posk_UXdesigner_sr001
          </h1>
          <div className="text-gray-500 font-semibold">23 Candidates</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-0 pr-6">
        <div className="flex justify-start pr-20">
          <UserList
            users={users}
            selectedUsers={selectedUsers}
            onUserSelect={handleUserSelect}
            loading={loading}
          />
          {selectedUsers.length === 0 ? (
            <EmptyState />
          ) : (
            <SkillMatrix
              selectedUsers={selectedUsers}
              userSkills={userSkills}
              users={users}
            />
          )}
        </div>
      </div>
    </div>
  );
}
