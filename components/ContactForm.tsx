"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

type StatusType = "" | "success" | "error";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusType>("");

  // Auto hide toast
  useEffect(() => {
    if (!status) return;

    const timer = setTimeout(() => {
      setStatus("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [status]);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setLoading(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notifications */}
      <div className="fixed top-6 right-6 z-[9999] space-y-3">
        {status === "success" && (
          <div className="px-5 py-4 bg-green-500 text-black font-semibold shadow-xl border-2 border-white animate-pulse">
            ✓ Message sent successfully.
          </div>
        )}

        {status === "error" && (
          <div className="px-5 py-4 bg-red-500 text-white font-semibold shadow-xl border-2 border-white">
            ✕ Failed to send message.
          </div>
        )}
      </div>

      <div className="mt-12 max-w-xl">
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full bg-transparent border-2 border-white px-5 py-4 text-white placeholder:text-white/40 outline-none focus:border-white focus:bg-white/5 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full bg-transparent border-2 border-white px-5 py-4 text-white placeholder:text-white/40 outline-none focus:border-white focus:bg-white/5 transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={6}
            className="w-full bg-transparent border-2 border-white px-5 py-4 text-white placeholder:text-white/40 outline-none focus:border-white focus:bg-white/5 transition resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white hover:bg-white hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </>
  );
}