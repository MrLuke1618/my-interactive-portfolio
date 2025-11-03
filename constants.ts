

import { type LanguageData } from './types';
import { User, Briefcase, Lightbulb, GraduationCap, Star, Link2, Youtube, Linkedin, FileText, Video, FileCode2, TextCursorInput, Timer, Newspaper, Languages, Gamepad2, HelpCircle } from 'lucide-react';

export const i18n: { en: LanguageData; vi: LanguageData } = {
  en: {
    header: {
      title: 'Hoang Cao Minh',
      subtitle: 'Video Editor & News Editor & Translator'
    },
    navigation: [
      { type: 'header', title: 'Portfolio' },
      { type: 'link', id: 'summary', title: 'Summary', icon: User },
      { type: 'link', id: 'experience', title: 'Experience', icon: Briefcase },
      { type: 'link', id: 'projects', title: 'AI Projects', icon: Lightbulb },
      { type: 'link', id: 'education', title: 'Education', icon: GraduationCap },
      { type: 'link', id: 'skills', title: 'Skills', icon: Star },
      { type: 'link', id: 'links', title: 'Social & Links', icon: Link2 },
      { type: 'header', title: 'AI Toolbox Demo' },
      { type: 'link', id: 'youtube-title-generator', title: 'YouTube Title Generator', icon: TextCursorInput },
      { type: 'link', id: 'script-timer', title: 'Script Timer', icon: Timer },
      { type: 'link', id: 'headline-generator', title: 'Headline Generator', icon: Newspaper },
      { type: 'link', id: 'idiom-explainer', title: 'Idiom Explainer', icon: Languages },
      { type: 'link', id: 'clan-name-generator', title: 'Clan Name Generator', icon: Gamepad2 },
      { type: 'link', id: 'help-and-support', title: 'Help & Support', icon: HelpCircle },
    ],
    viewTitles: {
        summary: 'Professional Summary',
        experience: 'Work Experience',
        projects: 'AI App Projects',
        education: 'Education',
        skills: 'Skills',
        links: 'Social Media & Links',
        youtubeTitleGenerator: 'AI-Powered YouTube Title Generator',
        scriptTimer: 'AI Script Read-Time Estimator',
        headlineGenerator: 'AI News Headline Generator',
        idiomExplainer: 'AI-Powered Idiom Explainer',
        clanNameGenerator: 'AI Gaming Clan Name Generator',
        helpAndSupport: 'Help & Support',
    },
    summaryText: "Video Editor and News Editor with over six years of experience in elevating content clarity and reader engagement across multiple platforms. Experienced in video editing, Figma, and Canva, with a history of producing impactful cryptocurrency videos and authoring over 1,000 articles. Passionate about leveraging skills in social media management and software development to pioneer innovative content strategies, drive audience interaction, and develop powerful AI tools for the future.",
    keyStats: [
      { value: '6+', label: 'Years in Media' },
      { value: '1,000+', label: 'Articles Written' },
      { value: '400+', label: 'Articles Edited' },
      { value: '52+', label: 'Videos Produced' },
      { value: '8+', label: 'Apps Developed' },
    ],
    experienceData: [
        { 
            role: 'VIDEO EDITOR/NEWS EDITOR',
            company: 'TB Group (Hanoi, Vietnam)',
            period: 'Jul 2023 – Jan 2024',
            achievements: [
                'Edited 400+ articles in 6 months, enhancing content quality and clarity.',
                'Authored 1,000+ articles on cryptocurrency and tech, enhancing reader engagement and knowledge.',
                'Created internal guides on Canva, boosting team collaboration and skill development.',
                'Conducted interviews with industry leaders, enriching content quality and market insight.',
            ]
        },
        { 
            role: 'NEWS EDITOR',
            company: 'Cryptoday (Hanoi, Vietnam)',
            period: 'Jun 2022 – May 2023',
            achievements: [
                 'Led media team to produce 52 cryptocurrency videos, enhancing content clarity and delivery.',
                 'Monitored top crypto publications for trend analysis, ensuring up-to-date reporting.',
                 'Directed creation of tutorial videos, improving audience engagement significantly.',
                 'Managed video production, ensuring timely completion and clear communication.',
            ]
        },
        { 
            role: 'VIDEO EDITOR',
            company: 'ECI HOLDINGS JOINT STOCK COMPANY (Hanoi, Vietnam)',
            period: 'Feb 2022 – Apr 2022',
            achievements: [
                'Led video editing projects from storyboard to final format.',
                'Developed creative concepts and compelling video narratives.'
            ]
        },
        { 
            role: 'VIDEO EDITOR (FULL TIME)',
            company: 'Lotus Media (Hanoi, Vietnam)',
            period: 'Oct 2018 – Jan 2022',
            achievements: [
                 'Increased YouTube subscribers from 1,000 to 72,000.',
                 'Managed multiple channels, enhancing audience interaction.',
                 'Oversaw post-production, ensuring quality and continuity.'
            ]
        },
        { 
            role: 'VIDEO EDITOR (PART TIME)',
            company: 'Pinetree Securities (Hanoi, Vietnam)',
            period: 'Dec 2020 – Apr 2021',
            achievements: [
                'Applied subtitles and effects to enhance YouTube videos, ensuring timely task completion.',
                'Improved video quality through color correction, resulting in positive viewer feedback.',
                'Managed deadlines and communication, contributing to seamless production workflows.'
            ]
        },
    ],
    projectsData: [
        { name: 'Content Compass', description: 'Summarizes content trends using AI.', link: 'https://mrluke1618.github.io/content-compass' },
        { name: 'Customer Insights AI', description: 'Summarizes customer reviews with AI.', link: 'https://mrluke1618.github.io/customer-review-summarizer' },
        { name: 'Doc QA Assistant', description: 'AI document proofreader.', link: 'https://mrluke1618.github.io/ai-proofreader' },
        { name: 'AI Audio Studio', description: 'Create, edit, and enhance audio with AI.', link: 'https://mrluke1618.github.io/ai-audio-studio' },
        { name: 'IELTS Practice Pod', description: 'AI-powered practice for all 4 IELTS skills.', link: 'https://mrluke1618.github.io/ielts-practice-app' },
        { name: 'Creator’s Toolbox', description: 'Toolkit for creators and editors.', link: 'https://mrluke1618.github.io/mrluke1818-creators-toolbox' },
        { name: 'Kokoro English Guide', description: 'Interactive English learning guide.', link: 'https://mrluke1618.github.io/Kokoro-English-Guide/preloader.html' },
    ],
    educationData: [
        {
            degree: 'Master’s Degree in Communication and Media Studies',
            institution: 'Dublin City University',
            period: '2024–2025',
            details: ['Grade: Second Class Honours, Grade I', 'Modules: Imaging, Audio & Sonic Design, Understanding Social Media, Responsive Media, Screenwriting, Visual Design, Moving Image & Video Production, Project Plan & Management, Major Project.'],
            projects: [
                { name: 'The Sailboat (Major Project)', link: 'https://mrluke1618.github.io/Major-Project-WebGL', type: 'WebGL' },
                { name: 'Stories Of The Liberties', link: 'https://minhhoangcaodcu.wordpress.com/2024/12/05/stories-of-the-liberties', type: 'Blog' },
                { name: 'Emerging Media Praxis', link: 'https://www.tiktok.com/@hoangcao2704/video/7468458115822849297', type: 'TikTok' },
                { name: 'Visual Design Module', link: 'https://drive.google.com/drive/folders/1ongFDTY1WamiKPnmdiLkW2Q-zz_6jQuv', type: 'Assets' },
                { name: 'The Stillness Before The Storm', link: 'https://drive.google.com/file/d/1Q2hUgetAZfBgNaouebMADcgBQ1yY1_wD/view?usp=sharing', type: 'Script' },
                { name: 'Pawsitive Nutrition App', link: 'https://www.tiktok.com/@hoangcao2704/video/7480205819913473298', type: 'Figma' },
                { name: 'The Post (Unity 6 App)', link: 'https://www.youtube.com/watch?v=M3MkM_OE3Oc', type: 'Demo' },
            ]
        },
        {
            degree: 'Bachelor of Technology (Information Technology)',
            institution: 'Posts and Telecommunications Institute of Technology, Hanoi',
            period: '2013–2018',
            details: ['Developed interactive English grammar MCQ test in Unity 2017.', 'Final project score: 8.29/10.', 'Skills: Unity, research, and time management.'],
        }
    ],
    skillsData: [
        { name: 'Video Editing', level: 'Experienced' },
        { name: 'News Editing', level: 'Experienced' },
        { name: 'AI App Development', level: 'Skillful' },
        { name: 'Figma', level: 'Skillful' },
        { name: 'Canva', level: 'Skillful' },
        { name: 'Unity Software Development', level: 'Skillful' },
        { name: 'Social Media Management', level: 'Skillful' },
        { name: 'Graphic Design', level: 'Skillful' },
        { name: 'Acting', level: 'Beginner' },
    ],
    linksData: [
        { name: 'YouTube', url: 'https://www.youtube.com/@luke1618gamer', icon: Youtube },
        { name: 'TikTok', url: 'https://www.tiktok.com/@hoangcao2704', icon: Video },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hoangminhcao', icon: Linkedin },
        { name: 'Video Showcase', url: 'https://drive.google.com/file/d/1MKrJ9lNwt3Y0gzC2UYbodEIYDmIc0iVa/view?usp=drive_link', icon: FileText },
        { name: 'Work Portfolio', url: 'https://docs.google.com/document/d/1ZO9BMG0B3p7g_aXBwxDnV92xEyVCbmjk_HJZeSpGKYk/edit?usp=sharing', icon: FileCode2 },
        { name: 'IELTS 7.5', url: 'https://drive.google.com/file/d/11RWK0L2g-zs440j-dh8ig5RMIpG0KIWY/view?usp=sharing', icon: FileText },
        { name: 'TOEIC 960', url: 'https://drive.google.com/file/d/1vT5oUbCPYPcBTH50dfzlVG-sl9FPvUcV/view?usp=sharing', icon: FileText },
    ],
    toolStrings: {
        youtubeTitleGenerator: {
            topicLabel: 'Video Topic or Idea',
            topicDescription: 'Describe your video in a few words. The more specific, the better the titles!',
            topicPlaceholder: "e.g., 'Unboxing the new iPhone 15 Pro Max and first impressions'",
            toneLabel: 'Select a Tone',
            tones: {
                Professional: 'Professional',
                Casual: 'Casual',
                Clickbait: 'Clickbait',
            },
            buttonText: 'Generate Titles',
            resultsTitle: 'Generated Titles',
            error: 'Please enter a video topic.',
            reasoningLabel: 'AI Reasoning',
            loadingMessages: ['Analyzing your topic...', 'Brainstorming creative titles...', 'Adding SEO magic...'],
        },
        scriptTimer: {
            scriptLabel: 'Video Script',
            scriptDescription: 'Paste your script to estimate its read time.',
            scriptPlaceholder: 'Paste your script here...',
            wpmLabel: 'Words Per Minute (WPM)',
            buttonText: 'Estimate Time',
            resultsTitle: 'Estimation Result',
            estimatedTimeLabel: 'Estimated Read Time',
            wordCountLabel: 'Word Count',
            error: 'Please enter a script.',
            minute: 'minute',
            minutes: 'minutes',
            second: 'second',
            seconds: 'seconds',
            lessThanASecond: 'Less than a second'
        },
        headlineGenerator: {
            topicLabel: 'Article Topic or Summary',
            topicDescription: 'Provide a topic to generate compelling, click-worthy headlines.',
            topicPlaceholder: "e.g., 'The impact of AI on modern journalism'",
            audienceLabel: 'Target Audience (Optional)',
            audiencePlaceholder: "e.g., 'Tech Enthusiasts', 'Students'",
            buttonText: 'Generate Headlines',
            resultsTitle: 'Generated Headlines',
            error: 'Please enter a topic.',
            reasoningLabel: 'AI Reasoning',
            loadingMessages: ['Scanning the topic...', 'Crafting witty headlines...', 'Tailoring for your audience...'],
        },
        idiomExplainer: {
            idiomLabel: 'Idiom or Phrase',
            idiomDescription: 'Enter an idiom to get its meaning, an example, and cultural equivalents.',
            idiomPlaceholder: "e.g., 'Bite the bullet'",
            buttonText: 'Explain Idiom',
            resultsTitle: 'Explanation',
            meaningLabel: 'Meaning',
            dialogueLabel: 'Example Dialogue',
            equivalentLabel: 'Contextual Equivalent',
            error: 'Please enter an idiom.',
            reasoningLabel: 'Why this dialogue works',
            loadingMessages: ['Consulting the dictionary...', 'Understanding the nuance...', 'Creating a scenario...'],
        },
        clanNameGenerator: {
            themeLabel: 'Clan Theme',
            themeDescription: "Enter a theme like 'Cyberpunk', 'Fantasy', 'Viking', or 'Cosmic' to generate clan names.",
            themePlaceholder: "e.g., 'Shadow Ninjas'",
            countLabel: 'Number of Names',
            buttonText: 'Generate Names',
            resultsTitle: 'Generated Names',
            error: 'Please enter a theme.',
            reasoningLabel: 'AI Reasoning',
            loadingMessages: ['Entering the creative forge...', 'Summoning epic names...', 'Adding historical context...'],
        },
        chat: {
            placeholder: "Ask a question or type 'play a game'...",
            buttonText: "Send",
            askThisQuestion: "Ask this question"
        }
    },
    helpAndSupport: {
        guideTitle: "Feature Guide",
        chatTitle: "AI Chat Assistant",
        portfolioTab: "Portfolio Guide",
        toolboxTab: "AI Toolbox Guide",
        portfolioContent: {
            heading: "What is the Portfolio Section?",
            p1: "This section is a comprehensive showcase of my professional journey. It includes my resume, work experience, educational background, and a curated list of my key projects. It's designed to give you a quick yet detailed overview of my skills and accomplishments.",
            p2: "You can navigate through different categories like Summary, Experience, and AI Projects using the sidebar to explore the areas that interest you most."
        },
        toolboxContent: {
            heading: "What is the AI Toolbox Demo?",
            p1: "The AI Toolbox is an interactive collection of AI-powered mini-applications that I've built. Each tool is designed to solve a specific problem for a particular audience, from content creators and translators to gamers.",
            p2: "These demos showcase my ability to leverage the Gemini API to create practical and creative solutions. Feel free to play around with them! They are all fully functional."
        },
        faqs: [
            {
                question: "Is there a hidden feature?",
                answer: "There might be! I hear the AI assistant is a bit playful. Why not ask it to 'play a game' and see what happens?"
            },
            {
                question: "What are your key skills?",
                answer: "I'm experienced in Video Editing and News Editing, and skillful in AI App Development, Figma, Canva, and Unity, among others."
            },
            {
                question: "How long have you been in the media industry?",
                answer: "I have over six years of experience in the media industry, specializing in video and news content."
            },
            {
                question: "What was your proudest achievement?",
                answer: "Growing a YouTube channel from 1,000 to 72,000 subscribers at Lotus Media was a major highlight for me."
            },
            {
                question: "What did you study?",
                answer: "I have a Bachelor's in Information Technology and I'm currently pursuing a Master's in Communication and Media Studies at Dublin City University."
            },
            {
                question: "Are the AI tools in the toolbox functional?",
                answer: "Absolutely! Every tool in the AI Toolbox Demo is a fully functional mini-app built to showcase my skills with the Gemini API. Feel free to use them."
            },
            {
                question: "How can I contact you?",
                answer: "The best way to reach me professionally is through my [LinkedIn profile](https://www.linkedin.com/in/hoangminhcao)."
            },
            {
                question: "Tell me about your Master's degree.",
                answer: "I'm studying Communication and Media Studies at Dublin City University. My major project is a WebGL app called 'The Sailboat,' but you can see my other projects in the Education section."
            },
            {
                question: "What inspires your AI tools?",
                answer: "My diverse background! For instance, my experience as a YouTuber inspired the Title Generator, and my love for gaming led to the Clan Name Generator."
            },
            {
                question: "What is this portfolio website built with?",
                answer: "This is a custom-built interactive portfolio using React, TypeScript, and Tailwind CSS, powered by the Google Gemini API for its AI features."
            }
        ]
    }
  },
  vi: {
    header: {
        title: 'Cao Minh Hoàng',
        subtitle: 'Biên tập viên Video & Tin tức & Biên dịch viên'
    },
    navigation: [
        { type: 'header', title: 'Portfolio' },
        { type: 'link', id: 'summary', title: 'Tóm tắt', icon: User },
        { type: 'link', id: 'experience', title: 'Kinh nghiệm', icon: Briefcase },
        { type: 'link', id: 'projects', title: 'Dự án AI', icon: Lightbulb },
        { type: 'link', id: 'education', title: 'Học vấn', icon: GraduationCap },
        { type: 'link', id: 'skills', title: 'Kỹ năng', icon: Star },
        { type: 'link', id: 'links', title: 'Mạng xã hội & Liên kết', icon: Link2 },
        { type: 'header', title: 'Demo Hộp công cụ AI' },
        { type: 'link', id: 'youtube-title-generator', title: 'Tạo Tiêu đề YouTube', icon: TextCursorInput },
        { type: 'link', id: 'script-timer', title: 'Đo thời lượng kịch bản', icon: Timer },
        { type: 'link', id: 'headline-generator', title: 'Tạo tiêu đề', icon: Newspaper },
        { type: 'link', id: 'idiom-explainer', title: 'Giải thích thành ngữ', icon: Languages },
        { type: 'link', id: 'clan-name-generator', title: 'Tạo tên Clan', icon: Gamepad2 },
        { type: 'link', id: 'help-and-support', title: 'Trợ giúp & Hỗ trợ', icon: HelpCircle },
    ],
    viewTitles: {
        summary: 'Tóm tắt chuyên môn',
        experience: 'Kinh nghiệm làm việc',
        projects: 'Dự án ứng dụng AI',
        education: 'Học vấn',
        skills: 'Các kỹ năng',
        links: 'Mạng xã hội & Liên kết',
        youtubeTitleGenerator: 'Công cụ tạo tiêu đề YouTube bằng AI',
        scriptTimer: 'Công cụ ước tính thời gian đọc kịch bản bằng AI',
        headlineGenerator: 'Công cụ tạo tiêu đề tin tức bằng AI',
        idiomExplainer: 'Công cụ giải thích thành ngữ bằng AI',
        clanNameGenerator: 'Công cụ tạo tên Clan Game bằng AI',
        helpAndSupport: 'Trợ giúp & Hỗ trợ',
    },
    summaryText: "Biên tập viên Video và Tin tức với hơn sáu năm kinh nghiệm trong việc nâng cao sự rõ ràng của nội dung và sự tương tác của người đọc trên nhiều nền tảng. Có kinh nghiệm về chỉnh sửa video, Figma và Canva, với lịch sử sản xuất các video về tiền điện tử có ảnh hưởng và tác giả của hơn 1.000 bài viết. Đam mê tận dụng các kỹ năng quản lý mạng xã hội và phát triển phần mềm để đi tiên phong trong các chiến lược nội dung sáng tạo, thúc đẩy sự tương tác của khán giả và phát triển các công cụ AI mạnh mẽ cho tương lai.",
    keyStats: [
        { value: '6+', label: 'Năm trong ngành Truyền thông' },
        { value: '1,000+', label: 'Bài viết đã xuất bản' },
        { value: '400+', label: 'Bài viết đã chỉnh sửa' },
        { value: '52+', label: 'Video đã sản xuất' },
        { value: '8+', label: 'Ứng dụng đã phát triển' },
    ],
    experienceData: [
        { 
            role: 'BIÊN TẬP VIÊN VIDEO/TIN TỨC',
            company: 'TB Group (Hà Nội, Việt Nam)',
            period: 'Thg 7 2023 – Thg 1 2024',
            achievements: [
                'Chỉnh sửa hơn 400 bài viết trong 6 tháng, nâng cao chất lượng và độ rõ ràng của nội dung.',
                'Viết hơn 1.000 bài viết về tiền điện tử và công nghệ, tăng cường sự tương tác và kiến thức của người đọc.',
                'Tạo hướng dẫn nội bộ trên Canva, thúc đẩy sự hợp tác và phát triển kỹ năng của nhóm.',
                'Thực hiện các cuộc phỏng vấn với các nhà lãnh đạo ngành, làm phong phú chất lượng nội dung và hiểu biết thị trường.',
            ]
        },
        { 
            role: 'BIÊN TẬP VIÊN TIN TỨC',
            company: 'Cryptoday (Hà Nội, Việt Nam)',
            period: 'Thg 6 2022 – Thg 5 2023',
            achievements: [
                 'Dẫn dắt đội ngũ truyền thông sản xuất 52 video về tiền điện tử, nâng cao độ rõ ràng và cách truyền tải nội dung.',
                 'Theo dõi các ấn phẩm hàng đầu về tiền điện tử để phân tích xu hướng, đảm bảo báo cáo luôn cập nhật.',
                 'Chỉ đạo việc tạo các video hướng dẫn, cải thiện đáng kể sự tương tác của khán giả.',
                 'Quản lý sản xuất video, đảm bảo hoàn thành đúng thời hạn và giao tiếp rõ ràng.',
            ]
        },
        { 
            role: 'BIÊN TẬP VIÊN VIDEO',
            company: 'ECI HOLDINGS JOINT STOCK COMPANY (Hà Nội, Việt Nam)',
            period: 'Thg 2 2022 – Thg 4 2022',
            achievements: [
                'Dẫn dắt các dự án chỉnh sửa video từ kịch bản phân cảnh đến định dạng cuối cùng.',
                'Phát triển các ý tưởng sáng tạo và câu chuyện video hấp dẫn.'
            ]
        },
        { 
            role: 'BIÊN TẬP VIÊN VIDEO (TOÀN THỜI GIAN)',
            company: 'Lotus Media (Hà Nội, Việt Nam)',
            period: 'Thg 10 2018 – Thg 1 2022',
            achievements: [
                 'Tăng số lượng người đăng ký YouTube từ 1.000 lên 72.000.',
                 'Quản lý nhiều kênh, tăng cường tương tác của khán giả.',
                 'Giám sát hậu kỳ, đảm bảo chất lượng và tính liên tục.'
            ]
        },
        { 
            role: 'BIÊN TẬP VIÊN VIDEO (BÁN THỜI GIAN)',
            company: 'Pinetree Securities (Hà Nội, Việt Nam)',
            period: 'Thg 12 2020 – Thg 4 2021',
            achievements: [
                'Áp dụng phụ đề và hiệu ứng để nâng cao chất lượng video trên YouTube, đảm bảo hoàn thành công việc đúng hạn.',
                'Cải thiện chất lượng video thông qua chỉnh màu, nhận được phản hồi tích cực từ người xem.',
                'Quản lý thời hạn và giao tiếp, góp phần vào quy trình sản xuất liền mạch.'
            ]
        },
    ],
    projectsData: [
        { name: 'Content Compass', description: 'Tóm tắt xu hướng nội dung bằng AI.', link: 'https://mrluke1618.github.io/content-compass' },
        { name: 'Customer Insights AI', description: 'Tóm tắt đánh giá của khách hàng bằng AI.', link: 'https://mrluke1618.github.io/customer-review-summarizer' },
        { name: 'Doc QA Assistant', description: 'Trợ lý hiệu đính tài liệu bằng AI.', link: 'https://mrluke1618.github.io/ai-proofreader' },
        { name: 'AI Audio Studio', description: 'Tạo, chỉnh sửa và nâng cao âm thanh bằng AI.', link: 'https://mrluke1618.github.io/ai-audio-studio' },
        { name: 'IELTS Practice Pod', description: 'Luyện tập cả 4 kỹ năng IELTS với sự hỗ trợ của AI.', link: 'https://mrluke1618.github.io/ielts-practice-app' },
        { name: 'Creator’s Toolbox', description: 'Bộ công cụ dành cho người sáng tạo và biên tập viên.', link: 'https://mrluke1618.github.io/mrluke1818-creators-toolbox' },
        { name: 'Kokoro English Guide', description: 'Hướng dẫn học tiếng Anh tương tác.', link: 'https://mrluke1618.github.io/Kokoro-English-Guide/preloader.html' },
    ],
    educationData: [
        {
            degree: 'Thạc sĩ ngành Nghiên cứu Truyền thông và Phương tiện',
            institution: 'Đại học Dublin City',
            period: '2024–2025',
            details: ['Loại: Bằng danh dự hạng hai, loại I', 'Các môn học: Hình ảnh, Thiết kế âm thanh & Âm học, Hiểu về Mạng xã hội, Phương tiện đáp ứng, Viết kịch bản, Thiết kế trực quan, Sản xuất hình ảnh động & Video, Kế hoạch & Quản lý dự án, Dự án lớn.'],
            projects: [
                { name: 'The Sailboat (Dự án lớn)', link: 'https://mrluke1618.github.io/Major-Project-WebGL', type: 'WebGL' },
                { name: 'Stories Of The Liberties', link: 'https://minhhoangcaodcu.wordpress.com/2024/12/05/stories-of-the-liberties', type: 'Blog' },
                { name: 'Emerging Media Praxis', link: 'https://www.tiktok.com/@hoangcao2704/video/7468458115822849297', type: 'TikTok' },
                { name: 'Visual Design Module', link: 'https://drive.google.com/drive/folders/1ongFDTY1WamiKPnmdiLkW2Q-zz_6jQuv', type: 'Tài sản' },
                { name: 'The Stillness Before The Storm', link: 'https://drive.google.com/file/d/1Q2hUgetAZfBgNaouebMADcgBQ1yY1_wD/view?usp=sharing', type: 'Kịch bản' },
                { name: 'Pawsitive Nutrition App', link: 'https://www.tiktok.com/@hoangcao2704/video/7480205819913473298', type: 'Figma' },
                { name: 'The Post (Ứng dụng Unity 6)', link: 'https://www.youtube.com/watch?v=M3MkM_OE3Oc', type: 'Demo' },
            ]
        },
        {
            degree: 'Cử nhân Công nghệ (Công nghệ Thông tin)',
            institution: 'Học viện Công nghệ Bưu chính Viễn thông, Hà Nội',
            period: '2013–2018',
            details: ['Phát triển bài kiểm tra trắc nghiệm ngữ pháp tiếng Anh tương tác trong Unity 2017.', 'Điểm đồ án tốt nghiệp: 8.29/10.', 'Kỹ năng: Unity, nghiên cứu, và quản lý thời gian.'],
        }
    ],
    skillsData: [
        { name: 'Biên tập Video', level: 'Experienced' },
        { name: 'Biên tập Tin tức', level: 'Experienced' },
        { name: 'Phát triển ứng dụng AI', level: 'Skillful' },
        { name: 'Figma', level: 'Skillful' },
        { name: 'Canva', level: 'Skillful' },
        { name: 'Phát triển phần mềm Unity', level: 'Skillful' },
        { name: 'Quản lý Mạng xã hội', level: 'Skillful' },
        { name: 'Thiết kế đồ họa', level: 'Skillful' },
        { name: 'Diễn xuất', level: 'Beginner' },
    ],
    linksData: [
        { name: 'YouTube', url: 'https://www.youtube.com/@luke1618gamer', icon: Youtube },
        { name: 'TikTok', url: 'https://www.tiktok.com/@hoangcao2704', icon: Video },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hoangminhcao', icon: Linkedin },
        { name: 'Video Showcase', url: 'https://drive.google.com/file/d/1MKrJ9lNwt3Y0gzC2UYbodEIYDmIc0iVa/view?usp=drive_link', icon: FileText },
        { name: 'Work Portfolio', url: 'https://docs.google.com/document/d/1ZO9BMG0B3p7g_aXBwxDnV92xEyVCbmjk_HJZeSpGKYk/edit?usp=sharing', icon: FileCode2 },
        { name: 'IELTS 7.5', url: 'https://drive.google.com/file/d/11RWK0L2g-zs440j-dh8ig5RMIpG0KIWY/view?usp=sharing', icon: FileText },
        { name: 'TOEIC 960', url: 'https://drive.google.com/file/d/1vT5oUbCPYPcBTH50dfzlVG-sl9FPvUcV/view?usp=sharing', icon: FileText },
    ],
    toolStrings: {
        youtubeTitleGenerator: {
            topicLabel: 'Chủ đề hoặc ý tưởng video',
            topicDescription: 'Mô tả video của bạn trong vài từ. Càng cụ thể, tiêu đề càng hay!',
            topicPlaceholder: "ví dụ: 'Mở hộp iPhone 15 Pro Max mới và những ấn tượng đầu tiên'",
            toneLabel: 'Chọn một giọng văn',
            tones: {
                Professional: 'Chuyên nghiệp',
                Casual: 'Thân mật',
                Clickbait: 'Giật gân',
            },
            buttonText: 'Tạo tiêu đề',
            resultsTitle: 'Các tiêu đề được tạo',
            error: 'Vui lòng nhập chủ đề video.',
            reasoningLabel: 'Lý giải của AI',
            loadingMessages: ['Đang phân tích chủ đề...', 'Lên ý tưởng sáng tạo...', 'Thêm phép màu SEO...'],
        },
        scriptTimer: {
            scriptLabel: 'Kịch bản video',
            scriptDescription: 'Dán kịch bản của bạn để ước tính thời gian đọc.',
            scriptPlaceholder: 'Dán kịch bản của bạn vào đây...',
            wpmLabel: 'Số từ mỗi phút (WPM)',
            buttonText: 'Ước tính thời gian',
            resultsTitle: 'Kết quả ước tính',
            estimatedTimeLabel: 'Thời gian đọc ước tính',
            wordCountLabel: 'Số lượng từ',
            error: 'Vui lòng nhập kịch bản.',
            minute: 'phút',
            minutes: 'phút',
            second: 'giây',
            seconds: 'giây',
            lessThanASecond: 'Chưa tới một giây'
        },
        headlineGenerator: {
            topicLabel: 'Chủ đề hoặc tóm tắt bài viết',
            topicDescription: 'Cung cấp chủ đề để tạo ra các tiêu đề hấp dẫn, đáng để nhấp chuột.',
            topicPlaceholder: "ví dụ: 'Tác động của AI đối với báo chí hiện đại'",
            audienceLabel: 'Đối tượng mục tiêu (Tùy chọn)',
            audiencePlaceholder: "ví dụ: 'Người yêu công nghệ', 'Sinh viên'",
            buttonText: 'Tạo tiêu đề',
            resultsTitle: 'Các tiêu đề được tạo',
            error: 'Vui lòng nhập chủ đề.',
            reasoningLabel: 'Lý giải của AI',
            loadingMessages: ['Đang quét chủ đề...', 'Soạn tiêu đề hấp dẫn...', 'Điều chỉnh cho khán giả...'],
        },
        idiomExplainer: {
            idiomLabel: 'Thành ngữ hoặc cụm từ',
            idiomDescription: 'Nhập một thành ngữ để biết ý nghĩa, ví dụ và các từ tương đương về mặt văn hóa.',
            idiomPlaceholder: "ví dụ: 'Nước đến chân mới nhảy'",
            buttonText: 'Giải thích thành ngữ',
            resultsTitle: 'Giải thích',
            meaningLabel: 'Ý nghĩa',
            dialogueLabel: 'Hội thoại ví dụ',
            equivalentLabel: 'Tương đương theo ngữ cảnh',
            error: 'Vui lòng nhập một thành ngữ.',
            reasoningLabel: 'Tại sao hội thoại này phù hợp',
            loadingMessages: ['Tra cứu từ điển...', 'Tìm hiểu sắc thái nghĩa...', 'Tạo kịch bản...'],
        },
        clanNameGenerator: {
            themeLabel: 'Chủ đề Clan',
            themeDescription: "Nhập một chủ đề như 'Cyberpunk', 'Fantasy', 'Viking', hoặc 'Cosmic' để tạo tên clan.",
            themePlaceholder: "ví dụ: 'Ninja bóng đêm'",
            countLabel: 'Số lượng tên',
            buttonText: 'Tạo tên',
            resultsTitle: 'Các tên được tạo',
            error: 'Vui lòng nhập một chủ đề.',
            reasoningLabel: 'Lý giải của AI',
            loadingMessages: ['Vào lò rèn sáng tạo...', 'Triệu hồi những cái tên huyền thoại...', 'Thêm bối cảnh lịch sử...'],
        },
        chat: {
            placeholder: "Đặt câu hỏi hoặc gõ 'chơi trò chơi'...",
            buttonText: "Gửi",
            askThisQuestion: "Hỏi câu này"
        }
    },
    helpAndSupport: {
        guideTitle: "Hướng dẫn tính năng",
        chatTitle: "Trợ lý Chat AI",
        portfolioTab: "Hướng dẫn Portfolio",
        toolboxTab: "Hướng dẫn Hộp công cụ AI",
        portfolioContent: {
            heading: "Phần Portfolio là gì?",
            p1: "Phần này là một buổi giới thiệu toàn diện về hành trình chuyên nghiệp của tôi. Nó bao gồm sơ yếu lý lịch, kinh nghiệm làm việc, nền tảng giáo dục và danh sách các dự án chính của tôi. Nó được thiết kế để cung cấp cho bạn một cái nhìn tổng quan nhanh chóng nhưng chi tiết về các kỹ năng và thành tích của tôi.",
            p2: "Bạn có thể điều hướng qua các danh mục khác nhau như Tóm tắt, Kinh nghiệm và Dự án AI bằng cách sử dụng thanh bên để khám phá các lĩnh vực mà bạn quan tâm nhất."
        },
        toolboxContent: {
            heading: "Demo Hộp công cụ AI là gì?",
            p1: "Hộp công cụ AI là một bộ sưu tập tương tác các ứng dụng nhỏ do AI cung cấp mà tôi đã xây dựng. Mỗi công cụ được thiết kế để giải quyết một vấn đề cụ thể cho một đối tượng cụ thể, từ người tạo nội dung và dịch giả đến game thủ.",
            p2: "Những bản demo này thể hiện khả năng của tôi trong việc tận dụng Gemini API để tạo ra các giải pháp thực tế và sáng tạo. Hãy thoải mái thử nghiệm chúng! Tất cả đều hoạt động đầy đủ."
        },
        faqs: [
            {
                question: "Có tính năng ẩn nào không?",
                answer: "Có thể có đấy! Tôi nghe nói trợ lý AI này khá tinh nghịch. Tại sao bạn không thử yêu cầu nó 'chơi một trò chơi' xem sao?"
            },
            {
                question: "Kỹ năng chính của bạn là gì?",
                answer: "Tôi có kinh nghiệm về Chỉnh sửa Video và Biên tập Tin tức, và thành thạo về Phát triển Ứng dụng AI, Figma, Canva, và Unity, cùng các kỹ năng khác."
            },
            {
                question: "Bạn đã làm trong ngành truyền thông bao lâu rồi?",
                answer: "Tôi có hơn sáu năm kinh nghiệm trong ngành truyền thông, chuyên về nội dung video và tin tức."
            },
            {
                question: "Thành tựu đáng tự hào nhất của bạn là gì?",
                answer: "Việc phát triển một kênh YouTube từ 1.000 lên 72.000 người đăng ký tại Lotus Media là một trong những điểm nhấn lớn nhất của tôi."
            },
            {
                question: "Bạn đã học ngành gì?",
                answer: "Tôi có bằng Cử nhân Công nghệ Thông tin và hiện đang theo học Thạc sĩ ngành Nghiên cứu Truyền thông và Phương tiện tại Đại học Dublin City."
            },
            {
                question: "Các công cụ AI trong hộp công cụ có hoạt động không?",
                answer: "Chắc chắn rồi! Mọi công cụ trong Demo Hộp công cụ AI đều là các ứng dụng nhỏ hoạt động đầy đủ, được xây dựng để thể hiện kỹ năng của tôi với Gemini API. Bạn cứ tự nhiên sử dụng nhé."
            },
            {
                question: "Làm thế nào để liên lạc với bạn?",
                answer: "Cách tốt nhất để kết nối chuyên nghiệp với tôi là qua [hồ sơ LinkedIn](https://www.linkedin.com/in/hoangminhcao)."
            },
            {
                question: "Hãy cho tôi biết về bằng Thạc sĩ của bạn.",
                answer: "Tôi đang học ngành Nghiên cứu Truyền thông và Phương tiện tại Đại học Dublin City. Dự án lớn của tôi là một ứng dụng WebGL tên là 'The Sailboat,' nhưng bạn có thể xem các dự án khác của tôi trong phần Học vấn."
            },
            {
                question: "Điều gì truyền cảm hứng cho các công cụ AI của bạn?",
                answer: "Nền tảng đa dạng của tôi! Ví dụ, kinh nghiệm làm YouTuber đã truyền cảm hứng cho Công cụ Tạo Tiêu đề, và tình yêu của tôi với game đã dẫn đến Công cụ Tạo Tên Clan."
            },
            {
                question: "Trang web portfolio này được xây dựng bằng gì?",
                answer: "Đây là một portfolio tương tác được xây dựng tùy chỉnh bằng React, TypeScript, và Tailwind CSS, được cung cấp bởi Google Gemini API cho các tính năng AI của nó."
            }
        ]
    }
  }
};