// UserCard.js
import { auth } from "@/auth";

async function getUserSession() {
  return await auth();
}

export default async function UserCard() {
  const session = await getUserSession();

  return (
    <>
      {session && (
        <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {session.user?.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {session.user?.email}
          </p>
        </div>
      )}
    </>
  );
}