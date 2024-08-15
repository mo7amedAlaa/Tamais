'use client';
import { shortLawyer } from '@/app/_api/interfaces/Profile';
import { getNewAdvisories } from '@/app/_api/queries/home.query';
import { Card } from '@/app/_components/pages/home/Card';
import HeaderParagraph from '@/app/_components/pages/home/HeaderParagraph';
import ScrollingLogos from '@/app/_components/pages/home/ScrollingLogos';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Home() {
	const { data, isLoading, isError } = useQuery<shortLawyer[]>({
		queryKey: ['newAdvisories'],
		queryFn: getNewAdvisories,
	});
	return (
		<div className="w-full mt-12 relative flex flex-row items-start justify-start leading-[normal] tracking-[normal] text-right text-base font-cairo">
			<div className="flex flex-col flex-1 relative bg-white overflow-x-auto max-w-full h-auto">
				<div className="flex flex-col xl:flex-row-reverse justify-start items-center lg:justify-center gap-[41px] text-center lg:text-right lg:py-20">
					<div className="self-stretch flex justify-center items-center relative">
						<div className="[background:radial-gradient(50%_50%_at_50%_50%,_#ffffffcc,_#ddb762cc)] blur-[200px] x-0 absolute w-full h-full flex text-transparent">
							a
						</div>
						<img
							className="mt-[120px] lg:mt-0 lg:mb-[-120px] w-auto h-1/4 lg:h-5/6 z-1"
							src="/home/TriplePhone.svg"
							alt=""
						/>
					</div>
					<div className="flex flex-col gap-4">
						<div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
							<p className="m-0 self-stretch relative leading-[29px] text-base lg:text-xl lg:leading-9 font-condensed">
								<b>
									اكتشف عالماً جديداً من السهولة والأمان مع
									يمتاز!
									<br />
								</b>
								<span className="font-extrabold text-gold">
									يمتاز
								</span>
								<b className="whitespace-pre-wrap">
									{' '}
									تقدم لك جميع الخدمات والاستشارات القانونية
									<br />
									بكل احترافية ومهنية على يدي كوكبة من
									المستشارين المتخصصين
								</b>
							</p>
							<Link
								href="https://play.google.com/store/apps/details?id=com.ymtaz.ymtaz"
								className="self-stretch flex flex-row items-center justify-center lg:justify-start py-0 px-10 lg:px-0"
							>
								<img
									className="max-w-full overflow-hidden max-h-full z-[1] shadow-md p-3 rounded-md lg:w-28"
									loading="lazy"
									alt=""
									src="/home/public/group-1000001776.svg"
								/>
							</Link>
						</div>
						<div className="self-stretch flex flex-row items-center justify-center text-right text-xs">
							<div className="w-full flex flex-row items-start justify-center lg:justify-start gap-2">
								<Link
									href="/auth/signin"
									className="leading-[13px] font-semibold text-gold border-gold border-2 border-solid px-4 lg:px-10 lg:text-base py-3 rounded-md inline-block z-[1]"
								>
									تسجيل دخول
								</Link>
								<Link
									href="/auth/signup"
									className="leading-[13px] font-semibold inline-block z-[1] border-2 border-transparent text-white lg:px-10 lg:text-base bg-gold px-4 py-3 rounded-md"
								>
									إنشاء حساب
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col [background:radial-gradient(50%_50%_at_50%_50%,_#033d4a,_#00262f)] my-10 text-white justify-center items-center px-6 py-16 gap-4">
					<p className="font-medium text-[20px] lg:text-[28px]">
						اشترك في النشرة الإخبارية ليصلك كل جديد
					</p>

					<div className="flex flex-row bg-white px-2 lg:w-1/4 justify-between py-2 rounded-lg gap-2">
						<input
							type="email"
							className="text-black w-full placeholder:text-[#D2D2D2] focus:outline-0 px-2"
							placeholder="البريد الالكتروني"
						/>
						<button className="bg-gold text-white px-6 py-1 rounded-lg">
							إرسال
						</button>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 px-6 gap-6">
					<Card
						title="نافذة الاستشارات"
						description="يمكنك طلب استشارتك المكتوبة أو المرئية بمختلف التخصصات القانونية سواء كنت فرداً أو شركة أو كيانا تجارياً أو قانونياً وفق منظومة إلكترونية احترافية وتفاعل سريع ومثمر وحوكمة تقنية وقانونية عالية ومميزة ."
						image="/home/public/subtract-3.svg"
					/>
					<Card
						title="بوابة الخدمات"
						description="يمكنك طلب أي خدمة قانونية بشكل فوري أو عاجل أو مجدول من قبل مقدمي الخدمة بيمتاز وستتم خدمتك بشكل احترافي ومهني ضمن منظومة مميزة من الخدمات القانونية عالية الطلب."
						image="/home/public/frame.svg"
						background="bg-[#00262F99]"
					/>
					<Card
						title="مفكرة المواعيد"
						description="خدمة مميزة تقدمها يمتاز تلبية لطلبات العملاء المميزين تتضمن حجز موعد حضوري أو عن بعد لمناقشة اهتمامات العميل وتقديم الاستشارة اللازمة له في الوقت والمكان المناسبين وفق منظومة مواعيد وحجوزات تلبي الاحتياج المتزايد على هذا الطلب ."
						image="/home/public/subtract-6.svg"
					/>
					<Card
						title="الدليل الرقمي"
						description="هنا يلتقي نخبة المحامين المرخصين والمستشارين القانونيين والمهنيين المعتمدين بمختلف المهن القانونية ومن مختلف مناطق المملكة العربية السعودية في دليل رقمي متكامل يسهل التواصل معهم وإبراز قدراتهم وخبراتهم وتخصصاتهم في مختلف المجالات القانونية المميزة."
						image="/home/public/subtract-2.svg"
						link="/sections"
					/>
					<Card
						title="هيئة المستشارين"
						description="نخبة من القانونيين المميزين والمتمكنين في إبداء الرأي والمشورة في القضايا الحساسة والمعقدة والدقيقة يتعاملون مع استشارات العملاء ومقدمي الخدمة بكل دقة واحترافية عالية."
						image="/home/public/subtract-2.svg"
					/>
					<Card
						title="الدليل العدلي"
						description="دليل عدلي واسع، دائم التحديث، يتضمن أرقام ومواقع وعناوين البريد الإلكتروني لكافة الجهات الحكومية والقضائية وشبه القضائية بمختلف درجات التقاضي والمحاكم والدوائر ذات العلاقة المباشرة بالعمل القضائي والقانوني."
						image="/home/public/subtract.svg"
					/>
					<Card
						title="المكتبة والأنظمة"
						description="تتضمن المكتبة والأنظمة كل ما يتعلق بالأنظمة السعودية ولوائحها وقرارتها وترجمة نصوصها في منظومة بحثية ثرية جدا يصاحبها منتج باحث يمتاز القانوني الشامل والمميز والمتخصص بكل ما يتعلق بالأنظمة السعودية والمدونات القضائية."
						image="/home/public/subtract.svg"
					/>
					<Card
						title="منصة التدريب"
						description="منتج خاص تقدمه يمتاز لكافة الراغبين بتطوير أنفسهم في مجالات القانون المتنوعة للمتخصصين أو تطوير الوعي والثقافة القانونية للأفراد عبر منظومة تدريب متميزة وغنية بالمحتوى المحكم الذي يقدمه نخبة من المدربين القانونين بمختلف المجالات."
						image="/home/public/subtract-1.svg"
					/>
				</div>
				<div className="bg-[#00262F08] my-20 py-8 flex flex-col gap-8 items-center justify-center">
					<p className="font-bold text-[#00262F] lg:text-xl">
						المنضمون حديثاً
					</p>
					<div
						style={{ direction: 'ltr' }}
						className="flex w-full overflow-hidden"
					>
						<div className="flex gap-4 lg:gap-4 justify-center w-full px-4 animate-loop-scroll lg:animate-none">
							{!isLoading &&
								data?.map((user) => (
									<Link
										href={`/homePage/lawyers/${user.id}`}
										key={user.id}
										className="max-w-none flex flex-col rounded-lg shadow-md py-4 px-14 my-4 justify-center items-center gap-2"
									>
										<img
											src={user.photo}
											className="rounded-full w-auto h-8 md:h-16"
										/>
										<p className="text-sm font-bold">
											{user.name}
										</p>
										<div className="flex flex-row items-center justify-center w-full gap-1">
											<p className="text-xs font-semibold">
												{user.city_rel.title}
											</p>
											<img
												src="/locationIcon.svg"
												className="rounded-full w-auto h-4"
											/>
										</div>
									</Link>
								))}
						</div>
					</div>
				</div>
				<div className="mb-20 flex flex-col items-center justify-center gap-4">
					<p className="font-bold text-[#00262F] lg:text-xl">
						الباقات والاشتراكات
					</p>
					<Swiper
						breakpoints={{
							340: {
								slidesPerView: 1,
								spaceBetween: 15,
							},
							700: {
								slidesPerView: 3,
								spaceBetween: 15,
							},
						}}
						freeMode={true}
						style={{
							padding: '8px',
						}}
						pagination={{ clickable: true }}
						modules={[FreeMode, Pagination]}
						className="max-w-[90%] lg:max-w-[80%]"
					>
						<SwiperSlide>
							<div className="flex flex-col items-center justify-center gap-6 group relative shadow-lg rounded-xl px-6 py-8 w-[350px] lg:w-[350px]">
								{/*  border-2 border-solid border-gold */}
								{/* <div className="py-2 px-8 text-white flex items-center justify-center bg-gold rounded-md">
									<p>ذهبية</p>
								</div> */}
								<div className="flex flex-col font-bold">
									<p>القنوات الرقمية</p>
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>جلسة استشارة قانونية واحدة شهريًا</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>جلسة استشارية شهرية مخصصة للقضايا</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>
											استشارات قانونية مستمرة عبر البريد
											الإلكتروني.
										</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>تمثيل قانوني في قضايا الأسرة </p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>
											جلسة استشارة قانونية واحدة شهريًا
											(30 دقيقة).
										</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>جلسة استشارية شهرية مخصصة</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="flex flex-col items-center justify-center gap-6 group relative shadow-lg rounded-xl px-6 py-8 w-[350px] lg:w-[350px] ">
								{/* border-2 border-solid border-gray */}
								{/* <div className="py-2 px-8 text-white flex items-center justify-center bg-gray rounded-md">
									<p>الفضية</p>
								</div> */}
								<div className="flex flex-col font-bold">
									<p>مكتب المحامي</p>
									{/* <p>400 ر.س / شهر</p> */}
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>جلسة استشارة قانونية واحدة شهريًا</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>جلسة استشارية شهرية مخصصة للقضايا</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>
											استشارات قانونية مستمرة عبر البريد
											الإلكتروني.
										</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>تمثيل قانوني في قضايا الأسرة </p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>
											جلسة استشارة قانونية واحدة شهريًا
											(30 دقيقة).
										</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>جلسة استشارية شهرية مخصصة</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="flex flex-col items-center justify-center gap-6 group relative shadow-lg rounded-xl px-6 py-8 w-[350px] lg:w-[350px]" id='plans'>
								<div className="flex flex-col font-bold">
									<p>الباقة الشاملة</p>
									{/* <p>400 ر.س / شهر</p> */}
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>جلسة استشارة قانونية واحدة شهريًا</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>جلسة استشارية شهرية مخصصة للقضايا</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>
											استشارات قانونية مستمرة عبر البريد
											الإلكتروني.
										</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>تمثيل قانوني في قضايا الأسرة </p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>
											جلسة استشارة قانونية واحدة شهريًا
											(30 دقيقة).
										</p>
									</div>
									<div className="flex gap-4 text-sm">
										<img src="/home/checkMark.svg" />
										<p>جلسة استشارية شهرية مخصصة</p>
									</div>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
				<ScrollingLogos
					title="الأنظمة المساندة"
					logos={[
						// '/home/absher.svg',
						// '/home/logo.svg',
						// '/home/nafaz.svg',
						// '/home/absher.svg',
						'/home/logo.svg',
						'/home/nafaz.svg',
						'/home/absher.svg',
						'/home/logo.svg',
						// '/home/nafaz.svg',
					]}
				/>

				<div className="my-20 flex flex-col lg:flex-row-reverse items-center  lg:px-32 justify-center gap-4">
					<img
						src="/home/Phone.svg"
						alt="phone"
						className="mt-[-20px]"
					/>
					<div className="flex flex-col self-start px-8 gap-4">
						<p className="font-bold text-xl text-[#00262F]">
							لماذا يمتاز؟
						</p>
						<HeaderParagraph description="يوفر التطبيق تحديثات مستمرة حول القوانين واللوائح الجديدة التي قد تؤثر على وضعك القانوني." />
						<HeaderParagraph description="يمكنك الحصول على المشورة القانونية في أي وقت ومن أي مكان عبر التطبيق." />
						<HeaderParagraph description="يمكنك حجز المواعيد مع المحامين والخبراء القانونيين بسرعة وسهولة دون الحاجة لزيارة المكاتب." />
						<HeaderParagraph description="تتم حماية معلوماتك الشخصية والقانونية بسرية تامة عبر التطبيق." />
						<HeaderParagraph description="يمكنك تنظيم وإدارة مستنداتك القانونية وقضاياك بسهولة عبر التطبيق." />
						<HeaderParagraph description="يمكنك تسديد رسوم الاستشارات والخدمات القانونية عبر التطبيق بطرق دفع آمنة وسهلة." />
					</div>
				</div>
				<ScrollingLogos
					title="الشركاء والرعاة"
					logos={[
						'/home/Rise.svg',
						'/home/Pinpoint.svg',
						'/home/Rise.svg',
						'/home/Pinpoint.svg',
						'/home/Rise.svg',
						'/home/Pinpoint.svg',
						'/home/Rise.svg',
					]}

				/>
			</div>
		</div>
	);
}
