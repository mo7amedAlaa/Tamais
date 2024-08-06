'use client';
import { Section2 } from '@/app/_api/interfaces/UserProfileResponse';
import { getSections } from '@/app/_api/queries/sections.query';
import SectionCard from '@/app/_components/ui/SectionCard';
import ProtectedRoute from '@/app/_helpers/middleware/ProtectedRoute';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
	const [sections, setSections] = useState<Section2[]>([]);
	useEffect(() => {
		async function fetchSections() {
			const sectionsData = await getSections();
			setSections(sectionsData.data.categories);
		}
		fetchSections();
	}, []);
	return (
		<ProtectedRoute>
			<main className="w-full flex gap-[25px] pt-36 pb-24">
				<div className="flex flex-col justify-center items-center w-full">
					<h1 className="text-[#00262F] font-bold text-2xl">
						الدليل الرقمي
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full px-4 lg:px-90 gap-6 mt-12">
						{sections.map((sec, index) => (
							<Link
								href={`sections/${sec.id}/lawyers`}
								key={index}
							>
								<SectionCard
									title={sec.title}
									topColor={
										index % 2 == 0
											? 'bg-[#DDB762]'
											: 'bg-[#00262F]'
									}
									numberOfPeople={sec.lawyers_count.toString()}
								/>
							</Link>
						))}
					</div>
				</div>
			</main>
		</ProtectedRoute>
	);
}
