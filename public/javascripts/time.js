const createdTimeToFormatted = time => {
  let now = new Date();
  let createdTime = new Date(time);
  let year = createdTime.getFullYear().toString();
  let month = (createdTime.getMonth() + 1).toString().padStart(2, '0');
  let date = createdTime.getDate().toString().padStart(2, '0');
  let toNow = now.getTime();
  let toCreated = createdTime.getTime();
  let passedTime = toNow - toCreated;
  let passedMin = Math.round(passedTime / (1000 * 60));
  let passedHour = Math.round(passedTime / (1000 * 60 * 60));
  let passedDay = Math.round(passedTime / (1000 * 60 * 60 * 24));
  if (passedDay > 0) {
    return `${year}.${month}.${date}`;
  } else if (passedHour > 0) {
    return `${passedHour}hours ago`;
  } else if (passedMin > 0) {
    return `${passedMin}minutes ago`;
  } else {
    return 'just now';
  }
}

exports.createdTimeToFormatted = createdTimeToFormatted