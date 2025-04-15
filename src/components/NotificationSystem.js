import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
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

const expandMessages = [
  "Still here? Maybe this one didn’t help. Try focusing on the next pattern.",
  "Hmm... was that worth checking? Stay sharp.",
  "Nothing helpful here. Or was there? Keep your head in the game.",
  "You've got this — distractions can wait.",
  "A little curiosity never hurt… but don’t fall behind 😉",
];

const hintMessages = {
  3: "🔍 Hint: This pattern is symmetrical.",
  7: "🧠 Hint: Focus on the corners first.",
  11: "👁️ Hint: It forms a diagonal line.",
};

function NotificationSystem() {
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const timersRef = useRef({});
  const originalContentRef = useRef({});
  const location = useLocation();

  const startAutoDismissTimer = (id, duration = 7000) => {
    if (timersRef.current[id]) clearTimeout(timersRef.current[id]);

    timersRef.current[id] = setTimeout(() => {
      setVisibleNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  };

  useEffect(() => {
    const group = localStorage.getItem("group");
    const start = localStorage.getItem("experimentStart");

    if (!group || !start) return;

    const groupIntervals = { A: 30, B: 25, C: 20 };
    const intervalSeconds = groupIntervals[group] || 60;
    let counter = 1;

    const generateNotification = () => {
      if (
        location.pathname === "/summary" ||
        location.pathname === "/task1-instructions" ||
        location.pathname === "/task2-instructions"
      )
        return;

      const message = distractionMessages[Math.floor(Math.random() * distractionMessages.length)];
      const now = new Date();

      const newNotification = {
        id: `distraction_${now.getTime()}_${counter}`,
        timestamp: now.toLocaleTimeString(),
        content: message,
        type: "distraction",
        wasClicked: false,
      };

      originalContentRef.current[newNotification.id] = message;
      setVisibleNotifications((prev) => [
        ...prev.filter((n) => n.type !== "distraction"),
        newNotification,
      ]);
      logNotification(newNotification);
      startAutoDismissTimer(newNotification.id);

      counter++;
    };

    const interval = setInterval(generateNotification, intervalSeconds * 1000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  useEffect(() => {
    const handleHintTrigger = (e) => {
      const level = e.detail;
      const hintText = hintMessages[level];
      if (!hintText) return;

      const now = new Date();
      const hintNotification = {
        id: `hint_${level}_${now.getTime()}`,
        timestamp: now.toLocaleTimeString(),
        content: hintText,
        type: "hint",
        wasClicked: false,
      };

      originalContentRef.current[hintNotification.id] = hintText;
      setVisibleNotifications((prev) => [
        ...prev.filter((n) => n.type !== "hint"),
        hintNotification,
      ]);
      logNotification(hintNotification);
      startAutoDismissTimer(hintNotification.id);
    };

    window.addEventListener("triggerHint", handleHintTrigger);
    return () => window.removeEventListener("triggerHint", handleHintTrigger);
  }, []);

  const handleNotificationClick = (notification) => {
    const isExpanded = notification.id === notification.wasExpandedId;

    const updated = {
      ...notification,
      wasClicked: true,
      clickTime: new Date().toLocaleTimeString(),
    };

    const expandedMessage = `${originalContentRef.current[notification.id]}

---

${expandMessages[Math.floor(Math.random() * expandMessages.length)]}`;

    setVisibleNotifications((prev) =>
      prev.map((n) => {
        if (n.id !== notification.id) return n;
        return {
          ...updated,
          content: isExpanded ? originalContentRef.current[n.id] : expandedMessage,
          wasExpandedId: isExpanded ? null : n.id,
        };
      })
    );

    logNotification(updated);
    startAutoDismissTimer(notification.id);
  };

  const logNotification = (data) => {
    const prev = JSON.parse(localStorage.getItem("notificationLog") || "[]");
    localStorage.setItem("notificationLog", JSON.stringify([...prev, data]));
  };

  const renderNotification = (notification, index) => (
    <div
      key={notification.id}
      className={`notification-toast ${notification.type === "hint" ? "hint" : ""}`}
      onClick={() => handleNotificationClick(notification)}
      style={{
        top: `${90 + index * 120}px`,
        left: "85px",
      }}
    >
      <strong>{notification.type === "hint" ? "💡 Hint" : "🔔 Notification"}</strong>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: "8px" }}>
        {notification.content}
      </pre>
    </div>
  );

  return ReactDOM.createPortal(
    visibleNotifications.length > 0 &&
      location.pathname !== "/summary" && (
        <div className="notification-wrapper">
          {visibleNotifications.map(renderNotification)}
        </div>
      ),
    document.body
  );
  
}

export default NotificationSystem;
