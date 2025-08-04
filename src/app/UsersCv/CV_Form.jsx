import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase";
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Search,
  X,
} from "lucide-react";

// --- Predefined Data ---
const domains = [
  { label: "Select Domain", value: "" },
  { label: "Web Development", value: "web-development" },
  { label: "Data Science", value: "data-science" },
  { label: "Mobile Development (Android/iOS)", value: "mobile-development" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Cloud Engineering (DevOps)", value: "cloud-engineering" },
];

const courseworkOptions = {
  "web-development": [ "HTML5 & CSS3", "JavaScript ES6+", "React.js", "Node.js", "Express.js", "MongoDB", "SQL Basics", "RESTful APIs", "Git & GitHub", "Responsive Design", "Front-end Frameworks", "Back-end Development", "Web Security", "GraphQL", "TypeScript", "Next.js", "Tailwind CSS", "Bootstrap", ],
  "data-science": [ "Python Programming", "R Programming", "Statistics for Data Science", "Machine Learning", "Deep Learning", "SQL for Data Analysis", "Data Visualization (Matplotlib, Seaborn)", "Pandas & NumPy", "Scikit-learn", "TensorFlow/Keras", "Natural Language Processing (NLP)", "Computer Vision", "Big Data (Hadoop, Spark)", "A/B Testing", "Time Series Analysis", ],
  "mobile-development": [ "Java (Android)", "Kotlin (Android)", "Swift (iOS)", "Objective-C (iOS)", "React Native", "Flutter (Dart)", "XML Layouts (Android)", "SwiftUI/UIKit (iOS)", "Firebase Integration", "RESTful API Integration", "Mobile UI/UX", "App Store Deployment", "Push Notifications", "Local Storage", "Performance Optimization", ],
  cybersecurity: [ "Network Security", "Cryptography", "Ethical Hacking", "Malware Analysis", "Security Operations (SOC)", "Incident Response", "Penetration Testing", "Vulnerability Assessment", "Cloud Security", "Security Compliance (GDPR, HIPAA)", "Linux Security", "Web Application Security", "Forensics", "Risk Management", ],
  "cloud-engineering": [ "AWS Fundamentals", "Azure Fundamentals", "Google Cloud Platform (GCP)", "Docker", "Kubernetes", "CI/CD (Jenkins, GitLab CI)", "Terraform", "Ansible", "Linux System Administration", "Monitoring & Logging", "Serverless Computing", "Container Orchestration", "Microservices Architecture", ],
};

const allSkills = [ "JavaScript", "Python", "Java", "C++", "C#", "Go", "Ruby", "PHP", "Swift", "Kotlin", "TypeScript", "Dart", "React.js", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "MongoDB", "PostgreSQL", "MySQL", "SQL Server", "Firebase Firestore", "Cassandra", "Redis", "AWS", "Azure", "Google Cloud Platform (GCP)", "Docker", "Kubernetes", "Git", "Jira", "Jenkins", "RESTful APIs", "GraphQL", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "Sass", "Webpack", "Machine Learning", "Deep Learning", "Data Analysis", "NLP", "Computer Vision", "Cybersecurity", "Penetration Testing", "Network Security", "Cloud Security", "UI/UX Design", "Responsive Design", "Agile Methodologies", "Scrum", "Problem Solving", "Communication", "Teamwork", "Leadership", "Project Management" ];

// --- Custom MultiSelect Dropdown Component ---
const MultiSelectDropdown = ({ options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 ease-in-out text-gray-800 shadow-sm bg-white flex justify-between items-center text-left">
        <span className="text-gray-600">{selected.length > 0 ? `${selected.length} selected` : placeholder}</span>
        <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? "transform rotate-90" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>
          </div>
          <ul className="max-h-60 overflow-y-auto p-2">
            {filteredOptions.map((option) => (
              <li key={option} className="p-2 hover:bg-blue-50 rounded-md cursor-pointer flex items-center" onClick={() => handleSelect(option)}>
                <input type="checkbox" checked={selected.includes(option)} readOnly className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" />
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selected.map((item) => (
            <span key={item} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
              {item}
              <button type="button" onClick={() => handleSelect(item)} className="ml-2 text-blue-800 hover:text-blue-900">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const CV_Form = () => {
  const navigate = useNavigate();
  const sectionContainerRef = useRef(null);
  const initialFormData = {
    domain: "", name: "", phone: "", email: "", linkedin: "", github: "",
    instagram: "", facebook: "", // ADDED
    education: [], coursework: [], projects: [], skills: [], leadership: [],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [currentPage, setCurrentPage] = useState(0);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        try {
          if (typeof __initial_auth_token !== "undefined" && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
          } else {
            await signInAnonymously(auth);
          }
        } catch (authError) {
          console.error("Authentication failed:", authError);
          setUserId(crypto.randomUUID());
        }
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCVData = async () => {
      if (!userId) return;
      setIsLoadingData(true);
      try {
        const docRef = doc(db, "cvdata", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData({ ...initialFormData, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching CV data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchCVData();
  }, [userId]);

  useEffect(() => {
    if (sectionContainerRef.current) {
      sectionContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const sections = ["Domain", "Contact", "Education", "Coursework", "Projects", "Skills", "Leadership"];

  const validatePage = (pageIndex, data) => {
    const newErrors = {};
    switch (pageIndex) {
      case 0: if (!data.domain) newErrors.domain = "Please select a domain."; break;
      case 1:
        if (!data.name.trim()) newErrors.name = "Full Name is required.";
        if (!/^\d{10}$/.test(data.phone)) newErrors.phone = "Phone must be 10 digits.";
        if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Invalid email format.";
        if (!data.linkedin.trim()) newErrors.linkedin = "LinkedIn URL is required.";
        else if (!/^https?:\/\/(www\.)?linkedin\.com\/in\//i.test(data.linkedin)) newErrors.linkedin = "Invalid LinkedIn URL.";
        if (!data.github.trim()) newErrors.github = "GitHub URL is required.";
        else if (!/^https?:\/\/(www\.)?github\.com\//i.test(data.github)) newErrors.github = "Invalid GitHub URL.";
        // ADDED validation for optional fields
        if (data.instagram && !/^https?:\/\/(www\.)?instagram\.com\//i.test(data.instagram)) newErrors.instagram = "Invalid Instagram URL.";
        if (data.facebook && !/^https?:\/\/(www\.)?facebook\.com\//i.test(data.facebook)) newErrors.facebook = "Invalid Facebook URL.";
        break;
      case 2:
        if (data.education.length < 3) newErrors.education = "Please add at least three education entries.";
        data.education.forEach((edu, index) => {
          if (!edu.university.trim()) newErrors[`education_university_${index}`] = `University is required for entry #${index + 1}.`;
          if (!edu.degree.trim()) newErrors[`education_degree_${index}`] = `Degree/Major is required for entry #${index + 1}.`;
          if (!edu.passingYear.trim()) newErrors[`education_passingYear_${index}`] = `Passing Year is required for entry #${index + 1}.`;
        });
        break;
      case 3: if (data.domain && data.coursework.length === 0) newErrors.coursework = "Please select at least one relevant course."; break;
      case 4:
        if (data.projects.length < 3) newErrors.projects = "Please add at least three project entries.";
        data.projects.forEach((proj, index) => {
          if (!proj.title.trim()) newErrors[`project_title_${index}`] = `Title is required for project #${index + 1}.`;
          if (!proj.description.trim()) newErrors[`project_description_${index}`] = `Description is required for project #${index + 1}.`;
          if (proj.link && !/^https?:\/\/\S+/.test(proj.link)) newErrors[`project_link_${index}`] = `Invalid Project Link for project #${index + 1}.`;
        });
        break;
      case 5: if (data.skills.length === 0) newErrors.skills = "Please select at least one skill."; break;
      default: break;
    }
    return newErrors;
  };

  const handleNext = () => {
    const pageErrors = validatePage(currentPage, formData);
    setErrors(pageErrors);
    if (Object.keys(pageErrors).length === 0) {
      if (currentPage < sections.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setErrors({});
    }
  };

  const handleChange = (e, index, key, section) => {
    const { name, value, tagName } = e.target;
    if (tagName === 'TEXTAREA') {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
    if (name === "domain" && value !== formData.domain && (formData.coursework.length > 0 || formData.projects.length > 0 || formData.skills.length > 0)) {
      const userConfirmed = window.confirm("Changing the domain will reset your selected Coursework, Projects, and Skills. Are you sure you want to continue?");
      if (userConfirmed) {
        setFormData({ ...formData, domain: value, coursework: [], projects: [], skills: [] });
      }
      return;
    }
    let newFormData;
    if (section) {
      const newSection = [...formData[section]];
      newSection[index][key] = value;
      newFormData = { ...formData, [section]: newSection };
    } else {
      newFormData = { ...formData, [name]: value };
    }
    setFormData(newFormData);
    const newErrors = { ...errors };
    if (section) delete newErrors[`${section}_${key}_${index}`];
    else delete newErrors[name];
    setErrors(newErrors);
  };

  const handleMultiSelectChange = (name, selectedValues) => {
    setFormData({ ...formData, [name]: selectedValues });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleArrayAdd = (section, template) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], { ...template }],
    });
    setErrors((prev) => ({ ...prev, [section]: undefined }));
  };

  const handleArrayRemove = (section, index) => {
    const newSection = formData[section].filter((_, i) => i !== index);
    const newFormData = { ...formData, [section]: newSection };
    setFormData(newFormData);
    setErrors(validatePage(currentPage, newFormData));
  };

  const showMessageModal = (message, isSuccess, onClose) => {
    const messageBox = document.createElement("div");
    messageBox.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";
    const bgColor = isSuccess ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400";
    const textColor = isSuccess ? "text-green-800" : "text-red-800";
    const buttonColor = isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600";
    messageBox.innerHTML = `<div class="bg-white p-6 rounded-lg shadow-xl border-t-4 ${bgColor} text-center max-w-sm w-full"><p class="${textColor} font-semibold mb-4">${message}</p><button id="closeMessageBox" class="px-4 py-2 ${buttonColor} text-white rounded-md shadow-md hover:shadow-lg transition-all">OK</button></div>`;
    document.body.appendChild(messageBox);
    document.getElementById("closeMessageBox").onclick = () => {
      document.body.removeChild(messageBox);
      if (onClose) {
        onClose();
      }
    };
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    let allErrors = {};
    let firstErrorPage = -1;
    for (let i = 0; i < sections.length; i++) {
      const pageErrors = validatePage(i, formData);
      if (Object.keys(pageErrors).length > 0 && firstErrorPage === -1) {
        firstErrorPage = i;
      }
      allErrors = { ...allErrors, ...pageErrors };
    }
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) {
      showMessageModal("Please correct the errors before submitting. Navigating to the first error.", false);
      setCurrentPage(firstErrorPage);
      return;
    }
    if (!db || !userId) {
      showMessageModal("Application not ready. Please check your connection and try again.", false);
      return;
    }
    setIsSubmitting(true);
    try {
      const cvSlug = formData.name.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
      if (!cvSlug) {
        showMessageModal("A valid name is required to create a CV link.", false);
        setIsSubmitting(false);
        return;
      }
      const cvDocRef = doc(db, "cvdata", userId);
      const dataToSubmit = { ...formData, cvSlug: cvSlug, userId: userId, updatedAt: new Date() };
      await setDoc(cvDocRef, dataToSubmit, { merge: true });
      showMessageModal("CV Data Saved Successfully! You will now be redirected.", true, () => navigate(`/cv/${cvSlug}`));
    } catch (error) {
      console.error("Error saving CV:", error);
      showMessageModal(`Failed to save CV data. Error: ${error.message}`, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCoursework = formData.domain ? courseworkOptions[formData.domain] || [] : [];

  const LoadingOverlay = ({ text }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-xl font-semibold text-white">{text}</p>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (currentPage) {
      case 0: return (
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
          <select id="domain" name="domain" value={formData.domain} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            {domains.map((d) => (<option key={d.value} value={d.value} disabled={d.value === ""}>{d.label}</option>))}
          </select>
          {errors.domain && <p className="text-red-600 text-sm mt-1">{errors.domain}</p>}
        </div>
      );
      case 1: return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="1234567890" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
            <input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/johndoe" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.linkedin && <p className="text-red-600 text-sm mt-1">{errors.linkedin}</p>}
          </div>
          <div>
            <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
            <input id="github" name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/johndoe" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.github && <p className="text-red-600 text-sm mt-1">{errors.github}</p>}
          </div>
          {/* ADDED Instagram Input */}
          <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">Instagram URL (Optional)</label>
              <input id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="https://instagram.com/johndoe" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.instagram && <p className="text-red-600 text-sm mt-1">{errors.instagram}</p>}
          </div>
          {/* ADDED Facebook Input */}
          <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">Facebook URL (Optional)</label>
              <input id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="https://facebook.com/johndoe" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.facebook && <p className="text-red-600 text-sm mt-1">{errors.facebook}</p>}
          </div>
        </div>
      );
      case 2:
        const educationTemplate = { university: "", degree: "", passingYear: "" };
        return (
          <div className="space-y-6">
            {formData.education.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 shadow-sm relative">
                <p className="text-sm font-bold text-gray-600 mb-3">Education Entry #{idx + 1}</p>
                <button type="button" onClick={() => handleArrayRemove("education", idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><X className="h-5 w-5" /></button>
                <div className="space-y-4">
                  <div>
                    <label htmlFor={`university-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">University/Institute</label>
                    <input id={`university-${idx}`} placeholder="e.g., Stanford University" value={item.university} onChange={(e) => handleChange(e, idx, "university", "education")} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors[`education_university_${idx}`] && <p className="text-red-600 text-sm mt-1">{errors[`education_university_${idx}`]}</p>}
                  </div>
                  <div>
                    <label htmlFor={`degree-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Degree/Major</label>
                    <input id={`degree-${idx}`} placeholder="e.g., M.Sc. Computer Science" value={item.degree} onChange={(e) => handleChange(e, idx, "degree", "education")} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors[`education_degree_${idx}`] && <p className="text-red-600 text-sm mt-1">{errors[`education_degree_${idx}`]}</p>}
                  </div>
                  <div>
                    <label htmlFor={`passingYear-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Passing Year</label>
                    <input id={`passingYear-${idx}`} placeholder="e.g., 2023" value={item.passingYear} onChange={(e) => handleChange(e, idx, "passingYear", "education")} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors[`education_passingYear_${idx}`] && <p className="text-red-600 text-sm mt-1">{errors[`education_passingYear_${idx}`]}</p>}
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => handleArrayAdd("education", educationTemplate)} className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">+ Add Education</button>
            {errors.education && <p className="text-red-600 text-sm mt-2">{errors.education}</p>}
          </div>
        );
      case 3: return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Coursework</label>
          {formData.domain ? (<MultiSelectDropdown options={filteredCoursework} selected={formData.coursework} onChange={(selected) => handleMultiSelectChange("coursework", selected)} placeholder="Click to select courses" />) : (<div className="text-center p-4 border-2 border-dashed rounded-lg text-gray-500">Please select a domain first.</div>)}
          {errors.coursework && <p className="text-red-600 text-sm mt-1">{errors.coursework}</p>}
        </div>
      );
      case 4:
        const projectTemplate = { title: "", description: "", link: "" };
        return (
          <div className="space-y-6">
            {formData.projects.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 shadow-sm relative">
                <p className="text-sm font-bold text-gray-600 mb-3">Project Entry #{idx + 1}</p>
                <button type="button" onClick={() => handleArrayRemove("projects", idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><X className="h-5 w-5" /></button>
                <div className="space-y-4">
                  <div>
                    <label htmlFor={`project-title-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                    <input id={`project-title-${idx}`} placeholder="e.g., E-commerce Platform" value={item.title} onChange={(e) => handleChange(e, idx, "title", "projects")} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors[`project_title_${idx}`] && <p className="text-red-600 text-sm mt-1">{errors[`project_title_${idx}`]}</p>}
                  </div>
                  <div>
                    <label htmlFor={`project-description-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id={`project-description-${idx}`} placeholder="Key achievements, technologies..." value={item.description} onChange={(e) => handleChange(e, idx, "description", "projects")} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-hidden" rows={3} />
                    {errors[`project_description_${idx}`] && <p className="text-red-600 text-sm mt-1">{errors[`project_description_${idx}`]}</p>}
                  </div>
                  <div>
                    <label htmlFor={`project-link-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Project Link (Optional)</label>
                    <input id={`project-link-${idx}`} placeholder="https://github.com/your-project" value={item.link} onChange={(e) => handleChange(e, idx, "link", "projects")} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors[`project_link_${idx}`] && <p className="text-red-600 text-sm mt-1">{errors[`project_link_${idx}`]}</p>}
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => handleArrayAdd("projects", projectTemplate)} className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">+ Add Project</button>
            {errors.projects && <p className="text-red-600 text-sm mt-2">{errors.projects}</p>}
          </div>
        );
      case 5: return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Skills</label>
          <MultiSelectDropdown options={allSkills} selected={formData.skills} onChange={(selected) => handleMultiSelectChange("skills", selected)} placeholder="Click to select skills" />
          {errors.skills && <p className="text-red-600 text-sm mt-1">{errors.skills}</p>}
        </div>
      );
      case 6:
        const leadershipTemplate = { title: "", description: "" };
        return (
          <div className="space-y-6">
            {formData.leadership.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 shadow-sm relative">
                <p className="text-sm font-bold text-gray-600 mb-3">Leadership Entry #{idx + 1}</p>
                <button type="button" onClick={() => handleArrayRemove("leadership", idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><X className="h-5 w-5" /></button>
                <div className="space-y-4">
                  <div>
                    <label htmlFor={`leadership-title-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Role/Title</label>
                    <input id={`leadership-title-${idx}`} placeholder="e.g., Team Lead, Event Organizer" value={item.title} onChange={(e) => handleChange(e, idx, "title", "leadership")} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                  <div>
                    <label htmlFor={`leadership-description-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id={`leadership-description-${idx}`} placeholder="Key responsibilities, impact..." value={item.description} onChange={(e) => handleChange(e, idx, "description", "leadership")} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-hidden" rows={3} />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => handleArrayAdd("leadership", leadershipTemplate)} className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">+ Add Leadership Experience</button>
          </div>
        );
      default: return null;
    }
  };

  if (!isAuthReady || isLoadingData) {
    return <LoadingOverlay text="Loading CV Data..." />;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased">
      {isSubmitting && <LoadingOverlay text="Saving..." />}
      <div className="container mx-auto px-4 py-6 sm:py-10 lg:py-12">
        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 text-gray-800">Create Your Professional CV</h2>
          <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Fill out the sections below to generate your CV data.</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
            {sections.map((sectionName, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center w-20 sm:w-24">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-300 ease-in-out border-2 ${index === currentPage ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-110" : ""} ${index < currentPage ? "bg-green-500 text-white border-green-500" : ""} ${index > currentPage ? "bg-gray-200 text-gray-500 border-gray-300" : ""}`}>
                    {index < currentPage ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <p className={`mt-1 sm:mt-2 text-xs sm:text-sm text-center font-medium transition-colors duration-300 ${index === currentPage ? "text-blue-600 font-semibold" : "text-gray-500"}`}>{sectionName}</p>
                </div>
                {index < sections.length - 1 && (<div className={`hidden sm:block flex-auto border-t-2 transition-colors duration-500 mx-2 sm:mx-4 ${index < currentPage ? "border-green-500" : "border-gray-300"}`}></div>)}
              </React.Fragment>
            ))}
          </div>
          <div ref={sectionContainerRef} className="bg-gray-50/70 p-4 sm:p-6 md:p-8 rounded-xl border border-gray-200 min-h-[280px] sm:min-h-[320px]">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">{sections[currentPage]}</h3>
            <div className="space-y-5 sm:space-y-6">{renderSection()}</div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 sm:mt-10">
            <button type="button" onClick={handlePrevious} disabled={currentPage === 0 || isSubmitting} className="w-full sm:w-auto px-5 py-3 flex items-center justify-center text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100">
              <ChevronLeft className="h-5 w-5 mr-2" /> Previous
            </button>
            {currentPage < sections.length - 1 ? (
              <button type="button" onClick={handleNext} disabled={isSubmitting} className="w-full sm:w-auto px-5 py-3 flex items-center justify-center text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed">
                Next <ChevronRight className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto px-5 py-3 flex items-center justify-center text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 bg-green-600 hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed">
                Save CV <CheckCircle className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CV_Form;