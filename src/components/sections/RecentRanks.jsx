import React, { useState, useEffect } from "react";
import axios from "axios";
import SectionHeader from "../ui/SectionHeader";

const API_URL = 'http://localhost:5000';

const staticRanks = [
  { studentName: "T. Sai Kumar", rank: "AIR 2456", exam: "JEE Advanced", stream: "MPC", hallTicketNumber: "24021001", image: "" },
  { studentName: "M. Sneha", rank: "AIR 892", exam: "NEET", stream: "BiPC", hallTicketNumber: "24031042", image: "" },
  { studentName: "R. Rahul", rank: "State 12th", exam: "EAPCET", stream: "MPC", hallTicketNumber: "24025091", image: "" },
  { studentName: "K. Divya", rank: "AIR 4501", exam: "JEE Main", stream: "MPC", hallTicketNumber: "24021882", image: "" },
];

export default function RecentRanks() {
  const [ranks, setRanks] = useState(staticRanks);

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/ranks`);
        if (res.data && res.data.length > 0) {
          setRanks(res.data);
        }
      } catch (err) {
        console.error("Error fetching ranks:", err);
      }
    };
    fetchRanks();
  }, []);

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-site mx-auto px-5 md:px-7">
        <div className="mb-14">
          <SectionHeader
            label="🏆 Top Rankings"
            title={`Our Achievers at <em>India's Finest</em> Institutions`}
            subtitle="Celebrating our toppers who secured top ranks in prestigious national and state entrance exams."
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {ranks.map((r, i) => (
            <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-blue/5 shadow-sm hover:shadow-xl transition-all duration-500 group h-full flex flex-col">
              {/* Photo Area */}
              <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                {r.image ? (
                  <img 
                    src={r.image.startsWith('http') ? r.image : `${API_URL}/${r.image}`} 
                    alt={r.studentName} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue/5 to-blue/10 text-blue/20">
                    <svg width="40%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                )}
                {/* Rank Badge */}
                <div className="absolute top-3 left-3 bg-blue text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg">
                  {r.rank || r.place || r.achievement || 'TOPPER'}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[0.95rem] text-ink leading-tight mb-1">{r.studentName}</h4>
                  <div className="text-[10px] font-bold text-blue tracking-wider uppercase mb-2">{(r.exam || 'ENTRANCE')} • {(r.stream || 'MPC')}</div>
                </div>
                <div className="pt-3 border-t border-gray-100 mt-auto">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Hall Ticket</div>
                  <div className="text-[11px] font-black text-ink mt-1">{r.hallTicketNumber || '-----'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
