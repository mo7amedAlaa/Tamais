import { getLawyerDegree } from '@/app/_api/queries/LawyerData.query';
import { useQuery } from '@tanstack/react-query';

interface Degree {
	id: number;
	title: string;
	need_certificate: number;
	isSpecial: boolean;
}

interface LawyerDegreeResponse {
	status: boolean;
	code: number;
	message: string;
	data: {
		Degrees: Degree[];
	};
}

export function useLawyerDegree(): {
	isLoading: boolean;
	error: any;
	lawyerDegree: LawyerDegreeResponse | undefined;
} {
	const {
		isLoading,
		data: lawyerDegree,
		error,
	} = useQuery({
		queryKey: ['Lawyer Data Degree'],
		queryFn: () => getLawyerDegree(),
	});
	return { isLoading, error, lawyerDegree };
}
