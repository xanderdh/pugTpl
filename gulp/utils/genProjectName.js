module.exports = (project = 'project') => {
  const parseNumber = number => number < 10 ? '0' + number : number;

  const now = new Date();
  const year = now.getFullYear();
  const month = parseNumber(now.getMonth() + 1);
  const day = parseNumber(now.getDate());
  const hours = parseNumber(now.getHours());
  const minutes = parseNumber(now.getMinutes());
  const dateTime = `${day}${month}${year}_${hours}${minutes}`;  
  
  return `${project}_${dateTime}`;
};
