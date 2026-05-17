import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Users, 
  LogOut, 
  Plus, 
  Trash2, 
  RefreshCw,
  LayoutDashboard
} from 'lucide-react';

const API_URL = '/api';

export default function ReceptionistDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [view, setView] = useState('attendance'); // 'accounts' or 'attendance'
  const [staffList, setStaffList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [attDate, setAttDate] = useState(new Date().toISOString().split('T')[0]);
  const [attData, setAttData] = useState([]);
  const [attLoading, setAttLoading] = useState(false);
  const [newStaff, setNewStaff] = useState({ employee_id: '', name: '', email: '', password: '', department: '', role: '' });

  const STATUS_OPTIONS = ['Present', 'Absent', 'Leave', 'Half Day'];
  const STATUS_COLORS = {
    Present:    'bg-green-100 text-green-700 border-green-200',
    Absent:     'bg-red-100 text-red-700 border-red-200',
    Leave:      'bg-amber-100 text-amber-700 border-amber-200',
    'Half Day': 'bg-sky text-blue border-blue/20',
  };

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/receptionist/auth`, { withCredentials: true });
      if (res.data.authenticated) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${API_URL}/staff/admin/list`, { withCredentials: true });
      setStaffList(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchAttendance = async () => {
    setAttLoading(true);
    try {
      const res = await axios.get(`${API_URL}/staff/admin/attendance?date=` + attDate, { withCredentials: true });
      setAttData(res.data.map(s => ({ ...s, status: s.status || 'Present', check_in: s.check_in || '', check_out: s.check_out || '' })));
    } catch (e) { console.error(e); }
    setAttLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStaff();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && view === 'attendance') {
      fetchAttendance();
    }
  }, [isAuthenticated, view, attDate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/receptionist/login`, { username, password }, { withCredentials: true });
      setIsAuthenticated(true);
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Invalid credentials');
      } else {
        setError('Login error: ' + err.message);
      }
    }
    setLoading(false);
  };

  const logout = async () => {
    await axios.post(`${API_URL}/receptionist/logout`, {}, {withCredentials: true});
    setIsAuthenticated(false);
  };

  const updateAtt = (staffId, field, value) =>
    setAttData(prev => prev.map(s => s.id === staffId ? { ...s, [field]: value } : s));

  const saveAttendance = async () => {
    setSaving(true);
    try {
      await axios.post(`${API_URL}/staff/admin/attendance/bulk`, 
        { date: attDate, records: attData.map(s => ({ staff_id: s.id, status: s.status, check_in: s.check_in, check_out: s.check_out })) },
        { withCredentials: true }
      );
      alert('Attendance saved for ' + attDate);
    } catch (e) { alert('Save failed'); }
    setSaving(false);
  };

  const handleCreateStaff = async () => {
    if (!newStaff.name || !newStaff.password) { alert('Name and password are required'); return; }
    try {
      const dataToSubmit = { ...newStaff, email: newStaff.name.toLowerCase().replace(/\s+/g, '') };
      await axios.post(`${API_URL}/staff/admin/create`, dataToSubmit, { withCredentials: true });
      fetchStaff();
      alert('Staff account created successfully!');
      setNewStaff({ name: '', password: '', department: '', role: '' });
      setShowAdd(false);
    } catch (err) { alert(err.response?.data?.message || 'Create failed'); }
  };

  const handleDeleteStaff = async (id) => {
    if (window.confirm('Delete this staff member? This cannot be undone.')) {
      try {
        await axios.delete(`${API_URL}/staff/admin/${id}`, { withCredentials: true });
        fetchStaff();
      } catch (err) { alert('Delete failed'); }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6 font-sora">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-gray-100">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-blue rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue/20">R</div>
             <h2 className="text-2xl font-bold text-ink">Receptionist Portal</h2>
             <p className="text-gray-400 text-sm mt-1">Please login to manage staff attendance</p>
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
    <div className="min-h-screen bg-[#f8fafc] flex font-sora">
      <aside className="w-72 bg-ink text-white flex flex-col sticky top-0 h-screen shadow-2xl z-20">
        <div className="p-8 border-b border-white/10 flex items-center gap-4">
          <div className="w-10 h-10 bg-white text-ink rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">R</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Receptionist</h1>
            <p className="text-[10px] text-white/50 uppercase font-black tracking-widest">Control Center</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto scrollbar-hide">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4 ml-2">Navigation</p>
          <button 
            onClick={() => setView('attendance')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 group ${view === 'attendance' ? 'bg-blue text-white shadow-lg shadow-blue/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} className={`${view === 'attendance' ? 'text-white' : 'text-white/40 group-hover:text-white'} transition-colors`} />
            <span className="flex-1 text-left">Mark Attendance</span>
          </button>
          <button 
            onClick={() => setView('accounts')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 group ${view === 'accounts' ? 'bg-blue text-white shadow-lg shadow-blue/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Users size={18} className={`${view === 'accounts' ? 'text-white' : 'text-white/40 group-hover:text-white'} transition-colors`} />
            <span className="flex-1 text-left">Staff Accounts</span>
          </button>
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
            <h2 className="text-xl font-bold text-ink">{view === 'attendance' ? 'Staff Attendance' : 'Staff Accounts'}</h2>
            <div className="h-4 w-[1px] bg-gray-200"></div>
            <p className="text-xs text-muted font-medium">Dashboard / {view}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
               <div className="text-right">
                  <p className="text-xs font-bold text-ink">Receptionist</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-sky border border-blue/20 flex items-center justify-center text-blue font-bold">R</div>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-6xl w-full mx-auto">
          {view === 'attendance' && (
            <div className="animate-fadeIn space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-ink">Mark Staff Attendance</h3>
                  <p className="text-[10px] text-muted font-bold tracking-widest mt-1 uppercase">Select date, set status for each member, then save</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 rounded-xl shadow-sm">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</span>
                    <input type="date" value={attDate} onChange={e => setAttDate(e.target.value)} className="bg-transparent outline-none font-black text-blue text-sm" />
                  </div>
                  <button onClick={saveAttendance} disabled={saving || attData.length === 0}
                    className="px-6 py-3 bg-[#15803d] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-500/20 hover:bg-[#166534] transition-all disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Attendance'}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.entries(STATUS_COLORS).map(([s, cls]) => (
                  <span key={s} className={"px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border " + cls}>{s}</span>
                ))}
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {attLoading ? (
                  <div className="py-24 text-center text-blue font-black text-sm animate-pulse uppercase tracking-widest">Loading...</div>
                ) : attData.length === 0 ? (
                  <div className="py-24 text-center text-gray-300 font-bold text-xs uppercase tracking-widest">No staff found. Add staff first in the Accounts tab.</div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        {['Staff Member', 'Dept / Role', 'Status'].map(h => (
                          <th key={h} className="px-6 py-4 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {attData.map(s => (
                        <tr key={s.id} className="hover:bg-sky/20 transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue font-black">{(s.name || '?')[0]}</div>
                              <div>
                                <p className="font-bold text-ink text-sm">{s.name}</p>
                                <p className="text-[9px] text-blue font-black uppercase tracking-widest">{s.employee_id || 'No ID'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-[10px] font-black text-muted uppercase tracking-widest">{s.department || '-'}</p>
                            <p className="text-[9px] text-gray-300 uppercase tracking-widest">{s.role || ''}</p>
                          </td>
                          <td className="px-6 py-5">
                            <select value={s.status} onChange={e => updateAtt(s.id, 'status', e.target.value)}
                              className={"px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border outline-none cursor-pointer " + (STATUS_COLORS[s.status] || '')}>
                              {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {attData.length > 0 && (
                <button onClick={saveAttendance} disabled={saving}
                  className="w-full py-5 bg-[#15803d] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-green-500/20 hover:bg-[#166534] transition-all active:scale-[0.98] disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Attendance for All Staff'}
                </button>
              )}
            </div>
          )}

          {view === 'accounts' && (
            <div className="animate-fadeIn space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-ink">Staff Accounts</h3>
                  <p className="text-[10px] text-muted font-bold tracking-widest mt-1 uppercase">Total: {(staffList || []).length} members</p>
                </div>
                <button onClick={() => setShowAdd(v => !v)} className="px-6 py-3 bg-blue text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue/20 hover:bg-ink transition-all flex items-center gap-2">
                  <Plus size={16} /> {showAdd ? 'Cancel' : 'Add Staff'}
                </button>
              </div>

              {showAdd && (
                <div className="bg-white p-8 rounded-3xl border border-blue/20 shadow-xl space-y-6">
                  <h4 className="font-black text-ink text-sm uppercase tracking-widest border-b border-gray-100 pb-4">New Staff Account</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { key: 'name',        placeholder: 'Employee Name *' },
                      { key: 'password',    placeholder: 'Password *', type: 'password' },
                      { key: 'department',  placeholder: 'Department (e.g. Python Trainer)' },
                      { key: 'role',        placeholder: 'Role (e.g. Trainer / HR)' },
                    ].map(f => (
                      <input key={f.key} type={f.type || 'text'} placeholder={f.placeholder}
                        value={newStaff[f.key] || ''}
                        onChange={e => setNewStaff({ ...newStaff, [f.key]: e.target.value })}
                        className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue font-medium text-ink text-sm"
                      />
                    ))}
                  </div>
                  <button onClick={handleCreateStaff} className="w-full bg-[#15803d] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#166534] transition-all shadow-lg shadow-green-500/20">
                    Create Staff Account
                  </button>
                </div>
              )}

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      {['Employee Name', 'Department', 'Role', 'Action'].map(h => (
                        <th key={h} className="px-6 py-4 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest last:text-right">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {!(staffList || []).length ? (
                      <tr><td colSpan={4} className="px-6 py-20 text-center text-gray-300 font-bold text-xs uppercase tracking-widest">No staff yet. Add one above.</td></tr>
                    ) : (staffList || []).map(m => (
                      <tr key={m.id} className="hover:bg-sky/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-ink">{m.name}</td>
                        <td className="px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest">{m.department || '-'}</td>
                        <td className="px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest">{m.role || '-'}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDeleteStaff(m.id)} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
