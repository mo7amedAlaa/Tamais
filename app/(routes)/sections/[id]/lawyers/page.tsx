'use client';
import { UserProfileResponse } from '@/app/_api/interfaces/UserProfileResponse';
import { getLawyersBySection } from '@/app/_api/queries/sections.query';

import LawyerCard from '@/app/_components/ui/LawyerCard';
import { PROFILE_TYPE } from '@/app/_helpers/config/constants';
import ProtectedRoute from '@/app/_helpers/middleware/ProtectedRoute';
import { UserTypes } from '@/app/types/enums';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home({ params }: { params: { id: string } }) {
	const sectionId = params.id;
	const [lawyers, setLawyers] = useState<UserProfileResponse[]>([]);
	const [title, setTitle] = useState('');
	useEffect(() => {
		async function fetchSections() {
			const sectionsData = await getLawyersBySection({ id: sectionId });
			setLawyers(sectionsData.data.lawyers);
			setTitle(sectionsData.message);
		}
		fetchSections();
	}, [sectionId]);
	return (
		<main className="w-full flex gap-[25px] pt-36 pb-24">
			<div className="flex flex-col justify-center items-center w-full">
				<h1 className="text-[#00262F] font-bold text-2xl">{title}</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-4 lg:px-90  gap-6 mt-12">
					{lawyers.map((lawyer) => (
						<Link
							href={`/homePage/lawyers/${lawyer.id}`}
							key={lawyer.id}
						>
							<LawyerCard lawyer={lawyer} />
						</Link>
					))}
				</div>
			</div>
		</main>
	);
}
