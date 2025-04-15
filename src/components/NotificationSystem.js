import React, { useEffect, useState } from "react";
import "../styles/Notification.css";

const distractionMessages = [
  "🔔 You might be missing something important.",
  "🧠 New system alert – review if necessary.",
  "📲 Stay focused… or are you?",
  "⚠️ There may be something useful in here.",
  "📢 You received a new notification.",
  "🕵️ Someone is watching your progress closely.",
  "⏳ Don't ignore this alert. Or do.",
  "🧩 A pattern may be forming. Or maybe not.",
];

function NotificationSystem() {
  const [visibleNotification, setVisibleNotification] = useState(null);

  useEffect(() => {
    const checkAndStart = () => {
      const group = localStorage.getItem("group");
      const start = localStorage.getItem("experimentStart");

      if (!group || !start) {
        console.log("⏳ Waiting for group/experimentStart...");
        setTimeout(checkAndStart, 1000); // Retry every 1s
        return;
      }

      console.log("✅ Notification system started for group:", group);

      const groupIntervals = {
        A: 10,
        B: 10,
        C: 10,
      };

      const intervalSeconds = groupIntervals[group] || 60;
      let counter = 1;

      setInterval(() => {
        const message =
          distractionMessages[Math.floor(Math.random() * distractionMessages.length)];
        const now = new Date();

        const newNotification = {
          id: `${now.getTime()}_${counter}`,
          timestamp: now.toLocaleTimeString(),
          content: message,
          type: "distraction",
          wasClicked: false,
        };

        setVisibleNotification(newNotification);
        logNotification(newNotification);
        console.log("🔁 Notification triggered:", message);
        counter++;
      }, intervalSeconds * 1000);
    };

    checkAndStart();
  }, []);

  const handleNotificationClick = () => {
    if (visibleNotification) {
      const updated = {
        ...visibleNotification,
        wasClicked: true,
        clickTime: new Date().toLocaleTimeString(),
      };
      setVisibleNotification({
        ...updated,
        content: visibleNotification.content + " (expanded)",
      });
      logNotification(updated);
    }
  };

  const logNotification = (data) => {
    const prev = JSON.parse(localStorage.getItem("notificationLog") || "[]");
    localStorage.setItem("notificationLog", JSON.stringify([...prev, data]));
  };

  return visibleNotification ? (
    <div className="notification-toast" onClick={handleNotificationClick}>
      <strong>🔔 Notification</strong>
      <p>{visibleNotification.content}</p>
    </div>
  ) : null;
}

export default NotificationSystem;
