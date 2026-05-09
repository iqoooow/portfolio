import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { User, Save, Upload, MapPin, Mail, Loader2, Sparkles, FileText } from 'lucide-react';

const ProfileManager = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const { data } = await supabase.from('profile').select('*').single();
        if (data) setProfile(data);
        setLoading(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const { error } = await supabase
                .from('profile')
                .update({
                    full_name: profile.full_name,
                    role: profile.role,
                    bio: profile.bio,
                    email: profile.email,
                    location: profile.location,
                    hero_image_url: profile.hero_image_url,
                    cv_url: profile.cv_url,
                })
                .eq('id', profile.id);

            if (error) throw error;
            alert('Profile updated successfully!');
            fetchProfile();
        } catch (err) {
            console.error(err);
            alert(err.message || 'Error updating profile.');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileUpload = async (e, type) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const fileName = `${type}-${Date.now()}-${file.name}`;
            const bucketName = 'profile';

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(fileName);

            setProfile(prev => ({
                ...prev,
                [type === 'image' ? 'hero_image_url' : 'cv_url']: publicUrl
            }));

            alert(`${type === 'image' ? 'Image' : 'CV'} uploaded! Save changes to apply.`);
        } catch (error) {
            console.error(error);
            alert(error.message || `Error uploading ${type}.`);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return (
        <div className="animate-pulse space-y-6">
            <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-[600px] w-full bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
        </div>
    );

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading flex items-center gap-3 text-gray-900 dark:text-white">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex-center text-indigo-600 dark:text-indigo-400">
                        <User size={24} />
                    </div>
                    Identity Settings
                </h2>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-bold border border-indigo-200 dark:border-indigo-500/20">
                    <Sparkles size={16} /> Public Profile
                </div>
            </div>

            <form onSubmit={handleSave} className="glass-card p-8 sm:p-12 rounded-[2.5rem] space-y-8 shadow-2xl relative overflow-hidden">
                {/* Header Decoration */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                {/* Profile Media Section */}
                <div className="flex flex-col md:flex-row gap-10 items-center p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gray-200 dark:bg-[#111] flex-center text-gray-400 border-2 border-white dark:border-white/10 shadow-lg transition-transform group-hover:scale-105">
                            {profile.hero_image_url ? (
                                <img src={profile.hero_image_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={48} />
                            )}
                        </div>
                        <label className="absolute -bottom-3 -right-3 w-10 h-10 bg-indigo-500 text-white rounded-xl flex-center cursor-pointer hover:bg-indigo-600 transition-all shadow-lg hover:scale-110 active:scale-95">
                            <Upload size={18} />
                            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} className="hidden" />
                        </label>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white">Profile Avatar</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Recommended size 400x400px. JPG or PNG.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <label className="btn btn-outline border-gray-200 dark:border-white/10 text-sm py-2 px-4 flex-center gap-2 cursor-pointer bg-white dark:bg-transparent">
                                <FileText size={16} /> 
                                {profile.cv_url ? 'Replace CV' : 'Upload CV (PDF)'}
                                <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'cv')} className="hidden" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">Full Name</label>
                        <input
                            name="full_name"
                            value={profile.full_name || ''}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                    <div className="space-y-2 group">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">Professional Role</label>
                        <input
                            name="role"
                            value={profile.role || ''}
                            onChange={handleChange}
                            placeholder="Full-Stack Web Architect"
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">Biography</label>
                    <textarea
                        name="bio"
                        value={profile.bio || ''}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Tell the world who you are..."
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-gray-900 dark:text-white resize-none"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                name="location"
                                value={profile.location || ''}
                                onChange={handleChange}
                                placeholder="Tashkent, Uzbekistan"
                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 group">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 block group-focus-within:text-indigo-500 transition-colors">Public Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                name="email"
                                type="email"
                                value={profile.email || ''}
                                onChange={handleChange}
                                placeholder="hello@iqooow.dev"
                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={saving || uploading} 
                        className="btn btn-primary w-full py-4 text-base rounded-2xl flex-center gap-3 shadow-glow hover:shadow-glow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Commit Profile Updates
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileManager;
