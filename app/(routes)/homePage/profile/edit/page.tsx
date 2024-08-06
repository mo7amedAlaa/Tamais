import EditProfileForm from "@/app/_components/pages/profile/edit/EditProfileForm";
import ProtectedRoute from "@/app/_helpers/middleware/ProtectedRoute";

function page() {
  return (
    <ProtectedRoute>
      <main className="w-full flex-col flex gap-[25px]">
        <div className="mt-[60px] py-[80px] px-[10px] md:px-[50px] w-full flex flex-col gap-[25px]">
          <EditProfileForm />
        </div>
      </main>
    </ProtectedRoute>
  );
}

export default page;
