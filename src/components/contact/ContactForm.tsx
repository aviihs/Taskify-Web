"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";

import Icon from "@/components/common/icon";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { buildMailtoLink } from "@/lib/mailto";
import { cn } from "@/lib/utils";
import type { ContactPageContent } from "@/types/ContactPage";

interface ContactFormValues {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface ContactFormProps {
  form: ContactPageContent["form"];
  contactEmail: string;
}

const FIELD_CLASS_NAME =
  "bg-taskify-background border-taskify-border/80 text-taskify-text placeholder:text-taskify-text-muted focus:border-taskify-accent focus:ring-taskify-accent/20 w-full rounded-2xl border px-4 py-3.5 text-[15px] transition-[border-color,box-shadow] outline-none focus:ring-4";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-taskify-text mb-2 block text-sm font-medium"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 overflow-hidden pt-2 text-sm text-red-600"
          >
            <Icon
              name="lucide:circle-alert"
              className="cursor-default text-sm lg:text-sm"
            />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm({ form, contactEmail }: ContactFormProps) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: { topic: form.topics[0] },
  });

  const handleSend = (values: ContactFormValues) => {
    const body = `${values.message}\n\n${values.name}\n${values.email}`;
    window.location.assign(
      buildMailtoLink(contactEmail, {
        subject: `${values.topic} from ${values.name}`,
        body,
      })
    );
    setHasSubmitted(true);
  };

  const handleStartOver = () => {
    reset();
    setHasSubmitted(false);
  };

  return (
    <div className="bg-taskify-surface border-taskify-border/70 relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_30px_80px_-40px_rgb(31_36_53/0.35)] sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {hasSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.1,
              }}
              className="from-taskify-primary to-taskify-secondary flex size-16 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg shadow-black/15"
            >
              <Icon
                name="lucide:send"
                className="cursor-default text-2xl lg:text-2xl"
              />
            </motion.span>
            <h2 className="text-taskify-text mt-6 text-2xl font-semibold tracking-tight">
              {form.successTitle}
            </h2>
            <p className="text-taskify-text-secondary mt-3 max-w-sm leading-relaxed">
              {form.successDescription}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="text-taskify-link mt-5 font-semibold underline-offset-4 hover:underline"
            >
              {contactEmail}
            </a>
            <button
              type="button"
              onClick={handleStartOver}
              className="text-taskify-text-secondary hover:text-taskify-text mt-8 inline-flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Icon name="lucide:rotate-ccw" className="text-sm lg:text-sm" />
              Write another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit(handleSend)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-taskify-text text-2xl font-semibold tracking-tight">
              {form.title}
            </h2>
            <p className="text-taskify-text-secondary mt-2 leading-relaxed">
              {form.description}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field
                id="contact-name"
                label="Name"
                error={errors.name?.message}
              >
                <input
                  id="contact-name"
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  className={cn(
                    FIELD_CLASS_NAME,
                    errors.name && "border-red-400"
                  )}
                  {...register("name", {
                    required: "Please tell us your name",
                  })}
                />
              </Field>

              <Field
                id="contact-email"
                label="Email"
                error={errors.email?.message}
              >
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  className={cn(
                    FIELD_CLASS_NAME,
                    errors.email && "border-red-400"
                  )}
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "That email doesn't look right",
                    },
                  })}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field id="contact-topic" label="Topic">
                  <div className="relative">
                    <select
                      id="contact-topic"
                      className={cn(FIELD_CLASS_NAME, "appearance-none pr-11")}
                      {...register("topic")}
                    >
                      {form.topics.map(topic => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                    <Icon
                      name="lucide:chevron-down"
                      className="text-taskify-text-muted pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
                    />
                  </div>
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field
                  id="contact-message"
                  label="Message"
                  error={errors.message?.message}
                >
                  <textarea
                    id="contact-message"
                    rows={6}
                    placeholder="How can we help?"
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    className={cn(
                      FIELD_CLASS_NAME,
                      "resize-none",
                      errors.message && "border-red-400"
                    )}
                    {...register("message", {
                      required: "Please write a message",
                      minLength: {
                        value: 10,
                        message: "A little more detail helps us help you",
                      },
                    })}
                  />
                </Field>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-taskify-text hover:bg-taskify-primary-dark mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-white shadow-lg shadow-black/10 transition-colors sm:w-auto"
            >
              {form.submitLabel}
              <Icon
                name="lucide:arrow-right"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
