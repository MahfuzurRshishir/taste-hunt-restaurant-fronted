"use client";
import { useEffect, useState } from "react";

export default function FileHandlingCard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  function getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  async function fetchProfile() {
    const token = getToken();
    const res = await fetch("http://localhost:3000/profile", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  }

  async function uploadCV(file: File) {
    const token = getToken();
    const formData = new FormData();
    formData.append("cv", file);
    const res = await fetch("http://localhost:3000/profile/upload-cv", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload CV");
    return res.json();
  }

  function downloadCV() {
    const token = getToken();
    window.open(`http://localhost:3000/profile/download-cv?token=${token}`, "_blank");
  }

  async function uploadProfilePic(file: File) {
    const token = getToken();
    const formData = new FormData();
    formData.append("profilePicture", file);
    const res = await fetch("http://localhost:3000/profile/upload-picture", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload profile picture");
    return res.json();
  }

  function downloadProfilePic() {
    const token = getToken();
    window.open(`http://localhost:3000/profile/profile-picture?token=${token}`, "_blank");
  }

  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleUploadCV = async (file: File) => {
    try {
      await uploadCV(file);
      alert("CV uploaded!");
    } catch {
      alert("Failed to upload CV.");
    }
  };

  const handleUploadProfilePic = async (file: File) => {
    try {
      await uploadProfilePic(file);
      alert("Profile pic uploaded!");
    } catch {
      alert("Failed to upload profile picture.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!profile) return <div className="p-4 text-red-500">Failed to load profile.</div>;

  return (
    <div className="bg-base-100 rounded-3xl shadow-md p-6 flex flex-col gap-4">
      <div className="font-bold text-lg mb-2">CV & Profile Picture</div>
      {/* CV */}
      <div className="flex items-center gap-2">
        <button className="btn btn-sm btn-outline" onClick={downloadCV}>
          Download CV
        </button>
        <label className="btn btn-sm btn-outline">
          Upload CV
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) handleUploadCV(e.target.files[0]);
            }}
          />
        </label>
      </div>
      {/* Profile Pic */}
      <div className="flex items-center gap-2">
        <button className="btn btn-sm btn-outline" onClick={downloadProfilePic}>
          Download Profile Pic
        </button>
        <label className="btn btn-sm btn-outline">
          Upload Profile Pic
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) handleUploadProfilePic(e.target.files[0]);
            }}
          />
        </label>
      </div>
    </div>
  );
}