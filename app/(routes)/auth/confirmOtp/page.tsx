import InfoSide from '@/app/_components/pages/auth/common/InfoSide';
import ConfirmOtpPage from '@/app/_components/pages/auth/confirmOtp/ConfirmOtpPage';
import { UserTypes } from '@/app/types/enums';
import { Suspense } from 'react';

function page() {
	return (
		<div className="absolute h-full w-full flex">
			<Suspense>
				<ConfirmOtpPage />
			</Suspense>
		</div>
	);
}

export default page;
