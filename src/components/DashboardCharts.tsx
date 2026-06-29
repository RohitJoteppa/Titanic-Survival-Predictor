import React, { useMemo } from 'react';
import { Passenger } from '../data/titanicDataset';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardChartsProps {
  passengers: Passenger[];
}

export default function DashboardCharts({ passengers }: DashboardChartsProps) {
  // 1. Compute Gender Stats
  const genderData = useMemo(() => {
    const stats = {
      female: { survived: 0, deceased: 0 },
      male: { survived: 0, deceased: 0 }
    };
    
    passengers.forEach(p => {
      if (p.survived) {
        stats[p.sex].survived++;
      } else {
        stats[p.sex].deceased++;
      }
    });

    return [
      {
        name: 'Female',
        Survived: stats.female.survived,
        Deceased: stats.female.deceased,
        Rate: `${((stats.female.survived / (stats.female.survived + stats.female.deceased || 1)) * 100).toFixed(1)}%`
      },
      {
        name: 'Male',
        Survived: stats.male.survived,
        Deceased: stats.male.deceased,
        Rate: `${((stats.male.survived / (stats.male.survived + stats.male.deceased || 1)) * 100).toFixed(1)}%`
      }
    ];
  }, [passengers]);

  // 2. Compute Class Stats
  const classData = useMemo(() => {
    const stats: Record<number, { survived: 0; deceased: 0 }> = {
      1: { survived: 0, deceased: 0 },
      2: { survived: 0, deceased: 0 },
      3: { survived: 0, deceased: 0 }
    };

    passengers.forEach(p => {
      if (stats[p.pclass]) {
        if (p.survived) {
          stats[p.pclass].survived++;
        } else {
          stats[p.pclass].deceased++;
        }
      }
    });

    return Object.keys(stats).map(pclass => {
      const clsNum = parseInt(pclass);
      const s = stats[clsNum];
      const total = s.survived + s.deceased || 1;
      return {
        name: clsNum === 1 ? '1st Class' : clsNum === 2 ? '2nd Class' : '3rd Class',
        Survived: s.survived,
        Deceased: s.deceased,
        Rate: `${((s.survived / total) * 100).toFixed(1)}%`
      };
    });
  }, [passengers]);

  // 3. Compute Age Band Stats
  const ageData = useMemo(() => {
    const bands = [
      { name: 'Children (0-12)', survived: 0, deceased: 0 },
      { name: 'Teens (13-19)', survived: 0, deceased: 0 },
      { name: 'Young Adults (20-35)', survived: 0, deceased: 0 },
      { name: 'Adults (36-55)', survived: 0, deceased: 0 },
      { name: 'Seniors (56+)', survived: 0, deceased: 0 }
    ];

    passengers.forEach(p => {
      const age = p.age !== undefined ? p.age : 28; // fallback to median
      let bandIndex = 2; // Default Young Adults
      
      if (age <= 12) bandIndex = 0;
      else if (age <= 19) bandIndex = 1;
      else if (age <= 35) bandIndex = 2;
      else if (age <= 55) bandIndex = 3;
      else bandIndex = 4;

      if (p.survived) {
        bands[bandIndex].survived++;
      } else {
        bands[bandIndex].deceased++;
      }
    });

    return bands.map(b => ({
      name: b.name,
      Survived: b.survived,
      Deceased: b.deceased,
      Total: b.survived + b.deceased,
      Rate: `${((b.survived / (b.survived + b.deceased || 1)) * 100).toFixed(0)}%`
    }));
  }, [passengers]);

  // 4. Compute Fare Range Stats
  const fareData = useMemo(() => {
    const ranges = [
      { name: 'Economy (<£10)', survived: 0, deceased: 0 },
      { name: 'Standard (£10-£30)', survived: 0, deceased: 0 },
      { name: 'Premium (£30-£100)', survived: 0, deceased: 0 },
      { name: 'First Class (£100+)', survived: 0, deceased: 0 }
    ];

    passengers.forEach(p => {
      const fare = p.fare;
      let rangeIndex = 0;
      
      if (fare < 10) rangeIndex = 0;
      else if (fare <= 30) rangeIndex = 1;
      else if (fare <= 100) rangeIndex = 2;
      else rangeIndex = 3;

      if (p.survived) {
        ranges[rangeIndex].survived++;
      } else {
        ranges[rangeIndex].deceased++;
      }
    });

    return ranges.map(r => ({
      name: r.name,
      Survived: r.survived,
      Deceased: r.deceased,
      Rate: `${((r.survived / (r.survived + r.deceased || 1)) * 100).toFixed(0)}%`
    }));
  }, [passengers]);

  // Pie chart overall summary
  const pieData = useMemo(() => {
    const sCount = passengers.filter(p => p.survived).length;
    const dCount = passengers.length - sCount;
    return [
      { name: 'Deceased', value: dCount, color: '#f43f5e' },
      { name: 'Survived', value: sCount, color: '#10b981' }
    ];
  }, [passengers]);

  return (
    <div className="space-y-8 fade-in">
      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gender Analysis Chart */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
          <div className="mb-4">
            <h4 className="font-display font-semibold text-slate-800 text-base">Survival Rate by Gender</h4>
            <p className="text-xs text-slate-400">Comparing survival and death tolls between genders (reveals 'Women and Children First' impact).</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genderData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  labelStyle={{ fontWeight: '600', color: '#1e293b' }}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Survived" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} name="Survived" />
                <Bar dataKey="Deceased" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Deceased" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-50 text-center font-mono">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Female Survival Rate</span>
              <span className="text-lg font-bold text-emerald-600">{genderData[0]?.Rate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Male Survival Rate</span>
              <span className="text-lg font-bold text-rose-600">{genderData[1]?.Rate}</span>
            </div>
          </div>
        </div>

        {/* Ticket Class Analysis Chart */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
          <div className="mb-4">
            <h4 className="font-display font-semibold text-slate-800 text-base">Survival Rate by Passenger Class</h4>
            <p className="text-xs text-slate-400">Class priority showing high death counts in third class cabins.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  labelStyle={{ fontWeight: '600', color: '#1e293b' }}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Survived" stackId="b" fill="#10b981" />
                <Bar dataKey="Deceased" stackId="b" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-50 text-center font-mono text-[11px]">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">1st Class Rate</span>
              <span className="font-bold text-emerald-600">{classData[0]?.Rate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">2nd Class Rate</span>
              <span className="font-bold text-slate-600">{classData[1]?.Rate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">3rd Class Rate</span>
              <span className="font-bold text-rose-600">{classData[2]?.Rate}</span>
            </div>
          </div>
        </div>

        {/* Age Bands Analysis Chart */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
          <div className="mb-4">
            <h4 className="font-display font-semibold text-slate-800 text-base">Survival vs. Fatality across Age Bands</h4>
            <p className="text-xs text-slate-400">Visualizing the survivability based on demographic age groups.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ageData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorSurv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  labelStyle={{ fontWeight: '600', color: '#1e293b' }}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="Survived" stroke="#10b981" fillOpacity={1} fill="url(#colorSurv)" strokeWidth={2} />
                <Area type="monotone" dataKey="Deceased" stroke="#f43f5e" fillOpacity={1} fill="url(#colorDec)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fare Ranges Chart */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
          <div className="mb-4">
            <h4 className="font-display font-semibold text-slate-800 text-base">Survival Rate by Ticket Price (Fare)</h4>
            <p className="text-xs text-slate-400">Wealth correlation of ticket fares against lifeboat inclusion.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fareData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  labelStyle={{ fontWeight: '600', color: '#1e293b' }}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Survived" fill="#10b981" radius={[4, 4, 0, 0]} name="Survived" />
                <Bar dataKey="Deceased" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Deceased" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
