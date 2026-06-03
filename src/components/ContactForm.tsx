"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      setErrorMsg("All fields are required.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setErrorMsg(null);
        setFormState({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMsg(data.error || "Transmission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Transmission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="matte-card p-6 md:p-8 border border-white/60 relative w-full max-w-xl mx-auto shadow-sm">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent">
            <Send size={20} />
          </div>
          <h3 className="text-lg font-bold text-foreground">Transmission successful.</h3>
          <p className="text-xs text-foreground/80 max-w-xs mt-1.5 leading-relaxed">
            Your message has been received. Hemanath will get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-4 py-2 bg-surface hover:bg-foreground hover:text-background border border-white/40 hover:border-transparent text-foreground rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h3 className="text-lg font-bold text-foreground border-b border-black/5 pb-2">
            Send an Instant Message
          </h3>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 text-xs text-red-800 bg-red-100/80 border border-red-200/50 rounded-xl"
            >
              {errorMsg}
            </motion.div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-accent">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
                disabled={loading}
                placeholder="e.g. John Doe"
                className="w-full text-xs bg-surface/70 border border-white/60 hover:border-black/10 focus:border-black/20 focus:bg-white rounded-xl p-3 outline-none transition-all placeholder:text-accent/50 shadow-inner disabled:opacity-50"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-accent">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
                disabled={loading}
                placeholder="e.g. name@example.com"
                className="w-full text-xs bg-surface/70 border border-white/60 hover:border-black/10 focus:border-black/20 focus:bg-white rounded-xl p-3 outline-none transition-all placeholder:text-accent/50 shadow-inner disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-accent">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleInputChange}
              required
              disabled={loading}
              placeholder="e.g. Project Collaboration Inquiry"
              className="w-full text-xs bg-surface/70 border border-white/60 hover:border-black/10 focus:border-black/20 focus:bg-white rounded-xl p-3 outline-none transition-all placeholder:text-accent/50 shadow-inner disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-accent">
              Project Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              required
              disabled={loading}
              rows={5}
              placeholder="Explain your project details, schedule, or ideas here..."
              className="w-full text-xs bg-surface/70 border border-white/60 hover:border-black/10 focus:border-black/20 focus:bg-white rounded-xl p-3 outline-none resize-none transition-all placeholder:text-accent/50 shadow-inner disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-foreground text-background font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-black hover:shadow-lg hover:shadow-black/10 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Transmitting...
              </>
            ) : (
              <>
                <Send size={13} />
                Transmit Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
