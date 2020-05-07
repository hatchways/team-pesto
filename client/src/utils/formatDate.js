const formatDate = (isoDate) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();

  const formatTime = (hour, min) => {
    const h = !hour ? 12 : hour > 12 ? hour - 12 : hour;
    const m = min;
    const amOrPm = hour < 12 ? 'am' : 'pm';
    return `${h}:${m} ${amOrPm}`;
  }

  return `${day} ${months[month]} ${year} - ${formatTime(hour, min)}`;
};

module.exports = formatDate;
