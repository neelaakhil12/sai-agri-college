import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOut, CheckCircle2, XCircle, Clock, Search, Filter, Calendar } from "lucide-react";

export default function StaffDashboard() {
  const [staff, setStaff] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffRes = await axios.get(`${API_URL}/staff/profile`, { withCredentials: true });
        setStaff(staffRes.data);
        
        const studentsRes = await axios.get(`${API_URL}/students/admin/list`, { withCredentials: true });
        setStudents(studentsRes.data);

        const attRes = await axios.get(`${API_URL}/staff/attendance/${selectedDate}`, { withCredentials: true });
        const attMap = {};
        attRes.data.forEach(a => attMap[a.student_id] = a.status);
        setAttendance(attMap);
      } catch (err) {
        navigate("/staff/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDate, navigate]);

  const markAttendance = async (studentId, status) => {
    try {
      await axios.post(`${API_URL}/staff/attendance`, {
        student_id: studentId,
        status,
        date: selectedDate
      }, { withCredentials: true });
      setAttendance({ ...attendance, [studentId]: status });
    } catch (err) {
      alert("Failed to mark attendance");
    }
  };

  const filteredStudents = students.filter(s => 
    s.student_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.roll_no?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-blue animate-pulse">LOADING DASHBOARD...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="h-11 w-11 bg-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue/20">
              <Calendar size={20} />
           </div>
           <div>
              <h1 className="text-xl font-black text-ink uppercase tracking-tight">Attendance Register</h1>
              <p className="text-[10px] text-muted font-bold tracking-widest uppercase">Sri Sai Staff Portal</p>
           </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="hidden md:flex flex-col text-right">
              <span className="font-bold text-sm text-ink">{staff?.name}</span>
              <span className="text-[10px] font-black text-blue/60 uppercase tracking-widest">{staff?.department}</span>
           </div>
           <button 
             onClick={() => { document.cookie = "staffToken=; max-age=0; path=/;"; navigate("/staff/login"); }}
             className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5"
           >
              <LogOut size={18} />
           </button>
        </div>
      </header>

      <main className="p-8 space-y-10">
         {/* Controls */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue/5 border border-gray-100 flex items-center gap-4">
               <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-muted">
                  <Search size={20} />
               </div>
               <input 
                 placeholder="Search student by name or roll number..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="flex-grow bg-transparent border-none outline-none font-bold text-ink"
               />
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue/5 border border-gray-100 flex items-center justify-between px-10">
               <span className="text-[10px] font-black text-muted uppercase tracking-widest">Select Date</span>
               <input 
                 type="date" 
                 value={selectedDate}
                 onChange={(e) => setSelectedDate(e.target.value)}
                 className="bg-sky/30 border-none outline-none font-black text-blue px-4 py-2 rounded-xl text-xs uppercase"
               />
            </div>
         </div>

         {/* Student List */}
         <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue/5 border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
               <h3 className="font-black text-ink text-sm uppercase tracking-widest">Enrollment List ({filteredStudents.length})</h3>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                     <span className="text-[10px] font-bold text-muted uppercase">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                     <span className="text-[10px] font-bold text-muted uppercase">Absent</span>
                  </div>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="bg-gray-50">
                        <th className="px-10 py-5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Student Info</th>
                        <th className="px-10 py-5 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                        <th className="px-10 py-5 text-right text-[9px] font-black text-gray-400 uppercase tracking-widest">Mark Attendance</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {filteredStudents.map(student => (
                        <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-10 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 rounded-2xl bg-sky flex items-center justify-center text-blue font-black shadow-inner overflow-hidden">
                                    {student.photo ? <img src={student.photo} className="h-full w-full object-cover" /> : student.student_name[0]}
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="font-black text-ink text-sm uppercase">{student.student_name}</span>
                                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{student.roll_no}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-6 text-center">
                              {attendance[student.id] ? (
                                 <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${attendance[student.id] === 'Present' ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-red-100 text-red-600 border border-red-200'}`}>
                                    {attendance[student.id]}
                                 </span>
                              ) : (
                                 <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest italic">Not Marked</span>
                              )}
                           </td>
                           <td className="px-10 py-6">
                              <div className="flex items-center justify-end gap-3">
                                 <button 
                                   onClick={() => markAttendance(student.id, 'Present')}
                                   className={`p-3 rounded-xl transition-all ${attendance[student.id] === 'Present' ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-gray-50 text-gray-300 hover:bg-green-50 hover:text-green-500'}`}
                                 >
                                    <CheckCircle2 size={20} />
                                 </button>
                                 <button 
                                   onClick={() => markAttendance(student.id, 'Absent')}
                                   className={`p-3 rounded-xl transition-all ${attendance[student.id] === 'Absent' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-500'}`}
                                 >
                                    <XCircle size={20} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </main>
    </div>
  );
}
