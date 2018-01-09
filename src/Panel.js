import React, { PureComponent } from "react";

export default class Panel extends PureComponent {
  getPrice = (price) => (price / 100).toFixed(2);

  puralize = (name, time) => (time >= 2 ? `${name}s` : name);

  timeConversion = (date) => {
    const posted = new Date(date).getTime();
    const millisec = new Date().getTime() - posted;
    const seconds = (millisec / 1000).toFixed(1);
    const minutes = (millisec / (1000 * 60)).toFixed(1);
    const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
      return `${seconds} seconds`;
    }

    if (minutes < 60) {
      return `${minutes} minutes`;
    }

    if (hours < 24) {
      const minutes = Math.floor((hours % 1).toFixed(4) * 60);

      if (minutes > 0) {
        const floorHours = Math.floor(hours);
        return `${floorHours} ${this.puralize(
          "hour",
          hours
        )} ${minutes} minutes`;
      } else {
        return `${hours} ${this.puralize("hour", hours)}`;
      }
    }

    const hourz = Math.floor((days % 1).toFixed(4) * 24);
    if (hourz > 0) {
      const floorDays = Math.floor(days);
      return `${floorDays} ${this.puralize("day", days)} ${hourz} hours`;
    } else {
      return `${days} ${days >= 2 ? "days" : "day"}`;
    }
  };

  getTimeDisplay = (date) => {
    const secondsInWeek = 604800000;
    const now = new Date().getTime();
    console.log({ date: now - Date.parse(date) });
    if (now - Date.parse(date) > secondsInWeek) {
      const newDate = new Date(date).toLocaleDateString();
      return newDate;
    } else {
      return `${this.timeConversion(date)} ago`;
    }
  };

  render() {
    const { product } = this.props;
    return (
      <div className="ascii__panel">
        <p className="price__p">{`$${this.getPrice(product.price)}`}</p>
        <p style={{ fontSize: product.size }}>{product.face}</p>
        <p className="date__p">{this.getTimeDisplay(product.date)}</p>
      </div>
    );
  }
}
