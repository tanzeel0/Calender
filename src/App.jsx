import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus, MoreHorizontal, Users, FileText, Bookmark, User } from 'lucide-react';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoveredSidebarItem, setHoveredSidebarItem] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "New Year",
      date: "2020-01-01",
      time: "All day",
      type: "holiday"
    },
    {
      id: 2,
      title: "Project overview & Analysis",
      date: "2020-01-02",
      time: "1:00 - 1:30 PM",
      type: "work"
    },
    {
      id: 3,
      title: "Lunch with Sabrina",
      date: "2020-01-02",
      time: "3:00 - 4:00 PM",
      type: "personal"
    },
    {
      id: 4,
      title: "Review work place safety",
      date: "2020-01-03",
      time: "10:30 - 11:30 AM",
      type: "work"
    },
    {
      id: 5,
      title: "Team alignment",
      date: "2020-01-03",
      time: "Begins in 62 min",
      type: "meeting"
    },
    {
      id: 6,
      title: "Breakfast with Steven",
      date: "2020-01-04",
      time: "8:00 - 9:00 AM",
      type: "personal"
    },
    {
      id: 7,
      title: "Lunch with Steven",
      date: "2020-01-05",
      time: "2:00 - 3:00 PM",
      type: "personal"
    },
    {
      id: 8,
      title: "Flames vs Wild",
      date: "2020-01-05",
      time: "7:00 PM",
      type: "entertainment"
    },
    {
      id: 9,
      title: "Collaboration session",
      date: "2020-01-06",
      time: "11:00 am - 2:00 PM",
      type: "work"
    },
    {
      id: 10,
      title: "Lunch",
      date: "2020-01-06",
      time: "3:00 - 4:30 PM",
      type: "personal"
    },
    {
      id: 11,
      title: "Cristmas eve",
      date: "2020-01-07",
      time: "All day",
      type: "holiday"
    },
    {
      id: 12,
      title: "Weekly Stand Up",
      date: "2020-01-08",
      time: "1:00 - 1:20 PM",
      type: "meeting"
    },
    {
      id: 13,
      title: "Team alignment",
      date: "2020-01-08",
      time: "11:30 — 12:00 AM",
      type: "meeting"
    },
    {
      id: 14,
      title: "Collaboration session",
      date: "2020-01-09",
      time: "10:15 - 11:30 AM",
      type: "work"
    },
    {
      id: 15,
      title: "Lunch with Sabrina",
      date: "2020-01-09",
      time: "4:00 - 4:45 PM",
      type: "personal"
    },
    {
      id: 16,
      title: "Review work place safety",
      date: "2020-01-10",
      time: "11:00 - 11:30 AM",
      type: "work"
    },
    {
      id: 17,
      title: "Team alignment",
      date: "2020-01-10",
      time: "11:30 — 12:00 AM",
      type: "meeting"
    },
    {
      id: 18,
      title: "Breakfast with Steven",
      date: "2020-01-11",
      time: "8:00 - 9:00 AM",
      type: "personal"
    },
    {
      id: 19,
      title: "Oilers vs Flames",
      date: "2020-01-11",
      time: "10:00 PM",
      type: "entertainment"
    },
    {
      id: 20,
      title: "Lunch with Steven",
      date: "2020-01-12",
      time: "2:00 - 3:00 PM",
      type: "personal"
    }
  ]);
  
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'work'
  });

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

    const days = [];
    
    // Add previous month's days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonth.getDate() - i)
      });
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day)
      });
    }
    
    // Add next month's days to fill the grid
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day)
      });
    }
    
    return days;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event = {
        id: events.length + 1,
        ...newEvent
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', time: '', type: 'work' });
      setShowAddEvent(false);
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'work': return 'bg-blue-100 text-blue-800 border-l-blue-400';
      case 'personal': return 'bg-green-100 text-green-800 border-l-green-400';
      case 'meeting': return 'bg-purple-100 text-purple-800 border-l-purple-400';
      case 'holiday': return 'bg-red-100 text-red-800 border-l-red-400';
      case 'entertainment': return 'bg-blue-100 text-blue-800 border-l-blue-400';
      default: return 'bg-gray-100 text-gray-800 border-l-gray-400';
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            <div 
              className={`flex items-center space-x-3 cursor-pointer transition-all duration-200 p-2 rounded-lg ${
                hoveredSidebarItem === 'calendar' 
                  ? 'text-blue-500 bg-blue-50 transform scale-105' 
                  : 'text-gray-600 hover:text-blue-400 hover:bg-blue-25'
              }`}
              onMouseEnter={() => setHoveredSidebarItem('calendar')}
              onMouseLeave={() => setHoveredSidebarItem(null)}
            >
              <Calendar className={`w-4 h-4 transition-colors duration-200 ${hoveredSidebarItem === 'calendar' ? 'text-blue-500' : 'text-blue-500'}`} />
              <span className="text-sm font-medium">Calendar</span>
            </div>
            <div 
              className={`flex items-center space-x-3 cursor-pointer transition-all duration-200 p-2 rounded-lg ${
                hoveredSidebarItem === 'tasks' 
                  ? 'text-blue-500 bg-blue-50 transform scale-105' 
                  : 'text-gray-600 hover:text-blue-400 hover:bg-blue-25'
              }`}
              onMouseEnter={() => setHoveredSidebarItem('tasks')}
              onMouseLeave={() => setHoveredSidebarItem(null)}
            >
              <Bookmark className={`w-4 h-4 transition-colors duration-200 ${hoveredSidebarItem === 'tasks' ? 'text-blue-500' : ''}`} />
              <span className="text-sm font-medium">Tasks</span>
            </div>
            <div 
              className={`flex items-center space-x-3 cursor-pointer transition-all duration-200 p-2 rounded-lg ${
                hoveredSidebarItem === 'notes' 
                  ? 'text-blue-500 bg-blue-50 transform scale-105' 
                  : 'text-gray-600 hover:text-blue-400 hover:bg-blue-25'
              }`}
              onMouseEnter={() => setHoveredSidebarItem('notes')}
              onMouseLeave={() => setHoveredSidebarItem(null)}
            >
              <FileText className={`w-4 h-4 transition-colors duration-200 ${hoveredSidebarItem === 'notes' ? 'text-blue-500' : ''}`} />
              <span className="text-sm font-medium">Notes</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-200 cursor-pointer transform hover:scale-110">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]}' {currentDate.getFullYear()}
            </h1>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600 hover:text-blue-600 transition-colors duration-200" />
              </button>
              <button 
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <ChevronRight className="w-4 h-4 text-gray-600 hover:text-blue-600 transition-colors duration-200" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
            <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
            <button 
              onClick={() => setShowAddEvent(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Add event
            </button>
          </div>
        </div>

        {/* Calendar Description */}
        <div className="px-6 py-3 bg-white border-b border-gray-100">
          <p className="text-sm text-gray-600">
            Here all your planned events. You will find information for each event as well you can planned new one.
          </p>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Week headers */}
            <div className="grid grid-cols-7 gap-4 mb-4 flex-shrink-0">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 pb-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days - scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-7 gap-4" style={{ gridTemplateRows: 'repeat(6, minmax(120px, auto))' }}>
                {days.map((dayInfo, index) => {
                  const dayEvents = getEventsForDate(dayInfo.date);
                  const isToday = dayInfo.isCurrentMonth && 
                    dayInfo.date.toDateString() === new Date().toDateString();
                  const isSelected = selectedDate && selectedDate.toDateString() === dayInfo.date.toDateString();
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex flex-col min-h-[120px] border-t-2 pt-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-400 hover:bg-blue-25 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedDate(dayInfo.date)}
                    >
                      <div className={`text-lg font-semibold mb-2 flex-shrink-0 transition-all duration-300 ${
                        dayInfo.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                      } ${isToday ? 'text-blue-500 transform scale-110' : ''} ${
                        isSelected ? 'text-blue-600 transform scale-110' : ''
                      }`}>
                        {String(dayInfo.day).padStart(2, '0')}
                      </div>
                      
                      <div className="space-y-1 flex-1 overflow-y-auto">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-2 rounded border-l-2 transition-all duration-200 hover:shadow-sm hover:transform hover:scale-105 ${getEventColor(event.type)} flex-shrink-0`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-xs opacity-75 truncate">{event.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
            <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="text"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="e.g., 2:00 - 3:00 PM"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="meeting">Meeting</option>
                  <option value="holiday">Holiday</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddEvent(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;