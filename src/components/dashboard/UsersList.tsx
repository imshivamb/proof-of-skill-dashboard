import { User } from "@/types";

interface UserListProps {
  users: User[];
  selectedUsers: string[];
  onUserSelect: (userId: string) => void;
  loading: boolean;
}

export const UserList = ({
  users,
  selectedUsers,
  onUserSelect,
  loading,
}: UserListProps) => {
  const recommendedUsers = users.slice(0, 5);
  const otherUsers = users.slice(5, 9);

  if (loading) {
    return <div className="w-64 border-r pr-4">Loading...</div>;
  }

  const UserCard = ({ user }: { user: User }) => (
    <div
      className={`flex items-center gap-2 py-3 px-2 mx-4 border-b border-gray-300 transition-all duration-200
        ${selectedUsers.includes(user.id) ? "opacity-20 bg-white" : ""}`}
    >
      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
        {user.name[0].toUpperCase()}
      </div>
      <span className="text-base truncate flex-1 font-semibold">
        {user.name}
      </span>
      {!selectedUsers.includes(user.id) && (
        <button
          onClick={() => onUserSelect(user.id)}
          className="rounded-full w-6 h-6 flex items-center justify-center border-2 border-violet-400 text-violet-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          +
        </button>
      )}
    </div>
  );

  return (
    <div className="w-72 border-2 border-black bg-[#f6f6ef]">
      <div className=" bg-[#f6f6ef] border-b border-black">
        <h2 className="font-medium border-b border-black bg-white py-3 w-full text-2xl text-center">
          Most recommended
        </h2>
        {recommendedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
        <p className="text-xs text-gray-500 px-4 text-center py-5">
          Recommendations are based on your skill requirements and candidates
          performance.
        </p>
      </div>
      <div className="bg-white h-20 w-full"></div>
      <div className="bg-white border-t border-black">
        {otherUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
