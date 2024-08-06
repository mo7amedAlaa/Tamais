import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

function HeaderRightSection() {
  return (
    <div className="flex flex-col gap-[30px] pt-[25px] pb-[50px] md:items-start items-center justify-start mx-auto">
      <h1 className="font-bold text-[28px] md:text-[42px] text-gold">
        منصة يمتاز الإلكترونية
      </h1>
      <p className="font-medium text-[14px] md:text-[20px] md:text-right text-center">
        اكتشف عالماً جديداً من السهولة والأمان مع يمتاز!
        <br /> المنصة الرقمية الرائدة في تقديم الحلول الإلكترونية والوسائل
        البرمجية
        <br /> للجمع بين أصحاب المهن القانونية في المملكة العربية السعودية
        ومختلف <br />
        أنحاء العالم وطالبي الخدمات والاستشارات القانونية منهم وبأكثر من لغة.
      </p>
      <div className="flex md:hidden">
        <Image src={"/headerImage.png"} width={650} height={650} alt="header" />
      </div>

      <div className="mt-[8px] lg:flex-row flex-col flex items-center gap-[25px]">
        <Link
          href={"/auth/signin"}
          className=" bg-gold rounded-lg flex items-center gap-[10px] py-[10px] w-[300px] md:w-[200px] mx-auto justify-center"
        >
          <h1 className="text-[22px] md:text-[16px] font-medium">
            تسجيل الدخول
          </h1>
          <MdOutlineArrowOutward size={20} />
        </Link>
        <Link
          href={"#"}
          className=" border border-gold rounded-lg flex items-center gap-[10px] py-[10px] w-[300px] md:w-[200px] mx-auto justify-center"
        >
          <h1 className="text-[22px] md:text-[16px] font-medium">
            القائمة البريدية
          </h1>

          <MdOutlineArrowOutward size={20} />
        </Link>
      </div>
    </div>
  );
}

export default HeaderRightSection;
