import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet"; // UNCOMMENT THIS LINE FOR PRODUCTION (requires npm install react-helmet)
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  FileText, 
  Cpu, 
  Code, 
  Award, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  MapPin,
  ArrowRight,
  Filter,
  MessageCircle,
  Send,
  Sparkles,
  Loader,
  RefreshCw,
  XCircle,
  Calendar,
  Layers,
  Heart,
  Globe,
  Mic
} from 'lucide-react';

// --- SEO & STRUCTURED DATA COMPONENT ---
const SEO = () => {
  const siteUrl = "https://JoesSattes.github.io/portfolio"; 
  const siteTitle = "Sattaya Singkul - Specialist, AI Research & Solution Engineer";
  const siteDescription = "Portfolio of Sattaya Singkul, an AI Specialist in NLP, Speech Recognition, and LLMs. Currently working at True Digital Group.";

  // JSON-LD for Google Knowledge Graph
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sattaya Singkul",
    "url": siteUrl,
    "jobTitle": "Specialist, AI Research & Solution Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "True Digital Group"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "King Mongkut's Institute of Technology Ladkrabang"
    },
    "sameAs": [
      "https://www.linkedin.com/in/sattaya-singkul",
      "https://github.com/JoesSattes",
      "https://scholar.google.com/citations?user=kJI-LQAAAAJ&hl=en"
    ],
    "knowsAbout": ["Artificial Intelligence", "Natural Language Processing", "Speech Recognition", "Agentic LLMs", "Machine Learning", "Deep Learning"],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangkok",
      "addressCountry": "Thailand"
    }
  };

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content="Sattaya Singkul, AI Engineer, NLP, Speech Recognition, LLM, Thailand, True Digital Group, KBTG, AI Portfolio" />
      <meta name="author" content="Sattaya Singkul" />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};


// --- DATA CONTEXT FOR AI AGENT ---
const RESUME_CONTEXT = `
NAME: Sattaya Singkul
ROLE: AI Research & Solution Engineer | Specialist in NLP & Speech Processing
LOCATION: Bangkok, Thailand
CONTACT: joeysattaya@hotmail.com, +66 80 199 5935, www.linkedin.com/in/sattaya-singkul
SUMMARY: Passionate about unlocking the power of voice and text (NLP). Deep expertise in speech recognition (ASR), synthesis (TTS), emotion recognition, and Large Language Models (LLMs). Focus on multimodal agents and virtual assistants.

EDUCATION:
- Master's Degree in Information Technology, KMITL (2021-2025). GPA: 4.00. Innovator's Promising with Honor Scholarship.
- Bachelor's Degree in Information Technology, KMITL (2016-2020). GPA: 3.74. First-class Honors.

EXPERIENCE:
1. True Digital Group (May 2025 - Present): Specialist, AI Engineer/AI Solution Hub. Built NLP/Speech models. Integrated Voice IoT Multi-Agent with MCP on TrueX app (800k MAU, 4.4/5.0 rating).
2. KASIKORN Business-Technology Group (KBTG) (Feb 2022 - Apr 2025): Research Engineer. Automated 80% of KBank customer chat traffic. Developed video analytics preventing negative trends. Published research at ICMR, ICME.
3. Mental Health Tech Discovery, Mahidol University (Aug 2023 - Dec 2024): Product Owner. Led team of 7. Delivered "AI Care Avatar" and "Psyjai Dashboard".
4. Synthesia (Oct 2023 - July 2024): Research Scientist (Co-operated). Research in AI video synthesis and digital avatars.
5. Dolby Laboratories (Jan 2021 - July 2021): Speech/Audio Deep Learning Intern.

SKILLS:
- Languages: Python, SQL, C, R, Bash.
- AI Frameworks: PyTorch, TensorFlow, Hugging Face, FastAPI.
- GenAI: LangChain, Llama.cpp, Gradio, Chainlit, Multi-Agent Systems.
- Deployment: Docker, ONNX, TorchScript, Quantization.

RESEARCH HIGHLIGHTS:
- "Teacher-To-Teacher: Harmonizing Dual Expertise into a Unified Speech Emotion Model" (IEEE SMC 2024)
- "Residual, Mixer, and Attention... Streaming Wake Word Detection" (IEEE APSIPA-ASC 2023)
- "End-to-End Thai Text-to-Speech" (ACM ICMR 2024)
- "THaLLE: Text Hyperlocally Augmented Large Language Extension" (ArXiv)

AWARDS:
- Star Award 2024 (KBTG)
- Bronze Medal, Super-AI Engineer 2020
- Winner, CAT Cyfence Cybercop Contest 2016
- Winner, Thai ASR Hackathon 2020
`;

// --- GEMINI API HELPER ---
const callGeminiAPI = async (prompt, systemInstruction = "") => {
  const apiKey = ""; // API Key injected by environment
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  let retries = 0;
  const maxRetries = 5;
  const delays = [1000, 2000, 4000, 8000, 16000];

  while (retries < maxRetries) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too Many Requests");
        }
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } catch (error) {
      retries++;
      if (retries === maxRetries) return "I'm experiencing high traffic right now. Please try again later.";
      await new Promise(r => setTimeout(r, delays[retries - 1]));
    }
  }
};

// --- COMPONENTS ---

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Sattaya's AI Assistant. Ask me anything about his experience, research, or skills!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const systemPrompt = `You are the AI portfolio assistant for Sattaya Singkul. Your goal is to represent him professionally to recruiters and visitors. 
    Use the following Resume Context to answer questions strictly based on facts. 
    If a question is not related to the resume or professional life, politely steer it back. 
    Keep answers concise (under 3 sentences) unless asked for details.
    
    Resume Context:
    ${RESUME_CONTEXT}`;

    const response = await callGeminiAPI(userMessage, systemPrompt);
    
    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-emerald-600 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-yellow-300 w-5 h-5 animate-pulse" />
              <h3 className="font-bold text-white">Ask AI Sattaya</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <XCircle size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-cyan-600 text-white rounded-br-none' 
                    : 'bg-slate-800 text-gray-200 border border-white/10 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-900 border-t border-white/10">
            <div className="flex items-center space-x-2 bg-slate-800 rounded-full px-4 py-2 border border-white/5 focus-within:border-cyan-500/50 transition-colors">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about my research..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`p-1.5 rounded-full transition-all ${
                  input.trim() ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-2">
               <span className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center justify-center gap-1">
                 Powered by Sattaya.AI <Sparkles size={8} />
               </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-cyan-500 to-emerald-500 rounded-full shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
      >
        {isOpen ? (
          <X className="text-white w-6 h-6" />
        ) : (
          <>
             <MessageCircle className="text-white w-6 h-6" />
             <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500 border-2 border-slate-900"></span>
             </span>
          </>
        )}
        {!isOpen && (
           <div className="absolute right-16 bg-white text-slate-900 text-xs font-bold py-1 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
             Chat with my AI Agent!
           </div>
        )}
      </button>
    </div>
  );
};

const BioRewriter = ({ originalBio }) => {
  const [bio, setBio] = useState(originalBio);
  const [loading, setLoading] = useState(false);
  const [activeStyle, setActiveStyle] = useState('Original');

  const rewriteBio = async (style) => {
    if (style === 'Original') {
      setBio(originalBio);
      setActiveStyle('Original');
      return;
    }

    setLoading(true);
    setActiveStyle(style);

    const prompt = `Rewrite the following professional bio in a "${style}" style. Keep it under 80 words. Bio: "${originalBio}"`;
    const newBio = await callGeminiAPI(prompt);
    
    setBio(newBio);
    setLoading(false);
  };

  return (
    <div className="mt-8 pt-6 border-t border-white/5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-cyan-400 w-4 h-4" />
        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">AI Magic: Rewrite Bio</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {['Original', 'Recruiter Friendly', 'ELI5', 'Pirate', 'Poetic'].map((style) => (
          <button
            key={style}
            onClick={() => rewriteBio(style)}
            disabled={loading}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all flex items-center gap-2 ${
              activeStyle === style 
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' 
                : 'bg-slate-800 border-white/5 text-gray-400 hover:bg-slate-700'
            }`}
          >
            {loading && activeStyle === style && <Loader className="animate-spin w-3 h-3" />}
            {style}
          </button>
        ))}
      </div>

      <div className={`relative bg-slate-950/50 rounded-xl p-4 border border-white/5 min-h-[100px] transition-all duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
          {bio}
        </p>
      </div>
    </div>
  );
};

// --- DATA: EXPERIENCE & EDUCATION ---
const experienceData = {
  fulltime: [
    {
      role: "Specialist, AI Engineer / AI Solution Hub",
      company: "True Digital Group",
      logo: "https://logo.clearbit.com/truedigital.com",
      period: "May 2025 - Present",
      description: "Leading development of scalable AI solutions for TrueX app ecosystem.",
      achievements: [
        "Voice IoT Multi-Agent: Integrated AI voice agent with Model Context Protocol (MCP) for dynamic IoT control.",
        "Scaled to 800k MAU: Deployed solutions on TrueX app, boosting engagement with a 4.4/5.0 rating.",
        "Built and optimized state-of-the-art NLP and speech processing models (ASR, TTS, SER)."
      ],
      tags: ["Voice IoT", "Multi-Agent", "MCP", "FastAPI"]
    },
    {
      role: "Research Engineer (B2: HCI Expert & B1: Voice Specialist)",
      company: "KASIKORN Business-Technology Group (KBTG)",
      logo: "https://logo.clearbit.com/kbtg.tech",
      period: "Feb 2022 - Apr 2025",
      description: "Spearheaded AI innovation for banking services, focusing on customer automation and safety.",
      achievements: [
        "Call Center Automation: Designed LLM-based method covering 93% of call center chatbot use cases.",
        "Chatbot Success: Automated 80% of KBank's chat traffic, saving 300,000 customer hours.",
        "Video Analytics: Developed social media video insight tool, preventing 4 negative trends.",
        "Global Research: Presented at ACM ICMR 2024, IEEE ICME 2024, and IEEE APSIPA-ASC 2023."
      ],
      tags: ["LLM", "Chatbots", "Video Analytics", "Research"]
    }
  ],
  contract: [
    {
      role: "Product Owner",
      company: "Mental Health Tech Discovery, Mahidol University",
      logo: "https://logo.clearbit.com/mahidol.ac.th",
      period: "Aug 2023 - Dec 2024",
      description: "Managed a team of 7 to develop psychology-integrated AI health solutions.",
      achievements: [
        "Delivered 11 projects successfully including 'AI Care Avatar' and 'Psyjai Dashboard'.",
        "Managed data projects, optimized AI models, and mentored junior developers."
      ],
      tags: ["Product Management", "HealthTech", "Team Lead"]
    },
    {
      role: "Research Scientist (Co-operated)",
      company: "Synthesia (London/Remote)",
      logo: "https://logo.clearbit.com/synthesia.io",
      period: "Oct 2023 - July 2024",
      description: "Collaborated on cutting-edge generative AI research.",
      achievements: [
        "Conducted research in AI video synthesis and digital avatars.",
        "Contributed to scientific papers and patent applications."
      ],
      tags: ["Video Synthesis", "Generative AI", "Research"]
    },
    {
      role: "Data Scientist (Contract)",
      company: "Siam Commercial Bank (SCB)",
      logo: "https://logo.clearbit.com/scb.co.th",
      period: "June 2021 - Nov 2021",
      description: "Enhanced customer experience through voice technology.",
      achievements: [
        "Deployed Speech Emotion Recognition module for call centers using TensorFlow and PyTorch.",
        "Designed solutions aligned with business requirements."
      ],
      tags: ["Speech Emotion", "Banking", "TensorFlow"]
    }
  ],
  internship: [
    {
      role: "Research Assistant (NCR)",
      company: "NECTEC",
      logo: "https://logo.clearbit.com/nectec.or.th",
      period: "July 2021 - Dec 2021",
      description: "Focused on Thai spoken and written language technologies.",
      achievements: [
        "Developed fine-tuning method for Thai speaker segmentation robust to reverberant environments.",
        "Deployed AI models for 'AI for Thai' API services."
      ],
      tags: ["Speaker Verification", "Kaldi", "PyTorch"]
    },
    {
      role: "Speech/Audio Deep Learning Intern",
      company: "Dolby Laboratories (Australia/Remote)",
      logo: "https://logo.clearbit.com/dolby.com",
      period: "Jan 2021 - July 2021",
      description: "Worked with researchers on novel deep learning algorithms.",
      achievements: [
        "Designed and implemented deep learning algorithms for speech/audio processing.",
        "Participated in the Dolby U program with industry leaders."
      ],
      tags: ["Audio Processing", "Deep Learning", "Innovation"]
    },
    {
      role: "Data Scientist (Intern)",
      company: "KBTG",
      logo: "https://logo.clearbit.com/kbtg.tech",
      period: "June 2019 - Aug 2019",
      description: "Machine Learning Bootcamp participant.",
      achievements: [
        "Developed Dependency Parser for Thai social data.",
        "Won Best Progress and Effort Award & Popular Vote Award."
      ],
      tags: ["NLP", "Dependency Parsing"]
    }
  ]
};

const educationData = {
  degrees: [
    {
      title: "Master's Degree in Information Technology",
      institution: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
      period: "2021 - 2025",
      gpa: "4.00",
      details: [
        "Innovator's Promising with Honor Scholarship",
        "Outstanding Oral Defense"
      ]
    },
    {
      title: "Bachelor's Degree in Information Technology",
      institution: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
      period: "2016 - 2020",
      gpa: "3.74",
      details: [
        "First-class Honors",
        "Business Intelligence Program"
      ]
    }
  ],
  certifications: [
    {
      title: "Star Award 2024",
      institution: "KASIKORN Business-Technology Group",
      period: "2024",
      details: "Outstanding Performance Award"
    },
    {
      title: "Bronze Medal, Super-AI Engineer",
      institution: "AIAT (Artificial Intelligence Association of Thailand)",
      period: "2020",
      details: "AI Engineer Position & Top 100 Basic AI"
    },
    {
      title: "Winner, Thai ASR Hackathon",
      institution: "NECTEC",
      period: "2020",
      details: "Super-AI Engineer Hackathon Series"
    },
    {
      title: "Winner, CAT Cyfence Cybercop Contest",
      institution: "CAT Telecom Public Company Limited",
      period: "2016",
      details: "National Cybersecurity Contest"
    },
    {
      title: "Best Progress & Popular Vote Award",
      institution: "KBTG Machine Learning Bootcamp",
      period: "2019",
      details: "For Dependency Parser Project"
    },
    {
      title: "Top 3, IRPC Hackathon",
      institution: "Super-AI / IRPC Public Company Limited",
      period: "2020",
      details: "AI Hackathon"
    },
    {
      title: "Top 5, DENSO LASI Hackathon",
      institution: "Super-AI / DENSO SALES",
      period: "2020",
      details: "AI Hackathon"
    },
    {
      title: "Top 10, SCG QA Hackathon",
      institution: "Super-AI / SCG",
      period: "2020",
      details: "AI Hackathon"
    },
    {
      title: "CIMB 3D Conquest Representative",
      institution: "CIMB Bank",
      period: "2018",
      details: "Singapore In-Country Conquest - Coding Track"
    },
    {
      title: "Programming with Python for Data Science",
      institution: "edX",
      period: "Verified",
      details: "DAT210x"
    },
    {
      title: "IT Security Certificate",
      institution: "Chulalongkorn University",
      period: "Completion",
      details: "Professional Certificate"
    }
  ]
};

const volunteerData = [
  {
    role: "Program Committee / Research Reviewer",
    organization: "Academic Journals & Conferences",
    logo: "https://logo.clearbit.com/ieee.org",
    period: "Jan 2021 - Present",
    description: "Reviewing AI research in NLP, audio, and visual domains.",
    details: [
      "ACM Transactions on Asian and Low-Resource Language Information Processing (TALLIP, Q3)",
      "Indonesian Journal of Electrical Engineering and Computer Science (IJEECS, Q3)",
      "IEEE Access (Q1)",
      "ACM ICMR 2024"
    ]
  },
  {
    role: "Optimizer Committee & Teaching Assistant",
    organization: "Artificial Intelligence Association of Thailand (AIAT)",
    logo: "https://logo.clearbit.com/aiat.or.th",
    period: "Feb 2022 - May 2024",
    description: "Guided teams in Super-AI Engineer programs (SuperAISS2, SS3, SS4).",
    details: [
      "Mentored projects on Thai NLP, font recognition, and financial AI.",
      "Evaluated competitors and provided insights on NLP/LLMs.",
      "Led teams to win multiple awards including Best Teamwork and Hackathon Winners."
    ]
  },
  {
    role: "Special Guest Lecturer",
    organization: "Huachiew Chalermprakiet University (HCU)",
    logo: "https://logo.clearbit.com/hcu.ac.th",
    period: "July 2022 - June 2024",
    description: "Delivered lectures on AI topics to undergraduate students.",
    details: [
      "Topics: AI Future, Presentation Skills, Digital Image Processing, Speech Recognition.",
      "Inspired students to prepare for careers in AI."
    ]
  },
  {
    role: "Student Exchange Researcher",
    organization: "Kurume College (Japan)",
    logo: "https://logo.clearbit.com/kurume-nct.ac.jp",
    period: "June 2017",
    description: "SAKURA Exchange Program in Science.",
    details: [
      "Fostered collaboration between Asia and Japan in science and technology.",
      "Participated in short-term research exchange."
    ]
  },
  {
    role: "Microsoft Student Volunteer",
    organization: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    period: "Jan 2017 - July 2017",
    description: "Provided counseling to customers on Microsoft products and IT technologies.",
    details: []
  },
  {
    role: "Teaching Director and Lecturer",
    organization: "KMITL (ToBeIT60 Program)",
    logo: "https://logo.clearbit.com/kmitl.ac.th",
    period: "Oct 2016 - Dec 2016",
    description: "Taught IT topics to approx. 500 high school students.",
    details: []
  }
];

// --- LOGO MARQUEE COMPONENT ---
const LogoMarquee = () => {
  const logos = [
    { name: "True Digital", url: "https://logo.clearbit.com/truedigital.com" },
    { name: "KBTG", url: "https://logo.clearbit.com/kbtg.tech" },
    { name: "Mahidol", url: "https://logo.clearbit.com/mahidol.ac.th" },
    { name: "Synthesia", url: "https://logo.clearbit.com/synthesia.io" },
    { name: "Dolby", url: "https://logo.clearbit.com/dolby.com" },
    { name: "SCB", url: "https://logo.clearbit.com/scb.co.th" },
    { name: "NECTEC", url: "https://logo.clearbit.com/nectec.or.th" },
    { name: "Microsoft", url: "https://logo.clearbit.com/microsoft.com" },
    { name: "AIAT", url: "https://logo.clearbit.com/aiat.or.th" },
    { name: "IEEE", url: "https://logo.clearbit.com/ieee.org" },
    { name: "CAT", url: "https://logo.clearbit.com/cattelecom.com" }
  ];

  return (
    <div className="w-full bg-slate-900/50 border-y border-white/5 py-8 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10" />
      
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Render logos twice for seamless loop */}
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="mx-8 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <img 
              src={logo.url} 
              alt={logo.name} 
              className="h-10 w-auto object-contain max-w-[120px]"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.style.display = 'none'; // Hide if fails to load
              }}
            />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showAllPapers, setShowAllPapers] = useState(false);
  
  // Tab States
  const [activeExpTab, setActiveExpTab] = useState('fulltime');
  const [activeEduTab, setActiveEduTab] = useState('degrees');

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'volunteer', 'education', 'publications', 'skills'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const NavLink = ({ to, label, icon: Icon }) => (
    <button
      onClick={() => scrollToSection(to)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        activeSection === to 
          ? 'text-cyan-400 bg-cyan-400/10' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </button>
  );

  // Full Publication List Extracted from CV
  const allPublications = [
    {
      title: "Vector Learning Representation based on Generalized Speech Emotion Recognition",
      venue: "Heliyon 2022 (CellPress/Elsevier)",
      type: "Journal",
      rank: "Q1",
      role: "First Author"
    },
    {
      title: "Real-Time End-to-End Speech Emotion Recognition with Cross-Domain Adaptation",
      venue: "MDPI BDCCC 2022",
      type: "Journal",
      rank: "Q1",
      role: "Second Author"
    },
    {
      title: "Deep Residual Local Feature Learning for Speech Emotion Recognition",
      venue: "ICONIP 2020 (Springer LNCS)",
      type: "Conference",
      rank: "Rank A",
      role: "First Author (Presenter)"
    },
    {
      title: "An Enhanced Multimodal Negative Feedback Detection Framework with Target Retrieval",
      venue: "IEEE ICMEW 2024",
      type: "Workshop",
      rank: "Rank A",
      role: "Second Author"
    },
    {
      title: "International Research (Title TBD)",
      venue: "Springer ICDAR 2025",
      type: "Conference",
      rank: "Rank A",
      role: "Author"
    },
    {
      title: "Residual, Mixer, and Attention: The Three-way Combination for Streaming Wake Word Detection",
      venue: "IEEE APSIPA-ASC 2023",
      type: "Conference",
      rank: "Best Paper Session",
      role: "First Author (Presenter)"
    },
    {
      title: "End-to-End Thai Text-to-Speech with Linguistic Unit",
      venue: "ACM ICMR 2024",
      type: "Conference",
      rank: "Rank B",
      role: "Second Author"
    },
    {
      title: "Teacher-To-Teacher: Harmonizing Dual Expertise into a Unified Speech Emotion Model",
      venue: "IEEE SMC 2024",
      type: "Conference",
      rank: "Rank B",
      role: "First Author (Presenter)"
    },
    {
      title: "Real-Time Thai Speech Emotion Recognition with Speech Enhancement",
      venue: "IEEE ICBIR 2022",
      type: "Conference",
      rank: "International",
      role: "Second Author (Presenter)"
    },
    {
      title: "Thai Dependency Parsing with Character Embedding",
      venue: "IEEE ICITEE 2019",
      type: "Conference",
      rank: "International",
      role: "First Author (Presenter)"
    },
    {
      title: "Parsing Thai Social Data: A New Challenge for Thai NLP",
      venue: "IEEE iSAI-NLP 2019",
      type: "Conference",
      rank: "International",
      role: "First Author"
    },
    {
      title: "Thai Financial Domain Adaptation of THaLLE",
      venue: "ArXiv Pre-print",
      type: "Technical Report",
      rank: "Report",
      role: "Collaborator"
    }
  ];

  const displayedPublications = showAllPapers ? allPublications : allPublications.slice(0, 4);

  const baseBio = `Passionate about unlocking the power of voice and text through Natural Language Processing (NLP), 
  I delve deep into speech recognition, synthesis, emotion recognition, and large language models (LLMs). 
  My professional journey embraces the wonders of multimodal agents, shaping the future of virtual 
  assistants and advancing human-computer interaction. From optimizing call center workflows at major banks 
  to pioneering voice IoT agents, I focus on building scalable, real-world AI solutions.`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 font-sans">
      {/* <SEO /> */} {/* Temporarily commented out SEO component to avoid build errors in preview */}
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                Sattaya.AIxGemini
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="home" label="Home" />
              <NavLink to="about" label="About" />
              <NavLink to="experience" label="Experience" />
              <NavLink to="volunteer" label="Volunteer" />
              <NavLink to="education" label="Awards" />
              <NavLink to="publications" label="Research" />
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-4 space-y-2 shadow-2xl">
            <NavLink to="home" label="Home" />
            <NavLink to="about" label="About" />
            <NavLink to="experience" label="Experience" />
            <NavLink to="volunteer" label="Volunteer" />
            <NavLink to="education" label="Awards" />
            <NavLink to="publications" label="Research" />
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                AI Research & Solution Engineer
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
                  Sattaya Singkul <br />
                </span>
                Pioneering <br />
                  Tomorrow's AI
                <br /> Today
              </h1>
              <p className="text-lg text-gray-400 max-w-xl">
                Specializing in NLP, Speech Processing, and Large Language Models. 
                Bridging the gap between cutting-edge research and real-world solutions.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://github.com/JoesSattes" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all hover:border-cyan-500/30"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/sattaya-singkul" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all shadow-lg shadow-cyan-500/25"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="mailto:joeysattaya@hotmail.com" 
                  className="flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all hover:border-emerald-500/30"
                >
                  <Mail size={20} />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Abstract Tech Visual */}
            <div className="relative hidden md:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 rounded-full animate-spin-slow blur-xl" />
                <div className="absolute inset-4 bg-slate-900 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm">
                  <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs text-gray-500">model_inference.py</span>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                      <div className="text-cyan-400">class AI_Engineer(Expert):</div>
                      <div className="pl-4 text-gray-400">def __init__(self):</div>
                      <div className="pl-8 text-emerald-300">self.focus = ["NLP", "ASR", "LLM"]</div>
                      <div className="pl-8 text-emerald-300">self.goals = "Innovation"</div>
                      <br />
                      <div className="pl-4 text-gray-400">def solve_problem(self, data):</div>
                      <div className="pl-8 text-green-400">return optimize(data)</div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Status: Online</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-emerald-400">Training Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
            <ChevronDown size={24} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <span className="w-12 h-1 bg-cyan-500 mr-4"></span>
                  About Me
                </h2>
                <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5 shadow-xl shadow-black/20">
                   <div className="space-y-4">
                     <div className="flex items-center text-gray-300">
                       <MapPin className="w-5 h-5 mr-3 text-cyan-400" />
                       Bangkok, Thailand
                     </div>
                     <div className="flex items-center text-gray-300">
                       <GraduationCap className="w-5 h-5 mr-3 text-cyan-400" />
                       M.Sc. IT (GPA 4.00)
                     </div>
                     <div className="flex items-center text-gray-300">
                       <Briefcase className="w-5 h-5 mr-3 text-cyan-400" />
                       5+ Years Experience
                     </div>
                   </div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="text-lg text-gray-300 leading-relaxed mb-8">
                 <BioRewriter originalBio={baseBio} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  "Speech Recognition (ASR)",
                  "Text-to-Speech (TTS)",
                  "Large Language Models",
                  "Emotion Recognition",
                  "AI Agents & Multi-Agent Systems",
                  "Computer Vision"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-cyan-200/80 bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/20">
                    <Cpu size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <LogoMarquee />

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <span className="w-12 h-1 bg-emerald-500 mr-4"></span>
            Professional Journey
          </h2>

          {/* Experience Tabs */}
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { id: 'fulltime', label: 'Full-Time Roles', icon: Briefcase },
              { id: 'contract', label: 'Contract & Specialist', icon: Layers },
              { id: 'internship', label: 'Internships & Research', icon: GraduationCap },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveExpTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeExpTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-white border border-white/5'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
          
          <div className="relative space-y-8 pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:to-emerald-500">
            {experienceData[activeExpTab].map((exp, index) => (
              <ExperienceCard 
                key={index}
                role={exp.role}
                company={exp.company}
                logo={exp.logo}
                period={exp.period}
                description={exp.description}
                achievements={exp.achievements}
                tags={exp.tags}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Section (New) */}
      <section id="volunteer" className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <span className="w-12 h-1 bg-pink-500 mr-4"></span>
            Volunteering & Activities
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {volunteerData.map((vol, index) => (
              <div key={index} className="bg-slate-800/30 p-6 rounded-xl border border-white/5 hover:border-pink-500/30 hover:bg-slate-800/50 transition-all duration-300 flex items-start space-x-4">
                 <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1">
                      <img src={vol.logo} alt={vol.organization} className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<Heart size={20} class="text-pink-500" />'; }} />
                    </div>
                 </div>
                 <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{vol.role}</h3>
                    <p className="text-sm text-pink-400 mb-2">{vol.organization}</p>
                    <p className="text-xs text-gray-500 mb-3 flex items-center"><Calendar size={12} className="mr-1"/> {vol.period}</p>
                    <p className="text-sm text-gray-300 mb-2">{vol.description}</p>
                    {vol.details.length > 0 && (
                      <ul className="text-xs text-gray-400 space-y-1 mt-2">
                        {vol.details.map((d, i) => (
                          <li key={i} className="flex items-start">
                             <span className="mr-1.5 mt-1 w-1 h-1 bg-pink-500 rounded-full flex-shrink-0"></span>
                             {d}
                          </li>
                        ))}
                      </ul>
                    )}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <span className="w-12 h-1 bg-yellow-500 mr-4"></span>
            Education & Certifications
          </h2>

           {/* Education Tabs */}
           <div className="flex space-x-6 mb-8 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveEduTab('degrees')}
              className={`text-lg font-medium transition-colors ${
                activeEduTab === 'degrees' ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Academic Degrees
            </button>
            <button
              onClick={() => setActiveEduTab('certifications')}
              className={`text-lg font-medium transition-colors ${
                activeEduTab === 'certifications' ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Certifications & Honors
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {activeEduTab === 'degrees' ? (
              educationData.degrees.map((edu, index) => (
                <div key={index} className="bg-slate-800/30 p-8 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400">
                      <GraduationCap size={32} />
                    </div>
                    <span className="text-sm font-mono text-gray-500">{edu.period}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{edu.title}</h3>
                  <p className="text-gray-400 mb-4">{edu.institution}</p>
                  <div className="flex items-center gap-2 mb-4">
                     <span className="text-sm px-2 py-1 bg-white/5 rounded text-gray-300">GPA: {edu.gpa}</span>
                  </div>
                  <ul className="space-y-2">
                    {edu.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-400">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              educationData.certifications.map((cert, index) => (
                <div key={index} className="flex items-start p-5 bg-slate-800/30 rounded-xl border border-white/5 hover:bg-slate-800/50 transition-colors">
                  <Award className="text-yellow-500 w-8 h-8 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-200 text-lg">{cert.title}</h4>
                    <p className="text-sm text-yellow-500 mb-1">{cert.institution}</p>
                    <p className="text-xs text-gray-400 mb-2 font-mono">{cert.period}</p>
                    <p className="text-sm text-gray-300">{cert.details}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold flex items-center">
              <span className="w-12 h-1 bg-teal-500 mr-4"></span>
              Research Publications
            </h2>
            <div className="hidden md:block text-sm text-gray-500">
              Sorted by Journal/Conference Rank
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 transition-all duration-500">
            {displayedPublications.map((pub, index) => (
              <PublicationCard 
                key={index}
                title={pub.title}
                venue={pub.venue}
                type={pub.type}
                rank={pub.rank}
                role={pub.role}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center space-y-4">
            {/* Show More Button */}
            <button 
              onClick={() => setShowAllPapers(!showAllPapers)}
              className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium px-6 py-3 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 transition-all"
            >
              <span>{showAllPapers ? "Show Less" : `View All ${allPublications.length} Publications`}</span>
              <ChevronDown size={16} className={`transform transition-transform ${showAllPapers ? 'rotate-180' : ''}`} />
            </button>

            <a href="https://scholar.google.com/citations?user=kJI-LQAAAAJ&hl=en" target="_blank" rel="noreferrer" className="inline-flex items-center text-gray-400 hover:text-white text-sm">
              View Google Scholar Profile <ExternalLink size={14} className="ml-2"/>
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 flex items-center justify-center">
                <Code className="mr-3 text-cyan-400" /> Technical Arsenal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SkillGroup title="Languages" skills={["Python", "SQL", "C", "R", "Bash/Shell"]} color="cyan" />
                <SkillGroup title="Frameworks" skills={["PyTorch", "TensorFlow", "HuggingFace", "FastAPI"]} color="teal" />
                <SkillGroup title="GenAI Tools" skills={["LangChain", "Llama.cpp", "Gradio", "Chainlit"]} color="emerald" />
                <SkillGroup title="Deployment" skills={["Docker", "ONNX", "TorchScript", "Quantization"]} color="green" />
              </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Let's Build Something Incredible</h2>
          <div className="flex justify-center space-x-8 mb-8">
            <FooterLink href="mailto:joeysattaya@hotmail.com" icon={Mail} label="Email" />
            <FooterLink href="https://www.linkedin.com/in/sattaya-singkul" icon={Linkedin} label="LinkedIn" />
            <FooterLink href="https://github.com/JoesSattes" icon={Github} label="GitHub" />
            <FooterLink href="tel:+66801995935" icon={Phone} label="Call" />
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Sattaya Singkul. All rights reserved. <br/>
            <span className="opacity-50">Designed with React & Tailwind CSS.</span>
          </p>
        </div>
      </footer>

      {/* AI Chat Widget Fixed at Bottom Right */}
      <AIChatWidget />
    </div>
  );
};

// Sub-components
const ExperienceCard = ({ role, company, logo, period, description, achievements, tags }) => (
  <div className="relative pl-8 group animate-fade-in">
    <div className="absolute left-[-5px] top-2 w-3 h-3 bg-slate-900 border-2 border-cyan-500 rounded-full group-hover:bg-cyan-500 transition-colors" />
    <div className="bg-slate-800/30 p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1 flex-shrink-0">
             <img 
               src={logo} 
               alt={company} 
               className="w-full h-full object-contain" 
               onError={(e) => {
                 e.target.style.display = 'none'; // Hide image if error
                 e.target.parentNode.innerHTML = '<span class="text-slate-900 font-bold text-xs">LOGO</span>'; // Fallback text
               }}
             />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{role}</h3>
            <p className="text-cyan-200">{company}</p>
          </div>
        </div>
        <span className="text-sm font-mono text-gray-400 mt-1 md:mt-0 px-3 py-1 bg-white/5 rounded-full whitespace-nowrap">{period}</span>
      </div>
      <p className="text-gray-300 mb-4 leading-relaxed italic">{description}</p>
      
      {achievements && (
        <ul className="mb-4 space-y-2">
          {achievements.map((item, i) => (
            <li key={i} className="flex items-start text-sm text-gray-400">
              <span className="mr-2 mt-1.5 w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs font-medium px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded border border-cyan-500/10">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const PublicationCard = ({ title, venue, type, role, rank }) => {
  // Rank badge color logic
  const getRankColor = (r) => {
    if (r.includes("Q1") || r.includes("Best")) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    if (r.includes("Rank A")) return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    if (r.includes("Rank B")) return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    return "bg-slate-700/50 text-gray-300 border-slate-600";
  };

  return (
    <div className="bg-slate-800/30 p-6 rounded-xl border border-white/5 hover:border-teal-500/30 hover:bg-slate-800/50 transition-all duration-300 group flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2">
             <span className={`px-2 py-1 text-xs rounded border ${getRankColor(rank)} font-semibold`}>
              {rank}
            </span>
            <span className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded border border-white/10">
              {type}
            </span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-teal-400 transition-colors leading-snug">
          {title}
        </h3>
      </div>
      <div className="mt-2 pt-3 border-t border-white/5 flex justify-between items-center text-sm text-gray-400">
         <div className="flex items-center">
            <BookOpen size={14} className="mr-2 text-cyan-500" />
            {venue}
         </div>
         <span className="text-xs opacity-70">{role}</span>
      </div>
    </div>
  );
};

const SkillGroup = ({ title, skills, color }) => {
  const colorClasses = {
    cyan: "bg-cyan-500",
    teal: "bg-teal-500",
    emerald: "bg-emerald-500",
    green: "bg-green-500"
  };

  return (
    <div>
      <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <div key={i} className="group relative overflow-hidden px-4 py-2 bg-slate-800 rounded-lg border border-white/5 hover:border-white/20 transition-all">
             <div className={`absolute left-0 top-0 bottom-0 w-1 ${colorClasses[color]} opacity-50 group-hover:opacity-100 transition-opacity`} />
             <span className="text-sm text-gray-300 group-hover:text-white relative z-10 pl-2">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AwardItem = ({ title, issuer }) => (
  <div className="flex items-start space-x-3 text-sm">
    <Award size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
    <div>
      <p className="text-gray-200 font-medium">{title}</p>
      <p className="text-gray-500 text-xs">{issuer}</p>
    </div>
  </div>
);

const FooterLink = ({ href, icon: Icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors group"
  >
    <div className="p-3 bg-white/5 rounded-full group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
      <Icon size={20} />
    </div>
    <span className="text-xs">{label}</span>
  </a>
);

export default Portfolio;