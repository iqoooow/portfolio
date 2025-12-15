import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { User, Save } from 'lucide-react';

const ProfileManager = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

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

        try {
            let error;

            if (profile.id) {
                // Mavjud profilni yangilash (id bo'yicha)
                ({ error } = await supabase
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
                    .eq('id', profile.id));
            } else {
                // Agar id bo'lmasa, yangi qator yaratamiz
                ({ error } = await supabase.from('profile').insert({
                    full_name: profile.full_name,
                    role: profile.role,
                    bio: profile.bio,
                    email: profile.email,
                    location: profile.location,
                        hero_image_url: profile.hero_image_url,
                        cv_url: profile.cv_url,
                }));
            }

            if (error) throw error;

            alert('Profile updated!');
            // Yangilangan ma'lumotni qayta yuklab olamiz
            fetchProfile();
        } catch (err) {
            console.error(err);
            alert(err.message || 'Profile saqlashda xatolik yuz berdi.');
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);

            // Fayl nomini unikal qilish
            const fileName = `profile-${Date.now()}-${file.name}`;

            // BUCKET nomi: Supabase Storage ichida ochgan bucket nomingizni shu yerga yozasiz
            const bucketName = 'profile';

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const {
                data: { publicUrl },
            } = supabase.storage.from(bucketName).getPublicUrl(fileName);

            setProfile((prev) => ({
                ...prev,
                hero_image_url: publicUrl,
            }));

            alert('Rasm yuklandi! Saqlash uchun "Save Changes" ni bosing.');
        } catch (error) {
            console.error(error);
            alert(error.message || 'Rasm yuklashda xatolik yuz berdi.');
        } finally {
            setUploading(false);
        }
    };

    const handleCvUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);

            const fileName = `cv-${Date.now()}-${file.name}`;
            const bucketName = 'profile'; // xuddi shu bucketdan foydalanamiz

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const {
                data: { publicUrl },
            } = supabase.storage.from(bucketName).getPublicUrl(fileName);

            setProfile((prev) => ({
                ...prev,
                cv_url: publicUrl,
            }));

            alert('CV fayl yuklandi! Saqlash uchun "Save Changes" ni bosing.');
        } catch (error) {
            console.error(error);
            alert(error.message || 'CV yuklashda xatolik yuz berdi.');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form onSubmit={handleSave} className="glass p-8 rounded-2xl max-w-2xl space-y-4">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex-center text-slate-400">
                        {profile.hero_image_url ? (
                            <img
                                src={profile.hero_image_url}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={40} />
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-bold mb-1">Profile image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full text-sm"
                        />
                        <p className="text-xs text-muted mt-1">
                            Rasm yuklang, so‘ng <span className="font-semibold">Save Changes</span> ni bosing.
                        </p>
                        {uploading && (
                            <p className="text-xs text-indigo-500 mt-1">Rasm yuklanmoqda...</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Full Name</label>
                    <input
                        name="full_name"
                        value={profile.full_name || ''}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border dark:bg-black/20"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Role</label>
                    <input
                        name="role"
                        value={profile.role || ''}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border dark:bg-black/20"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Bio</label>
                    <textarea
                        name="bio"
                        value={profile.bio || ''}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 rounded-xl border dark:bg-black/20"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Location</label>
                    <input
                        name="location"
                        value={profile.location || ''}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border dark:bg-black/20"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Email</label>
                    <input
                        name="email"
                        value={profile.email || ''}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border dark:bg-black/20"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold mb-1">CV / Resume</label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={handleCvUpload}
                        className="w-full text-sm"
                    />
                    <input
                        name="cv_url"
                        value={profile.cv_url || ''}
                        onChange={handleChange}
                        placeholder="Yoki tayyor CV havolasini kiriting (https://...)"
                        className="w-full p-3 rounded-xl border dark:bg-black/20 text-sm"
                    />
                    <p className="text-xs text-muted mt-1">
                        Fayl yuklasangiz avtomatik link yoziladi. Hero bo‘limida <b>Download CV</b> tugmasi ko‘rinadi.
                    </p>
                </div>

                <button className="btn btn-primary w-full justify-center gap-2">
                    <Save size={18} /> Save Changes
                </button>
            </form>
        </div>
    );
};

export default ProfileManager;
