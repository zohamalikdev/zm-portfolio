"use client";

import { useState } from "react";
import type React from "react";



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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: replace with a real submit call (API route, Formspree, Resend, etc.)
    await new Promise((resolve) => setTimeout(resolve, 600));

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  const inputClass =
    "w-full bg-white border-2 border-gray-500 border-t-gray-700 border-l-gray-700 border-b-white border-r-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow duration-150";

  return (
    <form onSubmit={handleSubmit} id="contact" className="font-sans text-sm">
      <div className="space-y-4">
        <div>
          <label className="block font-bold text-xs mb-1">NAME:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block font-bold text-xs mb-1">EMAIL:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block font-bold text-xs mb-1">MESSAGE:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-gray-300 border-2 border-gray-500 border-t-white border-l-white text-xs font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors duration-150 active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        </button>

        {submitted && (
          <span className="text-xs font-bold text-green-700 animate-pulse">
            ✓ Message sent — I'll reply soon.
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Expected response time: 24–48 hours
      </p>
    </form>
  );
}