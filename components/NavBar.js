import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <div>
      <Link href="/">
        <a
          style={{
            color: router.pathname === "/" ? "red" : "blue",
            paddingRight: 10,
          }}>
          Home
        </a>
      </Link>
      <Link href="/about">
        <a style={{ color: router.pathname === "/about" ? "red" : "blue" }}>
          About
        </a>
      </Link>
    </div>
  );
}
