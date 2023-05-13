"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { slide as Menu } from "react-burger-menu"; // could also use slide or bubble
import { BiBuildings, BiMapAlt, BiPencil, BiUserCircle } from "react-icons/bi";
import Button from "./Button";

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    right: "32px",
    top: "29px",
  },
  bmBurgerBars: {
    background: "#EF9045",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "32px",
    width: "32px",
    marginRight: "29px",
    marginTop: "22px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#FDF4EC",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  bmItem: {
    display: "flex",
    gap: "8px",
    color: "#484848",
    fontWeight: "600",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

export default () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className={`${pathname !== "/" ? "xl:hidden" : "lg:hidden"}`}>
      <Menu styles={styles} right>
        <Link href="/locations">
          <BiMapAlt className="w-6 h-6 text-gray-3" />
          Hartă
        </Link>

        <Link href="/universities">
          <BiBuildings className="w-6 h-6 text-gray-3" />
          Universități
        </Link>

        <Link href="/my-reviews">
          <BiPencil className="w-6 h-6 text-gray-3" />
          Recenziile mele
        </Link>

        {session ? (
          <Link href={"/account"} className="flex items-center">
            <BiUserCircle className="w-6 h-6 text-gray-3" />
            Contul meu
            {/* {session.user?.name} */}
          </Link>
        ) : (
          <Button className="px-10 mt-6">
            <Link href={"/login"}>Autentificare</Link>
          </Button>
        )}
      </Menu>
    </div>
  );
};
