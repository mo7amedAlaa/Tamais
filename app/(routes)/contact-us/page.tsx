'use client';
import { contactUs } from '@/app/_api/queries/auth.query';
import SelectGroup from '@/app/_components/pages/auth/common/SelectGroup';
import MainButton from '@/app/_components/ui/MainButton';
import TextInput from '@/app/_components/ui/TextInput';
import ProtectedRoute from '@/app/_helpers/middleware/ProtectedRoute';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

export default function Page() {
	const [isSuccess, setIsSuccess] = useState(false);
	const validation = Yup.object({
		subject: Yup.string().required('الحقل مطلوب'),
		details: Yup.string().required('الحقل مطلوب'),
		name: Yup.string().required('الحقل مطلوب'),
		email: Yup.string().email().required('الحقل مطلوب'),
	});
	const { mutate, isPending, isError } = useMutation({
		mutationFn: contactUs,
		onSuccess: () => {
			setIsSuccess(true);
		},
	});
	const formik = useFormik({
		initialValues: {
			subject: '',
			details: '',
			type: '2',
			email: '',
			name: '',
		},
		validationSchema: validation,
		onSubmit: (values, formikHelpers) => {
			const formData = new FormData();
			formData.append('type', values.type);
			formData.append('subject', values.subject);
			formData.append(
				'details',
				`${values.details} ${values.name} ${values.email}`
			);
			mutate(formData);
			formikHelpers.resetForm();
		},
	});

	return (
		<div className="w-full mt-12 relative flex flex-row items-start justify-start leading-[normal] tracking-[normal] text-right text-base font-cairo px-28">
			<div className="w-1/2 flex flex-col px-8 py-20 gap-8">
				{isSuccess && (
					<div className="w-full flex items-center justify-center p-2 rounded bg-green-300 text-white">
						تم ارسال طلبكم بنجاح
					</div>
				)}
				<h1 className="text-2xl font-bold">تواصل معنا</h1>
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-4"
				>
					<TextInput
						label="الاسم"
						name="name"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.name}
						error={
							formik.touched.name && formik.errors.name
								? formik.errors.name
								: ''
						}
					/>
					<TextInput
						label="الأيميل"
						name="email"
						type="email"
						onChange={formik.handleChange}
						value={formik.values.email}
						error={
							formik.touched.email && formik.errors.email
								? formik.errors.email
								: ''
						}
					/>
					<TextInput
						label="الموضوع"
						name="subject"
						type="text"
						onChange={formik.handleChange}
						value={formik.values.subject}
						error={
							formik.touched.subject && formik.errors.subject
								? formik.errors.subject
								: ''
						}
					/>
					<TextInput
						label="الرسالة"
						name="details"
						type="textarea"
						onChange={formik.handleChange}
						value={formik.values.details}
						error={
							formik.touched.details && formik.errors.details
								? formik.errors.details
								: ''
						}
					/>
					<MainButton>ارسال</MainButton>
				</form>
			</div>
		</div>
	);
}
