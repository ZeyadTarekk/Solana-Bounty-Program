import Link from 'next/link';
/* eslint-disable @typescript-eslint/ban-types */
import Text from 'components/common/text';
import { cn } from 'utils';
import { useRouter } from 'next/router';
import Chip from 'components/common/chip';

/**
 * Properties for an interactable navigation element.
 */
type NavElementProps = {
    label: string;
    href: string;
    as?: string;
    scroll?: boolean;
    chipLabel?: string;
};

const NavElement = ({ label, href, as, scroll, chipLabel }: NavElementProps) => {
    const router = useRouter();
    const isActive = href === router.asPath || (as && as === router.asPath);

    return (
        <Link href={href} as={as} scroll={scroll} passHref>
            <a
                className={cn(
                    'group flex h-full flex-col items-center justify-between',
                )}
            >
                <div className="flex flex-row items-center gap-3">
                    <Text variant="nav-heading"> {label} </Text>
                    {chipLabel && (
                        <Chip highlightValue={chipLabel} />
                    )}
                </div>

                <div
                    className={cn(
                        'h-1 w-1/4 transition-all duration-300 ease-out',
                        isActive
                            ? '!w-full bg-primary'
                            : 'group-hover:w-1/2 group-hover:bg-primary-focus',
                    )}
                />
            </a>
        </Link>
    );
};

export default NavElement;
