import { UserProfileResponse } from '@/app/_api/interfaces/UserProfileResponse';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import MainButton from '../../ui/MainButton';

export default function LawyerProducts({
	digitalGuideSub,
	tabs,
}: {
	digitalGuideSub: number;
	tabs: { id: number; label: string; content: any[] }[];
}) {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
	const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

	const tabsRef = useRef([]);

	useEffect(() => {
		function setTabPosition() {
			const currentTab: HTMLButtonElement =
				tabsRef.current[activeTabIndex];
			setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
			setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
		}

		setTabPosition();
		window.addEventListener('resize', setTabPosition);

		return () => window.removeEventListener('resize', setTabPosition);
	}, [activeTabIndex]);
	return (
		<div className="flex w-full flex-col shadow-lg rounded-lg items-center gap-1">
			<div className="flex items-center justify-center relative w-full shadow-md">
				<div className="flex justify-between w-full border-b border-[#B0B0B0] px-4">
					{tabs.map((tab) => {
						return (
							<button
								key={tab.id}
								//@ts-ignore
								ref={(el) => (tabsRef.current[tab.id] = el)}
								className={`py-4 text-xl ${
									digitalGuideSub && tab.id == activeTabIndex
										? 'font-bold'
										: 'text-[#B0B0B0]'
								}`}
								onClick={() => setActiveTabIndex(tab.id)}
							>
								{tab.label}
							</button>
						);
					})}
				</div>
				{digitalGuideSub ? (
					<span
						className="absolute bottom-0 block h-1 bg-[#00262F] transition-all duration-300"
						style={{
							left: tabUnderlineLeft,
							width: tabUnderlineWidth,
						}}
					/>
				) : (
					''
				)}
			</div>
			<div className="py-4 flex flex-col px-4 gap-4 w-full relative max-h-[60vh] overflow-y-scroll no-scrollbar">
				{digitalGuideSub ? (
					activeTabIndex != 1 ? (
						tabs[activeTabIndex].content.map((content) => (
							<div
								key={content.id}
								className="flex w-full shadow-sm rounded-md flex-col gap-4 p-4"
							>
								<div className="flex w-full justify-between">
									<p className="text-[#2C4768]">
										{content.title}
									</p>
									<p className="text-[#DDB762] font-bold text-lg">
										{content.min_price} -{' '}
										{content.max_price} ر.س
									</p>
								</div>
								<p className="text-[#B0B0B0]">
									{content.description || content.intro}
								</p>
								<MainButton
									type="button"
									className="text-base py-3"
									disabled={true}
								>
									طلب موعد
								</MainButton>
							</div>
						))
					) : (
						tabs[activeTabIndex].content.map((content) => {
							const contentTitle = content.instructions;
							return content.types.map((t: any) => (
								<div
									key={t.id}
									className="flex w-full shadow-sm rounded-md flex-col gap-4 p-4"
								>
									<div className="flex w-full justify-between">
										<p className="text-[#2C4768]">
											{t.title}
										</p>
										<p className="text-[#DDB762] font-bold text-lg">
											{t.min_price} - {t.max_price} ر.س
										</p>
									</div>
									<p className="text-[#B0B0B0]">
										{contentTitle}
									</p>
									<MainButton
										type="button"
										className="text-base py-3"
										disabled={true}
									>
										طلب موعد
									</MainButton>
								</div>
							));
						})
					)
				) : (
					<div className="flex px-4 py-2 gap-1 border border-solid rounded-md bg-[#DDB7621A] border-[#DDB762] items-center justify-center">
						<Image
							src="/exclamation.svg"
							alt=""
							width={150}
							height={150}
							className="w-5 h-5"
						/>
						<p className="text-[#DDB762]">
							القنوات الرقمية غير مفعلة لهذا الحساب
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
