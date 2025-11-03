

import { type LucideIcon } from 'lucide-react';

export type Language = 'en' | 'vi';

export type NavigationHeader = {
  type: 'header';
  title: string;
};

export type NavigationLink = {
  type: 'link';
  id: string;
  title: string;
  icon: LucideIcon;
};

export type NavigationItem = NavigationHeader | NavigationLink;

export interface Project {
  name: string;
  description: string;
  link: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface EducationProject {
  name: string;
  link: string;
  type: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details: string[];
  projects?: EducationProject[];
}

export interface Link {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface Skill {
  name: string;
  level: 'Experienced' | 'Skillful' | 'Beginner';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface HelpAndSupportStrings {
    guideTitle: string;
    chatTitle: string;
    portfolioTab: string;
    toolboxTab: string;
    portfolioContent: {
        heading: string;
        p1: string;
        p2: string;
    };
    toolboxContent: {
        heading: string;
        p1: string;
        p2: string;
    };
    faqs: {
        question: string;
        answer: string;
    }[];
    apiKeySetup: {
        title: string;
        heading: string;
        p1: string;
        p2: string;
        linkText: string;
        inputLabel: string;
        inputPlaceholder: string;
        saveButton: string;
        clearButton: string;
        statusSet: string;
        statusNotSet: string;
        disabledTitle: string;
        disabledMessage: string;
        disabledMessageChat: string;
        disabledPlaceholder: string;
        buttonText: string;
    };
}

export interface ToolStrings {
    youtubeTitleGenerator: {
        topicLabel: string;
        topicDescription: string;
        topicPlaceholder: string;
        toneLabel: string;
        tones: {
            Professional: string;
            Casual: string;
            Clickbait: string;
        };
        buttonText: string;
        resultsTitle: string;
        error: string;
        reasoningLabel: string;
        loadingMessages: string[];
    };
    scriptTimer: {
        scriptLabel: string;
        scriptDescription: string;
        scriptPlaceholder: string;
        wpmLabel: string;
        buttonText: string;
        resultsTitle: string;
        estimatedTimeLabel: string;
        wordCountLabel: string;
        error: string;
        minute: string;
        minutes: string;
        second: string;
        seconds: string;
        lessThanASecond: string;
    };
    headlineGenerator: {
        topicLabel: string;
        topicDescription: string;
        topicPlaceholder: string;
        audienceLabel: string;
        audiencePlaceholder: string;
        buttonText: string;
        resultsTitle: string;
        error: string;
        reasoningLabel: string;
        loadingMessages: string[];
    };
    idiomExplainer: {
        idiomLabel: string;
        idiomDescription: string;
        idiomPlaceholder: string;
        buttonText: string;
        resultsTitle: string;
        meaningLabel: string;
        dialogueLabel: string;
        equivalentLabel: string;
        error: string;
        reasoningLabel: string;
        loadingMessages: string[];
    };
    clanNameGenerator: {
        themeLabel: string;
        themeDescription: string;
        themePlaceholder: string;
        countLabel: string;
        buttonText: string;
        resultsTitle: string;
        error: string;
        reasoningLabel: string;
        loadingMessages: string[];
    };
    chat: {
        placeholder: string;
        buttonText: string;
        askThisQuestion: string;
    }
}


export interface LanguageData {
    navigation: NavigationItem[];
    summaryText: string;
    experienceData: Experience[];
    projectsData: Project[];
    educationData: EducationItem[];
    skillsData: Skill[];
    linksData: Link[];
    header: {
        title: string;
        subtitle: string;
    };
    viewTitles: {
        summary: string;
        experience: string;
        projects: string;
        education: string;
        skills: string;
        links: string;
        youtubeTitleGenerator: string;
        scriptTimer: string;
        headlineGenerator: string;
        idiomExplainer: string;
        clanNameGenerator: string;
        helpAndSupport: string;
    };
    toolStrings: ToolStrings;
    helpAndSupport: HelpAndSupportStrings;
}