import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Loader from "@/components/Loader";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Briefcase,
  BookOpen,
  Award,
  Code,
  User, // Icon for "About" section
  ExternalLink,
  Instagram,
  Facebook,
} from "lucide-react";

// --- A more advanced Section component for better styling ---
const Section = ({ icon, title, children }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-5 border-b border-gray-200">
      <div className="flex items-center">
        {/* {icon} */}
        <h2 className="text-xl font-bold text-gray-800 underline">{title}</h2>
      </div>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

// --- Component for individual Experience/Education items ---
// --- Component for individual Experience/Education items ---
const InfoCard = ({ title, subtitle, description, date, link }) => (
  <div className="border-t border-gray-200 pt-4 first:border-t-0 first:pt-0">
    <div className="flex justify-between items-baseline">
      <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      {date && <p className="text-sm font-medium text-gray-500">{date}</p>}
    </div>
    {subtitle && (
      <p className="text-md text-gray-600 font-medium">{subtitle}</p>
    )}

    {/* ✅ MODIFIED THIS BLOCK to render text exactly as entered */}
    {description && (
      <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">
        {description}
      </p>
    )}

    {/* Link rendering remains the same */}
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline font-semibold mt-3"
      >
        <ExternalLink size={14} />
        <span>View Project</span>
      </a>
    )}
  </div>
);

const PublicProfile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ... (your data fetching useEffect remains the same)
    if (!username) return;
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const cvCollectionRef = collection(db, "cvdata");
        const q = query(cvCollectionRef, where("cvSlug", "==", username));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError("Profile not found.");
        } else {
          setProfileData(querySnapshot.docs[0].data());
          setError("");
        }
      } catch (err) {
        setError("An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [username]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  if (!profileData) return null;

  // --- Skill Categorization Logic ---
  const skillCategories = {
    Languages: [
      "JavaScript",
      "Python",
      "Java",
      "C++",
      "TypeScript",
      "Go",
      "HTML",
      "CSS",
      "SQL",
      "Dart",
      "Kotlin",
      "Swift",
    ],
    "Frameworks & Libraries": [
      "React.js",
      "Angular",
      "Vue.js",
      "Node.js",
      "Express.js",
      "Django",
      "Flask",
      "Spring Boot",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "Flutter",
    ],
    "Tools & Platforms": [
      "Git",
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "GCP",
      "Jira",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Firebase",
    ],
  };

  const getCategorizedSkills = () => {
    const categorized = {};
    const allSkills = new Set(profileData.skills);

    for (const category in skillCategories) {
      const categorySkills = skillCategories[category].filter((skill) =>
        allSkills.has(skill)
      );
      if (categorySkills.length > 0) {
        categorized[category] = categorySkills;
        categorySkills.forEach((skill) => allSkills.delete(skill));
      }
    }
    // Any remaining skills go into "Other"
    if (allSkills.size > 0) {
      categorized["Other"] = Array.from(allSkills);
    }
    return categorized;
  };
  const categorizedSkills = getCategorizedSkills();

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <main className="container mx-auto p-4 md:p-8">
        {/* --- LINKEDIN-STYLE HEADER --- */}
        {/* --- FULLY RESPONSIVE HEADER --- */}
        {/* --- FULLY RESPONSIVE HEADER --- */}
        {/* --- FULLY RESPONSIVE HEADER --- */}
        <div className="bg-white rounded-lg shadow-lg mb-8 relative pb-8 lg:pb-16">
          {/* Banner */}
          <div className="h-28 lg:h-48 bg-gradient-to-r from-gray-700 via-gray-900 to-black rounded-t-lg"></div>

          {/* Profile Picture (Responsive) */}
          <div className="relative mx-auto -mt-16 w-32 h-32 lg:absolute lg:top-24 lg:left-10 lg:w-40 lg:h-40 lg:m-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-6xl lg:text-7xl font-bold text-white shadow-lg border-4 border-white">
            {profileData.name?.[0]?.toUpperCase() || "U"}
          </div>

          {/* Info Container (Responsive) */}
          <div className="w-full mt-4 px-4 lg:pt-8 lg:pl-56 lg:pr-8 lg:mt-0">
            <div className="flex flex-col items-center lg:block">
              {/* --- MOBILE VIEW CONTAINER --- Changed to a column layout */}
              <div className="w-full flex flex-col items-center lg:flex-row lg:justify-between lg:items-center lg:w-auto">
                {/* Name and Position (centered on mobile) */}
                <div className="text-center lg:text-left">
                  <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-900">
                    {profileData.name}
                  </h1>
                  <p className="text-md lg:text-lg text-gray-600 mt-1 capitalize">
                    {profileData.domain.replace(/-/g, " ")}
                  </p>
                </div>

                {/* --- MOBILE VIEW --- Social Links (now a single centered row) */}
                <div className="flex flex-row flex-wrap justify-center gap-x-5 mt-4 text-gray-600 text-sm lg:hidden">
                  {profileData.email && (
                    <a
                      href={`mailto:${profileData.email}`}
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Mail size={18} />
                    </a>
                  )}
                  {profileData.phone && (
                    <a
                      href={`tel:${profileData.phone}`}
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Phone size={18} />
                    </a>
                  )}
                  {profileData.linkedin && (
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {profileData.github && (
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {profileData.instagram && (
                    <a
                      href={profileData.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  {profileData.facebook && (
                    <a
                      href={profileData.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* --- DESKTOP VIEW --- Social Links (Unchanged, remains hidden on mobile) */}
              <div className="hidden mt-4 lg:block">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm">
                  {profileData.email && (
                    <a
                      href={`mailto:${profileData.email}`}
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Mail size={16} /> {profileData.email}
                    </a>
                  )}
                  {profileData.phone && (
                    <a
                      href={`tel:${profileData.phone}`}
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Phone size={16} /> {profileData.phone}
                    </a>
                  )}
                  {profileData.linkedin && (
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  )}
                  {profileData.github && (
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  )}
                </div>
                {/* xkao, */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm mt-2">
                  {profileData.instagram && (
                    <a
                      href={profileData.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Instagram size={16} /> Instagram
                    </a>
                  )}
                  {profileData.facebook && (
                    <a
                      href={profileData.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-600"
                    >
                      <Facebook size={16} /> Facebook
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
{/* yghujk */}
        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            {profileData.about && (
              <Section icon={<User className="text-gray-500" />} title="About">
                <p className="text-gray-600 whitespace-pre-line">
                  {profileData.about}
                </p>
              </Section>
            )}

            {/* Projects Section */}
            {profileData.projects?.length > 0 && (
              <Section
                icon={<Briefcase className="text-blue-500" />}
                title="Projects"
              >
                <div className="space-y-6">
                  {profileData.projects.map((proj, index) => (
                    <InfoCard key={index} {...proj} />
                  ))}
                </div>
              </Section>
            )}

            {/* Leadership Section */}
            {profileData.leadership?.length > 0 && (
              <Section
                icon={<Award className="text-yellow-500" />}
                title="Leadership & Experience"
              >
                <div className="space-y-6">
                  {profileData.leadership.map((item, index) => (
                    <InfoCard key={index} {...item} />
                  ))}
                </div>
              </Section>
            )}
          </div>

          <div className="space-y-8">
            {/* Education Section */}
            {profileData.education?.length > 0 && (
              <Section
                icon={<BookOpen className="text-purple-500" />}
                title="Education"
              >
                <div className="space-y-6">
                  {profileData.education.map((edu, index) => (
                    <InfoCard
                      key={index}
                      title={edu.university}
                      subtitle={edu.degree}
                      date={edu.passingYear}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* Skills Section */}
            {Object.keys(categorizedSkills).length > 0 && (
              <Section
                icon={<Code className="text-green-500" />}
                title="Skills"
              >
                <div className="space-y-4">
                  {Object.entries(categorizedSkills).map(
                    ([category, skills]) => (
                      <div key={category}>
                        <h4 className="font-semibold text-md text-gray-700 mb-2">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicProfile;
