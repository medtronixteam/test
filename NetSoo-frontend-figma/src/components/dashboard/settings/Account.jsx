"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
const Account = () => {
  const { user, updateUser } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    profileImage: "/dashboard/dummy-image.jpg",
    email: "dummy@example.com",
    firstName: "",
    lastName: "",
    language: "en",
    timezone: "America/New_York",
    firstDay: "Monday",
    receiveMonthly: true,
    customEmail: "",
  });

  console.log("USER DATA HERE");
  console.log(user);

  useEffect(() => {
    console.log("USE EFFECT", user);
    if (user) { // Ensure user is not null/undefined and not still loading
      console.log("Setting userdata");
      setFormData({
        profileImage: user.profile_picture || "/dashboard/dummy-image.jpg",
        email: user.email,
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        language: user.language || "en",
        timezone: user.timezone || "America/New_York",
        firstDay: user.first_day_of_week || "Monday",
        receiveMonthly: user.monthy_summary || true,
        customEmail: user.summary_email === user.email ? "" : user.summary_email
      });
    }
  }, [user]); // Re-run this effect when 'user' or 'isLoadingUser' changes
  

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setFormData((prev) => ({
  //       ...prev,
  //       profileImage: imageUrl,
  //     }));
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // ✅ Save the File object
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl, // for preview only
      }));
    }
  };
  

  // const updateUserSettings = async (e) => {
  //   e.preventDefault();

  //   const payload = {
      
  //     profile_picture: formData.profileImage,
  //     first_name : formData.firstName,
  //     last_name : formData.lastName,
  //     language : formData.language,
  //     timezone : formData.timezone,
  //     first_day_of_week : formData.firstDay,
  //     monthy_summary : formData.receiveMonthly,
  //     summary_email : formData.customEmail
  //   }

  //   await updateUser(payload);
  // }

  const updateUserSettings = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
  
    if (selectedFile) {
      form.append("profile_picture", selectedFile); // ✅ Real file
    }
  
    form.append("first_name", formData.firstName);
    form.append("last_name", formData.lastName);
    form.append("language", formData.language);
    form.append("timezone", formData.timezone);
    form.append("first_day_of_week", formData.firstDay);
    form.append("monthy_summary", formData.receiveMonthly);
    form.append("summary_email", formData.customEmail);
  
    try {
      console.log(form);
      await updateUser(form); // Assumes updateUser accepts FormData
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Account</h1>

      {/* Profile Picture */}
      <div className="flex items-end mb-8">
        <div className="relative">
          <Image
            src={formData.profileImage}
            alt="Profile picture"
            width={124}
            height={124}
            className="rounded-full "
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div className="ml-6 space-x-3">
          <button
            onClick={() => fileInputRef.current.click()}
            className=" px-6 py-2.5 bg-[#3570BC] text-white rounded-[138px] hover:bg-blue-600 transition cursor-pointer"
          >
            Change Picture
          </button>
          <button
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                profileImage: "/dashboard/dummy-image.jpg",
              }))
            }
            className="px-6 py-2.5 bg-[#382626] border border-[#F544441A] text-[#F54444] rounded-[138px] hover:bg-red-900/20 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-[20px] font-[600] mb-4">Personal information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-[16px] text-[#A7A7A7] mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Type here..."
              className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-[16px] text-[#A7A7A7] mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Type here..."
              className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-[20px] font-[600] mb-4">Preferences</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="language"
              className="block text-[16px] text-[#A7A7A7] mb-2"
            >
              Language
            </label>
            <div className="relative">
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label
              htmlFor="timezone"
              className="block text-[16px] text-[#A7A7A7] mb-2"
            >
              Timezone
            </label>
            <div className="relative">
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
              >
                <option value="America/New_York">Eastern (US)</option>
                <option value="Asia/Tokyo">Japan (Tokyo)</option>
                <option value="Europe/London">UK (London)</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="w-[49%]">
          <label
            htmlFor="firstDay"
            className="block text-[16px] text-[#A7A7A7] mb-2"
          >
            First day of the week
          </label>
          <div className="relative">
            <select
              name="firstDay"
              value={formData.firstDay}
              onChange={handleChange}
              className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
            >
              <option>Monday</option>
              <option>Sunday</option>
            </select>
            <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-[20px] font-[600] mb-4">Monthly summary</h2>
        <div className="flex items-center mb-4">
          <span className="mr-2 text-[#A7A7A7]">Receive monthly summary</span>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.receiveMonthly  ? "bg-blue-600" : "bg-zinc-700"
            }`}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                receiveMonthly: !prev.receiveMonthly,
              }))
            }
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.receiveMonthly  ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <div>
          <label
            htmlFor="customEmail"
            className="block text-[16px] text-[#A7A7A7] mb-2"
          >
            Custom e-mail for the monthly summary
          </label>
          <input
           type="email"
           name="customEmail"
           value={formData.customEmail}
           onChange={handleChange}
            placeholder="Type here..."
            className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600 mb-1"
          />
          <p className="text-xs text-[#A7A7A7] mt-3">
            When this field is empty the monthly summary is sent to {formData.email}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <button className="px-5 py-2.5 backdrop-blur-[111.51px] border border-[#FFFFFF30]  text-white rounded-[60px] hover:bg-zinc-700 transition" onClick={updateUserSettings}>
          Save Changes
        </button>
      </div>

      <div className="border-t border-zinc-800 pt-8">
        <h2 className="text-[20px] font-[600] mb-4">Delete this account</h2>
        <p className="text-zinc-400 mb-4">
          Are you sure you want to delete your account?
        </p>
        <button className="px-6 py-2.5 bg-[#382626] border border-[#F544441A] text-[#F54444] rounded-[138px] hover:bg-red-900/20 transition cursor-pointer">
          Yes, Delete my account
        </button>
      </div>
    </div>
  );
};

export default Account;
