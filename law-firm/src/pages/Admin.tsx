import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useSiteData, DEFAULT_DATA,
  type Advocate, type Office, type Testimonial, type Service, type PracticeArea, type CounterStat
} from "@/context/SiteContext";
import { useToast } from "@/hooks/use-toast";
import {
  Shield, Settings, Users, MapPin, Star, RefreshCw, Save, LogOut,
  Eye, EyeOff, ChevronRight, Plus, Trash2, Edit3, Camera, Stamp,
  MessageSquare, BarChart3, BookOpen
} from "lucide-react";
import { Link } from "wouter";
import ganeshLogo from "@/assets/images/ganesh-logo.png";
import seniorImage from "@/assets/images/senior-advocate.png";
import advocateImage from "@/assets/images/advocate.png";

const ADMIN_PASSWORD = "Mihir@1863";

const DEFAULT_PHOTOS: Record<string, string> = { senior: seniorImage, advocate: advocateImage };

const tabs = [
  { id: "firm", label: "Firm Info", icon: Settings },
  { id: "advocates", label: "Advocates", icon: Users },
  { id: "offices", label: "Offices", icon: MapPin },
  { id: "practice", label: "Practice Areas", icon: BookOpen },
  { id: "services", label: "Services", icon: Stamp },
  { id: "counters", label: "Statistics", icon: BarChart3 },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "chatbot", label: "AI Chatbot", icon: MessageSquare },
];

export default function Admin() {
  const { data, updateData, resetData, loading } = useSiteData();
  const { toast } = useToast();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [activeTab, setActiveTab] = useState("firm");
  const [localData, setLocalData] = useState(data);
  const photoRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync localData once Firebase finishes loading real data from Firestore
  useEffect(() => {
    if (!loading) setLocalData(data);
  }, [loading]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setLocalData(data);
    } else {
      toast({ title: "Incorrect password", description: "Please try again.", variant: "destructive" });
    }
  };

  const handleSave = () => {
    updateData(localData);
    toast({ title: "Changes Saved", description: "Website content updated successfully." });
  };

  const handleReset = () => {
    if (confirm("Reset all data to defaults? This cannot be undone.")) {
      resetData();
      setLocalData(DEFAULT_DATA);
      toast({ title: "Reset Complete", description: "All data restored to defaults." });
    }
  };

  const updateAdvocate = (idx: number, field: keyof Advocate, value: string | string[]) => {
    const updated = [...localData.advocates];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalData({ ...localData, advocates: updated });
  };

  const handlePhotoUpload = (idx: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      updateAdvocate(idx, "photo", base64);
    };
    reader.readAsDataURL(file);
  };

  const updateOffice = (idx: number, field: keyof Office, value: string | number) => {
    const updated = [...localData.offices];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalData({ ...localData, offices: updated });
  };

  const updateTestimonial = (idx: number, field: keyof Testimonial, value: string) => {
    const updated = [...localData.testimonials];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalData({ ...localData, testimonials: updated });
  };

  const addTestimonial = () => {
    setLocalData({
      ...localData,
      testimonials: [...localData.testimonials, { id: `t${Date.now()}`, quote: "", author: "", role: "" }],
    });
  };

  const removeTestimonial = (idx: number) => {
    setLocalData({ ...localData, testimonials: localData.testimonials.filter((_, i) => i !== idx) });
  };

  const updateService = (idx: number, field: keyof Service, value: string) => {
    const updated = [...localData.services];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalData({ ...localData, services: updated });
  };

  const addService = () => {
    setLocalData({
      ...localData,
      services: [...localData.services, { id: `s${Date.now()}`, title: "", description: "" }],
    });
  };

  const removeService = (idx: number) => {
    setLocalData({ ...localData, services: localData.services.filter((_, i) => i !== idx) });
  };

  const updateCounter = (idx: number, field: keyof CounterStat, value: string | number) => {
    const updated = [...localData.counterStats];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalData({ ...localData, counterStats: updated });
  };

  const updatePracticeArea = (idx: number, field: keyof PracticeArea, value: string) => {
    const updated = [...localData.practiceAreas];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalData({ ...localData, practiceAreas: updated });
  };

  const addPracticeArea = () => {
    setLocalData({
      ...localData,
      practiceAreas: [...localData.practiceAreas, { id: `pa${Date.now()}`, title: "", description: "" }],
    });
  };

  const removePracticeArea = (idx: number) => {
    setLocalData({ ...localData, practiceAreas: localData.practiceAreas.filter((_, i) => i !== idx) });
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/60 transition-colors text-sm resize-none";
  const labelCls = "block text-[10px] text-primary uppercase tracking-widest mb-1.5 font-semibold";
  const sectionCls = "bg-white/[0.03] border border-white/8 rounded-xl p-6 space-y-4";

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <img src={ganeshLogo} alt="logo" className="w-12 h-12 object-contain"
                  style={{ filter: "sepia(1) saturate(4) hue-rotate(5deg) brightness(1.2) drop-shadow(0 0 8px rgba(201,168,76,0.6))" }} />
              </div>
            </div>
            <h1 className="font-serif text-3xl text-white mb-2">Admin Panel</h1>
            <p className="text-primary text-xs tracking-widest uppercase">Vinayak Computers — Site Manager</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className={labelCls}>Admin Password</label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)}
                    className={inputCls + " pr-12"} placeholder="Enter password" autoFocus />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" /> Login to Admin
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">← Back to Website</Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={ganeshLogo} alt="logo" className="w-8 h-8 object-contain"
              style={{ filter: "sepia(1) saturate(4) hue-rotate(5deg) brightness(1.2)" }} />
            <div>
              <span className="font-serif text-lg text-white">Admin Panel</span>
              <span className="text-xs text-primary ml-2 tracking-wider">vinayak computers</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/"><button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
              <Eye className="w-4 h-4" /> View Site
            </button></Link>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all">
              <Save className="w-4 h-4" /> Save Changes
            </button>
            <button onClick={() => setAuthed(false)} className="p-2 text-muted-foreground hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="w-52 shrink-0">
          <nav className="space-y-1 sticky top-24">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}>
                <tab.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
                {activeTab === tab.id && <ChevronRight className="w-3 h-3 ml-auto shrink-0" />}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 mt-4">
              <button onClick={handleReset} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-all">
                <RefreshCw className="w-4 h-4" /> Reset All
              </button>
            </div>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.18 }} className="space-y-6">

              {/* FIRM INFO */}
              {activeTab === "firm" && (
                <>
                  <h2 className="font-serif text-2xl text-white">Firm Information</h2>
                  <div className={sectionCls}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={labelCls}>Firm Name</label>
                        <input className={inputCls} value={localData.firmName} onChange={e => setLocalData({ ...localData, firmName: e.target.value })} /></div>
                      <div><label className={labelCls}>Tagline</label>
                        <input className={inputCls} value={localData.tagline} onChange={e => setLocalData({ ...localData, tagline: e.target.value })} /></div>
                      <div className="md:col-span-2"><label className={labelCls}>Hero Title</label>
                        <input className={inputCls} value={localData.heroTitle} onChange={e => setLocalData({ ...localData, heroTitle: e.target.value })} /></div>
                      <div className="md:col-span-2"><label className={labelCls}>Hero Subtitle</label>
                        <textarea className={inputCls} rows={2} value={localData.heroSubtitle} onChange={e => setLocalData({ ...localData, heroSubtitle: e.target.value })} /></div>
                      <div><label className={labelCls}>Email Address</label>
                        <input className={inputCls} value={localData.email} onChange={e => setLocalData({ ...localData, email: e.target.value })} /></div>
                      <div><label className={labelCls}>WhatsApp Number (with country code)</label>
                        <input className={inputCls} value={localData.whatsapp} onChange={e => setLocalData({ ...localData, whatsapp: e.target.value })} /></div>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-white">About Section</h3>
                  <div className={sectionCls}>
                    <div className="space-y-4">
                      <div><label className={labelCls}>Section Heading</label>
                        <input className={inputCls} value={localData.aboutHeading} onChange={e => setLocalData({ ...localData, aboutHeading: e.target.value })} /></div>
                      <div><label className={labelCls}>About Paragraph 1</label>
                        <textarea className={inputCls} rows={3} value={localData.aboutText1} onChange={e => setLocalData({ ...localData, aboutText1: e.target.value })} /></div>
                      <div><label className={labelCls}>About Paragraph 2</label>
                        <textarea className={inputCls} rows={3} value={localData.aboutText2} onChange={e => setLocalData({ ...localData, aboutText2: e.target.value })} /></div>
                      <div><label className={labelCls}>About Paragraph 3</label>
                        <textarea className={inputCls} rows={2} value={localData.aboutText3} onChange={e => setLocalData({ ...localData, aboutText3: e.target.value })} /></div>
                    </div>
                  </div>
                </>
              )}

              {/* ADVOCATES */}
              {activeTab === "advocates" && (
                <>
                  <h2 className="font-serif text-2xl text-white">Advocate Profiles</h2>
                  {localData.advocates.map((adv, idx) => (
                    <div key={adv.id} className={sectionCls}>
                      <h3 className="text-primary font-medium text-sm uppercase tracking-widest flex items-center gap-2">
                        <Edit3 className="w-3.5 h-3.5" /> {adv.name || `Advocate ${idx + 1}`}
                      </h3>

                      {/* Photo Upload */}
                      <div className="flex items-start gap-5 pb-2 border-b border-white/8">
                        <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/15 shrink-0">
                          <img src={adv.photo || DEFAULT_PHOTOS[adv.id] || seniorImage}
                            alt={adv.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <label className={labelCls}>Profile Photo</label>
                          <p className="text-xs text-muted-foreground mb-3">Upload a new photo for this advocate. Recommended: square format, min 400×400px.</p>
                          <input ref={el => { photoRefs.current[idx] = el; }} type="file" accept="image/*" className="hidden"
                            onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(idx, f); }} />
                          <button onClick={() => photoRefs.current[idx]?.click()}
                            className="flex items-center gap-2 px-4 py-2 border border-primary/40 text-primary rounded-lg text-sm hover:bg-primary/10 transition-all">
                            <Camera className="w-4 h-4" /> Upload Photo
                          </button>
                          {adv.photo && (
                            <button onClick={() => updateAdvocate(idx, "photo", "")}
                              className="ml-3 text-xs text-red-400 hover:underline">
                              Remove (use default)
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className={labelCls}>Full Name</label>
                          <input className={inputCls} value={adv.name} onChange={e => updateAdvocate(idx, "name", e.target.value)} /></div>
                        <div><label className={labelCls}>Title / Designation</label>
                          <input className={inputCls} value={adv.title} onChange={e => updateAdvocate(idx, "title", e.target.value)} /></div>
                        <div><label className={labelCls}>Experience</label>
                          <input className={inputCls} value={adv.experience} onChange={e => updateAdvocate(idx, "experience", e.target.value)} /></div>
                        <div><label className={labelCls}>Phone</label>
                          <input className={inputCls} value={adv.phone} onChange={e => updateAdvocate(idx, "phone", e.target.value)} /></div>
                        <div><label className={labelCls}>Email</label>
                          <input className={inputCls} value={adv.email} onChange={e => updateAdvocate(idx, "email", e.target.value)} /></div>
                        <div><label className={labelCls}>Office Address</label>
                          <input className={inputCls} value={adv.office} onChange={e => updateAdvocate(idx, "office", e.target.value)} /></div>
                        <div className="md:col-span-2"><label className={labelCls}>About / Bio</label>
                          <textarea className={inputCls} rows={3} value={adv.about} onChange={e => updateAdvocate(idx, "about", e.target.value)} /></div>
                        <div className="md:col-span-2"><label className={labelCls}>Specializations (comma separated)</label>
                          <input className={inputCls} value={adv.specializations.join(", ")}
                            onChange={e => updateAdvocate(idx, "specializations", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} /></div>
                        <div className="md:col-span-2"><label className={labelCls}>Achievements (one per line)</label>
                          <textarea className={inputCls} rows={4} value={adv.achievements.join("\n")}
                            onChange={e => updateAdvocate(idx, "achievements", e.target.value.split("\n").filter(Boolean))} /></div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* OFFICES */}
              {activeTab === "offices" && (
                <>
                  <h2 className="font-serif text-2xl text-white">Office Locations</h2>
                  {localData.offices.map((office, idx) => (
                    <div key={office.id} className={sectionCls}>
                      <h3 className="text-primary font-medium text-sm uppercase tracking-widest">Office {idx + 1}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className={labelCls}>Office Name</label>
                          <input className={inputCls} value={office.name} onChange={e => updateOffice(idx, "name", e.target.value)} /></div>
                        <div><label className={labelCls}>Phone</label>
                          <input className={inputCls} value={office.phone} onChange={e => updateOffice(idx, "phone", e.target.value)} /></div>
                        <div className="md:col-span-2"><label className={labelCls}>Full Address</label>
                          <input className={inputCls} value={office.address} onChange={e => updateOffice(idx, "address", e.target.value)} /></div>
                        <div><label className={labelCls}>Latitude (for map pin)</label>
                          <input type="number" step="0.0001" className={inputCls} value={office.lat}
                            onChange={e => updateOffice(idx, "lat", parseFloat(e.target.value))} /></div>
                        <div><label className={labelCls}>Longitude (for map pin)</label>
                          <input type="number" step="0.0001" className={inputCls} value={office.lng}
                            onChange={e => updateOffice(idx, "lng", parseFloat(e.target.value))} /></div>
                        <div className="md:col-span-2"><label className={labelCls}>Google Maps Directions URL</label>
                          <input className={inputCls} value={office.directionsUrl} onChange={e => updateOffice(idx, "directionsUrl", e.target.value)} /></div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* PRACTICE AREAS */}
              {activeTab === "practice" && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-white">Practice Areas</h2>
                    <button onClick={addPracticeArea} className="flex items-center gap-2 px-4 py-2 border border-primary/40 text-primary rounded-lg text-sm hover:bg-primary/10 transition-all">
                      <Plus className="w-4 h-4" /> Add Area
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {localData.practiceAreas.map((area, idx) => (
                      <div key={area.id} className={sectionCls + " relative"}>
                        <button onClick={() => removePracticeArea(idx)} className="absolute top-3 right-3 p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div><label className={labelCls}>Title</label>
                          <input className={inputCls} value={area.title} onChange={e => updatePracticeArea(idx, "title", e.target.value)} /></div>
                        <div><label className={labelCls}>Description</label>
                          <textarea className={inputCls} rows={2} value={area.description} onChange={e => updatePracticeArea(idx, "description", e.target.value)} /></div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* SERVICES */}
              {activeTab === "services" && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-white">Services</h2>
                    <button onClick={addService} className="flex items-center gap-2 px-4 py-2 border border-primary/40 text-primary rounded-lg text-sm hover:bg-primary/10 transition-all">
                      <Plus className="w-4 h-4" /> Add Service
                    </button>
                  </div>
                  <p className="text-muted-foreground text-sm">These appear in the "Our Services" section — stamps, notary, document drafting, etc.</p>
                  <div className="space-y-4">
                    {localData.services.map((svc, idx) => (
                      <div key={svc.id} className={sectionCls + " relative"}>
                        <button onClick={() => removeService(idx)} className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div><label className={labelCls}>Service Title</label>
                            <input className={inputCls} value={svc.title} onChange={e => updateService(idx, "title", e.target.value)} /></div>
                          <div className="md:col-span-2"><label className={labelCls}>Description</label>
                            <input className={inputCls} value={svc.description} onChange={e => updateService(idx, "description", e.target.value)} /></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* COUNTER STATS */}
              {activeTab === "counters" && (
                <>
                  <h2 className="font-serif text-2xl text-white">Statistics / Counter Numbers</h2>
                  <p className="text-muted-foreground text-sm">These are the big animated numbers that appear on the homepage.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {localData.counterStats.map((stat, idx) => (
                      <div key={stat.id} className={sectionCls}>
                        <div className="grid grid-cols-3 gap-3">
                          <div><label className={labelCls}>Number</label>
                            <input type="number" className={inputCls} value={stat.value}
                              onChange={e => updateCounter(idx, "value", parseInt(e.target.value) || 0)} /></div>
                          <div><label className={labelCls}>Suffix (e.g. +)</label>
                            <input className={inputCls} value={stat.suffix} onChange={e => updateCounter(idx, "suffix", e.target.value)} /></div>
                          <div><label className={labelCls}>Label</label>
                            <input className={inputCls} value={stat.label} onChange={e => updateCounter(idx, "label", e.target.value)} /></div>
                        </div>
                        <div className="text-center text-3xl font-serif text-primary mt-1">{stat.value}{stat.suffix} <span className="text-sm text-muted-foreground">{stat.label}</span></div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* TESTIMONIALS */}
              {activeTab === "testimonials" && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-white">Testimonials</h2>
                    <button onClick={addTestimonial} className="flex items-center gap-2 px-4 py-2 border border-primary/40 text-primary rounded-lg text-sm hover:bg-primary/10 transition-all">
                      <Plus className="w-4 h-4" /> Add Testimonial
                    </button>
                  </div>
                  <div className="space-y-4">
                    {localData.testimonials.map((t, idx) => (
                      <div key={t.id} className={sectionCls + " relative"}>
                        <button onClick={() => removeTestimonial(idx)} className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><label className={labelCls}>Author Name</label>
                            <input className={inputCls} value={t.author} onChange={e => updateTestimonial(idx, "author", e.target.value)} /></div>
                          <div><label className={labelCls}>Role / Designation</label>
                            <input className={inputCls} value={t.role} onChange={e => updateTestimonial(idx, "role", e.target.value)} /></div>
                          <div className="md:col-span-2"><label className={labelCls}>Quote</label>
                            <textarea className={inputCls} rows={3} value={t.quote} onChange={e => updateTestimonial(idx, "quote", e.target.value)} /></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* AI CHATBOT */}
              {activeTab === "chatbot" && (
                <>
                  <h2 className="font-serif text-2xl text-white">AI Chatbot Settings</h2>
                  <div className={sectionCls}>
                    <div>
                      <label className={labelCls}>Greeting Message</label>
                      <p className="text-xs text-muted-foreground mb-2">This is the first message the chatbot sends when a visitor opens it.</p>
                      <textarea className={inputCls} rows={4} value={localData.chatbotGreeting}
                        onChange={e => setLocalData({ ...localData, chatbotGreeting: e.target.value })} />
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/15 rounded-xl">
                      <p className="text-xs text-primary font-medium uppercase tracking-widest mb-1">How the AI is trained</p>
                      <p className="text-sm text-muted-foreground">The chatbot automatically knows about your advocates, services, offices, practice areas, and contact details. Just keep your content updated and the AI will answer questions accordingly.</p>
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4">
                <button onClick={handleSave} className="flex items-center gap-2 px-8 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-all">
                  <Save className="w-4 h-4" /> Save All Changes
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
