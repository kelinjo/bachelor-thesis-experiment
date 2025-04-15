import React, { useEffect, useState, useRef } from "react";
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

function NotificationSystem() {
  const [visibleNotification, setVisibleNotification] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dismissTimeoutRef = useRef(null);
  const notificationIntervalRef = useRef(null);
  const originalContentRef = useRef(null);
  const location = useLocation();

  const startAutoDismissTimer = () => {
    if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    dismissTimeoutRef.current = setTimeout(() => {
      setVisibleNotification(null);
      setIsExpanded(false);
    }, 7000);
  };

  useEffect(() => {
    const group = localStorage.getItem("group");
    const start = localStorage.getItem("experimentStart");

    if (!group || !start) return;

    const groupIntervals = { A: 30, B: 25, C:20 };
    const intervalSeconds = groupIntervals[group] || 60;
    let counter = 1;

    const generateNotification = () => {
      // 🔇 If we're on the summary page, skip it
      if (location.pathname === "/summary" || location.pathname === "/task1-instructions" || location.pathname === "/task2-instructions") return;

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

      originalContentRef.current = message;
      setVisibleNotification(newNotification);
      setIsExpanded(false);
      logNotification(newNotification);
      startAutoDismissTimer();

      counter++;
    };

    // 🕓 Start interval
    notificationIntervalRef.current = setInterval(generateNotification, intervalSeconds * 1000);

    return () => clearInterval(notificationIntervalRef.current);
  }, [location.pathname]); // <- restart if route changes

  const handleNotificationClick = () => {
    if (!visibleNotification) return;

    const updated = {
      ...visibleNotification,
      wasClicked: true,
      clickTime: new Date().toLocaleTimeString(),
    };

    if (!isExpanded) {
      const randomExtra =
        expandMessages[Math.floor(Math.random() * expandMessages.length)];

      const expandedMessage = `${originalContentRef.current}

---

${randomExtra}`;

      setVisibleNotification({ ...updated, content: expandedMessage });
      setIsExpanded(true);
    } else {
      setVisibleNotification({ ...updated, content: originalContentRef.current });
      setIsExpanded(false);
    }

    logNotification(updated);
    startAutoDismissTimer(); // restart timer on click
  };

  const logNotification = (data) => {
    const prev = JSON.parse(localStorage.getItem("notificationLog") || "[]");
    localStorage.setItem("notificationLog", JSON.stringify([...prev, data]));
  };

  return visibleNotification && location.pathname !== "/summary" ? (
    <div className="notification-toast" onClick={handleNotificationClick}>
      <strong>🔔 Notification</strong>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: "8px" }}>
        {visibleNotification.content}
      </pre>
    </div>
  ) : null;
}

export default NotificationSystem;
