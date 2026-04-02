import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = '/api';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // For the dashboard part
  const [activeTab, setActiveTab] = useState('faculty');
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);

  // FormData for adding items
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

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
      let endpoint = '';
      if (activeTab === 'faculty') endpoint = '/faculty';
      if (activeTab === 'courses') endpoint = '/courses';
      if (activeTab === 'ranks') endpoint = '/ranks';
      if (activeTab === 'stories') endpoint = '/stories';
      if (activeTab === 'enquiries') endpoint = '/enquiries';


      
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
      fetchData();
    }
  }, [isAdmin, fetchData, refresh]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/admin/login`, { username, password }, { withCredentials: true });
      setIsAdmin(true);
    } catch (err) {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      let endpoint = '';
      if (activeTab === 'faculty') endpoint = '/faculty';
      if (activeTab === 'courses') endpoint = '/courses';
      if (activeTab === 'ranks') endpoint = '/ranks';
      if (activeTab === 'stories') endpoint = '/stories';
      if (activeTab === 'enquiries') endpoint = '/enquiries';


      
      await axios.delete(`${API_URL}${endpoint}/${id}`, { withCredentials: true });
      setRefresh(r => r + 1);
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.keys(formData).forEach(key => {
      payload.append(key, formData[key]);
    });
    if (file) {
      payload.append('image', file);
    }

    try {
      let endpoint = '';
      if (activeTab === 'faculty') endpoint = '/faculty';
      if (activeTab === 'courses') endpoint = '/courses';
      if (activeTab === 'ranks') endpoint = '/ranks';
      if (activeTab === 'stories') endpoint = '/stories';


      await axios.post(`${API_URL}${endpoint}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      setFormData({});
      setFile(null);
      setRefresh(r => r + 1);
      alert('Successfully added');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add');
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

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sora">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue rounded-xl flex items-center justify-center text-white font-bold">S</div>
               <h1 className="text-xl font-bold text-ink">Dashboard</h1>
            </div>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              {['faculty', 'courses', 'ranks', 'stories', 'enquiries'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-sm font-bold rounded-lg capitalize transition-all ${activeTab === tab ? 'bg-white text-blue shadow-sm' : 'text-gray-500 hover:text-ink'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button onClick={async () => { await axios.post(`${API_URL}/admin/logout`, {}, {withCredentials: true}); setIsAdmin(false); }} className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors">Logout</button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* ADD FORM - Hidden for Enquiries as they are automated log entries */}
        {activeTab !== 'enquiries' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink capitalize">Add New {activeTab}</h2>
              <span className="text-xs font-bold text-blue bg-sky px-3 py-1 rounded-full uppercase tracking-wider">Fill all details</span>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === 'faculty' && (
                <>
                  <input required placeholder="Full Name" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name || ''} />
                  <input required placeholder="Initials (e.g. PR)" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, initials: e.target.value})} value={formData.initials || ''} />
                  <input required placeholder="Department" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, department: e.target.value})} value={formData.department || ''} />
                  <input required placeholder="Experience (e.g. 15 Years)" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, experience: e.target.value})} value={formData.experience || ''} />
                  <select required className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, category: e.target.value})} value={formData.category || ''}>
                      <option value="">Select Category</option>
                      <option value="math">Mathematics</option>
                      <option value="phys">Physics</option>
                      <option value="chem">Chemistry</option>
                      <option value="bio">Biology</option>
                      <option value="comm">Commerce</option>
                      <option value="lang">Languages</option>
                  </select>
                </>
              )}

              {activeTab === 'courses' && (
                <>
                  <input required placeholder="Course Title" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, title: e.target.value})} value={formData.title || ''} />
                  <input required placeholder="Short Description" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, description: e.target.value})} value={formData.description || ''} />
                  <select required className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, stream: e.target.value})} value={formData.stream || ''}>
                    <option value="">Select Stream</option>
                    <option value="engineering">Engineering</option>
                    <option value="medical">Medical</option>
                    <option value="commerce">Commerce</option>
                  </select>
                  <input placeholder="Details (JSON array e.g. ['L1', 'L2'])" className="md:col-span-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, details: e.target.value})} value={formData.details || ''} />
                </>
              )}
              {activeTab === 'ranks' && (
                <>
                  <input required placeholder="Student Name" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, studentName: e.target.value})} value={formData.studentName || ''} />
                  <input required placeholder="Hall Ticket Number" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, hallTicketNumber: e.target.value})} value={formData.hallTicketNumber || ''} />
                  <input required placeholder="Rank / Achievement" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, rank: e.target.value})} value={formData.rank || ''} />
                  <input required placeholder="Exam (e.g. JEE Main)" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, exam: e.target.value})} value={formData.exam || ''} />
                  <input required placeholder="Stream (e.g. MPC)" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, stream: e.target.value})} value={formData.stream || ''} />
                  <input type="number" placeholder="Year" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, year: e.target.value})} value={formData.year || new Date().getFullYear()} />
                </>
              )}
              {activeTab === 'stories' && (
                <>
                  <input required placeholder="Student Name" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name || ''} />
                  <input required placeholder="Initials (e.g. BG)" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, initials: e.target.value})} value={formData.initials || ''} />
                  <input required placeholder="Achievement (e.g. Rank 45)" className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" onChange={e => setFormData({...formData, place: e.target.value})} value={formData.place || ''} />
                  <div className="flex flex-col gap-2">
                    <input 
                      list="categories" 
                      required 
                      placeholder="Category (Choose or Type New)" 
                      className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue/10 focus:outline-none" 
                      onChange={e => setFormData({...formData, category: e.target.value})} 
                      value={formData.category || ''} 
                    />
                    <datalist id="categories">
                      <option value="jee">JEE Mains</option>
                      <option value="neet">NEET achievers</option>
                      <option value="intermediate">Board & Intermediate Toppers</option>
                      {[...new Set(data.map(item => item.category))].filter(Boolean).map((cat, idx) => (
                         <option key={`cat-opt-${idx}-${cat}`} value={cat} />
                      ))}
                    </datalist>
                    <div className="flex flex-wrap gap-2 mt-1">
                       {['jee', 'neet', 'intermediate'].map(c => (
                         <button key={c} type="button" onClick={() => setFormData({...formData, category: c})} className="text-[10px] font-bold px-2 py-1 bg-blue/5 text-blue rounded-lg border border-blue/10 hover:bg-blue hover:text-white transition-all uppercase">Quick: {c}</button>
                       ))}
                    </div>
                  </div>
                </>
              )}
              {activeTab !== 'enquiries' && (
                <div className="md:col-span-full border-2 border-dashed border-gray-100 rounded-2xl p-8 text-center bg-gray-50/30">
                  <label className="block text-sm font-bold text-ink mb-2">Upload Identification Image</label>
                  <input 
                    type="file" 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue file:text-white hover:file:bg-blue/80" 
                    onChange={e => setFile(e.target.files[0])} 
                  />
                </div>
              )}
              <button type="submit" className="md:col-span-full mt-4 bg-blue text-white py-4 rounded-xl font-bold hover:shadow-lg hover:bg-ink transition-all active:scale-[0.99]">Add to Dashboard</button>
            </form>
          </div>
        )}

        {/* LIST TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
             <h3 className="font-bold text-ink">Manage Entries</h3>
             <div className="text-xs font-bold text-gray-400">{data.length} Total Entries</div>
          </div>
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Entry Detail</th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {data.map((item, idx) => (
                <tr key={item._id || `item-${idx}`} className="hover:bg-gray-50/50 transition-colors">
                  {activeTab === 'enquiries' ? (
                    <>
                      <td className="px-8 py-5">
                        <div className="text-sm font-bold text-ink">{item.studentName}</div>
                        <div className="text-xs text-muted">Parent: {item.parentName}</div>
                        <div className="text-xs text-muted">Mob: {item.mobile}</div>
                        {item.email && <div className="text-xs text-muted">Email: {item.email}</div>}
                        <div className="text-[10px] text-gray-400 mt-1 italic">{new Date(item.createdAt).toLocaleString()}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-xs font-bold text-blue">{item.stream}</div>
                        <div className="text-[10px] text-muted">{item.batch}</div>
                        {item.message && (
                          <div className="mt-2 text-[11px] text-ink bg-gray-50 p-2 rounded border border-gray-100 max-w-xs whitespace-normal">
                             " {item.message} "
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex flex-col items-end gap-2">
                          <button 
                            onClick={() => {
                              const text = `*New Enquiry from Sri Sai Agri*%0A%0A*Student:* ${item.studentName}%0A*Parent:* ${item.parentName}%0A*Mobile:* ${item.mobile}%0A*Stream:* ${item.stream}%0A*Batch:* ${item.batch}%0A*Message:* ${item.message || 'N/A'}`;
                              window.open(`https://wa.me/?text=${text}`, '_blank');
                            }}
                            className="text-xs font-bold text-green-500 hover:text-green-600 uppercase tracking-widest flex items-center gap-1"
                          >
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.133 1.415 4.85 1.416 5.482 0 9.944-4.461 9.947-9.942.001-2.656-1.032-5.151-2.908-7.028-1.876-1.877-4.372-2.91-7.027-2.911-5.483 0-9.943 4.463-9.947 9.943-.001 1.77.476 3.358 1.381 4.754l-.885 3.232 3.303-.866zm13.12-10.428c-.144-.24-.53-.385-1.108-.673-.577-.288-2.82-1.391-3.253-1.548-.432-.157-.747-.235-1.06.235-.314.47-1.214 1.548-1.488 1.861-.273.314-.547.352-1.125.063-.577-.288-2.437-.899-4.643-2.867-1.716-1.53-2.874-3.419-3.21-3.996-.337-.577-.036-.889.253-1.176.259-.259.577-.673.866-1.01.288-.336.385-.577.577-.96.192-.385.096-.721-.048-1.01-.144-.288-1.06-2.551-1.453-3.488-.381-.914-.768-.789-1.06-.804l-.903-.012c-.312 0-.817.117-1.244.582-.427.465-1.63 1.593-1.63 3.882 0 2.289 1.662 4.505 1.892 4.817.23.312 3.27 4.99 7.92 6.997 1.106.477 1.97.763 2.642.977 1.111.353 2.122.303 2.92.184.89-.133 2.82-1.153 3.218-2.268.398-1.115.398-2.07.28-2.268z"/></svg>
                             WhatsApp
                          </button>
                          <button onClick={() => handleDelete(item._id)} className="text-xs font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors">Remove</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-xl bg-gray-100 overflow-hidden mr-4 border border-gray-200">
                            {item.image ? (
                              <img 
                                src={item.image.startsWith('http') ? item.image : `${item.image}`} 
                                className="h-full w-full object-cover" 
                                alt="" 
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400 font-bold text-sm bg-gray-50">
                                {item.initials || "?"}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-ink">{item.name || item.title || item.studentName}</div>
                            <div className="text-[10px] uppercase font-black text-gray-300 mt-0.5">{item._id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full bg-sky text-blue text-[10px] font-black uppercase">
                          {item.department || item.stream || item.exam || item.category || item.achievement}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-right">
                        <button onClick={() => handleDelete(item._id)} className="text-xs font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors">Remove</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center text-gray-400 font-medium">No results found. Add your first entry above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
