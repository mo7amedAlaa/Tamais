"use client";
import useDeleteProfile from "@/app/_helpers/hooks/useDeleteProfile";
import React, { useState } from "react";

const DeleteModel = ({ closeModal, isModalOpen, id }) => {
  const [reason, setReason] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const { deletingProfile, isDeleting } = useDeleteProfile();

  const handleDeleteConfirm = () => {
    deletingProfile({ id: "", otherField: { reason, suggestions } });
    closeModal();
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 mt-5 flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">
              {" "}
              هل انت متاكد من طلب مسح الحساب الخاص بك؟
            </h2>

            <form className="mt-4 flex flex-col gap-2 " action="#">
              <label className="text-sm text-gray-700 dark:text-gray-200">
                سبب طلب حذف الحساب
              </label>

              <label className="block">
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="اكتب سبب الحذف هنا"
                  className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md "
                />
              </label>

              <label className="text-sm text-gray-700 dark:text-gray-200">
                مقترحات للتطوير
              </label>

              <label className="block ">
                <input
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  placeholder="اكتب مقترحاتك"
                  className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md "
                />
              </label>
            </form>

            <div className="flex justify-center gap-6 mt-5">
              <button
                className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                onClick={closeModal}
              >
                عدم تنفيذ الطلب
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  // Delete logic here
                  closeModal();
                }}
              >
                مسح الحساب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModel;
