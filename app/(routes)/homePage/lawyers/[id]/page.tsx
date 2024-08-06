'use client';
import { UserProfileResponse } from '@/app/_api/interfaces/UserProfileResponse';
import {
	getLawyer,
	getLawyerAdvisoryServices,
	getLawyerServices,
} from '@/app/_api/queries/lawyer.query';
import LawyerDataCard from '@/app/_components/pages/lawyerProfile/LawyerDataCard';
import LawyerProducts from '@/app/_components/pages/lawyerProfile/LawyerProducts';
import ProtectedRoute from '@/app/_helpers/middleware/ProtectedRoute';
import { useEffect, useState } from 'react';

export default function Home({ params }: { params: { id: string } }) {
	const [lawyer, setLawyer] = useState<UserProfileResponse | null>(null);
	const [tabs, setTabs] = useState<
		{
			id: number;
			label: string;
			content: [];
		}[]
	>([
		{
			id: 0,
			label: 'الخدمات',
			content: [],
		},
		{
			id: 1,
			label: 'الاستشارات',
			content: [],
		},
		{
			id: 2,
			label: 'المواعيد',
			content: [],
		},
	]);
	useEffect(() => {
		async function fetchLawyer() {
			const lawyerData = await getLawyer(params.id);
			setLawyer(lawyerData.data.lawyer);
			if (lawyerData.data.lawyer.digital_guide_subscription) {
				const advisoryServices = await getLawyerAdvisoryServices(
					params.id
				);
				const services = await getLawyerServices(params.id);
				setTabs([
					{
						id: 0,
						label: 'الخدمات',
						content: services.data.lawyerServices,
					},
					{
						id: 1,
						label: 'الاستشارات',
						content: advisoryServices.data.lawyerServices,
					},
					{
						id: 2,
						label: 'المواعيد',
						content: [],
					},
				]);
			}
		}
		fetchLawyer();
	}, [params.id]);
	return (
		<ProtectedRoute>
			<main className="w-full flex gap-[25px] pt-36 pb-24 justify-center items-center">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full px-8 lg:px-60">
					{lawyer && <LawyerDataCard lawyer={lawyer} />}
					{lawyer && (
						<LawyerProducts
							tabs={tabs}
							digitalGuideSub={
								lawyer.digital_guide_subscription as number
							}
						/>
					)}
				</div>
			</main>
		</ProtectedRoute>
	);
}
