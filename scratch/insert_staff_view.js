const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'sri-sai-agriculture/src/pages/admin/AdminDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const insertBefore = '\nfunction SettingsView';
const idx = content.indexOf(insertBefore);
if (idx === -1) { console.log('SettingsView NOT FOUND'); process.exit(1); }

const newComponent = `
function StaffManagementView({ staffList, onRefresh, onCreate, onDelete }) {
  const [view, setView] = React.useState('accounts');
  const [showAdd, setShowAdd] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [attDate, setAttDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [attData, setAttData] = React.useState([]);
  const [attLoading, setAttLoading] = React.useState(false);
  const [newStaff, setNewStaff] = React.useState({ employee_id: '', name: '', email: '', password: '', department: '', role: '' });

  const STATUS_OPTIONS = ['Present', 'Absent', 'Leave', 'Half Day'];
  const STATUS_COLORS = {
    Present:    'bg-green-100 text-green-700 border-green-200',
    Absent:     'bg-red-100 text-red-700 border-red-200',
    Leave:      'bg-amber-100 text-amber-700 border-amber-200',
    'Half Day': 'bg-sky text-blue border-blue/20',
  };

  React.useEffect(() => {
    if (view === 'attendance') fetchAttendance();
  }, [view, attDate]);

  const fetchAttendance = async () => {
    setAttLoading(true);
    try {
      const res = await fetch('/api/staff/admin/attendance?date=' + attDate, { credentials: 'include' });
      const json = await res.json();
      setAttData(json.map(s => ({ ...s, status: s.status || 'Present', check_in: s.check_in || '', check_out: s.check_out || '' })));
    } catch (e) { console.error(e); }
    setAttLoading(false);
  };

  const updateAtt = (staffId, field, value) =>
    setAttData(prev => prev.map(s => s.id === staffId ? { ...s, [field]: value } : s));

  const saveAttendance = async () => {
    setSaving(true);
    try {
      await fetch('/api/staff/admin/attendance/bulk', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: attDate, records: attData.map(s => ({ staff_id: s.id, status: s.status, check_in: s.check_in, check_out: s.check_out })) })
      });
      alert('Attendance saved for ' + attDate);
    } catch (e) { alert('Save failed'); }
    setSaving(false);
  };

  const handleCreate = async () => {
    if (!newStaff.name || !newStaff.email || !newStaff.password) { alert('Name, email and password are required'); return; }
    await onCreate(newStaff);
    setNewStaff({ employee_id: '', name: '', email: '', password: '', department: '', role: '' });
    setShowAdd(false);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex gap-2 px-8 pt-8">
        {[['accounts', 'Staff Accounts'], ['attendance', 'Mark Attendance']].map(([id, label]) => (
          <button key={id} onClick={() => setView(id)}
            className={"px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all " + (view === id ? 'bg-blue text-white shadow-lg shadow-blue/20' : 'bg-white text-muted border border-gray-100 hover:border-blue/30')}
          >{label}</button>
        ))}
      </div>

      {view === 'accounts' && (
        <div className="p-8 space-y-8">
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
                  { key: 'employee_id', placeholder: 'Employee ID (e.g. EMP001)' },
                  { key: 'name',        placeholder: 'Full Name *' },
                  { key: 'email',       placeholder: 'Email Address *' },
                  { key: 'password',    placeholder: 'Password *', type: 'password' },
                  { key: 'department',  placeholder: 'Department (e.g. Python Trainer)' },
                  { key: 'role',        placeholder: 'Role (e.g. Trainer / HR)' },
                ].map(f => (
                  <input key={f.key} type={f.type || 'text'} placeholder={f.placeholder}
                    value={newStaff[f.key]}
                    onChange={e => setNewStaff({ ...newStaff, [f.key]: e.target.value })}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue font-medium text-ink text-sm"
                  />
                ))}
              </div>
              <button onClick={handleCreate} className="w-full bg-[#15803d] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#166534] transition-all shadow-lg shadow-green-500/20">
                Create Staff Account
              </button>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {['Emp ID', 'Name', 'Department', 'Role', 'Email', 'Action'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest last:text-right">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {!(staffList || []).length ? (
                  <tr><td colSpan={6} className="px-6 py-20 text-center text-gray-300 font-bold text-xs uppercase tracking-widest">No staff yet. Add one above.</td></tr>
                ) : (staffList || []).map(m => (
                  <tr key={m.id} className="hover:bg-sky/30 transition-colors">
                    <td className="px-6 py-4"><span className="px-3 py-1 bg-blue/10 text-blue rounded-lg text-[10px] font-black uppercase">{m.employee_id || '-'}</span></td>
                    <td className="px-6 py-4 font-bold text-ink">{m.name}</td>
                    <td className="px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest">{m.department || '-'}</td>
                    <td className="px-6 py-4 text-[10px] font-black text-muted uppercase tracking-widest">{m.role || '-'}</td>
                    <td className="px-6 py-4 text-sm text-muted">{m.email}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => onDelete(m.id)} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'attendance' && (
        <div className="p-8 space-y-8">
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
                    {['Staff Member', 'Dept / Role', 'Status', 'Check In', 'Check Out'].map(h => (
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
                      <td className="px-6 py-5">
                        <input type="time" value={s.check_in} onChange={e => updateAtt(s.id, 'check_in', e.target.value)}
                          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue" />
                      </td>
                      <td className="px-6 py-5">
                        <input type="time" value={s.check_out} onChange={e => updateAtt(s.id, 'check_out', e.target.value)}
                          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue" />
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
    </div>
  );
}

`;

const newContent = content.substring(0, idx) + newComponent + content.substring(idx);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('SUCCESS. Total lines: ' + newContent.split('\n').length);
