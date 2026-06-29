import React, { useState, useMemo } from 'react';
import { Passenger } from '../data/titanicDataset';
import { Search, Filter, ArrowRight, Check, X, Compass, HelpCircle } from 'lucide-react';

interface DatasetExplorerProps {
  passengers: Passenger[];
  onSelectPassenger: (passenger: Passenger) => void;
  selectedPassengerId?: number | null;
}

export default function DatasetExplorer({
  passengers,
  onSelectPassenger,
  selectedPassengerId
}: DatasetExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSex, setSelectedSex] = useState<string>('all');
  const [selectedSurvival, setSelectedSurvival] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter passengers based on inputs
  const filteredPassengers = useMemo(() => {
    return passengers.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.ticket && p.ticket.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.cabin && p.cabin.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesClass = selectedClass === 'all' || p.pclass.toString() === selectedClass;
      const matchesSex = selectedSex === 'all' || p.sex === selectedSex;
      const matchesSurvival = selectedSurvival === 'all' ||
        (selectedSurvival === '1' && p.survived) ||
        (selectedSurvival === '0' && !p.survived);

      return matchesSearch && matchesClass && matchesSex && matchesSurvival;
    });
  }, [passengers, searchTerm, selectedClass, selectedSex, selectedSurvival]);

  // Reset pagination on filter change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedClass, selectedSex, selectedSurvival]);

  const paginatedPassengers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPassengers.slice(start, start + itemsPerPage);
  }, [filteredPassengers, currentPage]);

  const totalPages = Math.ceil(filteredPassengers.length / itemsPerPage) || 1;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
          <span className="text-xs text-slate-400 font-medium font-mono uppercase tracking-wider block">Total Sample</span>
          <span className="text-2xl font-semibold font-display text-slate-800">{passengers.length}</span>
          <span className="text-xs text-slate-500 block mt-1">Passengers listed</span>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
          <span className="text-xs text-emerald-600 font-medium font-mono uppercase tracking-wider block">Survivors</span>
          <span className="text-2xl font-semibold font-display text-emerald-800">
            {passengers.filter(p => p.survived).length}
          </span>
          <span className="text-xs text-emerald-600/80 block mt-1">
            ({((passengers.filter(p => p.survived).length / passengers.length) * 100).toFixed(1)}% rate)
          </span>
        </div>
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
          <span className="text-xs text-rose-600 font-medium font-mono uppercase tracking-wider block">Deceased</span>
          <span className="text-2xl font-semibold font-display text-rose-800">
            {passengers.filter(p => !p.survived).length}
          </span>
          <span className="text-xs text-rose-600/80 block mt-1">
            ({((passengers.filter(p => !p.survived).length / passengers.length) * 100).toFixed(1)}% rate)
          </span>
        </div>
        <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl">
          <span className="text-xs text-sky-600 font-medium font-mono uppercase tracking-wider block">Avg. Ticket Fare</span>
          <span className="text-2xl font-semibold font-display text-sky-800">
            £{(passengers.reduce((sum, p) => sum + p.fare, 0) / passengers.length).toFixed(2)}
          </span>
          <span className="text-xs text-sky-600/80 block mt-1">First Class avg: £88+</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by passenger name, ticket, cabin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm placeholder:text-slate-400"
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {/* Class Filter */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Classes</option>
              <option value="1">1st Class (Upper Deck)</option>
              <option value="2">2nd Class (Middle Deck)</option>
              <option value="3">3rd Class (Lower Deck)</option>
            </select>

            {/* Sex Filter */}
            <select
              value={selectedSex}
              onChange={(e) => setSelectedSex(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Survival Filter */}
            <select
              value={selectedSurvival}
              onChange={(e) => setSelectedSurvival(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Statuses</option>
              <option value="1">Survived</option>
              <option value="0">Deceased</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Passenger Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedPassengers.length > 0 ? (
          paginatedPassengers.map((passenger) => {
            const isSelected = selectedPassengerId === passenger.id;
            return (
              <div
                key={passenger.id}
                className={`flex flex-col justify-between p-5 border rounded-2xl transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/20 shadow-xs'
                    : 'border-slate-100 hover:border-slate-200 hover:shadow-xs bg-white'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="font-mono text-[10px] text-slate-400">#P-{passenger.id}</span>
                    <div className="flex gap-1">
                      {/* Class Badge */}
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          passenger.pclass === 1
                            ? 'bg-amber-100 text-amber-800'
                            : passenger.pclass === 2
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {passenger.pclass === 1 ? '1st Class' : passenger.pclass === 2 ? '2nd Class' : '3rd Class'}
                      </span>
                      {/* Survival Status Badge */}
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          passenger.survived
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {passenger.survived ? (
                          <>
                            <Check className="w-2.5 h-2.5" /> Survived
                          </>
                        ) : (
                          <>
                            <X className="w-2.5 h-2.5" /> Deceased
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-display font-medium text-slate-800 line-clamp-1">{passenger.name}</h4>

                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-slate-500 font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Gender</span>
                      <span className="capitalize font-semibold text-slate-700">{passenger.sex}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Age</span>
                      <span className="font-semibold text-slate-700">
                        {passenger.age !== undefined ? `${passenger.age} yrs` : 'Unknown'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Fare</span>
                      <span className="font-semibold text-slate-700">£{passenger.fare.toFixed(2)}</span>
                    </div>
                  </div>

                  {passenger.cabin && (
                    <div className="mt-2.5 pt-2 border-t border-slate-50 flex items-center gap-1.5 text-xs text-slate-400">
                      <Compass className="w-3.5 h-3.5 text-slate-400" />
                      <span>Cabin {passenger.cabin}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
                  <button
                    onClick={() => onSelectPassenger(passenger)}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:gap-1.5 transition-all"
                  >
                    Load into Predictor <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 py-12 text-center bg-white border border-slate-100 rounded-2xl">
            <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h4 className="text-slate-600 font-medium">No passengers matched your search</h4>
            <p className="text-xs text-slate-400 mt-1">Try resetting your filters or typing another name.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white border border-slate-50 p-4 rounded-xl text-xs font-mono">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 transition-colors"
          >
            Previous
          </button>
          <span className="text-slate-500">
            Page {currentPage} of {totalPages} ({filteredPassengers.length} results)
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
