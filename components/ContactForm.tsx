"use client";

import { useState } from "react";
import Magnetic from "@/components/Magnetic";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: replace with a real submit call (API route, Formspree, etc.)
    await new Promise((resolve) => setTimeout(resolve, 500));

    setFormData({ name: "", email: "", message: "" });
    setSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl font-mag-body">
      <div className="space-y-5">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="YOUR NAME"
          required
          className="w-full bg-transparent border-b-4 border-white py-3 px-0 text-white placeholder-white/40 placeholder:uppercase placeholder:tracking-wide focus:outline-none text-base"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="YOUR EMAIL"
          required
          className="w-full bg-transparent border-b-4 border-white py-3 px-0 text-white placeholder-white/40 placeholder:uppercase placeholder:tracking-wide focus:outline-none text-base"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="TELL ME ABOUT YOUR PROJECT..."
          required
          rows={4}
          className="w-full bg-transparent border-b-4 border-white py-3 px-0 text-white placeholder-white/40 placeholder:uppercase placeholder:tracking-wide focus:outline-none text-base resize-none"
        />
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Magnetic strength={0.3}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 border-2 border-white text-xs tracking-[0.15em] font-bold uppercase hover:bg-white hover:text-black brutal-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </Magnetic>

        {submitted && (
          <span className="text-xs text-white/70 animate-pulse">
            Message sent — I'll get back to you soon.
          </span>
        )}
      </div>

      <p className="text-xs text-white/40 mt-4 tracking-wide">
        EXPECTED RESPONSE TIME: 24–48 HOURS
      </p>
    </form>
  );
}