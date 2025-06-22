import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      
        <ul className="flex space-x-4">
            <li className="">
                <Link href="/" className="hover:underline">
                Anasayfa
                </Link>
            </li>
            <li>
                <Link href="api/auth/signin" className="hover:underline">
               Giriş Yap
                </Link>
            </li>
            <li>
                <Link href="api/auth/signout" className="hover:underline">
                Çıkış Yap
                </Link>
            </li>       
</ul>
      
    </nav>
  );
}