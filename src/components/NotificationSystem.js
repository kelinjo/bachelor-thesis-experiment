import React, { useEffect, useRef, useState } from "react";
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

const task1Hints = {
  3: "🔍 Hint: Pick all the corners.",
  10: "🧠 Hint: R1 C3 and R6 C3.",
  16: "👁️ Hint: First column the cells are on R3 and R5.",
};

const task3Hints = {
  5: "🧮 Hint: The answer is 10.",
  12: "💡 Hint: The answer is 11.",
  20: "🧠 Hint: The answer is 6.",
};

const popSound = new Audio("/notification_audio.mp3");

function NotificationSystem() {
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const timersRef = useRef({});
  const originalContentRef = useRef({});
  const expandedContentRef = useRef({});
  const location = useLocation();
  const [taskActive, setTaskActive] = useState(true);

  const startAutoDismissTimer = (id, duration = 6000) => {
    if (timersRef.current[id]) clearTimeout(timersRef.current[id]);
    timersRef.current[id] = setTimeout(() => {
      setVisibleNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  };

  useEffect(() => {
    const handleTaskStatus = (e) => {
      if (e.detail === "start") {
        setTaskActive(true);
      } else if (e.detail === "end") {
        setTaskActive(false);
        setVisibleNotifications([]);
      }
    };

    window.addEventListener("taskStatus", handleTaskStatus);
    return () => window.removeEventListener("taskStatus", handleTaskStatus);
  }, []);

  useEffect(() => {
    const group = localStorage.getItem("group");
    const start = localStorage.getItem("experimentStart");
    if (!group || !start) return;

    const groupIntervals = { A: 20, B: 17, C: 5 };
    const intervalSeconds = groupIntervals[group] || 60;
    let counter = 1;

    const generateNotification = () => {
      if (!taskActive) return;
      if (location.pathname === "/summary") return;
      if (location.pathname.includes("instructions")) return;
      if (localStorage.getItem("dndActiveForThisTask") === "true") return; // 🛑 Block if DND active for this task

      const baseMessage = distractionMessages[Math.floor(Math.random() * distractionMessages.length)];
      const expandMessage = expandMessages[Math.floor(Math.random() * expandMessages.length)];
      const now = new Date();

      const newNotification = {
        id: `distraction_${now.getTime()}_${counter}`,
        timestamp: now.toLocaleTimeString(),
        content: baseMessage,
        type: "distraction",
        wasClicked: false,
      };

      originalContentRef.current[newNotification.id] = baseMessage;
      expandedContentRef.current[newNotification.id] = expandMessage;

      setVisibleNotifications((prev) => [
        ...prev.filter((n) => n.type !== "distraction"),
        newNotification,
      ]);
      logNotification(newNotification);
      startAutoDismissTimer(newNotification.id);

      popSound.currentTime = 0;
      popSound.play();

      counter++;
    };

    const interval = setInterval(generateNotification, intervalSeconds * 1000);
    return () => clearInterval(interval);
  }, [location.pathname, taskActive]);

  useEffect(() => {
    const handleHintTrigger = (e) => {
      if (localStorage.getItem("dndActiveForThisTask") === "true") return; // 🛑 Block hint notifications too
      const level = e.detail;
      let hintText = null;

      if (location.pathname.includes("/task1")) {
        hintText = task1Hints[level];
      } else if (location.pathname.includes("/task3")) {
        hintText = task3Hints[level];
      }
      if (!hintText) return;

      const baseMessage = distractionMessages[Math.floor(Math.random() * distractionMessages.length)];
      const now = new Date();

      const hintNotification = {
        id: `hint_${level}_${now.getTime()}`,
        timestamp: now.toLocaleTimeString(),
        content: baseMessage,
        type: "hint",
        wasClicked: false,
      };

      originalContentRef.current[hintNotification.id] = baseMessage;
      expandedContentRef.current[hintNotification.id] = hintText;

      setVisibleNotifications((prev) => [
        ...prev.filter((n) => n.type !== "hint"),
        hintNotification,
      ]);
      logNotification(hintNotification);
      startAutoDismissTimer(hintNotification.id);

      popSound.currentTime = 0;
      popSound.play();
    };

    window.addEventListener("triggerHint", handleHintTrigger);
    return () => window.removeEventListener("triggerHint", handleHintTrigger);
  }, [location.pathname]);

  const handleNotificationClick = (notification) => {
    const isExpanded = notification.id === notification.wasExpandedId;

    const updated = {
      ...notification,
      wasClicked: true,
      clickTime: new Date().toLocaleTimeString(),
    };

    const expandedMessage = `${originalContentRef.current[notification.id]}

---

${expandedContentRef.current[notification.id]}`;

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
      className="notification-toast"
      onClick={() => handleNotificationClick(notification)}
      style={{
        top: `${90 + index * 120}px`,
        left: "85px",
      }}
    >
      <strong>🔔 Notification</strong>
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
