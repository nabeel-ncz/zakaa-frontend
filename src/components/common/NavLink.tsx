import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }: any) {

    const path = usePathname();
    let isActive;

    if (path.split("/").length >= 3) {
        isActive = "/" + path.split("/")[1] + "/" + path.split("/")[2] === href;
    } else {
        isActive = "/" + path.split("/")[1] === href;
    }

    return (
        <Link href={href} className={isActive ? "shadow-md" : ""}>
            {children}
        </Link>
    );
};
