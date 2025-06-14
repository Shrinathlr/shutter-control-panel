
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const sentNotifications = [
  { to: "All Users", title: "Platform Update", date: "2025-06-12", content: "New payment methods added" },
  { to: "Photographers", title: "Contest!", date: "2025-06-10", content: "Submit your best shots by June 20!" },
];

const NotificationsPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Would send the notification here.
    setTitle("");
    setContent("");
    alert("Notification sent! (demo)");
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-2 text-pink-500">Notifications & Announcements</h2>
      <div className="max-w-xl space-y-8">
        <form className="space-y-4 rounded-xl bg-white p-4 shadow" onSubmit={handleSend}>
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Title</label>
            <input
              className="w-full border rounded p-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Notification subject"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Message</label>
            <textarea
              className="w-full border rounded p-2"
              rows={2}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Broadcast message"
              required
            />
          </div>
          <Button type="submit" className="w-full pink-gradient font-bold text-white shadow glow-on-hover">Send</Button>
        </form>
        <h3 className="font-semibold text-muted-foreground mb-3">Recently Sent</h3>
        <ul className="rounded-xl bg-muted p-4 space-y-3 shadow">
          {sentNotifications.map((n, i) => (
            <li key={n.title + i} className="border-b border-muted pb-2 last:border-none last:pb-0">
              <div className="flex justify-between">
                <span className="font-medium">{n.title}</span>
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">{n.content}</div>
              <div className="text-xs italic">To: <span className="font-semibold">{n.to}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsPage;
