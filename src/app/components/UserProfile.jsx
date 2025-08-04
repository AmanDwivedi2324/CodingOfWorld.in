import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/users/userSlice';
import Loader from "@/components/Loader";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/firebase';

// --- Icon Components for better UI ---
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 004.28 4.28l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
);


const CollegeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.394 2.08a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        <path d="M10 11a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
);

const SkillsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: user, loading: userLoading } = useSelector((state) => state.user);
    const [cvSlug, setCvSlug] = useState(null);
    const [isCheckingCv, setIsCheckingCv] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                setIsAuthenticated(true);
                const userId = authUser.uid;
                dispatch(fetchUser(userId));
                setIsCheckingCv(true);
                try {
                    const docRef = doc(db, 'cvdata', userId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists() && docSnap.data().cvSlug) {
                        setCvSlug(docSnap.data().cvSlug);
                    } else {
                        setCvSlug(null);
                    }
                } catch (error) {
                    console.error("Error checking for CV:", error);
                    setCvSlug(null);
                } finally {
                    setIsCheckingCv(false);
                }
            } else {
                setIsAuthenticated(false);
                setIsCheckingCv(false);
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    if (userLoading || isCheckingCv) {
        return <Loader />;
    }

    if (!isAuthenticated || !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Access Denied</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Please log in to view your profile and manage your CV.</p>
                <button
                    onClick={() => navigate("/login")}
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    const hasCv = !!cvSlug;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* --- Profile Header --- */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-5xl font-bold text-white shadow-lg flex-shrink-0">
                                {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{user?.name}</h1>
                                <p className="text-md text-gray-500 dark:text-gray-400 mt-1">Welcome back to your personal dashboard.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- Left Column: User Details --- */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">Your Details</h3>
                            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                <li className="flex items-center"><MailIcon /> {user?.email}</li>
                                <li className="flex items-center"><PhoneIcon /> {user?.phone || 'Not Provided'}</li>
                                <li className="flex items-center"><CollegeIcon /> {user?.college || 'Not Provided'}</li>
                                <li className="flex items-center"><SkillsIcon /> {user?.skills || 'Not Provided'}</li>
                            </ul>
                        </div>
                    </div>

                    {/* --- Right Column: CV Actions --- */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your CV Status</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">{hasCv ? "You have an active CV. You can view, or edit it." : "Ready to stand out? Create your professional CV today."}</p>

                            {!hasCv ? (
                                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-5 rounded-r-lg text-center">
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">You haven't created a CV yet. Let's get that sorted!</p>
                                    <button
                                        onClick={() => navigate("/cv-form")}
                                        className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                    >
                                        Create Your CV Now
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <ActionButton onClick={() => navigate(`/${cvSlug}`)} color="blue" text="View Profile" />
                                    <ActionButton onClick={() => navigate(`/cv/${cvSlug}`)} color="teal" text="View CV" />
                                    <ActionButton onClick={() => navigate("/cv-form")} color="gray" text="Edit CV" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Reusable Action Button Component ---
const ActionButton = ({ onClick, color, text }) => {
    const colorClasses = {
        blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
        teal: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-300',
        gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-300',
    };
    return (
        <button
            onClick={onClick}
            className={`w-full px-5 py-3 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 ${colorClasses[color]}`}
        >
            {text}
        </button>
    );
};

export default UserProfile;