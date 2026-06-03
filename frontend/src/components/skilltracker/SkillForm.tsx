import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addSkill, fetchSkills } from '../../features/skills/skillSlice';
import type { SkillInput } from '../../features/skills/skillType';

type Props = {
  handleMessage: (value: boolean) => void;
}
const SkillForm: React.FC<Props> = ({handleMessage}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<SkillInput>({
    name: '',
    proficiency: 0,
    dateOfCompletion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'proficiency' ? e.target.valueAsNumber : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addSkill(formData)).unwrap();
      setFormData({ name: '', proficiency: 0, dateOfCompletion: '' });
      dispatch(fetchSkills()); // refresh list
      handleMessage(true);
    } catch (err: any) {
      console.error(err);
      handleMessage(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded-lg shadow">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Skill Name"
        className="border px-3 py-2 w-full rounded"
        required
      />
      <input
        type="number"
        name="proficiency"
        value={formData.proficiency}
        onChange={handleChange}
        min={1}
        max={100}
        className="border px-3 py-2 w-full rounded"
        required
      />
      <input
        type="date"
        name="dateOfCompletion"
        value={formData.dateOfCompletion}
        onChange={handleChange}
        className="border px-3 py-2 w-full rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
        Add Skill
      </button>
    </form>
  );
};

export default SkillForm;
