import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAchievementById,
  updateAchievementsById,
} from "../../features/achievements/achievementSlice";
import { fetchSkills } from "../../features/skills/skillSlice";
import type { AchievementInput } from "../../features/achievements/achievementType";
import { unwrapResult } from "@reduxjs/toolkit";

const UpdateAchievementForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedAchivement, error, loading, message } = useAppSelector(
    (state) => state.achievement
  );
  const skills = useAppSelector((state) => state.skill.skills);

  const [formData, setFormData] = useState<AchievementInput>({
    file: null,
    skillId: "",
    date: "",
    previewUrl: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 🔹 Fetch achievement + skills on mount
  useEffect(() => {
    if (id) dispatch(fetchAchievementById(id));
    dispatch(fetchSkills());
  }, [id, dispatch]);

  // 🔹 Prefill form once data is fetched
  useEffect(() => {
    if (selectedAchivement) {
      setFormData({
        file: null,
        skillId: selectedAchivement.skillId || "",
        date: selectedAchivement.date || "",
        previewUrl: selectedAchivement.previewUrl || "",
      });
    }
  }, [selectedAchivement]);

  // 🔹 Show message temporarily
  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 🔹 Handle Input Change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, files } = e.target as HTMLInputElement;

      if (name === "file" && files && files.length > 0) {
        const file = files[0];
        setFormData((prev) => ({
          ...prev,
          file,
          previewUrl: URL.createObjectURL(file),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    []
  );

  // 🔹 Submit Updated Achievement
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id) return;

      const dataToSubmit = new FormData();
      dataToSubmit.append("skillId", formData.skillId);
      dataToSubmit.append("date", formData.date);
      if (formData.file) dataToSubmit.append("file", formData.file);

      setIsUploading(true);
      try {
        const resultAction = await dispatch(
          updateAchievementsById({ id, formData: dataToSubmit })
        );
        unwrapResult(resultAction);
        navigate("/workspace/achievement/");
      } catch (err) {
        console.error("Failed to update achievement:", err);
      } finally {
        setIsUploading(false);
      }
    },
    [id, formData, dispatch, navigate]
  );

  // 🔹 Render States
  if (loading) return <p className="text-center text-green-500 mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">Something went wrong...</p>;
  if (!id) return <p className="text-center text-red-500">Invalid Achievement ID</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
      {showMessage && <p className="text-center text-green-600">{message}</p>}

      <h2 className="text-2xl font-bold mb-4 text-center">Update Achievement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* File Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Upload Certificate/Resource:
          </label>
          <input
            type="file"
            name="file"
            accept="image/*,application/pdf"
            onChange={handleChange}
            className="p-2 border rounded-md bg-white"
            disabled={isUploading}
          />
        </div>

        {/* Skill Selection */}
        <div className="flex flex-col">
          <label htmlFor="skill-select" className="text-sm font-medium mb-1">
            Select Skill:
          </label>
          <select
            id="skill-select"
            name="skillId"
            className="p-2 border rounded-md"
            onChange={handleChange}
            value={formData.skillId}
            disabled={isUploading || skills.length === 0}
          >
            <option value="">-- Select a Skill --</option>
            {skills.map((skill) => (
              <option key={skill._id} value={skill._id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Achievement Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-2 border rounded-md"
            disabled={isUploading}
          />
        </div>

        {/* Preview */}
        {formData.previewUrl && (
          <div className="pt-2">
            <p className="text-sm font-medium">Preview:</p>
            {formData.file?.type.startsWith("image/") ? (
              <img
                src={formData.previewUrl}
                alt="Resource preview"
                width={100}
                className="rounded-xl mt-1 shadow"
              />
            ) : (
              <p className="text-xs text-gray-500 mt-1">
                File selected: {formData.file?.name}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded-md w-full hover:bg-yellow-500 transition"
        >
          {isUploading ? "Updating..." : "Update Achievement"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAchievementForm;
