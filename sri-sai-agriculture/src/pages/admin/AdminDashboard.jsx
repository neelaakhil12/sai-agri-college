import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Users, 
  BookOpen, 
  Award, 
  History, 
  Image as ImageIcon, 
  MessageSquare, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  ChevronRight,
  LayoutDashboard,
  Search,
  Bell,
  CheckCircle2,
  X,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  ChevronDown
} from 'lucide-react';

const API_URL = '/api';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // For the dashboard part
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentFees, setStudentFees] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'form'
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [appliedCourse, setAppliedCourse] = useState("all");
  const [appliedYear, setAppliedYear] = useState("all");
  const [appliedBatch, setAppliedBatch] = useState("all");

  // FormData for adding items
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const tabs = [
    { id: 'students', label: 'Student Accounts', icon: Users },
    { id: 'faculty', label: 'Faculty', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'ranks', label: 'Ranks', icon: Award },
    { id: 'stories', label: 'Stories', icon: History },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'enquiries', label: 'Enquiries', icon: HelpCircle },
    { id: 'hero', label: 'Hero Section', icon: LayoutDashboard },
  ];

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/auth`, { withCredentials: true });
      if (res.data.authenticated) {
        setIsAdmin(true);
      }
    } catch (err) {
      setIsAdmin(false);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      let endpoint = `/${activeTab}`;
      const res = await axios.get(`${API_URL}${endpoint}`, { withCredentials: true });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [activeTab]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAdmin) {
      const fetchStudents = async () => {
        try {
          const res = await axios.get("/api/students/admin/list");
          setStudents(res.data);
        } catch (err) {
          console.error("Fetch students failed");
        }
      };
      if (activeTab === "students") fetchStudents();
    }
  }, [isAdmin, fetchData, refresh]);

  useEffect(() => {
    const fetchFees = async () => {
      if (selectedStudent) {
        try {
          const res = await axios.get(`/api/fees/${selectedStudent.id}`);
          setStudentFees(res.data);
        } catch (err) {
          console.error("Fetch fees failed");
        }
      }
    };
    fetchFees();
  }, [selectedStudent]);

  useEffect(() => {
    setViewMode('list');
    setEditingId(null);
    setFormData({});
    setFile(null);
  }, [activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/admin/login`, { username, password }, { withCredentials: true });
      setIsAdmin(true);
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Invalid credentials');
      } else if (err.request) {
        setError('Server connection failed. Is the backend running on port 5000?');
      } else {
        setError('Login error: ' + err.message);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await axios.delete(`${API_URL}/${activeTab}/${id}`, { withCredentials: true });
      setRefresh(r => r + 1);
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.keys(formData).forEach(key => {
      if (!['_id', 'id', 'image', 'created_at'].includes(key)) {
        payload.append(key, formData[key]);
      }
    });

    // Normalize field names for Supabase (snake_case)
    if (activeTab === 'ranks' || activeTab === 'testimonials') {
      if (formData.studentName) payload.append('student_name', formData.studentName);
    }
    if (activeTab === 'ranks' && formData.hallTicketNumber) {
      payload.append('hall_ticket_number', formData.hallTicketNumber);
    }

    if (file) {
      payload.append('image', file);
    }

    try {
      const endpoint = `/${activeTab}`;
      const method = editingId ? 'put' : 'post';
      const url = editingId ? `${API_URL}${endpoint}/${editingId}` : `${API_URL}${endpoint}`;

      console.log(`🚀 Sending ${method.toUpperCase()} request to: ${url}`);
      console.log(`📦 Payload keys:`, [...payload.keys()]);

      await axios({
        method,
        url,
        data: payload,
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      setFormData({});
      setFile(null);
      setEditingId(null);
      setViewMode('list');
      setRefresh(r => r + 1);
      alert(editingId ? 'Successfully updated' : 'Successfully added');
    } catch (err) {
      console.error("Action error:", err);
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id || item._id);
    let mapped = { ...item };
    
    if (activeTab === 'testimonials' || activeTab === 'ranks') {
       mapped.studentName = item.student_name || item.studentName;
    }
    
    if (activeTab === 'ranks') {
       mapped.hallTicketNumber = item.hall_ticket_number || item.hallTicketNumber;
    }
    
    if (activeTab === 'courses' && item.details) mapped.details = JSON.stringify(item.details);
    if (activeTab === 'hero' && item.h1) mapped.h1 = JSON.stringify(item.h1);

    if (activeTab === 'gallery') {
      mapped.label = item.label;
      mapped.sub_label = item.sub_label;
    }

    delete mapped.image;
    delete mapped.created_at;

    setFormData(mapped);
    setViewMode('form');
  };

  const logout = async () => {
    await axios.post(`${API_URL}/admin/logout`, {}, {withCredentials: true});
    setIsAdmin(false);
  };

  const handleSync = async () => {
    if (!window.confirm("This will import missing data from your website to the database. Continue?")) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/admin/sync`, {}, { withCredentials: true });
      alert(res.data.message || "Sync successful!");
      setRefresh(prev => prev + 1);
    } catch (err) {
      alert("Sync failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6 font-sora">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-gray-100">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-blue rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue/20">S</div>
             <h2 className="text-2xl font-bold text-ink">Admin Portal</h2>
             <p className="text-gray-400 text-sm mt-1">Please enter your credentials to continue</p>
          </div>
          {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Username</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue focus:outline-none transition-all" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue/20 focus:border-blue focus:outline-none transition-all" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-ink text-white py-4 rounded-xl font-bold hover:bg-blue transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const activeTabLabel = tabs.find(t => t.id === activeTab)?.label;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sora">
      {/* SIDEBAR */}
      <aside className="w-72 bg-ink text-white flex flex-col sticky top-0 h-screen shadow-2xl z-20">
        <div className="p-8 border-b border-white/10 flex items-center gap-4">
          <div className="w-10 h-10 bg-white text-ink rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">S</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Sri Sai Admin</h1>
            <p className="text-[10px] text-white/50 uppercase font-black tracking-widest">Control Center</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto scrollbar-hide">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4 ml-2">Navigation</p>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 group ${activeTab === tab.id ? 'bg-blue text-white shadow-lg shadow-blue/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            >
              <tab.icon size={18} className={`${activeTab === tab.id ? 'text-white' : 'text-white/40 group-hover:text-white'} transition-colors`} />
              <span className="flex-1 text-left">{tab.label}</span>
              {activeTab === tab.id && <ChevronRight size={14} className="opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10 backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-ink">{activeTabLabel}</h2>
            <div className="h-4 w-[1px] bg-gray-200"></div>
            <p className="text-xs text-muted font-medium">Dashboard / {activeTabLabel}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input placeholder="Search entries..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue/10 focus:border-blue focus:outline-none transition-all w-64" />
              </div>
              
              <button 
                onClick={handleSync}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl font-bold text-xs hover:bg-amber-100 transition-all active:scale-95 disabled:opacity-50"
                title="Sync existing website data to database"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Sync Data</span>
              </button>

              <button className="relative w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <Bell size={18} className="text-muted" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
               <div className="text-right">
                  <p className="text-xs font-bold text-ink">Administrator</p>
                  <p className="text-[10px] text-muted">Super User</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-sky border border-blue/20 flex items-center justify-center text-blue font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-6xl w-full mx-auto">
          {/* ACTION HEADER */}
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-2xl font-bold text-ink">{viewMode === 'list' ? `Existing ${activeTabLabel}` : (editingId ? `Edit ${activeTabLabel}` : `Add New ${activeTabLabel}`)}</h3>
               <p className="text-sm text-muted mt-1">Manage and update your website content efficiently</p>
            </div>
            
            <div className="flex gap-3">
              {activeTab !== 'enquiries' && (
                <button 
                  onClick={() => {
                    if (viewMode === 'form') {
                      setViewMode('list');
                      setEditingId(null);
                      setFormData({});
                      setFile(null);
                    } else {
                      setViewMode('form');
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 ${viewMode === 'form' ? 'bg-white text-red-500 border border-red-100' : 'bg-blue text-white hover:bg-ink'}`}
                >
                  {viewMode === 'form' ? <><X size={18} /> Back to List</> : <><Plus size={18} /> Create New {activeTabLabel}</>}
                </button>
              )}
            </div>
          </div>

          {/* HERO SECTION FORM (Special fields) */}
          {viewMode === 'form' && activeTab === 'hero' && (
            <div className="bg-white rounded-3xl shadow-xl shadow-ink/5 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="p-8 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
                <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center text-blue">
                   <LayoutDashboard size={20} />
                </div>
                <div>
                   <h4 className="font-bold text-ink">Hero Section Configuration</h4>
                   <p className="text-[10px] text-muted uppercase font-black tracking-widest">Main Landing Content</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Small Tag</label>
                  <input required placeholder="Admissions Open 2026" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, tag: e.target.value})} value={formData.tag || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Heading lines (JSON array)</label>
                  <input required placeholder='["Line 1", "Line 2"]' className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, h1: e.target.value})} value={formData.h1 || ''} />
                </div>
                <div className="space-y-2 md:col-span-2">
                   <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                   <textarea required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all h-24" onChange={e => setFormData({...formData, description: e.target.value})} value={formData.description || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Motto Text</label>
                  <input required placeholder="Nurturing the future of agriculture" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, motto: e.target.value})} value={formData.motto || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Button Label</label>
                  <input placeholder="Join Now" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, btn1_label: e.target.value})} value={formData.btn1_label || ''} />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-blue text-white py-5 rounded-2xl font-bold text-lg hover:bg-ink transition-all active:scale-[0.98]">Update Hero Section</button>
                </div>
              </form>
            </div>
          )}

          {/* VIEW: FORM (Regular) */}
          {viewMode === 'form' && activeTab !== 'hero' ? (
            <div className="bg-white rounded-3xl shadow-xl shadow-ink/5 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
                <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center text-blue">
                   {editingId ? <Edit3 size={20} /> : <Plus size={20} />}
                </div>
                <div>
                   <h4 className="font-bold text-ink">{editingId ? 'Update Information' : 'Entry Details'}</h4>
                   <p className="text-[10px] text-muted uppercase font-black tracking-widest">Please fill all required fields</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeTab === 'faculty' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input required placeholder="Dr. John Doe" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Initials</label>
                        <input required placeholder="JD" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, initials: e.target.value})} value={formData.initials || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Department</label>
                        <input required placeholder="Agronomy" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, department: e.target.value})} value={formData.department || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Experience</label>
                        <input required placeholder="12 Years" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, experience: e.target.value})} value={formData.experience || ''} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                        <select required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all appearance-none" onChange={e => setFormData({...formData, category: e.target.value})} value={formData.category || ''}>
                            <option value="">Select Category</option>
                            <option value="math">Mathematics</option>
                            <option value="phys">Physics</option>
                            <option value="chem">Chemistry</option>
                            <option value="bio">Biology</option>
                            <option value="comm">Commerce</option>
                            <option value="lang">Languages</option>
                        </select>
                      </div>
                    </>
                  )}

                  {activeTab === 'courses' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Course Title</label>
                        <input required placeholder="B.Sc Agriculture" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, title: e.target.value})} value={formData.title || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Stream</label>
                        <select required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, stream: e.target.value})} value={formData.stream || ''}>
                          <option value="">Select Stream</option>
                          <option value="engineering">Engineering</option>
                          <option value="medical">Medical</option>
                          <option value="commerce">Commerce</option>
                        </select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Short Description</label>
                        <input required placeholder="Brief overview of the course" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, description: e.target.value})} value={formData.description || ''} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Details (JSON array e.g. ["Point 1", "Point 2"])</label>
                        <textarea placeholder='["Duration: 4 Years", "Eligibility: Inter MPC/BiPC"]' className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all h-32" onChange={e => setFormData({...formData, details: e.target.value})} value={formData.details || ''} />
                      </div>
                    </>
                  )}

                  {activeTab === 'ranks' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Student Name</label>
                        <input required placeholder="Full Name" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, studentName: e.target.value})} value={formData.studentName || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Hall Ticket</label>
                        <input required placeholder="HT123456" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, hallTicketNumber: e.target.value})} value={formData.hallTicketNumber || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Rank / Score</label>
                        <input required placeholder="AIR 456" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, rank: e.target.value})} value={formData.rank || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Exam</label>
                        <input required placeholder="JEE Mains" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, exam: e.target.value})} value={formData.exam || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Stream</label>
                        <input required placeholder="MPC" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, stream: e.target.value})} value={formData.stream || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Year</label>
                        <input type="number" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, year: e.target.value})} value={formData.year || new Date().getFullYear()} />
                      </div>
                    </>
                  )}

                  {activeTab === 'stories' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Student Name</label>
                        <input required placeholder="Name" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Initials</label>
                        <input required placeholder="BG" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, initials: e.target.value})} value={formData.initials || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Achievement</label>
                        <input required placeholder="Rank 45" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, place: e.target.value})} value={formData.place || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                        <input list="categories" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, category: e.target.value})} value={formData.category || ''} />
                        <datalist id="categories">
                          <option value="jee">JEE Mains</option>
                          <option value="neet">NEET achievers</option>
                          <option value="intermediate">Board Toppers</option>
                        </datalist>
                      </div>
                    </>
                  )}

                  {activeTab === 'testimonials' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Student Name</label>
                        <input required placeholder="Name" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, studentName: e.target.value})} value={formData.studentName || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Achievement</label>
                        <input required placeholder="Course / Year" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, achievement: e.target.value})} value={formData.achievement || ''} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Quote</label>
                        <textarea required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all h-24" onChange={e => setFormData({...formData, quote: e.target.value})} value={formData.quote || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Initials</label>
                        <input required placeholder="KR" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, initials: e.target.value})} value={formData.initials || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Stars (1-5)</label>
                        <input type="number" min="1" max="5" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, stars: e.target.value})} value={formData.stars || 5} />
                      </div>
                    </>
                  )}

                  {activeTab === 'gallery' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Image Label</label>
                        <input required placeholder="Science Lab" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, label: e.target.value})} value={formData.label || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Sub Label</label>
                        <input required placeholder="Modern Equipment" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, sub_label: e.target.value})} value={formData.sub_label || ''} />
                      </div>
                    </>
                  )}

                  {activeTab === 'students' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Student Full Name</label>
                        <input required placeholder="Enter student name" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, student_name: e.target.value})} value={formData.student_name || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Roll Number (ID)</label>
                        <input required placeholder="e.g. AG-2026-001" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, id: e.target.value})} value={formData.id || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Login Email</label>
                        <input required type="email" placeholder="student@portal.com" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, email_personal: e.target.value})} value={formData.email_personal || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Set Password</label>
                        <input required type="text" placeholder="••••••••" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, password: e.target.value})} value={formData.password || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Course Applied</label>
                        <select 
                          required 
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all appearance-none" 
                          onChange={e => {
                            const val = e.target.value;
                            setFormData({
                              ...formData, 
                              course_applied: val,
                              branch: val === 'Ag. B.Sc.' ? 'NULL' : ''
                            });
                          }} 
                          value={formData.course_applied || ''}
                        >
                          <option value="">Select Course</option>
                          <option value="Ag. B.Sc.">Ag. B.Sc.</option>
                          <option value="Ag. M.Sc.">Ag. M.Sc.</option>
                        </select>
                      </div>

                      {formData.course_applied === 'Ag. M.Sc.' && (
                        <div className="space-y-2 animate-fadeIn">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Specialization (Branch)</label>
                          <select 
                            required 
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all appearance-none" 
                            onChange={e => setFormData({...formData, branch: e.target.value})} 
                            value={formData.branch || ''}
                          >
                            <option value="">Select Specialization</option>
                            <option value="Msc soil science">Msc soil science</option>
                            <option value="Msc horticulture">Msc horticulture</option>
                            <option value="Msc agronomy">Msc agronomy</option>
                            <option value="Msc plant breeding and genetics">Msc plant breeding and genetics</option>
                            <option value="Msc zoology">Msc zoology</option>
                            <option value="Msc chemistry">Msc chemistry</option>
                          </select>
                        </div>
                      )}

                      {formData.course_applied === 'Ag. B.Sc.' && (
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Branch</label>
                          <input 
                            readOnly 
                            value="NULL" 
                            className="w-full px-5 py-4 bg-gray-100 border border-gray-200 rounded-2xl text-gray-400 outline-none cursor-not-allowed font-bold" 
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Academic Enrolled Year</label>
                        <input 
                          required 
                          placeholder="e.g. 2024-2025" 
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all font-bold text-ink" 
                          onChange={e => setFormData({...formData, academic_enrolled_year: e.target.value})} 
                          value={formData.academic_enrolled_year || ''} 
                        />
                      </div>
                    </>
                  )}

                  <div className="md:col-span-2">
                    <div className="p-10 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 text-center space-y-4 hover:border-blue/50 hover:bg-blue/5 transition-all">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto text-blue">
                         <ImageIcon size={32} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-ink">Upload Media Asset</p>
                        <p className="text-xs text-muted mt-1">Recommended size: 800x600px. Max 1MB.</p>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*,application/pdf"
                        className="block w-full text-xs text-gray-400 file:mr-4 file:py-3 file:px-8 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-ink file:text-white hover:file:bg-blue file:transition-all file:cursor-pointer" 
                        onChange={e => setFile(e.target.files[0])} 
                      />
                    </div>
                  </div>
                </div>


                <div className="mt-12 flex gap-4">
                  <button type="submit" className="flex-1 bg-blue text-white py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-blue/20 hover:bg-ink transition-all active:scale-[0.98]">
                    {editingId ? 'Save Changes' : 'Create Entry'}
                  </button>
                </div>
              </form>
            </div>
          ) : viewMode === 'student-manage' ? (
            <div className="p-8 max-w-5xl mx-auto animate-fadeIn">
               <button onClick={() => setViewMode('list')} className="mb-6 flex items-center gap-2 text-blue font-bold text-sm hover:underline">
                  <ArrowRight className="rotate-180" size={16} /> Back to Student List
               </button>
               
               <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 mb-10">
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-50">
                     <div className="h-24 w-24 rounded-[2rem] bg-sky flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                        {formData.photo ? <img src={formData.photo} className="h-full w-full object-cover" /> : <span className="text-blue font-black text-3xl">{formData.student_name?.[0]}</span>}
                     </div>
                     <div>
                        <h2 className="text-3xl font-black text-ink">{formData.student_name}</h2>
                        <p className="text-muted font-bold text-[10px] uppercase tracking-[0.3em]">MANAGE STUDENT ACCOUNT</p>
                     </div>
                  </div>

                  {/* Profile Edit Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                     {[
                       { label: 'Student Name', key: 'student_name' },
                       { label: 'Roll Number', key: 'roll_no' },
                       { label: 'Login Email', key: 'email_personal' },
                       { label: 'Father Name', key: 'father_name' },
                       { label: 'Mother Name', key: 'mother_name' },
                       { label: 'Date of Birth', key: 'dob', type: 'date' },
                       { label: 'Gender', key: 'gender' },
                       { label: 'Mobile 1', key: 'mobile1' },
                       { label: 'Mobile 2', key: 'mobile2' },
                       { label: 'Medium', key: 'medium' },
                       { label: 'Door No', key: 'door_no' },
                       { label: 'Village', key: 'village' },
                       { label: 'Mandal', key: 'mandal' },
                       { label: 'District', key: 'district' },
                       { label: 'Pincode', key: 'pin' },
                     ].map(field => (
                       <div key={field.key} className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{field.label}</label>
                          <input 
                            type={field.type || 'text'}
                            value={formData[field.key] || ''} 
                            onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink" 
                          />
                       </div>
                     ))}

                      {/* Specialized Fields */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Course Applied</label>
                        <select 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink" 
                          onChange={e => {
                            const val = e.target.value;
                            setFormData({
                              ...formData, 
                              course_applied: val,
                              branch: val === 'Ag. B.Sc.' ? 'NULL' : ''
                            });
                          }} 
                          value={formData.course_applied || ''}
                        >
                          <option value="Ag. B.Sc.">Ag. B.Sc.</option>
                          <option value="Ag. M.Sc.">Ag. M.Sc.</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Branch (Specialization)</label>
                        {formData.course_applied === 'Ag. M.Sc.' ? (
                          <select 
                            className="w-full px-4 py-3 bg-white border-2 border-blue/20 rounded-xl focus:border-blue outline-none transition-all font-bold text-blue" 
                            onChange={e => setFormData({...formData, branch: e.target.value})} 
                            value={formData.branch || ''}
                          >
                            <option value="">Select Specialization</option>
                            <option value="Msc soil science">Msc soil science</option>
                            <option value="Msc horticulture">Msc horticulture</option>
                            <option value="Msc agronomy">Msc agronomy</option>
                            <option value="Msc plant breeding and genetics">Msc plant breeding and genetics</option>
                            <option value="Msc zoology">Msc zoology</option>
                            <option value="Msc chemistry">Msc chemistry</option>
                          </select>
                        ) : (
                          <input 
                            readOnly 
                            value="NULL" 
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-xl text-gray-400 outline-none cursor-not-allowed font-bold" 
                          />
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Academic Enrolled Year</label>
                        <input 
                          type="text"
                          placeholder="e.g. 2024-2025"
                          value={formData.academic_enrolled_year || ''} 
                          onChange={(e) => setFormData({...formData, academic_enrolled_year: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink" 
                        />
                      </div>
                  </div>

                  {/* Academic Year */}
                  <div className="mb-6 bg-blue/5 border border-blue/10 rounded-2xl p-5 flex items-center gap-6">
                    <div>
                      <p className="text-[10px] font-black text-blue uppercase tracking-widest mb-1">Academic Year</p>
                      <p className="text-[11px] text-muted font-medium">Student's current enrolled year</p>
                    </div>
                    <select
                      value={formData.current_year || '1st year'}
                      onChange={(e) => setFormData({...formData, current_year: e.target.value})}
                      className="ml-auto px-5 py-3 bg-white border-2 border-blue/20 rounded-xl focus:border-blue outline-none font-black text-blue text-sm"
                    >
                      <option value="1st year">1st Year</option>
                      <option value="2nd year">2nd Year</option>
                      <option value="3rd year">3rd Year</option>
                      <option value="4th year">4th Year</option>
                    </select>
                  </div>

                  <h3 className="font-black text-ink text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                     <span className="h-4 w-1 bg-blue rounded-full"></span>
                     Fee Allocation & Payments
                  </h3>
                  
                  <div className="space-y-6">
                     {["1st year", "2nd year", "3rd year", "4th year"].map((year) => {
                        const feeIdx = studentFees.findIndex(f => f.academic_year.toLowerCase() === year);
                        const fee = feeIdx !== -1 ? studentFees[feeIdx] : { academic_year: year, total_fee: 0, committed_fee: 0, paid_amount: 0, payment_status: 'pending' };
                        
                        return (
                          <div key={year} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                             <div className="md:col-span-1">
                                <span className="text-[10px] font-black text-blue uppercase tracking-widest block mb-1">{year}</span>
                                <select 
                                  value={fee.payment_status || 'pending'}
                                  onChange={(e) => {
                                    const newFees = [...studentFees];
                                    if (feeIdx === -1) newFees.push({...fee, payment_status: e.target.value});
                                    else newFees[feeIdx].payment_status = e.target.value;
                                    setStudentFees(newFees);
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold"
                                >
                                   <option value="pending">Pending</option>
                                   <option value="paid">Paid</option>
                                   <option value="partially paid">Partial</option>
                                </select>
                             </div>
                             <div>
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Total Fee</label>
                                <input type="number" value={fee.total_fee || ''} onChange={(e) => {
                                  const newFees = [...studentFees];
                                  if (feeIdx === -1) newFees.push({...fee, total_fee: e.target.value});
                                  else newFees[feeIdx].total_fee = e.target.value;
                                  setStudentFees(newFees);
                                }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold" />
                             </div>
                             <div>
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Committed</label>
                                <input type="number" value={fee.committed_fee || ''} onChange={(e) => {
                                  const newFees = [...studentFees];
                                  if (feeIdx === -1) newFees.push({...fee, committed_fee: e.target.value});
                                  else newFees[feeIdx].committed_fee = e.target.value;
                                  setStudentFees(newFees);
                                }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold" />
                             </div>
                             <div>
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Paid</label>
                                <input type="number" value={fee.paid_amount || ''} onChange={(e) => {
                                  const newFees = [...studentFees];
                                  if (feeIdx === -1) newFees.push({...fee, paid_amount: e.target.value});
                                  else newFees[feeIdx].paid_amount = e.target.value;
                                  setStudentFees(newFees);
                                }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold" />
                             </div>
                          </div>
                        );
                     })}
                  </div>

                  <div className="mt-12 flex gap-4">
                     <button 
                        onClick={async () => {
                           try {
                              setLoading(true);
                              // Update profile
                              await axios.put(`/api/students/admin/update/${selectedStudent.id}`, formData);
                              // Update fees
                              await axios.put(`/api/fees/admin/update/${selectedStudent.id}`, { fees: studentFees });
                              alert("Student Account Updated Successfully!");
                              setViewMode('list');
                              setRefresh(r => r + 1);
                           } catch (err) {
                              alert("Update failed: " + (err.response?.data?.message || err.message));
                           } finally {
                              setLoading(false);
                           }
                        }}
                        disabled={loading}
                        className="flex-grow bg-blue text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue/20 hover:bg-ink transition-all active:scale-[0.98] disabled:opacity-50"
                     >
                        {loading ? 'Processing...' : 'Sync & Update Student Account'}
                     </button>
                  </div>
               </div>
            </div>
          ) : activeTab === 'students' ? (
            <div className="p-8">
               <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                  <div>
                    <h3 className="text-xl font-black text-ink uppercase tracking-tight">Student Accounts</h3>
                    <p className="text-[10px] text-muted font-bold tracking-widest mt-1">TOTAL ENROLLED: {students.length}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full md:w-auto">
                     <div className="relative flex-1 md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue transition-colors" size={18} />
                        <input 
                          type="text" 
                          placeholder="Search by Roll No or Name..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all font-bold text-ink"
                        />
                     </div>
                     <button
                       onClick={() => setFilterOpen(f => !f)}
                       className={`flex items-center gap-2 px-5 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest border-2 transition-all shrink-0 ${
                         filterOpen || appliedCourse !== 'all'
                           ? 'bg-[#1a6b3c] border-[#1a6b3c] text-white shadow-lg'
                           : 'bg-white border-gray-200 text-gray-600 hover:border-[#1a6b3c] hover:text-[#1a6b3c]'
                       }`}
                     >
                       ⚙ Filter
                     </button>
                   </div>
               </div>

                {/* Filter Dropdown Panel */}
               {filterOpen && (
                 <div className="mb-6 bg-white border border-gray-100 rounded-2xl shadow-xl p-6 space-y-5 animate-fadeIn">
                   {/* Academic Enrolled Year Filter */}
                   <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Academic Enrolled Year</p>
                     <div className="relative group">
                       <input 
                         type="text"
                         value={batchFilter === 'all' ? '' : batchFilter} 
                         onChange={(e) => setBatchFilter(e.target.value)}
                         placeholder="e.g. 2024-2025"
                         className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-black text-[11px] uppercase tracking-wider text-ink outline-none focus:border-orange focus:ring-4 focus:ring-orange/5 transition-all"
                       />
                       <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-orange transition-colors">
                         <Edit3 size={16} />
                       </div>
                     </div>
                     {batchFilter !== 'all' && batchFilter !== '' && (
                       <button onClick={() => setBatchFilter('all')} className="mt-2 text-[10px] font-black text-orange hover:underline uppercase tracking-widest">Clear Selection</button>
                     )}
                   </div>

                   {/* Course Selection */}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Select Course</p>
                      <div className="relative group">
                        <select 
                          value={courseFilter} 
                          onChange={(e) => setCourseFilter(e.target.value)}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-black text-[11px] uppercase tracking-wider text-ink outline-none focus:border-[#1a6b3c] focus:ring-4 focus:ring-[#1a6b3c]/5 transition-all appearance-none cursor-pointer"
                        >
                          <option value="all">All Courses</option>
                          <option value="Ag. B.Sc.">Ag. B.Sc.</option>
                          <option value="Ag. M.Sc.">Ag. M.Sc.</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#1a6b3c] transition-colors">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                   {/* Year Selection */}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Select Academic Year</p>
                      <div className="relative group">
                        <select 
                          value={yearFilter} 
                          onChange={(e) => setYearFilter(e.target.value)}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-black text-[11px] uppercase tracking-wider text-ink outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/5 transition-all appearance-none cursor-pointer"
                        >
                          <option value="all">All Years</option>
                          <option value="1st year">1st Year</option>
                          <option value="2nd year">2nd Year</option>
                          <option value="3rd year">3rd Year</option>
                          <option value="4th year">4th Year</option>
                          <option value="passed out">Passed Out</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-red-600 transition-colors">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                   {/* Actions */}
                   <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                     <button
                       onClick={() => {
                         setAppliedCourse(courseFilter);
                         setAppliedYear(yearFilter);
                         setAppliedBatch(batchFilter);
                         setFilterOpen(false);
                       }}
                       className="flex-1 bg-[#1a6b3c] text-white py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#14532d] transition-all shadow-lg shadow-[#1a6b3c]/20 active:scale-[0.98]"
                     >
                       🔍 Apply Filters
                     </button>
                     <button
                       onClick={() => { 
                         setCourseFilter('all'); 
                         setYearFilter('all'); 
                         setBatchFilter('all');
                         setAppliedCourse('all'); 
                         setAppliedYear('all'); 
                         setAppliedBatch('all');
                         setFilterOpen(false); 
                       }}
                       className="px-5 py-3 rounded-xl font-black text-[11px] uppercase tracking-wider border-2 border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500 transition-all"
                     >
                       Reset All
                     </button>
                   </div>
                 </div>
               )}

               {/* Active Filter Badge */}
               {(appliedCourse !== 'all' || appliedBatch !== 'all' || appliedYear !== 'all') && (
                 <div className="mb-4 flex flex-wrap items-center gap-2">
                   {appliedBatch !== 'all' && (
                     <span className="px-4 py-1.5 rounded-full bg-orange/10 text-orange text-[10px] font-black uppercase tracking-widest">
                       Batch {appliedBatch}
                     </span>
                   )}
                   {appliedCourse !== 'all' && (
                     <span className="px-4 py-1.5 rounded-full bg-[#1a6b3c]/10 text-[#1a6b3c] text-[10px] font-black uppercase tracking-widest">
                       {appliedCourse}
                     </span>
                   )}
                   {appliedYear !== 'all' && (
                     <span className="px-4 py-1.5 rounded-full bg-red-600/10 text-red-600 text-[10px] font-black uppercase tracking-widest">
                       {appliedYear}
                     </span>
                   )}
                   <button onClick={() => { 
                     setAppliedCourse('all'); setAppliedYear('all'); setAppliedBatch('all');
                     setCourseFilter('all'); setYearFilter('all'); setBatchFilter('all');
                   }} className="text-[10px] font-black text-red-400 hover:text-red-600 transition-colors">✕ Clear All</button>
                 </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(() => {
                    const filtered = students.filter(s => {
                      const matchSearch = s.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                          s.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                          (s.roll_no || '').toLowerCase().includes(searchQuery.toLowerCase());
                      // Enrollment Year (Batch) Match
                      const enrollmentYearStr = s.academic_enrolled_year?.split('-')[0] || '';
                      const matchBatch = appliedBatch === 'all' || enrollmentYearStr === appliedBatch;

                      const matchCourse = appliedCourse === 'all' || 
                                          s.course_applied?.toLowerCase().includes(appliedCourse.toLowerCase().replace('ag. ', ''));
                      
                      // Dynamic Academic Year Calculation
                      const currentYear = new Date().getFullYear();
                      const enrollmentYear = parseInt(enrollmentYearStr) || currentYear;
                      const studyYearNum = (currentYear - enrollmentYear) + 1;
                      
                      let calculatedYear = "";
                      if (studyYearNum === 1) calculatedYear = "1st year";
                      else if (studyYearNum === 2) calculatedYear = "2nd year";
                      else if (studyYearNum === 3) calculatedYear = "3rd year";
                      else if (studyYearNum === 4) calculatedYear = "4th year";
                      else if (studyYearNum > 4) calculatedYear = "passed out";

                      const matchYear = appliedYear === 'all' || calculatedYear === appliedYear;

                      return matchSearch && matchBatch && matchCourse && matchYear;
                    });
                    return filtered.length > 0 ? filtered.map(student => (
                     <div key={student.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                       <div className="flex items-center gap-4 mb-4">
                          <div className="h-12 w-12 rounded-2xl bg-sky flex items-center justify-center overflow-hidden border border-white">
                             {student.photo ? <img src={student.photo} className="h-full w-full object-cover" /> : <span className="text-blue font-black">{student.student_name[0]}</span>}
                          </div>
                          <div className="flex flex-col">
                             <span className="font-bold text-ink">{student.student_name}</span>
                             <div className="flex items-center gap-2">
                               <span className="text-[10px] text-muted font-bold tracking-widest uppercase">{student.course_applied}</span>
                               <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                               <span className="text-[10px] text-orange font-bold uppercase tracking-widest">Batch {student.academic_enrolled_year?.split('-')[0]}</span>
                             </div>
                          </div>
                       </div>
                       <div className="space-y-2 mb-6">
                          <div className="flex justify-between text-[11px] font-medium text-muted">
                             <span>Roll No:</span>
                             <span className="text-ink font-bold">{student.roll_no || student.id.split('-')[0].toUpperCase()}</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-medium text-muted">
                             <span>Mobile:</span>
                             <span className="text-ink font-bold">{student.mobile1}</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-medium text-muted">
                             <span>Branch:</span>
                             <span className="text-ink font-bold">{student.branch}</span>
                          </div>
                       </div>
                       <button 
                         onClick={() => { 
                           setSelectedStudent(student); 
                           setFormData({...student});
                           setViewMode('student-manage'); 
                         }}
                         className="w-full bg-blue text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#1e40af] transition-all"
                       >
                          Manage Profile & Fees
                       </button>
                    </div>
       )) : (
        <div className="col-span-3 py-20 text-center">
          <p className="text-gray-400 font-bold text-sm">No students found for the selected filter.</p>
        </div>
       );
                  })()}
               </div>
            </div>
          ) : viewMode === 'list' ? (
            <div className="bg-white rounded-3xl shadow-xl shadow-ink/5 border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gray-50/20 flex items-center justify-between">
                 <div>
                    <h4 className="font-bold text-ink">Database Registry</h4>
                    <p className="text-[10px] text-muted uppercase font-black tracking-widest">{data.length} records identified</p>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="flex px-8 border-b border-gray-100 overflow-x-auto whitespace-nowrap bg-white/50 backdrop-blur-md sticky top-0 z-[10]">
                      <button onClick={() => { setActiveTab('students'); setViewMode('list'); }} className={`px-6 py-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'students' ? 'text-blue border-blue' : 'text-gray-400 border-transparent hover:text-ink'}`}>Students</button>
                      <button onClick={() => { setActiveTab('faculty'); setViewMode('list'); }} className={`px-6 py-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'faculty' ? 'text-blue border-blue' : 'text-gray-400 border-transparent hover:text-ink'}`}>Faculty</button>
                    </div>
                    <button onClick={() => setRefresh(r => r + 1)} className="p-2 text-gray-400 hover:text-blue transition-colors">
                       <History size={18} />
                    </button>
                 </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead>
                    <tr className="bg-gray-50/30">
                      <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Primary Detail</th>
                      <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Segment</th>
                      <th className="px-10 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Management</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-50">
                    {data.map((item, idx) => (
                      <tr key={item._id || `item-${idx}`} className="group hover:bg-sky/50 transition-colors">
                        {activeTab === 'enquiries' ? (
                          <>
                            <td className="px-10 py-6">
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold text-ink">{item.studentName}</span>
                                <span className="text-[11px] text-muted flex items-center gap-2">
                                  <Users size={10} /> {item.parentName}
                                </span>
                                <span className="text-[11px] text-muted flex items-center gap-2">
                                  <MessageSquare size={10} /> {item.mobile}
                                </span>
                                <span className="text-[9px] text-gray-300 mt-1 italic">{new Date(item.createdAt).toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="px-10 py-6">
                              <div className="flex flex-col gap-1">
                                <span className="px-3 py-1 rounded-full bg-blue/10 text-blue text-[9px] font-black uppercase w-fit">{item.stream}</span>
                                <span className="text-[10px] text-muted ml-1 font-medium">{item.batch}</span>
                              </div>
                            </td>
                            <td className="px-10 py-6 text-right">
                              <div className="flex justify-end items-center gap-3">
                                <button 
                                  onClick={() => {
                                    const text = `*New Enquiry from Sri Sai Agri*%0A%0A*Student:* ${item.studentName}%0A*Parent:* ${item.parentName}%0A*Mobile:* ${item.mobile}%0A*Stream:* ${item.stream}%0A*Batch:* ${item.batch}`;
                                    window.open(`https://wa.me/91${item.mobile}?text=${text}`, '_blank');
                                  }}
                                  className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                  title="WhatsApp"
                                >
                                  <ExternalLink size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(item._id)} 
                                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-10 py-6">
                              <div className="flex items-center">
                                <div className="h-14 w-14 rounded-2xl bg-gray-100 overflow-hidden mr-5 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                  {item.image ? (
                                    <img 
                                      src={item.image?.startsWith('http') ? item.image : (item.image?.startsWith('/gallery') ? item.image : `http://localhost:5000${item.image?.startsWith('/') ? '' : '/'}${item.image}`)} 
                                      className="h-full w-full object-cover" 
                                      alt="" 
                                    />
                                  ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-400 font-bold text-base bg-gray-50 uppercase">
                                      {item.initials || item.name?.[0] || item.label?.[0] || "?"}
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-ink">{item.student_name || item.studentName || item.name || item.title || item.label || item.tag}</span>
                                  <span className="text-[9px] uppercase font-black text-gray-300 mt-1 tracking-widest">{item.id || item._id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-10 py-6">
                              <span className="px-4 py-1.5 rounded-xl bg-sky border border-blue/10 text-blue text-[10px] font-black uppercase shadow-sm shadow-blue/5">
                                {item.department || item.stream || item.exam || item.category || item.achievement || item.sub_label || item.hall_ticket_number || item.hallTicketNumber || 'Default'}
                              </span>
                            </td>
                            <td className="px-10 py-6 text-right">
                              <div className="flex justify-end gap-3">
                                <button 
                                  onClick={() => handleEdit(item)} 
                                  className="p-3 bg-blue/5 text-blue rounded-xl hover:bg-blue hover:text-white transition-all shadow-sm shadow-blue/5"
                                  title="Edit"
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(item.id || item._id)} 
                                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red/5"
                                  title="Remove"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {data.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-10 py-32 text-center">
                          <div className="flex flex-col items-center gap-4 opacity-30">
                             <LayoutDashboard size={64} />
                             <div>
                                <p className="text-lg font-bold text-ink">No entries found</p>
                                <p className="text-xs font-medium">Start by adding your first record above</p>
                             </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
