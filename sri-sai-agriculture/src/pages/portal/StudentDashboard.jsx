import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "/api";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/students/profile`, { withCredentials: true });
        setStudent(res.data);
      } catch (err) {
        // Fallback to Mock Data for Demo/Development
        setStudent({
          id: "DEMO-2026-001",
          student_name: "Sri Sai Student",
          father_name: "G. Satyanarayana",
          mother_name: "G. Lakshmi",
          dob: "2005-06-15",
          gender: "Male",
          mobile1: "9100061091",
          email_personal: "student@srisai.edu",
          branch: "Vijayawada Main",
          course_applied: "Ag. B.Sc.",
          medium: "English",
          door_no: "4-12",
          village: "Poranki",
          mandal: "Penamaluru",
          district: "Krishna",
          pin: "521137",
          student_fees: [
            { academic_year: "1st Year", total_fee: "1,50,000", committed_fee: "1,25,000", paid_amount: "25,000", payment_status: "paid" },
            { academic_year: "2nd Year", total_fee: "1,50,000", committed_fee: "1,25,000", paid_amount: "0", payment_status: "pending" }
          ]
        });
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!student) return <div className="min-h-screen flex items-center justify-center bg-white text-blue font-bold">Loading Sri Sai Portal...</div>;

  return (
    <div className="min-h-screen bg-[#F3F4F9] flex font-sora text-ink">
      
      {/* --- Sidebar (Desktop) --- */}
      <aside className="hidden lg:flex w-72 bg-blue flex-col shadow-2xl">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
             <img src="/logo.png" alt="Logo" className="h-10 w-10 brightness-0 invert" />
             <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-tight">Sri Sai Institute</span>
                <span className="text-white/50 text-[10px] uppercase font-black tracking-widest -mt-1">Agri Sciences</span>
             </div>
          </div>
        </div>
        
        <nav className="p-6 space-y-2 flex-grow">
          <SidebarLink active={activeTab === 'home'} icon="Home" label="Home" onClick={() => setActiveTab('home')} />
          <SidebarLink active={activeTab === 'profile'} icon="User" label="My Profile" onClick={() => setActiveTab('profile')} />
          <SidebarLink active={activeTab === 'fees'} icon="Wallet" label="Fee Payments" onClick={() => setActiveTab('fees')} />
          <SidebarLink active={activeTab === 'learning'} icon="BookOpen" label="Learning" onClick={() => setActiveTab('learning')} />
          <SidebarLink active={activeTab === 'calendar'} icon="Calendar" label="Calendar" onClick={() => setActiveTab('calendar')} />
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={() => { document.cookie = "studentToken=; max-age=0; path=/;"; navigate("/"); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all font-bold text-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-grow flex flex-col h-screen overflow-y-auto">
        
        {/* Top Header */}
        <header className="bg-white px-8 py-5 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
           <div className="flex flex-col">
              <h1 className="text-xl font-black text-ink uppercase tracking-tight">
                {activeTab === 'home' ? 'Student Dashboard' : activeTab.toUpperCase()}
              </h1>
              <p className="text-[10px] text-muted font-bold tracking-widest -mt-0.5">SRI SAI AGRICULTURAL COLLEGE</p>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                 <span className="text-sm font-bold text-ink">{student.student_name}</span>
                 <span className="text-[10px] text-muted font-bold tracking-tighter">ID: {String(student.id).split('-')[0].toUpperCase()}</span>
              </div>
              <div className="h-11 w-11 rounded-2xl bg-sky flex items-center justify-center border-2 border-white shadow-lg overflow-hidden">
                 {student.photo ? <img src={student.photo} className="h-full w-full object-cover" /> : <span className="text-blue font-black text-lg">{student.student_name[0]}</span>}
              </div>
           </div>
        </header>

        <div className="p-8">
          
          {activeTab === 'home' && (
            <div className="animate-fadeIn space-y-10">
              
              {/* Profile Card Summary */}
              <div className="bg-gradient-to-r from-blue to-[#1e40af] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                 <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
                 <div className="relative z-1 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                       <div className="h-20 w-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-1">
                          {student.photo ? <img src={student.photo} className="h-full w-full object-cover rounded-[20px]" /> : <div className="h-full w-full flex items-center justify-center text-3xl font-black">{student.student_name[0]}</div>}
                       </div>
                       <div className="flex flex-col">
                          <h2 className="text-2xl font-black tracking-tight">{student.student_name}</h2>
                          <p className="text-white/60 text-sm font-medium tracking-wide">ID: {String(student.id).split('-')[0].toUpperCase()} | Batch: {student.course_applied}</p>
                       </div>
                    </div>
                    <button onClick={() => setActiveTab('profile')} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10">
                       <ArrowRight size={24} />
                    </button>
                 </div>
              </div>

              {/* Essentials Grid */}
              <section>
                 <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Essentials</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    <PortalCard color="green" icon="BarChart3" title="Attendance" subtitle="89.39%" detail="As on Apr 29, 16:48" />
                    <PortalCard color="pink" icon="Wallet" title="Fee Payments" subtitle="View Details" detail="Check Dues & Payments" onClick={() => setActiveTab('fees')} />
                    <PortalCard color="purple" icon="MapPin" title="Campus Events" subtitle="Upcoming" detail="Symposium 2026" />
                    <PortalCard color="sky" icon="Users" title="Campus Clubs" subtitle="Active" detail="Agri-Tech Club" />
                 </div>
              </section>

              {/* Tools Section */}
              <section>
                 <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Tools</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ToolCard icon="Calendar" title="Calendar" onClick={() => setActiveTab('calendar')} />
                    <ToolCard icon="MessageSquare" title="Feedbacks" />
                 </div>
              </section>

            </div>
          )}

          {activeTab === 'fees' && (
            <div className="animate-fadeIn space-y-8">
               <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center">
                  <div className="h-20 w-20 bg-sky rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue shadow-lg shadow-blue/10">
                     <Wallet size={40} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl font-black text-ink mb-2">Sri Sai Fee Portal</h2>
                  <p className="text-muted font-medium mb-8">Select the type of Fee to Continue</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <PaymentOption icon="Book" title="Pay Academic Fees" detail="Tuition Fee, Hostel & Transport" />
                     <PaymentOption icon="FileText" title="Pay Examination Fees" detail="Regular & Supplementary" />
                     <PaymentOption icon="Truck" title="Transport Registration" detail="Register for bus service" />
                  </div>
               </div>

               {/* Detailed Table */}
               <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                  <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                     <h3 className="font-black text-sm uppercase tracking-wider text-ink">Detailed Fee Breakdown</h3>
                     <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black rounded-full uppercase">Live Status</span>
                  </div>
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-white border-b border-gray-100">
                           <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase">Year</th>
                           <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase">Total Fee</th>
                           <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase">Committed</th>
                           <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase">Paid</th>
                           <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {student.student_fees?.map((fee, idx) => (
                           <tr key={idx} className="hover:bg-sky/30 transition-colors">
                              <td className="px-8 py-5 font-bold text-ink">{fee.academic_year}</td>
                              <td className="px-8 py-5 font-bold text-blue">₹{fee.total_fee || '0'}</td>
                              <td className="px-8 py-5 font-bold text-gray-500">₹{fee.committed_fee || '0'}</td>
                              <td className="px-8 py-5 font-bold text-green-600">₹{fee.paid_amount || '0'}</td>
                              <td className="px-8 py-5">
                                 <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase ${fee.payment_status === 'pending' ? 'bg-orange/10 text-orange' : 'bg-green-100 text-green-600'}`}>
                                    {fee.payment_status || 'Unallocated'}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="animate-fadeIn max-w-4xl mx-auto space-y-10">
               <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
                  <div className="h-40 w-40 rounded-[2.5rem] bg-sky border-4 border-white shadow-2xl overflow-hidden shrink-0">
                     {student.photo ? <img src={student.photo} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-6xl font-black text-blue">{student.student_name[0]}</div>}
                  </div>
                  <div className="flex-grow text-center md:text-left">
                     <h2 className="text-4xl font-black text-ink mb-1">{student.student_name}</h2>
                     <p className="text-blue font-bold tracking-widest uppercase text-xs mb-6">Student ID: {String(student.id).toUpperCase()}</p>
                     
                     <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <ProfileTag label="Course" value={student.course_applied} color="blue" />
                        <ProfileTag label="Branch" value={student.branch} color="orange" />
                        <ProfileTag label="Medium" value={student.medium} color="purple" />
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InfoSection title="Parent Details">
                     <InfoField label="Father's Name" value={student.father_name} />
                     <InfoField label="Mother's Name" value={student.mother_name} />
                  </InfoSection>
                  <InfoSection title="Contact Details">
                     <InfoField label="Mobile" value={student.mobile1} />
                     <InfoField label="Alternate" value={student.mobile2 || 'N/A'} />
                     <InfoField label="Email" value={student.email_personal} />
                  </InfoSection>
                  <InfoSection title="Address" full>
                     <p className="text-sm font-bold text-ink leading-relaxed">
                        {student.door_no}, {student.village}, {student.mandal}, {student.district} - {student.pin}
                     </p>
                  </InfoSection>
               </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="animate-fadeIn space-y-10">
               <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                  <button className="px-6 py-2 bg-blue text-white rounded-xl font-bold text-sm shadow-lg shadow-blue/20">Courses</button>
                  <button className="px-6 py-2 text-muted font-bold text-sm hover:text-blue transition-colors">Growth</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <CourseCard initials="AB" title="AGRONOMY BASICS" teacher="Dr. Thomas" color="sky" />
                  <CourseCard initials="SS" title="SOIL SCIENCE" teacher="Prof. Krishna" color="green" />
                  <CourseCard initials="EP" title="ENTOMOLOGY PRINCIPLES" teacher="Dr. Ramesh" color="pink" />
               </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="animate-fadeIn max-w-2xl mx-auto bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-black text-ink uppercase tracking-tight">Academic Calendar</h3>
                  <span className="text-[10px] font-black text-blue bg-sky px-4 py-1.5 rounded-xl uppercase">2026 - 2027</span>
               </div>
               
               <div className="space-y-10 relative before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                  <CalendarItem type="classroom" title="Academic Session Start" date="August 01, 2026" color="blue" />
                  <CalendarItem type="holiday" title="Independence Day Holiday" date="August 15, 2026" color="orange" />
                  <CalendarItem type="classroom" title="Mid-Term Examinations" date="October 10 - 20, 2026" color="blue" />
                  <CalendarItem type="holiday" title="Deepavali Vacation" date="November 01 - 05, 2026" color="orange" />
               </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// --- Helper Components ---

function SidebarLink({ active, icon, label, onClick }) {
  const Icon = require('lucide-react')[icon];
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${active ? 'bg-white/10 text-white shadow-inner' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
    >
      <Icon size={20} /> {label}
    </button>
  );
}

function PortalCard({ color, icon, title, subtitle, detail, onClick }) {
  const Icon = require('lucide-react')[icon];
  const colors = {
    green: "bg-[#D4F1E1] text-[#1D4A3A]",
    pink: "bg-[#FDE2E4] text-[#7B2E35]",
    purple: "bg-[#E6E1F9] text-[#42377A]",
    sky: "bg-[#E1F3F9] text-[#1E485A]"
  };
  const iconColors = {
    green: "bg-[#7BB28D]",
    pink: "bg-[#E76D7B]",
    purple: "bg-[#8072C7]",
    sky: "bg-[#5FB4D1]"
  };

  return (
    <div onClick={onClick} className={`${colors[color]} p-8 rounded-[2.5rem] shadow-sm hover:scale-[1.02] transition-transform cursor-pointer relative overflow-hidden group`}>
       <div className={`h-12 w-12 ${iconColors[color]} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-black/5`}>
          <Icon size={24} strokeWidth={2.5} />
       </div>
       <h4 className="font-bold text-lg mb-1">{title}</h4>
       <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tight">{subtitle}</span>
          <span className="text-[10px] font-black opacity-40 uppercase tracking-widest mt-2">{detail}</span>
       </div>
    </div>
  );
}

function ToolCard({ icon, title, onClick }) {
  const Icon = require('lucide-react')[icon];
  return (
    <div onClick={onClick} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:bg-sky/30 transition-colors">
       <div className="h-16 w-16 bg-[#F3F4F9] text-blue rounded-[2rem] flex items-center justify-center mb-6">
          <Icon size={32} />
       </div>
       <span className="font-black text-xl text-ink tracking-tight">{title}</span>
    </div>
  );
}

function PaymentOption({ icon, title, detail }) {
  const Icon = require('lucide-react')[icon];
  return (
    <div className="p-8 border border-gray-100 rounded-3xl hover:border-blue hover:bg-sky/20 transition-all cursor-pointer group text-center flex flex-col items-center">
       <div className="h-14 w-14 bg-gray-50 text-gray-400 group-hover:bg-blue group-hover:text-white rounded-2xl flex items-center justify-center mb-4 transition-colors">
          <Icon size={24} />
       </div>
       <h4 className="font-bold text-ink mb-1">{title}</h4>
       <p className="text-[10px] text-muted font-medium">{detail}</p>
    </div>
  );
}

function ProfileTag({ label, value, color }) {
  const colors = {
    blue: "bg-blue/10 text-blue border-blue/20",
    orange: "bg-orange/10 text-orange border-orange/20",
    purple: "bg-purple-100 text-purple-600 border-purple-200"
  };
  return (
    <div className={`px-5 py-2 rounded-2xl border ${colors[color]} flex flex-col`}>
       <span className="text-[8px] uppercase font-black tracking-[0.2em] mb-0.5 opacity-60">{label}</span>
       <span className="text-sm font-black">{value}</span>
    </div>
  );
}

function InfoSection({ title, children, full }) {
  return (
    <div className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-sm ${full ? 'md:col-span-2' : ''}`}>
       <h3 className="text-xs font-black text-blue uppercase tracking-widest mb-6 pb-2 border-b border-gray-50">{title}</h3>
       <div className="space-y-4">{children}</div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="flex flex-col">
       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
       <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  );
}

function CourseCard({ initials, title, teacher, color }) {
  const colors = {
    sky: "bg-sky text-blue",
    green: "bg-green-100 text-green-700",
    pink: "bg-pink-100 text-pink-700"
  };
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all cursor-pointer">
       <div className={`h-16 w-16 ${colors[color]} rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-black/5`}>{initials}</div>
       <div className="flex flex-col">
          <h4 className="font-black text-ink text-sm uppercase leading-tight group-hover:text-blue transition-colors">{title}</h4>
          <span className="text-[11px] font-bold text-muted mt-1">{teacher}</span>
       </div>
    </div>
  );
}

function CalendarItem({ type, title, date, color }) {
  const colors = {
    blue: "bg-blue text-white shadow-blue/20",
    orange: "bg-orange text-white shadow-orange/20"
  };
  return (
    <div className="pl-12 relative group">
       <div className={`absolute left-[7px] top-1 h-5 w-5 rounded-full border-4 border-white ${colors[color]} z-10 transition-transform group-hover:scale-125`}></div>
       <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 group-hover:bg-sky/40 transition-colors">
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 block ${color === 'blue' ? 'text-blue' : 'text-orange'}`}>{type}</span>
          <h4 className="font-black text-ink text-base mb-2">{title}</h4>
          <div className={`inline-block px-4 py-1 rounded-lg text-[10px] font-bold ${color === 'blue' ? 'bg-blue/10 text-blue' : 'bg-orange/10 text-orange'}`}>
             {date}
          </div>
       </div>
    </div>
  );
}

function LogOut(props) { return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>; }
function ArrowRight(props) { return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>; }
function Wallet(props) { return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path></svg>; }
