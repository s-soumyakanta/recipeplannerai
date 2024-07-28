import { doLogout } from "@/app/actions";
import { FiLogOut } from "react-icons/fi";

const Logout = () => {
  return (
    <>
      <form action={doLogout}>
        <button
          type="submit"
          className="flex z-30 items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <FiLogOut className="mr-3" size={16} />
          Sign out
        </button>
      </form>
    </>
  );
};

export default Logout;
