import React, { createContext, useContext, useState, useCallback } from "react";

export type Advocate = {
  id: string;
  name: string;
  title: string;
  experience: string;
  specializations: string[];
  phone: string;
  email: string;
  office: string;
  about: string;
  achievements: string[];
  photo?: string;
};

export type Office = {
  id: string;
  name: string;
  address: string;
  phone: string;
  directionsUrl: string;
  lat: number;
  lng: number;
};

export type PracticeArea = {
  id: string;
  title: string;
  description: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

export type CounterStat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export type SiteData = {
  firmName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutHeading: string;
  aboutText1: string;
  aboutText2: string;
  aboutText3: string;
  email: string;
  whatsapp: string;
  counterStats: CounterStat[];
  advocates: Advocate[];
  offices: Office[];
  practiceAreas: PracticeArea[];
  services: Service[];
  testimonials: Testimonial[];
  chatbotGreeting: string;
};

export const DEFAULT_DATA: SiteData = {
  firmName: "Vinayak Computers",
  tagline: "Multi-Generational Legal Excellence",
  heroTitle: "Justice. Integrity. Excellence.",
  heroSubtitle: "A distinguished multi-generational law firm delivering uncompromising legal representation.",
  aboutHeading: "A Tradition of Legal Excellence",
  aboutText1: "Established over two decades ago, Vinayak Computers has built a formidable reputation in the legal fraternity. What began as a solo practice has now evolved into a dynamic multi-generational firm.",
  aboutText2: "We blend the profound wisdom and nuanced understanding of a seasoned Senior Advocate with the aggressive, innovative strategies of a modern legal practitioner — offering representation that is both deeply rooted in experience and sharply attuned to contemporary challenges.",
  aboutText3: "Our commitment is simple: relentless pursuit of justice, absolute integrity, and unwavering dedication to our clients causes.",
  email: "vinayakcomputer1863@gmail.com",
  whatsapp: "+919879451711",
  counterStats: [
    { id: "c1", value: 25, suffix: "+", label: "Years Experience" },
    { id: "c2", value: 500, suffix: "+", label: "Cases Won" },
    { id: "c3", value: 2, suffix: "", label: "Generations" },
    { id: "c4", value: 15, suffix: "+", label: "Practice Areas" },
  ],
  advocates: [
    {
      id: "senior",
      name: "Adv. Ramesh N Patel",
      title: "Advocate",
      experience: "25+ Years Experience",
      specializations: ["Civil Law", "Property Law", "Constitutional Law", "Criminal Case", "High Court Matters"],
      phone: "+91 98794 51711",
      email: "rnpatelp0@gmail.com",
      office: "Vinayak Computer, 2nd Floor, Opp. Green Park Hotel, Marketyad, Meghraj",
      about: "A stalwart of the legal profession with over two decades of distinguished practice. Adv. Ramesh N Patel has successfully represented clients in landmark civil, criminal and constitutional matters. Known for his commanding courtroom presence and encyclopedic knowledge of jurisprudence.",
      achievements: [
        "Former President, District Bar Association",
        "Successfully argued over 500+ civil and criminal suits",
        "Recognized for exceptional pro-bono work in public interest litigations",
        "Advisor to several large corporate conglomerates",
      ],
    },
    {
      id: "advocate",
      name: "Adv. Jaydip N Patel",
      title: "Advocate",
      experience: "17+ Years Experience",
      specializations: ["Criminal Defense", "Family Law", "Consumer Forum", "Criminal Case", "Corporate Litigation"],
      phone: "+91 95580 21551",
      email: "pateljaydipp111@gmail.com",
      office: "Vinayak Computer, Near Police Station, Lunavada Road, Malpur",
      about: "Bringing a modern, aggressive, and highly strategic approach to legal practice. Adv. Jaydip N Patel combines foundational legal principles with contemporary legal strategies. Highly sought after for complex criminal defense and sensitive family matters.",
      achievements: [
        "Secured acquittals in highly publicized criminal trials",
        "Specializes in out-of-court settlements for complex family disputes",
        "Regular legal commentator for regional news networks",
        "Pioneer in integrating legal tech for efficient case management",
      ],
    },
  ],
  offices: [
    {
      id: "office1",
      name: "Vinayak Computer Meghraj",
      address: "Vinayak Computer, 2nd Floor, Opp. Green Park Hotel, Marketyad, Meghraj",
      phone: "+91 98794 51711",
      directionsUrl: "https://maps.app.goo.gl/uFSR8EMq4dACJ76S6",
      lat: 23.4941885,
      lng: 73.5047428,
    },
    {
      id: "office2",
      name: "Vinayak Computer Malpur",
      address: "Vinayak Computer, Near Police Station, Lunavada Road, Malpur",
      phone: "+91 95580 21551",
      directionsUrl: "https://maps.app.goo.gl/BrdkHsQcXGu6QN1g9",
      lat: 23.362919,
      lng: 73.468463,
    },
  ],
  practiceAreas: [
    { id: "civil", title: "Civil Law", description: "Expert representation in civil disputes, property matters, and contract litigation." },
    { id: "criminal", title: "Criminal Defense", description: "Aggressive and strategic criminal defense across all courts." },
    { id: "property", title: "Property Law", description: "Comprehensive legal solutions for property transactions and disputes." },
    { id: "family", title: "Family Law", description: "Sensitive and effective handling of matrimonial and family matters." },
    { id: "corporate", title: "Corporate Law", description: "Strategic legal counsel for businesses and corporate entities." },
    { id: "constitutional", title: "Constitutional Law", description: "Landmark constitutional matters and public interest litigations." },
    { id: "consumer", title: "Consumer Forum", description: "Protecting consumer rights with proven expertise." },
    { id: "highcourt", title: "High Court Matters", description: "Distinguished representation before High Court and appellate forums." },
  ],
  services: [
    { id: "s1", title: "Stamp Duty Services", description: "Accurate calculation and processing of stamp duty on all legal documents and property transactions." },
    { id: "s2", title: "Notary Services", description: "Certified notarization of affidavits, agreements, power of attorney, and all legal documents." },
    { id: "s3", title: "Document Drafting", description: "Professional drafting of legal agreements, contracts, wills, and court petitions." },
    { id: "s4", title: "Court Fee Stamps", description: "Procurement and affixing of court fee stamps for all judicial proceedings." },
    { id: "s5", title: "Property Registration", description: "End-to-end assistance with property sale, purchase, and registration formalities." },
    { id: "s6", title: "Affidavit Services", description: "Swearing and attestation of affidavits for all legal and administrative purposes." },
  ],
  testimonials: [
    { id: "t1", quote: "Adv. Ramesh N Patel handled our complex property dispute with unmatched expertise. His courtroom presence is commanding, and the attention to detail is exactly what you would expect from a top-tier law firm.", author: "Vikram S.", role: "Business Owner" },
    { id: "t2", quote: "We were facing a difficult corporate litigation matter. The strategic approach taken by Patel & Associates saved our company substantial time and resources. Highly recommended.", author: "Priya M.", role: "Corporate Director" },
    { id: "t3", quote: "Adv. Jaydip N Patel represented me in a family court matter. He was not just a brilliant lawyer but also highly empathetic and accessible throughout the stressful process.", author: "Ananya D.", role: "Client" },
    { id: "t4", quote: "The multi-generational expertise truly shows. You get the wisdom of a Senior Advocate combined with the energetic, modern approach of a sharp young mind. Exceptional legal service.", author: "Rajesh K.", role: "Real Estate Developer" },
  ],
  chatbotGreeting: "Namaste! I am the virtual assistant for Vinayak Computers. How can I help you today? You can ask about our advocates, services, office locations, or book a consultation.",
};

const STORAGE_KEY = "vinayak_site_data";

function loadFromStorage(): SiteData | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as SiteData;
  } catch {
    return null;
  }
}

function saveToStorage(data: SiteData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

type SiteContextType = {
  data: SiteData;
  updateData: (newData: Partial<SiteData>) => void;
  resetData: () => void;
  loading: boolean;
};

const SiteContext = createContext<SiteContextType | null>(null);

export const SiteProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<SiteData>(() => {
    const saved = loadFromStorage();
    if (saved) {
      return {
        ...DEFAULT_DATA,
        ...saved,
        services: saved.services?.length ? saved.services : DEFAULT_DATA.services,
        counterStats: saved.counterStats?.length ? saved.counterStats : DEFAULT_DATA.counterStats,
        chatbotGreeting: saved.chatbotGreeting || DEFAULT_DATA.chatbotGreeting,
        aboutHeading: saved.aboutHeading || DEFAULT_DATA.aboutHeading,
        aboutText1: saved.aboutText1 || DEFAULT_DATA.aboutText1,
        aboutText2: saved.aboutText2 || DEFAULT_DATA.aboutText2,
        aboutText3: saved.aboutText3 || DEFAULT_DATA.aboutText3,
      };
    }
    return DEFAULT_DATA;
  });
  const [loading] = useState(false);

  const updateData = useCallback((newData: Partial<SiteData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const resetData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(DEFAULT_DATA);
  }, []);

  return (
    <SiteContext.Provider value={{ data, updateData, resetData, loading }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSiteData must be used inside SiteProvider");
  return ctx;
};
