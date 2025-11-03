import React, { useState, useEffect } from 'react';
import { i18n } from './constants';
import { type Language, type NavigationItem, type Project, type Experience, type EducationItem, type Skill, type Link as LinkType, NavigationLink } from './types';
import { ArrowUpRight, ArrowUp } from 'lucide-react';

// --- Reusable Components ---

const LanguageSwitcher: React.FC<{ language: Language; setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => (
    <div className="flex items-center bg-card-bg border border-border-color rounded-full p-1 shadow-md">
        <button 
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${language === 'en' ? 'bg-brand-purple text-white' : 'text-text-secondary hover:text-text-primary'}`}
            aria-pressed={language === 'en'}
        >
            EN
        </button>
        <button 
            onClick={() => setLanguage('vi')}
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${language === 'vi' ? 'bg-brand-purple text-white' : 'text-text-secondary hover:text-text-primary'}`}
            aria-pressed={language === 'vi'}
        >
            VI
        </button>
    </div>
);

const CenteredHeader: React.FC<{ title: string; subtitle: string; language: Language; setLanguage: (lang: Language) => void }> = ({ title, subtitle, language, setLanguage }) => (
    <header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-text-primary tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 text-lg text-text-secondary sm:text-xl">{subtitle}</p>
        <div className="mt-6 flex justify-center">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
    </header>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-bold text-text-primary mb-8">{children}</h2>
);

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-card-bg border border-border-color rounded-xl p-6 transition-all hover:border-brand-purple/50 hover:shadow-lg hover:shadow-brand-purple/10 ${className}`}>
        {children}
    </div>
);

const Sidebar: React.FC<{ navigationItems: NavigationItem[]; activeSection: string; setActiveSection: (id: string) => void }> = ({ navigationItems, activeSection, setActiveSection }) => (
    <aside className="md:w-1/4 lg:w-1/5 md:sticky md:top-8 self-start">
        <div className="p-2 bg-card-bg/50 border border-border-color rounded-xl">
            <nav className="flex flex-col gap-1">
                {navigationItems.map((item, index) => {
                    if (item.type === 'header') {
                        return <h2 key={index} className="text-sm font-semibold text-text-secondary px-3 pt-4 pb-2 uppercase tracking-wider">{item.title}</h2>;
                    }
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left ${
                                activeSection === item.id
                                    ? 'bg-brand-purple text-white'
                                    : 'text-text-secondary hover:bg-border-color hover:text-text-primary'
                            }`}
                        >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            <span>{item.title}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    </aside>
);

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const yearString = currentYear === 2025 ? '2025' : `2025-${currentYear}`;
    return (
        <footer className="text-center text-xs text-text-secondary py-6 mt-auto border-t border-border-color">
            © {yearString} Developed by MrLuke1618. All rights reserved.
        </footer>
    );
};

const BackToTopButton: React.FC<{ show: boolean; onClick: () => void; }> = ({ show, onClick }) => {
    if (!show) return null;
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-brand-purple text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-1 z-50"
            aria-label="Go to top"
        >
            <ArrowUp className="w-6 h-6" />
        </button>
    );
};


// --- Section Views ---

const SummaryView: React.FC<{ 
    title: string; 
    summaryText: string; 
    dashboardItems: NavigationLink[]; 
    setActiveSection: (id: string) => void; 
}> = ({ title, summaryText, dashboardItems, setActiveSection }) => (
    <>
        <SectionTitle>{title}</SectionTitle>
        <div className="space-y-8">
            <Card>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">{summaryText}</p>
            </Card>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {dashboardItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className="group bg-card-bg border border-border-color rounded-lg p-4 text-center transition-all hover:border-brand-purple hover:shadow-md hover:shadow-brand-purple/10"
                    >
                        <item.icon className="w-8 h-8 mx-auto text-text-secondary group-hover:text-brand-purple transition-colors mb-2" />
                        <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                    </button>
                ))}
            </div>
        </div>
    </>
);

const ExperienceView: React.FC<{ title: string; experienceData: Experience[] }> = ({ title, experienceData }) => (
    <>
        <SectionTitle>{title}</SectionTitle>
        <div className="space-y-6">
            {experienceData.map((job) => (
                <Card key={job.company}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-text-primary">{job.role}</h3>
                            <p className="text-sm text-text-secondary">{job.company}</p>
                        </div>
                        <p className="text-xs text-text-secondary flex-shrink-0 ml-4 text-right">{job.period}</p>
                    </div>
                    <ul className="mt-4 list-disc list-inside text-text-secondary text-sm space-y-2">
                        {job.achievements.map((ach, index) => <li key={index}>{ach}</li>)}
                    </ul>
                </Card>
            ))}
        </div>
    </>
);

const ProjectsView: React.FC<{ title: string; projectsData: Project[] }> = ({ title, projectsData }) => (
    <>
        <SectionTitle>{title}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project) => (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block" key={project.name}>
                    <Card className="h-full group">
                        <h3 className="font-bold text-text-primary group-hover:text-brand-purple transition-colors">{project.name}</h3>
                        <p className="text-sm text-text-secondary mt-2 mb-4">{project.description}</p>
                        <div className="text-sm font-semibold text-brand-purple flex items-center gap-1">
                            View Project <ArrowUpRight className="w-4 h-4 transform group-hover:-translate-y-px group-hover:translate-x-px transition-transform" />
                        </div>
                    </Card>
                </a>
            ))}
        </div>
    </>
);

const EducationView: React.FC<{ title: string; educationData: EducationItem[] }> = ({ title, educationData }) => (
    <>
        <SectionTitle>{title}</SectionTitle>
        <div className="space-y-6">
            {educationData.map((edu) => (
                <Card key={edu.institution}>
                    <h3 className="font-bold text-text-primary">{edu.degree}</h3>
                    <p className="text-sm text-text-secondary">{edu.institution}</p>
                    <p className="text-xs text-text-secondary mt-1">{edu.period}</p>
                    <ul className="mt-4 text-sm text-text-secondary space-y-1">
                       {edu.details.map((detail, i) => <li key={i}>- {detail}</li>)}
                    </ul>
                     {edu.projects && (
                        <div className="mt-4 pt-4 border-t border-border-color">
                            <h4 className="text-sm font-semibold text-text-primary mb-2">Key Projects:</h4>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {edu.projects.map(p => (
                                    <a href={p.link} key={p.name} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-purple hover:underline p-2 rounded-md hover:bg-border-color flex items-center justify-between">
                                        <span>{p.name} <span className="text-text-secondary text-xs">({p.type})</span></span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            ))}
        </div>
    </>
);

const SkillsView: React.FC<{ title: string; skillsData: Skill[] }> = ({ title, skillsData }) => (
    <>
        <SectionTitle>{title}</SectionTitle>
        <Card>
            {['Experienced', 'Skillful', 'Beginner'].map(level => (
                <div key={level} className="mb-4 last:mb-0">
                    <h3 className="text-sm font-semibold text-brand-purple mb-2 capitalize">{level}</h3>
                    <div className="flex flex-wrap gap-2">
                        {skillsData.filter(s => s.level.toLowerCase() === level.toLowerCase()).map(skill => (
                            <span key={skill.name} className="bg-border-color text-text-primary text-sm px-3 py-1 rounded-full">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </Card>
    </>
);

const LinksView: React.FC<{ title: string; linksData: LinkType[] }> = ({ title, linksData }) => (
    <>
        <SectionTitle>{title}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {linksData.map((link) => (
                <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name} className="block group">
                     <Card>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <link.icon className="w-5 h-5 text-text-secondary group-hover:text-brand-purple transition-colors" />
                                <span className="font-semibold text-text-primary">{link.name}</span>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-text-secondary transform transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                    </Card>
                </a>
            ))}
        </div>
    </>
);

// --- Main App Component ---

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [showScroll, setShowScroll] = useState(false);
    
    const data = i18n[language];
    
    const getFirstSectionId = (navItems: NavigationItem[]) => {
        const firstLink = navItems.find(item => item.type === 'link');
        return firstLink && 'id' in firstLink ? firstLink.id : '';
    };

    const [activeSection, setActiveSection] = useState<string>(getFirstSectionId(data.navigation));

    useEffect(() => {
        const sectionExists = data.navigation.some(item => item.type === 'link' && item.id === activeSection);
        if (!sectionExists) {
            setActiveSection(getFirstSectionId(data.navigation));
        }
    }, [language, activeSection, data.navigation]);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScroll]);

    const renderContent = () => {
        switch (activeSection) {
            case 'summary': {
                const dashboardItems = data.navigation.filter(
                    item => item.type === 'link' && ['experience', 'projects', 'education', 'skills', 'links'].includes(item.id)
                ) as NavigationLink[];
                return <SummaryView 
                    title={data.viewTitles.summary} 
                    summaryText={data.summaryText} 
                    dashboardItems={dashboardItems} 
                    setActiveSection={setActiveSection}
                />;
            }
            case 'experience': return <ExperienceView title={data.viewTitles.experience} experienceData={data.experienceData} />;
            case 'projects': return <ProjectsView title={data.viewTitles.projects} projectsData={data.projectsData} />;
            case 'education': return <EducationView title={data.viewTitles.education} educationData={data.educationData} />;
            case 'skills': return <SkillsView title={data.viewTitles.skills} skillsData={data.skillsData} />;
            case 'links': return <LinksView title={data.viewTitles.links} linksData={data.linksData} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen font-sans flex flex-col">
            <div className="flex-grow w-full">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    <CenteredHeader 
                        title={data.header.title} 
                        subtitle={data.header.subtitle}
                        language={language}
                        setLanguage={setLanguage}
                    />
                    <div className="flex flex-col md:flex-row gap-8 mt-8">
                        <Sidebar navigationItems={data.navigation} activeSection={activeSection} setActiveSection={setActiveSection} />
                        <main className="flex-1">
                            <div key={activeSection} className="fade-in">
                                {renderContent()}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
            <BackToTopButton show={showScroll} onClick={scrollTop} />
        </div>
    );
};

export default App;
