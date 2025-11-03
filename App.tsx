

import React, { useState, useEffect, useRef } from 'react';
import { i18n } from './constants';
import { type Language, type NavigationItem, type Project, type Experience, type EducationItem, type Skill, type Link as LinkType, type ToolStrings, type ChatMessage, HelpAndSupportStrings, NavigationLink } from './types';
import { ArrowUpRight, Copy, ThumbsUp, ChevronLeft, ChevronRight, BrainCircuit, ArrowUp, Send, AlertTriangle } from 'lucide-react';
import { initializeAi, getChatbotResponse, generateYoutubeTitles, countWordsInScript, generateHeadlines, explainIdiom, generateClanNames } from './services/geminiService';
import ChatBubble from './components/ChatBubble';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


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

const GenerateButton: React.FC<{ isLoading: boolean; onClick: () => void; text?: string; loadingText?: string }> = ({ isLoading, onClick, text = 'Generate', loadingText = 'Generating...' }) => (
    <button
        onClick={onClick}
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center bg-brand-purple text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed min-h-[48px]"
    >
        <span className="flex items-center justify-center">
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{loadingText}</span>
                </>
            ) : (
                <span>{text}</span>
            )}
        </span>
    </button>
);

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy}
            className="ml-4 p-2 rounded-md bg-border-color hover:bg-brand-purple text-text-secondary hover:text-white transition-colors flex-shrink-0"
            aria-label="Copy"
        >
            {copied ? <ThumbsUp className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
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

const DisabledToolView: React.FC<{ strings: HelpAndSupportStrings['apiKeySetup']; setActiveSection: (id: string) => void; }> = ({ strings, setActiveSection }) => (
    <Card>
        <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">{strings.disabledTitle}</h3>
            <p className="text-text-secondary mb-6">{strings.disabledMessage}</p>
            <button
                onClick={() => setActiveSection('help-and-support')}
                className="bg-brand-purple text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
            >
                {strings.buttonText}
            </button>
        </div>
    </Card>
);


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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

// --- AI Toolbox Views ---

const useLoadingMessage = (isLoading: boolean, messages: string[]) => {
    const [loadingMessage, setLoadingMessage] = useState(messages[0]);

    useEffect(() => {
        let interval: number;
        if (isLoading && messages.length > 0) {
            let i = 0;
            setLoadingMessage(messages[i]);
            interval = window.setInterval(() => {
                i = (i + 1) % messages.length;
                setLoadingMessage(messages[i]);
            }, 1500);
        }
        return () => window.clearInterval(interval);
    }, [isLoading, messages]);

    return loadingMessage;
};

const AIReasoning: React.FC<{ reasoning: string, label: string }> = ({ reasoning, label }) => (
    <div className="mt-3 pt-3 border-t border-border-color/50">
        <h4 className="text-sm font-semibold text-brand-purple flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" />
            {label}
        </h4>
        <p className="text-sm text-text-secondary mt-1">{reasoning}</p>
    </div>
);


const YouTubeTitleGeneratorView: React.FC<{ title: string; language: Language; strings: ToolStrings['youtubeTitleGenerator']; isApiKeySet: boolean; disabledStrings: HelpAndSupportStrings['apiKeySetup']; setActiveSection: (id: string) => void; }> = ({ title, language, strings, isApiKeySet, disabledStrings, setActiveSection }) => {
    const [topic, setTopic] = useState('');
    const [tone, setTone] = useState('Professional');
    const [titles, setTitles] = useState<{ title: string; reasoning: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loadingMessage = useLoadingMessage(isLoading, strings.loadingMessages);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError(strings.error);
            return;
        }
        setIsLoading(true);
        setError(null);
        setTitles([]);
        try {
            const result = await generateYoutubeTitles(topic, tone, language);
            setTitles(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isApiKeySet) {
        return (
            <>
                <SectionTitle>{title}</SectionTitle>
                <DisabledToolView strings={disabledStrings} setActiveSection={setActiveSection} />
            </>
        );
    }

    return (
        <>
            <SectionTitle>{title}</SectionTitle>
            <Card>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="video-topic" className="block text-sm font-medium text-text-primary mb-1">{strings.topicLabel}</label>
                        <p className="text-sm text-text-secondary mb-2">{strings.topicDescription}</p>
                        <textarea
                            id="video-topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder={strings.topicPlaceholder}
                            className="w-full bg-dark-bg border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                            rows={3}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="tone-select" className="block text-sm font-medium text-text-primary mb-1">{strings.toneLabel}</label>
                        <select
                            id="tone-select"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full bg-dark-bg border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                            disabled={isLoading}
                        >
                            {Object.entries(strings.tones).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <GenerateButton isLoading={isLoading} onClick={handleGenerate} text={strings.buttonText} loadingText={loadingMessage} />
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
            </Card>
            
            {titles.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-text-primary mb-4">{strings.resultsTitle}</h3>
                    <div className="space-y-4">
                        {titles.map((generated, index) => (
                             <Card key={index} className="group">
                                <div className="flex justify-between items-start">
                                    <p className="text-text-primary pr-4">{generated.title}</p>
                                    <CopyButton text={generated.title} />
                                </div>
                                <AIReasoning reasoning={generated.reasoning} label={strings.reasoningLabel} />
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

const ScriptTimerView: React.FC<{ title: string; language: Language; strings: ToolStrings['scriptTimer']; isApiKeySet: boolean; disabledStrings: HelpAndSupportStrings['apiKeySetup']; setActiveSection: (id: string) => void; }> = ({ title, language, strings, isApiKeySet, disabledStrings, setActiveSection }) => {
    const [script, setScript] = useState('');
    const [wpm, setWpm] = useState(150);
    const [result, setResult] = useState<{ estimatedTime: string; wordCount: number } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);
        const minText = minutes > 0 ? `${minutes} ${minutes > 1 ? strings.minutes : strings.minute}` : '';
        const secText = seconds > 0 ? `${seconds} ${seconds > 1 ? strings.seconds : strings.second}` : '';
        return [minText, secText].filter(Boolean).join(' ') || strings.lessThanASecond;
    };

    const handleEstimate = async () => {
        if (!script.trim()) {
            setError(strings.error);
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const { wordCount } = await countWordsInScript(script, language);
            const totalSeconds = (wordCount / wpm) * 60;
            setResult({
                wordCount,
                estimatedTime: formatTime(totalSeconds),
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (result) {
             const totalSeconds = (result.wordCount / wpm) * 60;
             setResult({
                ...result,
                estimatedTime: formatTime(totalSeconds),
            });
        }
    }, [wpm, result?.wordCount, strings]);

    if (!isApiKeySet) {
        return (
            <>
                <SectionTitle>{title}</SectionTitle>
                <DisabledToolView strings={disabledStrings} setActiveSection={setActiveSection} />
            </>
        );
    }

    return (
        <>
            <SectionTitle>{title}</SectionTitle>
            <Card>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="script-input" className="block text-sm font-medium text-text-primary mb-1">{strings.scriptLabel}</label>
                        <p className="text-sm text-text-secondary mb-2">{strings.scriptDescription}</p>
                        <textarea
                            id="script-input"
                            value={script}
                            onChange={(e) => setScript(e.target.value)}
                            placeholder={strings.scriptPlaceholder}
                            className="w-full bg-dark-bg border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                            rows={8}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                         <label htmlFor="wpm-slider" className="block text-sm font-medium text-text-primary mb-1">{strings.wpmLabel}: <span className="font-bold text-brand-purple">{wpm}</span></label>
                        <input
                            id="wpm-slider"
                            type="range"
                            min="100"
                            max="200"
                            value={wpm}
                            onChange={(e) => setWpm(parseInt(e.target.value, 10))}
                            className="w-full h-2 bg-border-color rounded-lg appearance-none cursor-pointer accent-brand-purple"
                        />
                    </div>
                    <div className="flex justify-center">
                        <GenerateButton isLoading={isLoading} onClick={handleEstimate} text={strings.buttonText} />
                    </div>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
            </Card>

            {result && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-text-primary mb-4">{strings.resultsTitle}</h3>
                    <Card>
                        <div className="flex justify-around items-center text-center">
                            <div>
                                <p className="text-3xl font-bold text-brand-purple">{result.estimatedTime}</p>
                                <p className="text-sm text-text-secondary mt-1">{strings.estimatedTimeLabel}</p>
                            </div>
                            <div className="border-l border-border-color h-16"></div>
                            <div>
                                <p className="text-3xl font-bold text-brand-purple">{result.wordCount}</p>
                                <p className="text-sm text-text-secondary mt-1">{strings.wordCountLabel}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};

const HeadlineGeneratorView: React.FC<{ title: string; language: Language; strings: ToolStrings['headlineGenerator']; isApiKeySet: boolean; disabledStrings: HelpAndSupportStrings['apiKeySetup']; setActiveSection: (id: string) => void; }> = ({ title, language, strings, isApiKeySet, disabledStrings, setActiveSection }) => {
    const [topic, setTopic] = useState('');
    const [audience, setAudience] = useState('');
    const [headlines, setHeadlines] = useState<{ headline: string; reasoning: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loadingMessage = useLoadingMessage(isLoading, strings.loadingMessages);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setError(strings.error);
            return;
        }
        setIsLoading(true);
        setError(null);
        setHeadlines([]);
        try {
            const result = await generateHeadlines(topic, audience, language);
            setHeadlines(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isApiKeySet) {
        return (
            <>
                <SectionTitle>{title}</SectionTitle>
                <DisabledToolView strings={disabledStrings} setActiveSection={setActiveSection} />
            </>
        );
    }
    
    return (
        <>
            <SectionTitle>{title}</SectionTitle>
            <Card>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="headline-topic" className="block text-sm font-medium text-text-primary mb-1">{strings.topicLabel}</label>
                        <p className="text-sm text-text-secondary mb-2">{strings.topicDescription}</p>
                        <textarea
                            id="headline-topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder={strings.topicPlaceholder}
                            className="w-full bg-dark-bg border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                            rows={3}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="target-audience" className="block text-sm font-medium text-text-primary mb-1">{strings.audienceLabel}</label>
                        <input
                            id="target-audience"
                            type="text"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder={strings.audiencePlaceholder}
                            className="w-full bg-dark-bg border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex justify-center">
                        <GenerateButton isLoading={isLoading} onClick={handleGenerate} text={strings.buttonText} loadingText={loadingMessage} />
                    </div>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
            </Card>
            
            {headlines.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-text-primary mb-4">{strings.resultsTitle}</h3>
                    <div className="space-y-4">
                        {headlines.map((generated, index) => (
                             <Card key={index} className="group">
                                <div className="flex justify-between items-start">
                                    <p className="text-text-primary pr-4">{generated.headline}</p>
                                    <CopyButton text={generated.headline} />
                                </div>
                                <AIReasoning reasoning={generated.reasoning} label={strings.reasoningLabel} />
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

const IdiomExplainerView: React.FC<{ title: string; language: Language; strings: ToolStrings['idiomExplainer']; isApiKeySet: boolean; disabledStrings: HelpAndSupportStrings['apiKeySetup']; setActiveSection: (id: string) => void; }> = ({ title, language, strings, isApiKeySet, disabledStrings, setActiveSection }) => {
    const [idiom, setIdiom] = useState('');
    const [result, setResult] = useState<{ explanation: string; dialogue: string; equivalent: string; dialogueReasoning: string; } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loadingMessage = useLoadingMessage(isLoading, strings.loadingMessages);

    const handleGenerate = async () => {
        if (!idiom.trim()) {
            setError(strings.error);
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const res = await explainIdiom(idiom, language);
            setResult(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

     if (!isApiKeySet) {
        return (
            <>
                <SectionTitle>{title}</SectionTitle>
                <DisabledToolView strings={disabledStrings} setActiveSection={setActiveSection} />
            </>
        );
    }

    return (
        <>
            <SectionTitle>{title}</SectionTitle>
            <Card>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="idiom-input" className="block text-sm font-medium text-text-primary mb-1">{strings.idiomLabel}</label>
                        <p className="text-sm text-text-secondary mb-2">{strings.idiomDescription}</p>
                        <input
                            id="idiom-input"
                            type="text"
                            value={idiom}
                            onChange={(e) => setIdiom(e.target.value)}
                            placeholder={strings.idiomPlaceholder}
                            className="w-full bg-dark-bg border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex justify-center">
                        <GenerateButton isLoading={isLoading} onClick={handleGenerate} text={strings.buttonText} loadingText={loadingMessage} />
                    </div>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
            </Card>
            
            {result && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-text-primary mb-4">{strings.resultsTitle}</h3>
                    <Card>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-brand-purple">{strings.meaningLabel}</h4>
                                <p className="text-text-secondary">{result.explanation}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-brand-purple">{strings.dialogueLabel}</h4>
                                <div className="text-text-secondary whitespace-pre-line border-l-2 border-border-color pl-4 italic my-2">{result.dialogue}</div>
                                <AIReasoning reasoning={result.dialogueReasoning} label={strings.reasoningLabel} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-brand-purple">{strings.equivalentLabel}</h4>
                                <p className="text-text-secondary">{result.equivalent}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};

const ClanNameGeneratorView: React.FC<{ title: string; language: Language; strings: ToolStrings['clanNameGenerator']; isApiKeySet: boolean; disabledStrings: HelpAndSupportStrings['apiKeySetup']; setActiveSection: (id: string) => void; }> = ({ title, language, strings, isApiKeySet, disabledStrings, setActiveSection }) => {
    const [theme, setTheme] = useState('');
    const [count, setCount] = useState(10);
    const [names, setNames] = useState<{ name: string; reasoning: string }[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loadingMessage = useLoadingMessage(isLoading, strings.loadingMessages);

    const handleGenerate = async () => {
        if (!theme.trim()) {
            setError(strings.error);
            return;
        }
        setIsLoading(true);
        setError(null);
        setNames([]);
        setCurrentIndex(0);
        try {
            const result = await generateClanNames(theme, count, language);
            setNames(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? names.length - 1 : prev - 1));
    const handleNext = () => setCurrentIndex(prev => (prev === names.length - 1 ? 0 : prev + 1));

    if (!isApiKeySet) {
        return (
            <>
                <SectionTitle>{title}</SectionTitle>
                <DisabledToolView strings={disabledStrings} setActiveSection={setActiveSection} />
            </>
        );
    }

    return (
        <>
            <SectionTitle>{title}</SectionTitle>
            <Card>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="clan-theme" className="block text-sm font-medium text-text-primary mb-1">{strings.themeLabel}</label>
                        <p className="text-sm text-text-secondary mb-2">{strings.themeDescription}</p>
                        <input
                            id="clan-theme"
                            type="text"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            placeholder={strings.themePlaceholder}
                            className="w-full bg-dark-bg border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                            disabled={isLoading}
                        />
                    </div>
                     <div>
                         <label htmlFor="name-count" className="block text-sm font-medium text-text-primary mb-1">{strings.countLabel}: <span className="font-bold text-brand-purple">{count}</span></label>
                        <input
                            id="name-count"
                            type="range"
                            min="5"
                            max="20"
                            step="5"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value, 10))}
                            className="w-full h-2 bg-border-color rounded-lg appearance-none cursor-pointer accent-brand-purple"
                        />
                    </div>
                    <div className="flex justify-center">
                        <GenerateButton isLoading={isLoading} onClick={handleGenerate} text={strings.buttonText} loadingText={loadingMessage} />
                    </div>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>
            </Card>
            
            {names.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-text-primary mb-4">{strings.resultsTitle}</h3>
                    <div className="relative">
                        <Card className="min-h-[180px]">
                            <div className="flex justify-between items-start">
                               <h3 className="text-2xl font-bold text-text-primary pr-4">{names[currentIndex].name}</h3>
                               <CopyButton text={names[currentIndex].name} />
                            </div>
                            <AIReasoning reasoning={names[currentIndex].reasoning} label={strings.reasoningLabel} />
                        </Card>
                        <div className="flex items-center justify-center gap-4 mt-4">
                           <button onClick={handlePrev} className="p-2 rounded-full bg-card-bg border border-border-color hover:bg-brand-purple text-text-secondary hover:text-white transition-colors" aria-label="Previous name">
                               <ChevronLeft className="w-5 h-5" />
                           </button>
                           <span className="text-sm font-semibold text-text-secondary tabular-nums">{currentIndex + 1} / {names.length}</span>
                           <button onClick={handleNext} className="p-2 rounded-full bg-card-bg border border-border-color hover:bg-brand-purple text-text-secondary hover:text-white transition-colors" aria-label="Next name">
                               <ChevronRight className="w-5 h-5" />
                           </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// --- Help & Support Views ---

const ChatAssistant: React.FC<{ onThemeChange: (theme: 'default' | 'synthwave') => void; strings: ToolStrings['chat'], faqs: HelpAndSupportStrings['faqs']; isApiKeySet: boolean; disabledStrings: HelpAndSupportStrings['apiKeySetup']; setActiveSection: (id: string) => void; }> = ({ onThemeChange, strings, faqs, isApiKeySet, disabledStrings }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatHistoryRef = useRef<HTMLDivElement>(null);
    
    const [showFAQs, setShowFAQs] = useState(true);
    const [faqIndex, setFaqIndex] = useState(0);

    useEffect(() => {
        chatHistoryRef.current?.scrollTo({ top: chatHistoryRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (!isApiKeySet && messages.length === 0) {
            setMessages([{ role: 'model', text: disabledStrings.disabledMessageChat }]);
        }
    }, [isApiKeySet, messages.length, disabledStrings]);


    const handleFaqNav = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setFaqIndex(prev => (prev === 0 ? faqs.length - 1 : prev - 1));
        } else {
            setFaqIndex(prev => (prev === faqs.length - 1 ? 0 : prev + 1));
        }
    };
    
    const handleSendMessage = async (prefilledMessage?: string) => {
        const trimmedInput = (prefilledMessage || userInput).trim();
        if (!trimmedInput || isLoading || !isApiKeySet) return;
        
        setShowFAQs(false);

        const newMessages: ChatMessage[] = [...messages, { role: 'user', text: trimmedInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        const history = newMessages.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));
        
        try {
            let responseText = await getChatbotResponse(trimmedInput, history);
            
            if (responseText.includes('---SYNTHWAVE_MODE_ACTIVATE---')) {
                onThemeChange('synthwave');
                responseText = responseText.replace('---SYNTHWAVE_MODE_ACTIVATE---', '').trim() || 'Synthwave mode activated!';
            } else if (responseText.includes('---SYNTHWAVE_MODE_DEACTIVATE---')) {
                onThemeChange('default');
                responseText = responseText.replace('---SYNTHWAVE_MODE_DEACTIVATE---', '').trim() || 'Returning to normal theme.';
            }

            if (responseText) {
                 setMessages(prev => [...prev, { role: 'model', text: responseText }]);
            }

        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="flex flex-col h-[600px]">
            <div ref={chatHistoryRef} className="flex-1 overflow-y-auto pr-2 space-y-4">
                {showFAQs && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-text-secondary">
                         <BrainCircuit className="w-12 h-12 mb-4 text-brand-purple" />
                         <h3 className="font-semibold text-text-primary mb-4">Frequently Asked Questions</h3>
                         <div className="w-full bg-dark-bg p-4 rounded-lg border border-border-color min-h-[150px] flex flex-col justify-center">
                            <p className="font-semibold text-text-primary mb-2">{faqs[faqIndex].question}</p>
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="font-semibold underline text-brand-purple" /> }}>
                                {faqs[faqIndex].answer}
                            </ReactMarkdown>
                         </div>
                         <div className="mt-4 flex items-center justify-center gap-4">
                            <button onClick={() => handleFaqNav('prev')} className="p-1 rounded-full hover:bg-border-color text-text-secondary"><ChevronLeft className="w-5 h-5"/></button>
                            <button onClick={() => handleSendMessage(faqs[faqIndex].question)} className="text-sm text-brand-purple hover:underline" disabled={!isApiKeySet}>{strings.askThisQuestion}</button>
                            <button onClick={() => handleFaqNav('next')} className="p-1 rounded-full hover:bg-border-color text-text-secondary"><ChevronRight className="w-5 h-5"/></button>
                         </div>
                    </div>
                )}
                
                {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
                 {isLoading && isApiKeySet && <div className="flex justify-center"><div className="w-3 h-3 bg-brand-purple rounded-full animate-bounce"></div></div>}
            </div>
            <div className="mt-4 pt-4 border-t border-border-color">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                        placeholder={isApiKeySet ? strings.placeholder : disabledStrings.disabledPlaceholder}
                        className="w-full bg-dark-bg border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                        disabled={isLoading || !isApiKeySet}
                    />
                    <button
                        onClick={() => handleSendMessage()}
                        disabled={isLoading || !userInput.trim() || !isApiKeySet}
                        className="p-3 bg-brand-purple text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                        aria-label={strings.buttonText}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </Card>
    );
};


const HelpAndSupportView: React.FC<{ title: string; onThemeChange: (theme: 'default' | 'synthwave') => void; strings: HelpAndSupportStrings; chatStrings: ToolStrings['chat']; onApiKeyUpdate: (key: string | null) => void; isApiKeySet: boolean; }> = ({ title, onThemeChange, strings, chatStrings, onApiKeyUpdate, isApiKeySet }) => {
    const [activeTab, setActiveTab] = useState('guide');
    const [apiKeyValue, setApiKeyValue] = useState('');
    const [saveMessage, setSaveMessage] = useState('');
    
    const handleSaveKey = () => {
        onApiKeyUpdate(apiKeyValue);
        setSaveMessage('API Key saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    const handleClearKey = () => {
        onApiKeyUpdate(null);
        setApiKeyValue('');
        setSaveMessage('API Key cleared.');
        setTimeout(() => setSaveMessage(''), 3000);
    };
    
    return (
        <>
            <SectionTitle>{title}</SectionTitle>
            <div className="flex mb-6 border-b border-border-color">
                <button 
                    onClick={() => setActiveTab('guide')} 
                    className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'guide' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-text-secondary hover:text-text-primary'}`}
                >
                    {strings.guideTitle}
                </button>
                <button 
                    onClick={() => setActiveTab('chat')} 
                    className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'chat' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-text-secondary hover:text-text-primary'}`}
                >
                    {strings.chatTitle}
                </button>
                <button 
                    onClick={() => setActiveTab('api')} 
                    className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'api' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-text-secondary hover:text-text-primary'}`}
                >
                    {strings.apiKeySetup.title}
                </button>
            </div>
            
            {activeTab === 'guide' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <h3 className="font-bold text-text-primary mb-2">{strings.portfolioContent.heading}</h3>
                        <p className="text-sm text-text-secondary mb-3">{strings.portfolioContent.p1}</p>
                        <p className="text-sm text-text-secondary">{strings.portfolioContent.p2}</p>
                    </Card>
                    <Card>
                        <h3 className="font-bold text-text-primary mb-2">{strings.toolboxContent.heading}</h3>
                        <p className="text-sm text-text-secondary mb-3">{strings.toolboxContent.p1}</p>
                        <p className="text-sm text-text-secondary">{strings.toolboxContent.p2}</p>
                    </Card>
                </div>
            )}

            {activeTab === 'chat' && <ChatAssistant onThemeChange={onThemeChange} strings={chatStrings} faqs={strings.faqs} isApiKeySet={isApiKeySet} disabledStrings={strings.apiKeySetup} setActiveSection={() => {}} />}
            
            {activeTab === 'api' && (
                 <Card>
                    <h3 className="font-bold text-text-primary mb-2">{strings.apiKeySetup.heading}</h3>
                    <p className="text-sm text-text-secondary mb-3">{strings.apiKeySetup.p1}</p>
                    <p className="text-sm text-text-secondary mb-4">
                        {strings.apiKeySetup.p2}
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-brand-purple hover:text-purple-400 ml-1">
                           {strings.apiKeySetup.linkText}
                        </a>.
                    </p>
                    <div className="space-y-4">
                         <div>
                            <label htmlFor="api-key-input" className="block text-sm font-medium text-text-primary mb-1">{strings.apiKeySetup.inputLabel}</label>
                            <input
                                id="api-key-input"
                                type="password"
                                value={apiKeyValue}
                                onChange={(e) => setApiKeyValue(e.target.value)}
                                placeholder={strings.apiKeySetup.inputPlaceholder}
                                className="w-full bg-dark-bg border border-border-color rounded-md p-3 text-text-primary focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                             <button onClick={handleSaveKey} className="flex-1 bg-brand-purple text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50" disabled={!apiKeyValue}>
                                {strings.apiKeySetup.saveButton}
                             </button>
                             <button onClick={handleClearKey} className="flex-1 bg-border-color text-text-primary font-semibold px-6 py-3 rounded-md hover:bg-red-500/50 transition-colors">
                                {strings.apiKeySetup.clearButton}
                             </button>
                        </div>
                        <p className="text-sm text-center">
                            Current Status: 
                            <span className={`font-semibold ml-1 ${isApiKeySet ? 'text-green-400' : 'text-yellow-400'}`}>
                                {isApiKeySet ? strings.apiKeySetup.statusSet : strings.apiKeySetup.statusNotSet}
                            </span>
                        </p>
                        {saveMessage && <p className="text-sm text-center text-brand-purple">{saveMessage}</p>}
                    </div>
                </Card>
            )}

        </>
    );
};


// --- Main App Component ---

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [theme, setTheme] = useState<'default' | 'synthwave'>('default');
    const [showScroll, setShowScroll] = useState(false);
    const [isApiKeySet, setIsApiKeySet] = useState(false);
    
    const data = i18n[language];
    
    useEffect(() => {
        document.documentElement.className = theme === 'synthwave' ? 'theme-synthwave' : '';
    }, [theme]);

    const getFirstSectionId = (navItems: NavigationItem[]) => {
        const firstLink = navItems.find(item => item.type === 'link');
        return firstLink && 'id' in firstLink ? firstLink.id : '';
    };

    const [activeSection, setActiveSection] = useState<string>(getFirstSectionId(data.navigation));

    // Initialize AI service on first load
    useEffect(() => {
        const storedKey = localStorage.getItem('user-gemini-api-key');
        if (storedKey) {
            initializeAi(storedKey);
            setIsApiKeySet(true);
        } else if (process.env.API_KEY) { // Fallback for local dev
            initializeAi(process.env.API_KEY);
            setIsApiKeySet(true);
        } else {
            setIsApiKeySet(false);
        }
    }, []);

    const handleApiKeyUpdate = (key: string | null) => {
        if (key) {
            localStorage.setItem('user-gemini-api-key', key);
            initializeAi(key);
            setIsApiKeySet(true);
        } else {
            localStorage.removeItem('user-gemini-api-key');
            initializeAi(''); // De-initialize
            setIsApiKeySet(false);
        }
    };

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
        const aiToolProps = { isApiKeySet, disabledStrings: data.helpAndSupport.apiKeySetup, setActiveSection };
        switch (activeSection) {
            case 'summary': {
                const dashboardItems = data.navigation.filter(
                    item => item.type === 'link' && ['experience', 'projects', 'education', 'skills'].includes(item.id)
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
            case 'youtube-title-generator': return <YouTubeTitleGeneratorView title={data.viewTitles.youtubeTitleGenerator} language={language} strings={data.toolStrings.youtubeTitleGenerator} {...aiToolProps} />;
            case 'script-timer': return <ScriptTimerView title={data.viewTitles.scriptTimer} language={language} strings={data.toolStrings.scriptTimer} {...aiToolProps} />;
            case 'headline-generator': return <HeadlineGeneratorView title={data.viewTitles.headlineGenerator} language={language} strings={data.toolStrings.headlineGenerator} {...aiToolProps} />;
            case 'idiom-explainer': return <IdiomExplainerView title={data.viewTitles.idiomExplainer} language={language} strings={data.toolStrings.idiomExplainer} {...aiToolProps} />;
            case 'clan-name-generator': return <ClanNameGeneratorView title={data.viewTitles.clanNameGenerator} language={language} strings={data.toolStrings.clanNameGenerator} {...aiToolProps} />;
            case 'help-and-support': return <HelpAndSupportView title={data.viewTitles.helpAndSupport} onThemeChange={setTheme} strings={data.helpAndSupport} chatStrings={data.toolStrings.chat} onApiKeyUpdate={handleApiKeyUpdate} isApiKeySet={isApiKeySet} />;
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
