'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useUserProfile from '../hooks/useUserProfile';
import { useEffect } from 'react';

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
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>An error has occurred navigating to login screen...</div>;
	}
	return children;
}

export default ProtectedRoute;
