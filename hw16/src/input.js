const STDIN = {
    number(message, validate, cancel = true) {
        let input;
    
        while (true) {
          input = prompt(message);
    
          if (input === null && !cancel) {
            continue;
          }
          else if (input === null && cancel) {
            return null;
          }
    
          input = Number(input);
    
          if (isNaN(input) || validate(input)) continue;
    
          return input;
        }
    },
    string(message, validate, cancel = true) {
        let input;
    
        while (true) {
          input = prompt(message);
    
          if (input === null && !cancel) {
            continue;
          }
          else if (input === null && cancel) {
            return null;
          }
    
          if (validate(input)) continue;
    
          return input;
        }
      },
};

// функции-валидаторы
const validateString = (str) => {
    return (!isNaN(str) && str != null);
}
const validateNum = (num) => {
    return (isNaN(num) && num != null)
}
const validateMonth = (num) => {
    return ( (isNaN(num) && num != null) || (num < 1 || num > 12) )
}
const validateYear = (num) => {
    return ( (isNaN(num) && num != null) || num > 2022)
}
  
const DATE = {
    isLeapYear(year) {
      let isLeapYear;
      if (new Date(year, 2, 0).getDate() > 28) {
        isLeapYear = true;
      } else {
        isLeapYear = false;
      }
      return isLeapYear;
    },
  
    maxMonthDays(leap, month) {
        let max_monthOfBirth;
        switch (month) {
        case 2:
          if (leap) {
            max_monthOfBirth = 29;
          } else {
            max_monthOfBirth = 28;
          }
          break;
  
        case 4:
          max_monthOfBirth = 30;
          break;
  
        case 6:
          max_monthOfBirth = 30;
          break;
  
        case 9:
          max_monthOfBirth = 30;
          break;
  
        case 11:
          max_monthOfBirth = 30;
          break;
        
        default: 
          max_monthOfBirth = 31;
      }
      return max_monthOfBirth;
    },

    getCurrentDate() {
        const current = new Date();
        return [current.getFullYear(), current.getMonth(), current.getDate()];
    },
    
    getAge(dayOfBirth, monthOfBirth, yearOfBirth, currentDate) {
        const [currentYear, currentMonth, currentDay] = currentDate;
        let age = currentYear - yearOfBirth;
    
        if (monthOfBirth > currentMonth) {
            age--;
        }
        else if (monthOfBirth === currentMonth) {
            dayOfBirth > currentDay ? age-- : age;
        }
        return age;
    }
};