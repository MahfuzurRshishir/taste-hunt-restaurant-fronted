"use client";
import DisplayProfileInfoCard from "./components/DisplayProfileInfoCard";
import EditProfileCard from "./components/EditProfileCard";
import FileHandlingCard from "./components/FileHandlingCard";

const ProfilePage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT & MIDDLE */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <DisplayProfileInfoCard />
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EditProfileCard />
        <FileHandlingCard />
      </div>
    </div>
  );
};

export default ProfilePage;