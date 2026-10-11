import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

const schema = z.object({
  name: z.string().trim().min(2, "form.errors.name"),
  email: z.string().trim().email("form.errors.email"),
  phone: z.string().optional(),
  message: z.string().trim().min(10, "form.errors.message"),
  privacy: z.boolean().refine((v) => v === true, {
    message: "form.errors.privacy",
  }),
  website: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      privacy: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: FormValues) => {
    setFailed(false);
    try {
      const res = await fetch("https://formspree.io/f/manbgjlg", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setSent(true);
        reset();
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    }
  };

  if (sent) {
    return (
      <div className="cf-success" role="status" aria-live="polite">
        <p>{t("form.success")}</p>
        <button className="cf-btn" onClick={() => setSent(false)}>
          {t("form.another")}
        </button>
      </div>
    );
  }

  const privacyChecked = watch("privacy");

  return (
    <form className="cf" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="cf-field">
        <label className="visually-hidden" htmlFor="contact-name">{t("form.name")}</label>
        <input id="contact-name" type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} placeholder={t("form.name")} {...register("name")} />
        {errors.name && <span id="name-error" className="cf-error">{t(errors.name.message!)}</span>}
      </div>

      <div className="cf-field">
        <label className="visually-hidden" htmlFor="contact-email">{t("form.email")}</label>
        <input id="contact-email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} placeholder={t("form.email")} {...register("email")} />
        {errors.email && <span id="email-error" className="cf-error">{t(errors.email.message!)}</span>}
      </div>

      <div className="cf-field">
        <label className="visually-hidden" htmlFor="contact-phone">{t("form.phone")}</label>
        <input id="contact-phone" type="tel" autoComplete="tel" placeholder={t("form.phone")} {...register("phone")} />
      </div>

      <div className="cf-field">
        <label className="visually-hidden" htmlFor="contact-message">{t("form.message")}</label>
        <textarea id="contact-message" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-help message-error" : "message-help"} rows={3} placeholder={t("form.message")} {...register("message")} />
        {errors.message && <span id="message-error" className="cf-error">{t(errors.message.message!)}</span>}
      </div>

      <p id="message-help" className="cf-help">{t("form.help")}</p>
      <label className="cf-hp" style={{ display: "none" }}>
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </label>

      <label className="cf-privacy">
        <input type="checkbox" {...register("privacy")} /> <span>{t("form.privacy")} <Link to="/privacy">{t("footer.privacy")}</Link></span>
      </label>
      {errors.privacy && <span className="cf-error">{t(errors.privacy.message!)}</span>}

      {failed && <p className="cf-error" role="alert">{t("form.failure")} <a href="mailto:business.aval@gmail.com">business.aval@gmail.com</a></p>}
      <button className="cf-submit" type="submit" disabled={!privacyChecked || isSubmitting}>
        {isSubmitting ? t("form.sending") : t("form.send")}
      </button>
    </form>
  );
}
