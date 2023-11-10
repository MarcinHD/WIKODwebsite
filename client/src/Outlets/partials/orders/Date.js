import { format } from 'date-fns';
import { convertToLocalTime } from 'date-fns-timezone';
import dayjs from 'dayjs';

const disabledDays = (date) => {
    const day = date.day();
    return day === 0 || day === 1  || day === 3 || day === 5  || day === 6;
  };
function nextDate(){
    var day = dayjs().day();
    for(var i=0;i<7;i++){
    if(day===2||day===4){
      return dayjs().add(i,'day');
    } else{
      day=dayjs().add(i+1,'day').day();
    }
  }
  }
  const formatDate = (date) => {
    if (!date) return new Date().toLocaleString();

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateTmp = Date.parse(date.toLocaleString());

    const localDate = convertToLocalTime(dateTmp, {
      timeZone: timezone,
    });
    return format(localDate, 'yyyy-MM-dd');
  };

  export {nextDate, formatDate, disabledDays}