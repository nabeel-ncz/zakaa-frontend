import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLink({ href, children }: any) {

    const path = usePathname();
    let isActive = "/" + path.split("/")[1] === href;

    return (
        <Link href={href}>
            <li className={`${isActive ? "secondary-bg" : "secondary-light-bg"} rounded py-3.5 px-4`}>
                {children}
            </li>
        </Link>
    );
};
