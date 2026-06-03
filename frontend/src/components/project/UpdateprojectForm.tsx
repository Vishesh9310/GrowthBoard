import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { fetchProjectById, updateProjectById } from '../../features/projects/projectSlice';
import type { Project, ProjectInput } from '../../features/projects/projectType';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateprojectForm: React.FC = () => {
    const [formData, setFormData] = useState<ProjectInput | null>(null); 
    const [originalProject, setOriginalProject] = useState<Project | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [filePreview, setFilePreview] = useState<string | undefined>();
    // const [fileToUpload, setFileToUpload] = useState<File | null>(null);

    useEffect(() => {
        if(!id) return;
        const fetchProject = async () => {
            try {
                const data: Project = await dispatch(fetchProjectById(id)).unwrap();
                setOriginalProject(data);
                
                setFormData({
                    title: data.title,
                    desc: data.desc || '',
                    tags: data.tags || [],
                    githubLink: data.githubLink || '',
                    collaboration: data.collaboration?.map(c => c._id) || [], 
                    file: null,
                });
                setFilePreview(data.file);
            } catch (err) {
                console.error('Failed to fetch project:', err);
                navigate('/projects');
            }
        }
        fetchProject();
    }, [id, dispatch, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => (prev ? { ...prev, [name]: value } : null));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        //setFileToUpload(file);
        setFormData(prev => (prev ? { ...prev, file: file } : null));
        
        if (file) {
            setFilePreview(URL.createObjectURL(file));
        } else if (originalProject?.file) {
            setFilePreview(originalProject.file);
        } else {
            setFilePreview(undefined);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData || !id) return;

        try {
            await dispatch(updateProjectById({ id, project: formData })).unwrap();
            navigate('/workspace/projects');
        } catch (err) {
            console.error('Failed to update project:', err);
        }
    };

    if (!formData) return <p>Loading project data...</p>;

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-2xl mx-auto space-y-4 bg-gray-50 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800">Update Project: {formData.title}</h2>
            
            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required
                       className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            </div>

            {/* Description */}
            <div>
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="desc" id="desc" value={formData.desc} onChange={handleChange} rows={3} required
                       className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            </div>
            
            {/* Tags */}
            <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (Use string and handle conversion in state)</label>
                <input 
                    type="text" 
                    name="tags" 
                    id="tags" 
                    value={formData.tags.join(', ')} 
                    onChange={(e) => {
                        const newTags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
                        setFormData(prev => (prev ? { ...prev, tags: newTags } : null));
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            
            {/* GitHub Link */}
            <div>
                <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">GitHub Link</label>
                <input type="url" name="githubLink" id="githubLink" value={formData.githubLink} onChange={handleChange}
                       className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
            </div>
            
            {/* File Upload and Preview */}
            <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Project File/Image (Optional)</label>
                <input type="file" name="file" id="file" onChange={handleFileChange}
                       className="mt-1 block w-full text-sm text-gray-500"/>
                {filePreview && (
                    <div className="mt-2">
                        <p className="text-xs text-gray-600">Current File:</p>
                        <img src={filePreview} alt="Project File Preview" className="h-20 w-auto object-cover rounded-md"/>
                    </div>
                )}
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                Save Changes
            </button>
        </form>
    );
}

export default UpdateprojectForm;