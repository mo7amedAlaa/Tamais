'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useUserProfile from '../hooks/useUserProfile';

function ProtectedRoute({ children }: { children: any }) {
	const { data, isLoading, isError } = useUserProfile();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && isError) {
			router.push('/auth/signin');
		}
		if (!isLoading && data) {
			if (data.active == 0) {
				console.log('hiya');
				router.push('/auth/activationOtp');
			} else if (
				data.confirmationType == 'email' ||
				data.confirmationType == 'phone'
			) {
				router.push('/auth/confirmationOtp');
			}
		}
	}, [isLoading, isError, router, data]);

	if (isLoading) {
		return <div className="absolute inset-0 flex justify-center items-center bg-[#f7dfac] backdrop-blur-sm ">
			<div className="w-20 h-20 border-4 border-white border-t-[#DDB762] rounded-full animate-spin"></div>
		</div>;
	}
	if (isError) {
		return <div>An error has occurred navigating to login screen...</div>;
	}
	return children;
}

export default ProtectedRoute;
