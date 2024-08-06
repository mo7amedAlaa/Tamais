import Image from "next/image";
import Menu from "./Menu";
import NavbarMenu from "./NavbarMenu";
function Navbar() {
  return (
    <div className="flex items-center justify-between px-[65px] py-[27px] fixed bg-white w-full shadow-lg z-10">
      <Image
        width={120}
        height={120}
        alt="logo"
        src={"https://ymtaz.sa/build/assets/logo-fab861ce.svg"}
      />
      <NavbarMenu />
      <Menu />
    </div>
  );
}

export default Navbar;
