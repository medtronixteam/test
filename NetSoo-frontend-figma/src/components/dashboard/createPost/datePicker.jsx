import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerButton({ scheduleDate, setScheduleDate }) {
  return (
    <DatePicker
      selected={scheduleDate}
      onChange={(date) => setScheduleDate(date)}
      showTimeSelect
      dateFormat="Pp"
      placeholderText="Select date and time"
      className="border border-[#393939] rounded-[8px] p-3 bg-[#1e1e1e] text-white"
    />
  );
}
