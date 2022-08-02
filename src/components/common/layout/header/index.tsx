import Button from 'components/common/button';
import Chip from 'components/common/chip';
import Image from 'components/common/image';
import Link from 'next/link';
import { MdOutlineSearch } from 'react-icons/md';
import NavElement from './nav-element';
import OverflowMenu from 'components/common/overflow-menu';

const Header = () => (
    <header className="sticky top-0 z-50 flex h-20 w-full flex-row items-center justify-between border-b-1.5 border-b-line bg-black/25 px-6 backdrop-blur-xl backdrop-filter">
        <Link href="/" passHref>
            <div className="flex w-fit flex-row items-center gap-3">
                <Image
                    src="/logo-icon.svg"
                    alt="solana icon"
                    width={29.16}
                    height={26.08}
                />
                <Image
                    src="/logo-text.svg"
                    alt="solana text"
                    className="hidden md:inline"
                    width={134.46}
                    height={20.1}
                />
            </div>
        </Link>
        <div className="flex h-full flex-row items-center gap-5 text-white">
            <div className="flex h-2/3 flex-row gap-5 self-end sm:gap-7">
                <NavElement label="Home" href="/" />
                <NavElement label="Explorer" href="/explorer" />
            </div>

            <div className="h-1/2 w-px bg-line" />

            <div className="flex h-full flex-row items-center gap-3 md:gap-5">
                <Button variant="transparent" className="hidden md:flex">
                    <MdOutlineSearch className="aspect-square h-4" />
                    <Chip value="CTRL + K" />
                </Button>

                <Button variant="transparent" className="flex md:hidden">
                    <MdOutlineSearch className="aspect-square h-4" />
                </Button>

                <div className="hidden h-1/2 w-px bg-line md:inline" />

                <OverflowMenu />
            </div>
        </div>
    </header>
);

export default Header;
