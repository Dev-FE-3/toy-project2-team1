import { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    title: "",
  });

  const onPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const onNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const weeks = [];

    let week = [];
    for (let i = 0; i < firstDay; i++) {
      week.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}. ${String(currentMonth + 1).padStart(
        2,
        "0"
      )}. ${String(day).padStart(2, "0")}`;
      week.push(
        <td key={day} onClick={() => handleDateClick(day)}>
          {day}
          {events[dateKey] && (
            <div className="event">
              {events[dateKey].startTime} - {events[dateKey].endTime}
            </div>
          )}
        </td>
      );
      if (week.length === 7) {
        weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
        week = [];
      }
    }

    if (week.length > 0) {
      weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
    }

    return weeks;
  };

  const handleDateClick = (day) => {
    setShowModal(true);
    setSelectedEvent((prev) => ({
      ...prev,
      startDate: `${currentYear}. ${String(currentMonth + 1).padStart(
        2,
        "0"
      )}. ${String(day).padStart(2, "0")}`,
      endDate: `${currentYear}. ${String(currentMonth + 1).padStart(
        2,
        "0"
      )}. ${String(day).padStart(2, "0")}`,
    }));
  };

  const handleSaveEvent = () => {
    if (
      selectedEvent.startDate &&
      selectedEvent.endDate &&
      selectedEvent.startTime &&
      selectedEvent.endTime
    ) {
      const dateKey = selectedEvent.startDate; // 날짜 키 설정
      setEvents((prev) => ({
        ...prev,
        [dateKey]: {
          ...selectedEvent,
        },
      }));
      setShowModal(false);
      setSelectedEvent({
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        title: "",
      });
    }
  };

  return (
    <div>
      <h2>{`${currentYear}년 ${currentMonth + 1}월`}</h2>
      <button onClick={onPrevMonth}>이전</button>
      <button onClick={onNextMonth}>다음</button>
      <table>
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>일정 등록</h3>
            <div>
              <label>시작:</label>
              <input type="text" value={selectedEvent.startDate} readOnly />
              <input
                type="time"
                value={selectedEvent.startTime}
                onChange={(e) =>
                  setSelectedEvent((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label>종료:</label>
              <input type="text" value={selectedEvent.endDate} readOnly />
              <input
                type="time"
                value={selectedEvent.endTime}
                onChange={(e) =>
                  setSelectedEvent((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleSaveEvent}>저장</button>
              <button onClick={() => setShowModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
