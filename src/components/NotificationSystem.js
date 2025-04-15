import React, { useEffect, useState, useRef } from "react";
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
  const originalContentRef = useRef(null); // Store original message

  useEffect(() => {
    const checkAndStart = () => {
      const group = localStorage.getItem("group");
      const start = localStorage.getItem("experimentStart");

      if (!group || !start) {
        console.log("⏳ Waiting for group/experimentStart...");
        setTimeout(checkAndStart, 1000);
        return;
      }

      console.log("✅ Notification system started for group:", group);

      const groupIntervals = { A: 10, B: 10, C: 10 }; // for testing
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

        originalContentRef.current = message;
        setVisibleNotification(newNotification);
        setIsExpanded(false);
        logNotification(newNotification);

        if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
        dismissTimeoutRef.current = setTimeout(() => {
          setVisibleNotification(null);
        }, 5000);

        counter++;
      }, intervalSeconds * 1000);
    };

    checkAndStart();
  }, []);

  const handleNotificationClick = () => {
    if (!visibleNotification) return;

    const updated = {
      ...visibleNotification,
      wasClicked: true,
      clickTime: new Date().toLocaleTimeString(),
    };

    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current);
      dismissTimeoutRef.current = null;
    }

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
  };

  const logNotification = (data) => {
    const prev = JSON.parse(localStorage.getItem("notificationLog") || "[]");
    localStorage.setItem("notificationLog", JSON.stringify([...prev, data]));
  };

  return visibleNotification ? (
    <div className="notification-toast" onClick={handleNotificationClick}>
      <strong>🔔 Notification</strong>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: "8px" }}>
        {visibleNotification.content}
      </pre>
    </div>
  ) : null;
}

export default NotificationSystem;
