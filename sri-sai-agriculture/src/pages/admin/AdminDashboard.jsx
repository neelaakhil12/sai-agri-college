import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Users, 
  BookOpen, 
  Award, 
  History, 
  LayoutDashboard, 
  Image as ImageIcon, 
  LogOut, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  ChevronRight, 
  Bell, 
  ExternalLink,
  HelpCircle,
  MessageSquare,
  X,
  ChevronDown,
  Filter,
  Play
} from 'lucide-react';

const API_URL = '/api';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentFees, setStudentFees] = useState([]);
  const [viewMode, setViewMode] = useState('list');
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

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [studentFilter, setStudentFilter] = useState('all');
  const [showStudentFilters, setShowStudentFilters] = useState(false);
  const [filterAcademicYear, setFilterAcademicYear] = useState('all');
  const [filterYearLevel, setFilterYearLevel] = useState('all');

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const cleanPath = path.replace(/\\/g, '/').replace(/^\//, '');
    return `/${cleanPath}`;
  };

  const tabs = [
    { id: 'students', label: 'Student Accounts', icon: Users },
    { id: 'hero', label: 'Hero Slider Management', icon: LayoutDashboard },
    { id: 'faculty', label: 'Faculty Management', icon: Users },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'ranks', label: 'Rankings & Results', icon: Award },
    { id: 'stories', label: 'Success Stories', icon: History },
    { id: 'gallery', label: 'Gallery Management', icon: ImageIcon },
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
          const res = await axios.get(`${API_URL}/students/admin/list`);
          setStudents(res.data);
        } catch (err) {
          console.error("Fetch students failed");
        }
      };

      if (activeTab === "students") {
        fetchStudents();
      } else {
        fetchData();
      }
    }
  }, [isAdmin, activeTab, fetchData, refresh]);

  useEffect(() => {
    const fetchFees = async () => {
      if (selectedStudent) {
        try {
          const res = await axios.get(`${API_URL}/student-fees/${selectedStudent.id}`);
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
      if (!['_id', 'id', 'image', 'created_at', 'existing_image'].includes(key)) {
        payload.append(key, formData[key]);
      }
    });

    if (activeTab === 'ranks' || activeTab === 'testimonials') {
      if (formData.studentName) payload.append('student_name', formData.studentName);
    }
    if (activeTab === 'ranks' && formData.hallTicketNumber) {
      payload.append('hall_ticket_number', formData.hallTicketNumber);
    }

    if (activeTab === 'courses' && formData.details) {
      const lines = formData.details.split('\n').map(l => l.trim()).filter(Boolean);
      payload.set('details', JSON.stringify(lines));
    }

    if (!payload.has('initials') && (activeTab === 'stories' || activeTab === 'faculty' || activeTab === 'testimonials')) {
      const name = formData.name || formData.studentName || formData.student_name || '';
      if (name) {
        const generatedInitials = name.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase();
        payload.append('initials', generatedInitials);
      }
    }

    if (file) {
      payload.append(activeTab === 'students' ? 'photo' : 'image', file);
    }

    try {
      const endpoint = `/${activeTab}`;
      const method = editingId ? 'put' : 'post';
      let url = editingId ? `${API_URL}${endpoint}/${editingId}` : `${API_URL}${endpoint}`;
      
      if (activeTab === 'students' && !editingId) {
        url = `${API_URL}/students/register`;
      }

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
    
    // Format Date of Birth for HTML date input (YYYY-MM-DD)
    if (activeTab === 'students' && mapped.dob) {
      try {
        const dateObj = new Date(mapped.dob);
        if (!isNaN(dateObj.getTime())) {
          mapped.dob = dateObj.toISOString().split('T')[0];
        }
      } catch (err) {
        console.error("Date parsing error:", err);
      }
    }

    if (activeTab === 'testimonials' || activeTab === 'ranks') {
       mapped.studentName = item.student_name || item.studentName;
    }
    
    if (activeTab === 'ranks') {
       mapped.hallTicketNumber = item.hall_ticket_number || item.hallTicketNumber;
    }
    
    if (activeTab === 'courses' && item.details) {
      try {
        const arr = typeof item.details === 'string' ? JSON.parse(item.details) : item.details;
        mapped.details = Array.isArray(arr) ? arr.join('\n') : item.details;
      } catch { mapped.details = item.details; }
    }
    if (activeTab === 'hero' && item.h1) mapped.h1 = JSON.stringify(item.h1);

    if (activeTab === 'gallery') {
      mapped.label = item.label;
      mapped.sub_label = item.sub_label;
      mapped.category = item.category;
      mapped.type = item.type;
    }

    if (item.image) {
      mapped.existing_image = item.image;
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
    if (!window.confirm("This will import default website content for any empty sections. It will NOT delete your existing uploads. Continue?")) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/admin/sync`, {}, { withCredentials: true });
      const details = res.data.details ? Object.entries(res.data.details).map(([k, v]) => `• ${k}: ${v}`).join('\n') : "";
      alert(`${res.data.message || "Sync completed!"}\n\n${details}`);
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

      <main className="flex-1 flex flex-col min-w-0">
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
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Import Defaults</span>
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
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Button 1 Label</label>
                  <input placeholder="Apply Now" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, btn1_label: e.target.value})} value={formData.btn1_label || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Button 1 Link</label>
                  <input placeholder="#contact" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, btn1_href: e.target.value})} value={formData.btn1_href || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Button 2 Label</label>
                  <input placeholder="Explore More" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, btn2_label: e.target.value})} value={formData.btn2_label || ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Button 2 Link</label>
                  <input placeholder="/programs" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, btn2_href: e.target.value})} value={formData.btn2_href || ''} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Background Gradient (CSS)</label>
                  <input placeholder="linear-gradient(...)" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, bg_gradient: e.target.value})} value={formData.bg_gradient || ''} />
                </div>
                <div className="md:col-span-2">
                   <div className="p-10 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 text-center space-y-4 hover:border-blue/50 hover:bg-blue/5 transition-all">
                      {formData.existing_image && (
                        <img src={getImageUrl(formData.existing_image)} className="h-32 mx-auto rounded-xl mb-4 shadow-md" alt="Current hero" onError={e => e.target.style.display = 'none'} />
                      )}
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto text-blue">
                         <ImageIcon size={32} />
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="block w-full text-xs text-gray-400 file:mr-4 file:py-3 file:px-8 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-ink file:text-white hover:file:bg-blue file:transition-all file:cursor-pointer" 
                        onChange={e => setFile(e.target.files[0])} 
                      />
                   </div>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-blue text-white py-5 rounded-2xl font-bold text-lg hover:bg-ink transition-all active:scale-[0.98] shadow-xl shadow-blue/20">
                    {editingId ? 'Update Hero Slide' : 'Create New Slide'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {viewMode === 'form' && activeTab !== 'hero' ? (
            <div className={activeTab === 'students' ? 'animate-fadeIn' : 'bg-white rounded-3xl shadow-xl shadow-ink/5 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500'}>
              <form onSubmit={handleSubmit} className={activeTab === 'students' ? 'p-0' : 'p-10'}>
                {activeTab === 'students' ? (
                  <div className="flex justify-between items-center mb-10 p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-2 bg-blue opacity-20"></div>
                     <div className="flex items-center gap-8 flex-grow">
                        <div className="relative h-24 w-24 rounded-[2rem] bg-sky flex items-center justify-center overflow-hidden border-4 border-white shadow-xl group cursor-pointer hover:scale-105 transition-all">
                           {file ? (
                             <img src={URL.createObjectURL(file)} className="h-full w-full object-cover" alt="Preview" />
                           ) : (
                             <span className="text-blue font-black text-3xl">S</span>
                           )}
                           <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                              <Plus className="text-white" size={24} />
                           </div>
                           <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div>
                           <h2 className="text-3xl font-black text-ink leading-tight">{formData.student_name || 'NEW STUDENT'}</h2>
                           <p className="text-muted font-bold text-[10px] uppercase tracking-[0.3em]">CREATE STUDENT ACCOUNT</p>
                        </div>
                     </div>
                     <button 
                        type="button"
                        onClick={() => { setViewMode('list'); setEditingId(null); setFormData({}); setFile(null); }}
                        className="flex items-center gap-3 px-8 py-4 bg-white text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-500/5 hover:bg-red-50 transition-all border border-red-50 shrink-0"
                     >
                        <X size={18} /> Back to List
                     </button>
                  </div>
                ) : (
                  <div className="p-8 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
                    <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center text-blue">
                       {editingId ? <Edit3 size={20} /> : <Plus size={20} />}
                    </div>
                    <div>
                       <h4 className="font-bold text-ink">{editingId ? 'Update Information' : 'Entry Details'}</h4>
                       <p className="text-[10px] text-muted uppercase font-black tracking-widest">Please fill all required fields</p>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeTab === 'faculty' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input required placeholder="Dr. John Doe" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name || ''} />
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
                          <option value="Agri">Agriculture</option>
                          <option value="Horti">Horticulture</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Badge Label</label>
                        <input placeholder="Agriculture Stream" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, badge: e.target.value})} value={formData.badge || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Eligibility</label>
                        <input placeholder="Intermediate/Higher Secondary Pass in Science" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, eligibility: e.target.value})} value={formData.eligibility || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Seats Label</label>
                        <input placeholder="40 Seats — Limited" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, seats_label: e.target.value})} value={formData.seats_label || ''} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Short Description</label>
                        <input required placeholder="Brief overview of the course" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, description: e.target.value})} value={formData.description || ''} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Branches / Subjects (one per line)</label>
                        <textarea
                          placeholder={'Msc Soil Science\nMsc Horticulture\nMsc Agronomy\nMsc Plant Breeding & Genetics'}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all h-36"
                          onChange={e => setFormData({...formData, details: e.target.value})}
                          value={formData.details || ''}
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'ranks' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Student Name</label>
                        <input required placeholder="Name" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Hall Ticket No</label>
                        <input required placeholder="123456" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, hallTicketNumber: e.target.value})} value={formData.hallTicketNumber || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Rank</label>
                        <input required placeholder="State 1st" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, rank: e.target.value})} value={formData.rank || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Exam Name</label>
                        <input required placeholder="EAPCET" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, exam: e.target.value})} value={formData.exam || ''} />
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
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Asset Label</label>
                        <input required placeholder="Activity Title" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, label: e.target.value})} value={formData.label || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Sub Label / Date</label>
                        <input required placeholder="Short description" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all" onChange={e => setFormData({...formData, sub_label: e.target.value})} value={formData.sub_label || ''} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                        <select required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all appearance-none" onChange={e => setFormData({...formData, category: e.target.value})} value={formData.category || ''}>
                            <option value="">Select Category</option>
                            <option value="internship">Internship</option>
                            <option value="field-visit">Field Visit</option>
                            <option value="event">Event</option>
                            <option value="trip">Trip</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Media Type</label>
                        <select required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all appearance-none" onChange={e => setFormData({...formData, type: e.target.value})} value={formData.type || 'image'}>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'students' && (
                    <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { label: 'STUDENT NAME', key: 'student_name', required: true },
                        { label: 'ROLL NUMBER', key: 'roll_no', required: true, placeholder: 'e.g. AG-2026-001' },
                        { label: 'LOGIN EMAIL', key: 'email', required: true, type: 'email' },
                        { label: 'FATHER NAME', key: 'father_name' },
                        { label: 'MOTHER NAME', key: 'mother_name' },
                        { label: 'DATE OF BIRTH', key: 'dob', type: 'date' },
                        { label: 'GENDER', key: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
                        { label: 'MOBILE 1', key: 'mobile1' },
                        { label: 'MOBILE 2', key: 'mobile2' },
                        { label: 'MEDIUM', key: 'medium', placeholder: 'English Medium' },
                        { label: 'DOOR NO', key: 'door_no' },
                        { label: 'VILLAGE', key: 'village' },
                        { label: 'MANDAL', key: 'mandal' },
                        { label: 'DISTRICT', key: 'district' },
                        { label: 'PINCODE', key: 'pin' },
                      ].map(field => (
                        <div key={field.key} className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{field.label}</label>
                          {field.type === 'select' ? (
                            <select 
                              required={field.required}
                              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all appearance-none font-bold text-ink"
                              onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                              value={formData[field.key] || ''}
                            >
                              <option value="">Select {field.label}</option>
                              {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          ) : (
                            <input 
                              required={field.required}
                              type={field.type || 'text'}
                              placeholder={field.placeholder}
                              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all font-bold text-ink"
                              onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                              value={formData[field.key] || ''}
                            />
                          )}
                        </div>
                      ))}
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">COURSE APPLIED</label>
                        <select 
                          required 
                          className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all appearance-none font-bold text-ink" 
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
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SPECIALIZATION (BRANCH)</label>
                          <select 
                            required 
                            className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all appearance-none font-bold text-ink" 
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
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">BRANCH</label>
                          <input 
                            readOnly 
                            value="NULL" 
                            className="w-full px-5 py-4 bg-gray-100 border border-gray-100 rounded-2xl text-gray-400 outline-none cursor-not-allowed font-bold" 
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ACADEMIC ENROLLED YEAR</label>
                        <input 
                          required 
                          placeholder="e.g. 2024-2025" 
                          className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all font-bold text-ink" 
                          onChange={e => setFormData({...formData, academic_enrolled_year: e.target.value})} 
                          value={formData.academic_enrolled_year || ''} 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ACADEMIC YEAR</label>
                        <select 
                          required 
                          className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue/5 focus:border-blue focus:outline-none transition-all appearance-none font-bold text-ink" 
                          onChange={e => setFormData({...formData, current_year: e.target.value})} 
                          value={formData.current_year || ''}
                        >
                          <option value="">Select Academic Year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {activeTab !== 'courses' && activeTab !== 'students' && (
                    <div className="md:col-span-2">
                      <div className="relative p-10 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 text-center hover:border-blue/50 hover:bg-blue/5 transition-all overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
                        {file || formData.existing_image ? (
                          <div className="w-full max-h-48 overflow-hidden rounded-xl mb-4 shadow-sm border border-gray-100 flex justify-center bg-black/5">
                            {file ? (
                               file.type.startsWith('video/') ? (
                                 <video src={URL.createObjectURL(file)} className="max-h-48 w-auto" controls />
                               ) : (
                                 <img src={URL.createObjectURL(file)} className="max-h-48 w-auto object-cover" alt="Preview" />
                               )
                            ) : (
                               (formData.type === 'video' || (typeof formData.existing_image === 'string' && formData.existing_image.toLowerCase().endsWith('.mp4'))) ? (
                                 <video 
                                    src={getImageUrl(formData.existing_image)} 
                                    className="max-h-48 w-auto" 
                                    controls 
                                    onError={e => { e.target.parentElement.innerHTML = '<div class="p-8 text-xs text-gray-400">Video not found</div>'; }}
                                 />
                               ) : (
                                 <img 
                                    src={getImageUrl(formData.existing_image)} 
                                    className="max-h-48 w-auto object-cover" 
                                    alt="Current" 
                                    onError={e => { e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found'; }}
                                 />
                               )
                            )}
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto text-blue mb-4">
                             <ImageIcon size={32} />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-ink">{file ? file.name : (formData.existing_image ? 'Replace Current Media' : 'Upload Media Asset')}</p>
                          <p className="text-xs text-muted mt-1">Recommended size: 800x600px. Max 1MB.</p>
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                          onChange={e => setFile(e.target.files[0])} 
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-12">
                  <button type="submit" disabled={loading} className="w-full bg-[#15803d] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-green-500/20 hover:bg-[#166534] transition-all active:scale-[0.98] disabled:opacity-50">
                    {loading ? 'Processing...' : (editingId ? 'Update Record' : 'Sync & Create Entry')}
                  </button>
                </div>
              </form>
            </div>
          ) : viewMode === 'student-manage' ? (
            <div className="p-8 max-w-5xl mx-auto animate-fadeIn">
                <div className="flex justify-between items-center mb-8">
                   <button onClick={() => setViewMode('list')} className="flex items-center gap-3 px-8 py-4 bg-white text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-500/5 hover:bg-red-50 transition-all border border-red-50 shrink-0">
                      <X size={18} /> Exit Management
                   </button>
                   <div className="px-6 py-3 bg-blue/5 rounded-2xl border border-blue/10">
                      <p className="text-[10px] font-black text-blue uppercase tracking-widest">Active Session: {selectedStudent?.student_name}</p>
                   </div>
                </div>
               
               <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 mb-10">
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-50">
                     <div className="relative h-24 w-24 rounded-[2rem] bg-sky flex items-center justify-center overflow-hidden border-4 border-white shadow-xl group cursor-pointer">
                        {file ? (
                          <img src={URL.createObjectURL(file)} className="h-full w-full object-cover" alt="New Preview" />
                        ) : formData.photo ? (
                          <img src={getImageUrl(formData.photo)} className="h-full w-full object-cover" alt="Current" />
                        ) : (
                          <span className="text-blue font-black text-3xl">{formData.student_name?.[0]}</span>
                        )}
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files[0])} />
                     </div>
                     <div>
                        <h2 className="text-3xl font-black text-ink">{formData.student_name}</h2>
                        <p className="text-muted font-bold text-[10px] uppercase tracking-[0.3em]">MANAGE STUDENT ACCOUNT</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                     {[
                       { label: 'STUDENT NAME', key: 'student_name' },
                       { label: 'ROLL NUMBER', key: 'roll_no' },
                       { label: 'LOGIN EMAIL', key: 'email' },
                       { label: 'FATHER NAME', key: 'father_name' },
                       { label: 'MOTHER NAME', key: 'mother_name' },
                       { label: 'DATE OF BIRTH', key: 'dob', type: 'date' },
                       { label: 'GENDER', key: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
                       { label: 'MOBILE 1', key: 'mobile1' },
                       { label: 'MOBILE 2', key: 'mobile2' },
                       { label: 'MEDIUM', key: 'medium' },
                       { label: 'DOOR NO', key: 'door_no' },
                       { label: 'VILLAGE', key: 'village' },
                       { label: 'MANDAL', key: 'mandal' },
                       { label: 'DISTRICT', key: 'district' },
                       { label: 'PINCODE', key: 'pin' },
                     ].map(field => (
                       <div key={field.key} className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{field.label}</label>
                          {field.type === 'select' ? (
                            <select 
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink appearance-none"
                              onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                              value={formData[field.key] || ''}
                            >
                              <option value="">Select {field.label}</option>
                              {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          ) : (
                            <input 
                              type={field.type || 'text'}
                              placeholder={field.placeholder || ''}
                              value={formData[field.key] || ''} 
                              onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink" 
                            />
                          )}
                       </div>
                     ))}
                     
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">COURSE APPLIED</label>
                        <select 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink appearance-none" 
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
                        <div className="space-y-1 animate-fadeIn">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SPECIALIZATION (BRANCH)</label>
                          <select 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink appearance-none" 
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
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">BRANCH</label>
                          <input 
                            readOnly 
                            value="NULL" 
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-xl text-gray-400 outline-none cursor-not-allowed font-bold" 
                          />
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ACADEMIC ENROLLED YEAR</label>
                        <input 
                          placeholder="e.g. 2024-2025" 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink" 
                          onChange={e => setFormData({...formData, academic_enrolled_year: e.target.value})} 
                          value={formData.academic_enrolled_year || ''} 
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ACADEMIC YEAR</label>
                        <select 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink appearance-none" 
                          onChange={e => setFormData({...formData, current_year: e.target.value})} 
                          value={formData.current_year || ''}
                        >
                          <option value="">Select Academic Year</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                      </div>
                   </div>

                   <div className="mt-16 p-10 bg-gray-50/50 rounded-[3rem] border border-gray-100">
                      <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                           <RefreshCw size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-ink">FEE ALLOCATION & PAYMENTS</h3>
                           <p className="text-[10px] text-muted uppercase font-black tracking-widest">Academic & Hostel Yearly Breakdown</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {['1st year', '2nd year', '3rd year', '4th year'].map((year) => {
                          const fee = studentFees.find(f => f.academic_year.toLowerCase() === year.toLowerCase()) || {
                            academic_year: year,
                            total_fee: 0,
                            fee_paid: 0,
                            due_amount: 0,
                            hostel_total_fee: 0,
                            hostel_fee_paid: 0,
                            hostel_due_amount: 0,
                            status: 'Pending'
                          };

                          const updateFee = (updates) => {
                            const newFees = [...studentFees];
                            const index = newFees.findIndex(f => f.academic_year.toLowerCase() === year.toLowerCase());
                            if (index >= 0) {
                              newFees[index] = { ...newFees[index], ...updates };
                            } else {
                              newFees.push({ ...fee, ...updates });
                            }
                            setStudentFees(newFees);
                          };

                          return (
                            <div key={year} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                              <div className="flex items-center justify-between mb-6">
                                <span className="px-4 py-1.5 bg-ink text-white text-[10px] font-black uppercase tracking-widest rounded-full">{year}</span>
                               <div className="flex items-center gap-4">
                                  <label className="flex items-center gap-2 cursor-pointer group/check">
                                    <div className="relative">
                                      <input 
                                        type="checkbox" 
                                        className="peer sr-only"
                                        checked={fee.status === 'Completed'}
                                        onChange={(e) => updateFee({ status: e.target.checked ? 'Completed' : 'Pending' })}
                                      />
                                      <div className="w-5 h-5 border-2 border-gray-200 rounded-lg peer-checked:bg-[#15803d] peer-checked:border-[#15803d] transition-all flex items-center justify-center">
                                        <div className="w-1.5 h-3 border-r-2 border-b-2 border-white rotate-45 mb-1 scale-0 peer-checked:scale-100 transition-transform"></div>
                                      </div>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${fee.status === 'Completed' ? 'text-green-600' : 'text-gray-400'}`}>
                                      {fee.status === 'Completed' ? 'PAID' : 'MARK AS PAID'}
                                    </span>
                                  </label>
                                  <div className="h-6 w-[1px] bg-gray-100 mx-2"></div>
                                  <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Balance</p>
                                    <p className="text-sm font-black text-blue">₹{(Number(fee.total_fee || 0) + Number(fee.hostel_total_fee || 0)) - (Number(fee.fee_paid || 0) + Number(fee.hostel_fee_paid || 0))}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Academic Fee */}
                                <div className="space-y-4">
                                  <h4 className="text-xs font-black text-ink border-l-4 border-blue pl-3 uppercase tracking-wider">Academic Fees</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Total Academic Fee</label>
                                      <input 
                                        type="number" 
                                        placeholder="0.00"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink text-sm"
                                        value={fee.total_fee || 0}
                                        onChange={(e) => updateFee({ total_fee: e.target.value, due_amount: e.target.value - (fee.fee_paid || 0) })}
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Academic Fee Paid</label>
                                      <input 
                                        type="number" 
                                        placeholder="0.00"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue outline-none transition-all font-bold text-ink text-sm"
                                        value={fee.fee_paid || 0}
                                        onChange={(e) => updateFee({ fee_paid: e.target.value, due_amount: (fee.total_fee || 0) - e.target.value })}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Hostel Fee */}
                                <div className="space-y-4">
                                  <h4 className="text-xs font-black text-ink border-l-4 border-amber-500 pl-3 uppercase tracking-wider">Hostel Fees</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Total Hostel Fee</label>
                                      <input 
                                        type="number" 
                                        placeholder="0.00"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-amber-500 outline-none transition-all font-bold text-ink text-sm"
                                        value={fee.hostel_total_fee || 0}
                                        onChange={(e) => updateFee({ hostel_total_fee: e.target.value, hostel_due_amount: e.target.value - (fee.hostel_fee_paid || 0) })}
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Hostel Fee Paid</label>
                                      <input 
                                        type="number" 
                                        placeholder="0.00"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:border-amber-500 outline-none transition-all font-bold text-ink text-sm"
                                        value={fee.hostel_fee_paid || 0}
                                        onChange={(e) => updateFee({ hostel_fee_paid: e.target.value, hostel_due_amount: (fee.hostel_total_fee || 0) - e.target.value })}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                   </div>

                   <div className="mt-12 flex gap-4">
                      <button 
                         onClick={async () => {
                            try {
                               setLoading(true);
                                const studentPayload = new FormData();
                                Object.keys(formData).forEach(key => {
                                  if (!['_id', 'id', 'photo', 'created_at'].includes(key)) {
                                    if (key === 'password' && !formData[key]) return;
                                    studentPayload.append(key, formData[key]);
                                  }
                                });
                                if (file) studentPayload.append('photo', file);

                                await axios.put(`/api/students/admin/update/${selectedStudent.id}`, studentPayload, {
                                  headers: { 'Content-Type': 'multipart/form-data' },
                                  withCredentials: true
                                });
                                await axios.put(`/api/student-fees/admin/update/${selectedStudent.id}`, { fees: studentFees }, {
                                  withCredentials: true
                                });
                                alert("Student Account Updated Successfully!");
                                setFile(null);
                                setViewMode('list');
                                setRefresh(r => r + 1);
                            } catch (err) {
                               alert("Update failed: " + (err.response?.data?.message || err.message));
                            } finally {
                               setLoading(false);
                            }
                         }}
                         disabled={loading}
                         className="flex-grow bg-[#15803d] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-green-500/20 hover:bg-[#166534] transition-all active:scale-[0.98] disabled:opacity-50"
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
                  
                  <div className="flex items-center gap-4 w-full md:w-auto">
                     <div className="relative flex-1 md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue transition-colors" size={18} />
                        <input 
                          type="text" 
                          placeholder="Search by Roll No or Name..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:border-blue outline-none transition-all font-bold text-ink"
                        />
                     </div>
                     <button 
                        onClick={() => setShowStudentFilters(!showStudentFilters)}
                        className={`px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${showStudentFilters ? 'bg-ink text-white shadow-xl' : 'bg-[#15803d] text-white hover:bg-[#166534] shadow-md'}`}
                     >
                        <Filter size={16} />
                        Filter
                     </button>
                   </div>
               </div>

               {showStudentFilters && (
                 <div className="mb-10 bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Academic Enrolled Year</label>
                          <input 
                             placeholder="e.g. 2024-2025" 
                             className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-blue outline-none transition-all font-bold text-ink"
                             onChange={(e) => setFilterAcademicYear(e.target.value)}
                             value={filterAcademicYear === 'all' ? '' : filterAcademicYear}
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Course</label>
                          <select 
                             className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-blue outline-none transition-all font-bold text-ink appearance-none"
                             value={studentFilter}
                             onChange={(e) => setStudentFilter(e.target.value)}
                          >
                             <option value="all">ALL COURSES</option>
                             <option value="Ag. B.Sc.">AG. B.SC.</option>
                             <option value="Ag. M.Sc.">AG. M.SC.</option>
                          </select>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Academic Year</label>
                          <select 
                             className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-blue outline-none transition-all font-bold text-ink appearance-none"
                             value={filterYearLevel}
                             onChange={(e) => setFilterYearLevel(e.target.value)}
                          >
                             <option value="all">ALL YEARS</option>
                             <option value="1st Year">1ST YEAR</option>
                             <option value="2nd Year">2ND YEAR</option>
                             <option value="3rd Year">3RD YEAR</option>
                             <option value="4th Year">4TH YEAR</option>
                          </select>
                       </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-50 flex gap-4">
                       <button 
                          onClick={() => setShowStudentFilters(false)}
                          className="flex-1 bg-[#15803d] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#166534] transition-all flex items-center justify-center gap-2"
                       >
                          <div className="w-2 h-2 rounded-full bg-sky animate-pulse" />
                          Apply Filters
                       </button>
                       <button 
                          onClick={() => {
                             setStudentFilter('all');
                             setFilterAcademicYear('all');
                             setFilterYearLevel('all');
                          }}
                          className="px-8 bg-gray-50 text-muted py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"
                       >
                          Reset All
                       </button>
                    </div>
                 </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {students
                    .filter(student => studentFilter === 'all' || student.course_applied === studentFilter)
                    .filter(student => filterAcademicYear === 'all' || !filterAcademicYear || (student.academic_enrolled_year && student.academic_enrolled_year.includes(filterAcademicYear)))
                    .filter(student => filterYearLevel === 'all' || student.year === filterYearLevel)
                    .map(student => (
                     <div key={student.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                       <div className="flex items-center gap-4 mb-4">
                          <div className="h-12 w-12 rounded-2xl bg-sky flex items-center justify-center overflow-hidden border border-white">
                             {student.photo ? <img src={getImageUrl(student.photo)} className="h-full w-full object-cover" /> : <span className="text-blue font-black">{student.student_name[0]}</span>}
                          </div>
                          <div className="flex flex-col">
                             <span className="font-bold text-ink">{student.student_name}</span>
                          </div>
                       </div>
                       <div className="flex gap-2">
                           <button 
                             onClick={() => { 
                               setSelectedStudent(student); 
                               setFormData({...student});
                               setViewMode('student-manage'); 
                             }}
                             className="flex-1 bg-[#15803d] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#166534] transition-all"
                           >
                              Manage Profile
                           </button>
                           <button 
                             onClick={async () => {
                               if (window.confirm(`Are you sure you want to delete ${student.student_name}? This action cannot be undone.`)) {
                                 try {
                                   await axios.delete(`/api/students/admin/delete/${student.id}`, { withCredentials: true });
                                   setRefresh(r => r + 1);
                                   alert("Student Account Deleted Successfully!");
                                 } catch (err) {
                                   alert("Delete failed: " + (err.response?.data?.message || err.message));
                                 }
                               }
                             }}
                             className="px-4 bg-red-50 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100"
                             title="Delete Student"
                           >
                              <Trash2 size={16} />
                           </button>
                        </div>
                    </div>
                  ))}
               </div>
            </div>
          ) : viewMode === 'list' && activeTab === 'hero' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.map((item, idx) => (
                  <div key={item.id || idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all group">
                    <div className="relative h-44 bg-gray-100 overflow-hidden">
                      {item.image ? (
                        <img src={getImageUrl(item.image)} alt={item.tag} className="w-full h-full object-cover" />
                      ) : null}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button onClick={() => { setFormData({...item}); setEditingId(item.id); setViewMode('form'); }} className="p-2 bg-white rounded-xl shadow-lg"><Edit3 size={14} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-white rounded-xl shadow-lg text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : viewMode === 'list' ? (
            <div className="bg-white rounded-3xl shadow-xl shadow-ink/5 border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                 <h4 className="font-bold text-ink">Database Registry</h4>
                 {activeTab === 'gallery' && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl">
                      <Filter size={14} className="text-gray-400" />
                      <select className="bg-transparent text-xs font-bold text-ink focus:outline-none" value={galleryFilter} onChange={(e) => setGalleryFilter(e.target.value)}>
                        <option value="all">All Categories</option>
                        <option value="internship">Internship</option>
                        <option value="field-visit">Field Visit</option>
                        <option value="event">Event</option>
                        <option value="trip">Trip</option>
                      </select>
                    </div>
                 )}
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
                    {data
                      .filter(item => {
                        if (activeTab === 'gallery' && galleryFilter !== 'all') {
                          const cat = (item.category || item.sub_label || '').toLowerCase();
                          if (galleryFilter === 'internship') return cat.includes('intern');
                          if (galleryFilter === 'field-visit') return cat.includes('field');
                          if (galleryFilter === 'event') return cat.includes('event');
                          if (galleryFilter === 'trip') return cat.includes('trip');
                          return false;
                        }
                        return true;
                      })
                      .map((item, idx) => (
                      <tr key={item._id || `item-${idx}`} className="group hover:bg-sky/50 transition-colors">
                        <td className="px-10 py-6">
                          <div className="flex items-center">
                                <div className="h-14 w-14 rounded-2xl bg-gray-100 overflow-hidden mr-5 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                  {item.image || item.photo ? (
                                    (item.type === 'video' || (typeof (item.image || item.photo) === 'string' && (item.image || item.photo).toLowerCase().endsWith('.mp4'))) ? (
                                      <div className="h-full w-full flex items-center justify-center bg-sky/30 text-blue">
                                        <div className="p-2 bg-white rounded-full shadow-sm">
                                          <Play size={16} fill="currentColor" />
                                        </div>
                                      </div>
                                    ) : (
                                      <img 
                                        src={getImageUrl(item.image || item.photo)} 
                                        className="h-full w-full object-cover" 
                                        alt="" 
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                                      />
                                    )
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
