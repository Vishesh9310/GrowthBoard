import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Skill } from '../../features/skills/skillType';
import { getSkillById, updateSkill } from '../../features/skills/skillSlice';
import { useAppDispatch } from '../../app/hooks';

const UpdateskillForm: React.FC = () => {
    const [skill, setSkill] = useState<Skill | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Fetch single skill by id
    useEffect(() => {
        const fetchSkill = async () => {
            if (id) {
                try {
                    const data = await dispatch(getSkillById(id)).unwrap();
                    setSkill(data);
                } catch (err) {
                    console.error("Failed to fetch skill:", err);
                }
            }
        };
        fetchSkill();
    }, [id, dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id && skill) {
            try {
                await dispatch(updateSkill({ id, skill })).unwrap();
                navigate("/workspace/skills");
            } catch (err) {
                console.error("Failed to update skill:", err);
            }
        }
    };

    if (!skill) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto mt-4">
            <input
                type="text"
                value={skill.name}
                onChange={(e) => setSkill({ ...skill, name: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="Skill Name"
                required
            />
            <input
                type="number"
                value={skill.proficiency}
                onChange={(e) => setSkill({ ...skill, proficiency: +e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="Proficiency"
                required
                min={0}
                max={100}
            />
            <input
                type="date"
                value={skill.dateOfCompletion}
                onChange={(e) => setSkill({ ...skill, dateOfCompletion: e.target.value })}
                className="border p-2 rounded w-full"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Update Skill
            </button>
        </form>
    );
};

export default UpdateskillForm;
