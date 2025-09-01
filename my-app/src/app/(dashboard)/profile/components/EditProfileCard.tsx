"use client";
import { useEffect, useState } from "react";

export default function EditProfileCard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  async function updateProfile(data: { fullName: string; email: string; password: string }) {
    const token = getToken();
    const res = await fetch("http://localhost:3000/profile/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
  }

  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setProfile(data);
        setFullName(data.fullName);
        setEmail(data.email);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    try {
      await updateProfile({ fullName, email, password });
      const updated = await fetchProfile();
      setProfile(updated);
      setPassword("");
      alert("Profile updated!");
    } catch {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!profile) return <div className="p-4 text-red-500">Failed to load profile.</div>;

  return (
    <div className="bg-base-100 rounded-3xl shadow-md p-6 flex flex-col gap-4">
      <div className="font-bold text-lg mb-2">Edit Profile</div>
      <input
        className="input input-bordered"
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        className="input input-bordered"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input input-bordered"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="btn btn-primary mt-2"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
}