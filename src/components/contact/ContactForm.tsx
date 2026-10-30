"use client";

import { useActionState, useEffect, useRef } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { submitInquiry } from "@/app/contact/actions";
import { budgetRanges, projectTypes } from "@/content/contact";
import { site } from "@/content/site";
import { LIMITS, type InquiryFields, type InquiryState } from "@/lib/contact/validation";
import { ButtonArrow, buttonClasses } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

const initialState: InquiryState = { status: "idle" };

const EMPTY: InquiryFields = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

const fieldClasses =
  "mt-2 block w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-3 text-[1.0625rem] text-fg transition-colors duration-(--dur-fast) placeholder:text-muted hover:border-fg-2 focus:border-accent focus:ring-0 focus-visible:outline-none aria-[invalid=true]:border-danger";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const values = "values" in state ? state.values : EMPTY;
  const errors = state.status === "invalid" ? state.errors : {};

  // Move focus to the first problem, or to the result message.
  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    } else if (state.status !== "idle") {
      resultRef.current?.focus();
    }
  }, [state]);

  // Time of the first interaction, used server-side to filter bots. Kept in a
  // ref because React resets the form's fields after every submission.
  const markStarted = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  const submit = (formData: FormData) => {
    formData.set("startedAt", String(startedAt.current));
    formAction(formData);
  };

  const fieldProps = (name: keyof InquiryFields) => ({
    id: `inquiry-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `inquiry-${name}-error` : undefined,
  });

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <m.div
            key="success"
            ref={resultRef}
            tabIndex={-1}
            role="status"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="rounded-card border border-line bg-surface p-10 outline-none"
          >
            <m.span
              initial={reduce ? false : { scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3, delay: 0.15 }}
              className="inline-flex size-14 items-center justify-center rounded-full bg-accent text-on-accent"
            >
              <Check aria-hidden strokeWidth={2.25} className="size-6" />
            </m.span>
            <h2 className="mt-8 text-heading font-medium">Thank you.</h2>
            <p className="mt-4 max-w-[40ch] text-lead text-fg-2">
              Your message has been sent. We will reply to the email address you gave us.
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            action={submit}
            noValidate
            onFocusCapture={markStarted}
            onPointerDownCapture={markStarted}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.25 } }}
            className="space-y-9"
          >
            {(state.status === "error" || state.status === "unconfigured") && (
              <div
                ref={resultRef}
                tabIndex={-1}
                role="alert"
                className="rounded-media border border-line bg-surface p-5 outline-none"
              >
                {state.status === "error" ? (
                  <p className="text-danger">{state.message}</p>
                ) : (
                  <>
                    <p className="font-medium">Your message has not been sent yet.</p>
                    <p className="mt-1 text-fg-2">
                      Online sending is not set up on this site. Your details are ready in an email to{" "}
                      {site.email}; open it and press send.
                    </p>
                    <a href={state.mailto} className={cn(buttonClasses({ size: "small" }), "mt-4")}>
                      Open prefilled email
                    </a>
                  </>
                )}
              </div>
            )}

            {state.status === "invalid" && (
              <p role="alert" className="text-meta text-danger">
                Please check the {Object.keys(errors).length === 1 ? "highlighted field" : "highlighted fields"}.
              </p>
            )}

            <div className="grid gap-9 sm:grid-cols-2">
              <Field label="Name" error={errors.name} htmlFor="inquiry-name">
                <input {...fieldProps("name")} type="text" autoComplete="name" required maxLength={LIMITS.name} defaultValue={values.name} className={fieldClasses} />
              </Field>
              <Field label="Email" error={errors.email} htmlFor="inquiry-email">
                <input {...fieldProps("email")} type="email" autoComplete="email" required maxLength={LIMITS.email} defaultValue={values.email} className={fieldClasses} />
              </Field>
            </div>

            <Field label="Company or organisation" optional error={errors.company} htmlFor="inquiry-company">
              <input {...fieldProps("company")} type="text" autoComplete="organization" maxLength={LIMITS.company} defaultValue={values.company} className={fieldClasses} />
            </Field>

            <div className="grid gap-9 sm:grid-cols-2">
              <Field label="Project type" error={errors.projectType} htmlFor="inquiry-projectType">
                <div className="relative">
                <select
                  key={`type-${values.projectType}`}
                  {...fieldProps("projectType")}
                  required
                  defaultValue={values.projectType}
                  className={cn(fieldClasses, "appearance-none pr-7")}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
                  <ChevronDown aria-hidden strokeWidth={1.75} className="pointer-events-none absolute right-0 bottom-3.5 size-4 text-muted" />
                  </div>
              </Field>
              <Field label="Budget" optional error={errors.budget} htmlFor="inquiry-budget">
                <div className="relative">
                <select
                  key={`budget-${values.budget}`}
                  {...fieldProps("budget")}
                  defaultValue={values.budget}
                  className={cn(fieldClasses, "appearance-none pr-7")}
                >
                  <option value="">Prefer not to say</option>
                  {budgetRanges.map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>
                  <ChevronDown aria-hidden strokeWidth={1.75} className="pointer-events-none absolute right-0 bottom-3.5 size-4 text-muted" />
                  </div>
              </Field>
            </div>

            <Field label="About the project" error={errors.message} htmlFor="inquiry-message">
              <textarea
                {...fieldProps("message")}
                required
                rows={5}
                minLength={LIMITS.messageMin}
                maxLength={LIMITS.messageMax}
                defaultValue={values.message}
                placeholder="What are you making, what is the timing, and what would success look like?"
                className={cn(fieldClasses, "resize-y")}
              />
            </Field>

            {/* Spam protection. Hidden from people and assistive technology. */}
            <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
              <label htmlFor="inquiry-website">Leave this field empty</label>
              <input id="inquiry-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              <button type="submit" disabled={pending} className={cn(buttonClasses({}), "disabled:opacity-60")}>
                <span className={cn("transition-[filter,opacity] duration-(--dur-fast)", pending && "opacity-70 blur-[1px]")}>
                  {pending ? "Sending" : "Send inquiry"}
                </span>
                <ButtonArrow />
              </button>
              <p className="max-w-[40ch] text-meta text-muted">Your details are used only to reply to this inquiry.</p>
            </div>
            <p aria-live="polite" className="sr-only">
              {pending ? "Sending your inquiry" : ""}
            </p>
          </m.form>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-meta font-medium text-fg-2">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-meta text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
