import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-3 mt-16 w-full">
      <div className="container mx-auto text-center">
        <h2 className="text-1xl font-bold">Skill Climb</h2>
        <ul className="flex justify-center space-x-4">
          {/* <li>
            <a href="#" className="hover:text-gray-300">プライバシーポリシー</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">利用規約</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">お問い合わせ</a>
          </li> */}
        </ul>
        <p className="mt-2">&copy; {new Date().getFullYear()} Skill Climb</p>
      </div>
    </footer>
  );
};

export default Footer;
