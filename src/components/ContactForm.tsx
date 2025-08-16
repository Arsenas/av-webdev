import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Įrašykite vardą ir pavardę"),
  email: z.string().email("Netinkamas el. pašto adresas"),
  phone: z.string().optional(),
  message: z.string().min(10, "Žinutė per trumpa"),
  // BUVO: z.literal<boolean>(true, { errorMap: ... })
  // TEISINGA: arba z.literal(true) su errorMap, arba paprasčiau:
  privacy: z.boolean().refine((v) => v === true, {
    message: "Būtina sutikti su privatumo sąlygomis",
  }),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "", privacy: false },
    mode: "onBlur",
  });

  const onSubmit = async (values: FormValues) => {
    console.log("CONTACT_FORM", values);
    setSent(true);
    reset({ name: "", email: "", phone: "", message: "", privacy: false });
  };

  if (sent) {
    return (
      <div className="cf-success" role="status" aria-live="polite">
        <p>Thank you! I will contact you as soon as possible.</p>
        <button className="cf-btn" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  const privacyChecked = watch("privacy");

  return (
    <form className="cf" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="cf-field">
        <span className="cf-label">name</span>
        <input type="text" {...register("name")} />
        {errors.name && <span className="cf-error">{errors.name.message}</span>}
      </label>

      <label className="cf-field">
        <span className="cf-label">email</span>
        <input type="email" {...register("email")} />
        {errors.email && <span className="cf-error">{errors.email.message}</span>}
      </label>

      <label className="cf-field">
        <span className="cf-label">telephone</span>
        <input type="tel" {...register("phone")} />
      </label>

      <label className="cf-field">
        <span className="cf-label">message</span>
        <textarea rows={6} {...register("message")} />
        {errors.message && <span className="cf-error">{errors.message.message}</span>}
      </label>

      <label className="cf-privacy">
        <input type="checkbox" {...register("privacy")} /> I accept the terms of the Privacy Policy
      </label>
      {errors.privacy && <span className="cf-error">{errors.privacy.message}</span>}

      <button className="cf-submit" type="submit" disabled={!privacyChecked || isSubmitting}>
        {isSubmitting ? "Invio..." : "Invia"}
      </button>
    </form>
  );
}
