import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function StudentRegister() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    student_name: "",
    father_name: "",
    mother_name: "",
    branch: "NULL",
    inter_type: "Bi.P.C",
    dob: "",
    gender: "Male",
    admission_type: "Residential",
    course_applied: "Ag. B.Sc.",
    medium: "English Medium",
    nationality: "Indian",
    religion: "Hindu",
    door_no: "",
    village: "",
    mandal: "",
    pin: "",
    district: "",
    mobile1: "",
    mobile2: "",
    residence_phone: "",
    email_personal: "",
    reference: "Self",
    current_year: "1st year",
    academic_enrolled_year: "2024-2025"
  });

  const [quals, setQuals] = useState([
    { course: "S.S.C", examination: "", percentage: "", university: "", passing_year: "", total_marks: "", max_marks: "" },
    { course: "Inter / Diploma", examination: "", percentage: "", university: "", passing_year: "", total_marks: "", max_marks: "" }
  ]);

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQualChange = (index, field, value) => {
    const newQuals = [...quals];
    newQuals[index][field] = value;
    setQuals(newQuals);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const [showPayment, setShowPayment] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    Object.keys(formData).forEach(key => payload.append(key, formData[key]));
    payload.append('qualifications', JSON.stringify(quals));
    if (photo) payload.append('photo', photo);

    try {
      await axios.post(`${API_URL}/students/register`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowPayment(true);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-[#f8fafc] py-12 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 animate-fadeIn">
          <div className="bg-blue p-10 text-white text-center">
             <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-xl border border-white/30">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
             <h2 className="text-3xl font-lora font-bold">Registration Successful!</h2>
             <p className="text-sky/80 font-medium mt-2">SRI SAI AGRICULTURAL COLLEGE</p>
          </div>

          <div className="p-10 space-y-8">
             <div className="bg-orange/5 border-2 border-dashed border-orange/20 p-6 rounded-3xl text-center">
                <h3 className="text-orange font-black text-xs uppercase tracking-[0.2em] mb-2">Application Registration Fee</h3>
                <p className="text-2xl font-black text-ink">₹ 2,000.00</p>
                <p className="text-[10px] font-bold text-muted mt-2 uppercase tracking-tighter">* Secure your seat by completing the registration payment</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-center md:text-left">
                   <h4 className="font-black text-ink text-sm uppercase tracking-widest">Scan to Pay</h4>
                   <div className="aspect-square bg-gray-50 border-2 border-gray-100 rounded-3xl flex items-center justify-center p-4">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=srisaiagri@upi&pn=SriSaiAgri&am=2000&cu=INR" alt="QR Code" className="w-full h-full" />
                   </div>
                   <p className="text-[10px] font-black text-muted uppercase">UPI ID: srisaiagri@upi</p>
                </div>
                <div className="space-y-6">
                   <h4 className="font-black text-ink text-sm uppercase tracking-widest">Bank Details</h4>
                   <div className="space-y-4">
                      <BankDetail label="Account Name" value="Sri Sai Agri Institute" />
                      <BankDetail label="Account Number" value="92301004568XXXX" />
                      <BankDetail label="IFSC Code" value="UTIB000XXXX" />
                      <BankDetail label="Bank Name" value="AXIS BANK" />
                   </div>
                </div>
             </div>

             <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
                <button 
                  onClick={() => navigate("/portal/login")}
                  className="w-full bg-blue text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue/20 hover:scale-[1.02] transition-all"
                >
                   Go to Login Portal
                </button>
                <p className="text-center text-[11px] font-bold text-muted">Please keep a screenshot of your payment for verification</p>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-blue p-8 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <h1 className="font-lora text-3xl font-bold mb-2">Student Admission Form</h1>
          <p className="text-sky/80 text-sm font-medium tracking-wide">SRI SAI AGRICULTURAL COLLEGE</p>
          
          {/* Progress Bar */}
          <div className="mt-8 flex justify-center items-center gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= i ? 'bg-orange text-white' : 'bg-white/20 text-white/60'}`}>
                  {i}
                </div>
                {i < 4 && <div className={`h-[2px] w-12 mx-2 ${step > i ? 'bg-orange' : 'bg-white/20'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12">
          
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <span className="h-6 w-1 bg-orange rounded-full"></span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Select Course</label>
                  <select 
                    name="course_applied" 
                    value={formData.course_applied} 
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        course_applied: val,
                        branch: val === 'Ag. B.Sc.' ? 'NULL' : ''
                      }));
                    }} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all"
                  >
                    <option value="Ag. B.Sc.">Ag. B.Sc. (Bachelor of Science)</option>
                    <option value="Ag. M.Sc.">Ag. M.Sc. (Master of Science)</option>
                  </select>
                </div>

                {formData.course_applied === 'Ag. M.Sc.' && (
                  <div className="space-y-2 animate-fadeIn">
                    <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Specialization (Branch)</label>
                    <select 
                      name="branch" 
                      value={formData.branch} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-blue/30 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all bg-blue/5"
                    >
                      <option value="">Select Sub-Branch</option>
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
                     <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Branch</label>
                     <input 
                       readOnly 
                       value="NULL" 
                       className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 outline-none cursor-not-allowed font-medium" 
                     />
                   </div>
                )}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Year</label>
                  <div className="w-full px-4 py-3 rounded-xl border border-[#1a6b3c]/30 bg-[#1a6b3c]/5 flex items-center justify-between">
                    <span className="font-black text-[#1a6b3c] text-sm">1st Year</span>
                    <span className="text-[10px] font-black text-[#1a6b3c]/70 uppercase tracking-widest bg-[#1a6b3c]/10 px-3 py-1 rounded-full">New Admission</span>
                  </div>
                  <input type="hidden" name="current_year" value="1st year" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Academic Enrolled Year</label>
                  <input 
                    name="academic_enrolled_year" 
                    value={formData.academic_enrolled_year} 
                    onChange={handleChange} 
                    placeholder="e.g. 2024-2025"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Student Full Name</label>
                  <input required name="student_name" value={formData.student_name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Father / Guardian Name</label>
                  <input required name="father_name" value={formData.father_name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Mother Name</label>
                  <input required name="mother_name" value={formData.mother_name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Date of Birth</label>
                  <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Nationality</label>
                  <input name="nationality" value={formData.nationality} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Religion</label>
                  <input name="religion" value={formData.religion} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education Qualifications */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <span className="h-6 w-1 bg-orange rounded-full"></span>
                Educational Qualifications
              </h2>
              
              <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest">Course</th>
                      <th className="px-4 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest">Examination</th>
                      <th className="px-4 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest">%</th>
                      <th className="px-4 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest">Board/Univ</th>
                      <th className="px-4 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest">Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quals.map((q, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-4 font-bold text-blue">{q.course}</td>
                        <td className="px-4 py-4"><input value={q.examination} onChange={(e) => handleQualChange(idx, 'examination', e.target.value)} className="w-full px-2 py-1 bg-gray-50 rounded border-none focus:ring-2 focus:ring-blue/20 outline-none" /></td>
                        <td className="px-4 py-4"><input value={q.percentage} onChange={(e) => handleQualChange(idx, 'percentage', e.target.value)} className="w-full px-2 py-1 bg-gray-50 rounded border-none focus:ring-2 focus:ring-blue/20 outline-none" /></td>
                        <td className="px-4 py-4"><input value={q.university} onChange={(e) => handleQualChange(idx, 'university', e.target.value)} className="w-full px-2 py-1 bg-gray-50 rounded border-none focus:ring-2 focus:ring-blue/20 outline-none" /></td>
                        <td className="px-4 py-4"><input value={q.passing_year} onChange={(e) => handleQualChange(idx, 'passing_year', e.target.value)} className="w-full px-2 py-1 bg-gray-50 rounded border-none focus:ring-2 focus:ring-blue/20 outline-none" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Inter Type</label>
                  <select name="inter_type" value={formData.inter_type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all">
                    <option>MPC</option>
                    <option>Bi.P.C</option>
                    <option>Ag Diploma</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Admission Type</label>
                  <select name="admission_type" value={formData.admission_type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all">
                    <option>Residential</option>
                    <option>Day Scholar</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Course Applied</label>
                  <select name="course_applied" value={formData.course_applied} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all">
                    <option>Ag. B.Sc.</option>
                    <option>Ag. M.Sc.</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Medium</label>
                  <input name="medium" value={formData.medium} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue focus:ring-4 focus:ring-blue/5 outline-none transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Address & Credentials */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                <div className="lg:col-span-3 space-y-10">
                  <div>
                    <h2 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                      <span className="h-6 w-1 bg-orange rounded-full"></span>
                      Communication Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="Door No / Street" name="door_no" value={formData.door_no} onChange={handleChange} className="col-span-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue outline-none transition-all" />
                      <input placeholder="Village / Town" name="village" value={formData.village} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue outline-none transition-all" />
                      <input placeholder="Mandal" name="mandal" value={formData.mandal} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue outline-none transition-all" />
                      <input placeholder="District" name="district" value={formData.district} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue outline-none transition-all" />
                      <input placeholder="PIN Code" name="pin" value={formData.pin} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue outline-none transition-all" />
                      <input required placeholder="Mobile 1" name="mobile1" value={formData.mobile1} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue outline-none transition-all" />
                      <input placeholder="Mobile 2" name="mobile2" value={formData.mobile2} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue outline-none transition-all" />
                      <input placeholder="Personal Email" name="email_personal" value={formData.email_personal} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue outline-none transition-all" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Step 4: Undertakings */}
          {step === 4 && (
            <div className="animate-fadeIn space-y-8">
               <div>
                  <h2 className="text-xl font-bold text-ink mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <span className="h-6 w-1 bg-orange rounded-full"></span>
                    Undertaking By This Student
                  </h2>
                  <div className="bg-sky/20 border border-blue/10 p-6 rounded-2xl text-[13px] text-blue/80 leading-relaxed font-medium">
                     "I will follow the discipline of the institution strictly adopt anti-ragging policy. In the event my behaviour, I will not question the action what soever taken by the authorities of the institution. As a part of discipline including expulsion. I am informed by the management that Electronic Items like Cell Phones, F.M. Radios and Video Games etc. should not be brought into the campus."
                  </div>
               </div>

               <div>
                  <h2 className="text-xl font-bold text-ink mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <span className="h-6 w-1 bg-orange rounded-full"></span>
                    Undertaking By the Parents
                  </h2>
                  <div className="bg-gray-50 border border-gray-100 p-8 rounded-[2.5rem] space-y-4">
                     {[
                       "I know that the fee paid towards Admission Fee is not refundable in any case. Cancellation of Admission or Settlement of account is as per conditions maintain by the management. If my ward / visitor misbehave or create any disturbance in the campus, The ward concerned will be transferred to the day scholar campus or else will be terminated. The institution will not bare any kind of responsibility for my ward's behaviour outside of the campus. If my ward leaves the campus without attaining permission from the administrative authorities of the campus concerned, the actions on the part of the student may result in the transfer from the residential campus to the day scholar campus or else terminated from the institution.",
                       "Fee paid towards admission fee is not refundable as per the norms and conditions of the management.",
                       "If want to shift my ward to other institution before completion of 4 years course, I shall pay back of the concession given at the time of admission.",
                       "Fee concession if offered will be valued for that academic year only.",
                       "Permission will be granted given to any ward if he / she wishes to go out from the campus in case of emergency with prior permission of the parents.",
                       "5000 SHOULD BE PAID FOR SECURITY DEPOSIT AND IT WILL BE REFUNDED AFTER THE COLLEGE COMPLETION."
                     ].map((text, i) => (
                       <div key={i} className="flex gap-4">
                          <span className="h-6 w-6 bg-blue text-white rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">{i + 1}</span>
                          <p className="text-[13px] text-ink/70 font-medium leading-relaxed">{text}</p>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="p-8 bg-orange/10 border-2 border-dashed border-orange/20 rounded-[2.5rem] space-y-4">
                <div className="flex gap-6 items-center">
                  <div className="h-16 w-16 bg-orange text-white rounded-3xl flex items-center justify-center shrink-0 shadow-xl shadow-orange/20">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-orange text-sm uppercase tracking-widest">Seat Booking & Registration</h4>
                    <p className="text-sm font-bold text-ink leading-relaxed uppercase">NOTE: TO REGISTER AND BOOK SEAT YOU HAVE TO PAY 2000 APPLICATION REGISTRATION.</p>
                  </div>
                </div>
              </div>
              
              <label className="flex items-center gap-4 cursor-pointer group p-4 hover:bg-sky/30 rounded-2xl transition-all">
                 <input required type="checkbox" className="w-6 h-6 rounded-lg border-2 border-blue text-blue focus:ring-0 cursor-pointer" />
                 <span className="text-sm font-bold text-ink group-hover:text-blue transition-colors uppercase tracking-tight">I hereby declare that I have read and agree to all the above undertakings and conditions.</span>
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="px-8 py-3 rounded-xl font-bold text-blue hover:bg-sky transition-all">Back</button>
            ) : (
              <div />
            )}
            
            {step < 4 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="bg-blue text-white px-10 py-3 rounded-xl font-bold shadow-xl shadow-blue/20 hover:scale-105 transition-all">Next Step</button>
            ) : (
              <button disabled={loading} type="submit" className="bg-orange text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-orange/20 hover:scale-105 transition-all disabled:opacity-50">
                {loading ? "Processing..." : "Register to Pay"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function BankDetail({ label, value }) {
  return (
    <div className="flex flex-col border-b border-gray-50 pb-2">
       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
       <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  );
}
