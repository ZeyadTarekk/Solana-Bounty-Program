import Button from 'components/common/button';
import SearchBar from 'components/common/search-bar';
// import Image from 'components/common/image';
import Image from 'next/image';

const Header = () => (
    <header className="flex flex-row justify-between fixed top-0 z-50 w-full h-20 items-center bg-black/25 px-6 backdrop-blur-xl backdrop-filter">
        <Image
            src="/logo.svg"
            alt="logo"
            width={175}
            height={27}
            // priority
        />

        <div className="flex-row gap-5 h-fit hidden sm:flex">
            <SearchBar />

            <div className="w-px bg-white" />

            <div className="flex flex-row gap-3">
                <Button text="Log in" variant="transparent" />
                <Button text="Sign up" variant="orange" />
            </div>
        </div>

        <div className="inline sm:hidden">
            <Button text="☰" variant="transparent" />
        </div>
    </header>
);

export default Header;
