import React, { useState, useEffect } from "react";
import { addAchievement } from "../../features/achievements/achievementSlice";
import type { Skill } from "../../features/skills/skillType";
import type { AchievementInput } from "../../features/achievements/achievementType";

type Props = {
  handleAdd: (data: FormData) => Promise<any> | any;
  skills: Skill[];
};

const Form: React.FC<Props> = ({ handleAdd, skills }) => {
  const [formData, setFormData] = useState<AchievementInput>({
    file: null,
    skillId: "",
    date: "",
    previewUrl: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => {
      if (formData.previewUrl) {
        URL.revokeObjectURL(formData.previewUrl);
      }
    };
  }, [formData.previewUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "file" && "files" in e.target && e.target.files?.[0]) {
      const file = e.target.files[0];
      if (formData.previewUrl) URL.revokeObjectURL(formData.previewUrl);

      setFormData((prev) => ({
        ...prev,
        file,
        previewUrl: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.skillId || !formData.date || !formData.file) {
      setMessage("❌ Please fill all fields before submitting.");
      return;
    }

    const data = new FormData();
    data.append("file", formData.file);
    data.append("skillId", formData.skillId);
    data.append("date", formData.date);

    try {
      setIsUploading(true);
      setMessage("");

      const resultAction = await handleAdd(data);

      if (resultAction && addAchievement.fulfilled.match(resultAction)) {
        setFormData({
          file: null,
          skillId: "",
          date: "",
          previewUrl: "",
        });
        setMessage("✅ Achievement uploaded successfully!");
      } else {
        setMessage("❌ Failed to add achievement.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ An unexpected error occurred.");
    } finally {
      setIsUploading(false);
      const timer = setTimeout(() => setMessage(""), 2000);
      clearTimeout(timer);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg bg-gray-50 shadow-sm"
    >
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
        className={`w-full py-2 px-4 font-semibold rounded-md transition duration-150 ${
          isUploading
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isUploading ? "Uploading..." : "Submit Achievement"}
      </button>

      {/* Message */}
      {message && (
        <p
          className={`pt-2 text-center text-sm font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default Form;
