import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

const schema = z.object({
  name: z.string().min(2, "form.errors.name"),
  email: z.string().email("form.errors.email"),
  phone: z.string().optional(),
  message: z.string().min(10, "form.errors.message"),
  privacy: z.boolean().refine((v) => v === true, {
    message: "form.errors.privacy",
  }),
  website: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

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
    try {
      const res = await fetch("https://formspree.io/f/manbgjlg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setSent(true);
        reset();
      } else {
        console.error("Formspree error:", res.statusText);
      }
    } catch (err) {
      console.error("Formspree fetch failed:", err);
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
      <label className="cf-field">
        <span className="visually-hidden">{t("form.name")}</span>
        <input type="text" placeholder={t("form.name")} {...register("name")} />
        {errors.name && <span className="cf-error">{t(errors.name.message!)}</span>}
      </label>

      <label className="cf-field">
        <span className="visually-hidden">{t("form.email")}</span>
        <input type="email" placeholder={t("form.email")} {...register("email")} />
        {errors.email && <span className="cf-error">{t(errors.email.message!)}</span>}
      </label>

      <label className="cf-field">
        <span className="visually-hidden">{t("form.phone")}</span>
        <input type="tel" placeholder={t("form.phone")} {...register("phone")} />
      </label>

      <label className="cf-field">
        <span className="visually-hidden">{t("form.message")}</span>
        <textarea rows={6} placeholder={t("form.message")} {...register("message")} />
        {errors.message && <span className="cf-error">{t(errors.message.message!)}</span>}
      </label>

      <label className="cf-hp" style={{ display: "none" }}>
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </label>

      <label className="cf-privacy">
        <input type="checkbox" {...register("privacy")} /> {t("form.privacy")}
      </label>
      {errors.privacy && <span className="cf-error">{t(errors.privacy.message!)}</span>}

      <button className="cf-submit" type="submit" disabled={!privacyChecked || isSubmitting}>
        {isSubmitting ? t("form.sending") : t("form.send")}
      </button>
    </form>
  );
}
