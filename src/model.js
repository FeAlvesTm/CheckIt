class Model {
  constructor() {
    this.index = 1;
  }

  getDate() {
    let today = new Date();
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
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }

  getTaskInfo() {
    const taskInfo = { date: this.getDate(), index: this.index };
    this.index++;
    return taskInfo;
  }
}

export default new Model();
