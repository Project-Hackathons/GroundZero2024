import Link from "next/link";
import Image from "next/image";
const Header = () => {
  return (
    <div className="w-full pt-10 px-6 self-start flex justify-start items-center">
      <Image src="/logo.png" alt="logo" width={40} height={40} />
      <h1 className="text-white text-2xl font-bold ml-2">RocketCoach</h1>
      <Link href="/review" className="ml-auto">
        <button className="bg-purple-900 w-[100px] text-white py-2 px-3 rounded-2xl font-semibold">
          Week&#39;s Review
        </button>
      </Link>
    </div>
  );
};

export default Header;
