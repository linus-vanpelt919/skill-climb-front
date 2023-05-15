import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-500">
          <Link href="/">Skill Climb</Link>
        </h1>
        <nav className="space-x-4 text-blue-500 text-lg">
          <Link href="/auth/signUp" className="hover:text-blue-700">
            会員登録
          </Link>
          <Link href="/auth/login" className="hover:text-blue-700">
            ログイン
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
