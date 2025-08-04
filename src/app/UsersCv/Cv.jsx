import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Loader from "@/components/Loader";
import { Printer, Mail, Phone, Linkedin, Github, ExternalLink } from 'lucide-react';

// Helper component to format the name with a larger first letter
const FormattedName = ({ name }) => {
  if (!name) return null;
  const nameParts = name.toUpperCase().split(' ');

  return (
    <h1 className="text-4xl font-semibold font-serif tracking-wide text-gray-900">
      {nameParts.map((part, index) => (
        <span key={index} className="mr-4">
          <span className="text-5xl">{part.charAt(0)}</span>
          <span>{part.slice(1)}</span>
        </span>
      ))}
    </h1>
  );
};


const Cv = () => {
  const { username } = useParams();
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) return;

    const fetchCvData = async () => {
      setLoading(true);
      try {
        const cvCollectionRef = collection(db, 'cvdata');
        const q = query(cvCollectionRef, where("cvSlug", "==", username));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError('CV not found. Please check the URL.');
        } else {
          const docData = querySnapshot.docs[0].data();
          setCvData(docData);
          setError('');
        }
      } catch (err) {
        console.error("Error fetching CV data:", err);
        setError('An error occurred while fetching the CV data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCvData();
  }, [username]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 font-semibold">{error}</div>;
  }

  if (!cvData) {
    return <div className="text-center py-20 text-gray-500 font-semibold">No CV data available.</div>;
  }

  // Helper component for consistent section styling
  const Section = ({ title, children, className = "" }) => (
    <section className={`mb-4 ${className}`}>
      <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3 font-serif">
        {title.toUpperCase()}
      </h2>
      {children}
    </section>
  );
  
  // Helper to split descriptions into bullet points
  const DescriptionList = ({ text }) => {
    if (!text || typeof text !== 'string') return null;
    const points = text.split('\n').filter(point => point.trim() !== '');
    return (
       <ul className="space-y-1 font-sans">
          {points.map((point, index) => (
            <li key={index} className="flex items-center">
                <span className="mr-2  text-gray-700">•</span>
                <span className="flex-1 text-sm text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
    );
  };

  return (
    <div className="bg-gray-100 py-8 px-4" id="cv-page-container">
      <div className="print-controls max-w-4xl mx-auto mb-4 flex justify-end">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800 transition duration-300"
        >
          <Printer size={18} />
          Print / Save as PDF
        </button>
      </div>

      <div id="cv-sheet" className="max-w-4xl mx-auto bg-white p-10 shadow-xl">
        <header className="text-center mb-8">
          <FormattedName name={cvData.name} />
          <div className="mt-3 text-sm flex justify-center items-center flex-wrap gap-x-4 font-sans font-semibold">
            <a href={`tel:${cvData.phone}`} className="flex items-center gap-1.5 hover:text-blue-600"><Phone size={14}/>{cvData.phone}</a>
            <span className="text-gray-400 self-center">•</span>
            <a href={`mailto:${cvData.email}`} className="flex items-center gap-1.5 hover:text-blue-600"><Mail size={14}/>{cvData.email}</a>
            <span className="text-gray-400 self-center">•</span>
            <a href={cvData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Linkedin size={14}/>LinkedIn</a>
            <span className="text-gray-400 self-center">•</span>
            <a href={cvData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Github size={14}/>GitHub</a>
          </div>
        </header>

        <main>
          <Section title="Education">
            {cvData.education?.map((edu, index) => (
              <div key={index} className="mb-2 font-serif">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-md text-gray-800">{edu.university}</h3>
                  <p className="text-sm font-bold text-gray-600">{edu.passingYear}</p>
                </div>
                <p className="text-sm text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </Section>

          <Section title="Relevant Coursework">
             <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 text-sm text-gray-700 font-serif">
                {cvData.coursework?.map(course => (
                    <div key={course} className="flex items-center">
                        <span className="mr-2">•</span>
                        <span>{course}</span>
                    </div>
                ))}
             </div>
          </Section>

          <Section title="Projects">
            {cvData.projects?.map((proj, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-center font-serif">
                  <h3 className="font-semibold text-md text-gray-800">{proj.title}</h3>
                  {/* ✅ Dynamic Project Link */}
                  {proj.link && (
                    <a 
                      href={proj.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline font-semibold font-sans"
                    >
                      {proj.link.includes('github.com') ? <ExternalLink size={14} /> : <ExternalLink size={14} />}
                      <span>{proj.link.includes('github.com') ? 'Link' : 'View Project'}</span>
                    </a>
                  )}
                </div>
                <DescriptionList text={proj.description} />
              </div>
            ))}
          </Section>

          <Section title="Technical Skills">
            <div className="text-sm text-gray-700 space-y-1 font-serif">
                <p>
                    <span className="font-semibold">Languages:</span> {cvData.skills?.filter(s => ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'HTML', 'CSS', 'SQL Basics'].includes(s)).join(', ')}
                </p>
                <p>
                    <span className="font-semibold">Frameworks & Libraries:</span> {cvData.skills?.filter(s => ['React.js', 'Node.js', 'Express.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Pandas & NumPy', 'Scikit-learn', 'TensorFlow/Keras'].includes(s)).join(', ')}
                </p>
                 <p>
                    <span className="font-semibold">Tools & Platforms:</span> {cvData.skills?.filter(s => ['Git', 'Docker', 'Kubernetes', 'AWS', 'Jira', 'MongoDB', 'Firebase Firestore', 'PostgreSQL'].includes(s)).join(', ')}
                </p>
            </div>
          </Section>

          <Section title="Leadership / Extracurricular" className="break-inside-avoid">
             {cvData.leadership?.map((item, index) => (
               <div key={index} className="mb-3">
                 <h3 className="font-semibold font-serif text-md text-gray-800">{item.title}</h3>
                 <DescriptionList text={item.description} />
               </div>
             ))}
          </Section>
        </main>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background-color: #fff;
          }
          .print-controls { display: none !important; }
          #cv-page-container { padding: 0; margin: 0; }
          #cv-sheet {
            box-shadow: none;
            margin: 0;
            max-width: 100%;
            border: none;
            border-radius: 0;
            padding: 1.5rem;
          }
          a { 
            color: #000 !important;
            text-decoration: none;
          }
          .break-inside-avoid {
              break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default Cv;