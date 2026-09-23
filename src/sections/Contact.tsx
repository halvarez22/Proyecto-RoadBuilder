import { useFormik } from 'formik'
import * as Yup from 'yup'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n'
import { WHATSAPP_URL } from '../components/WhatsAppBubble'
import { submitContact } from '../lib/submitContact'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200'

export default function Contact() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'

  const formik = useFormik({
    initialValues: { name: '', email: '', phone: '', message: '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, isEn ? 'Too short' : 'Muy corto')
        .required(isEn ? 'Required' : 'Requerido'),
      email: Yup.string()
        .email(isEn ? 'Invalid email' : 'Correo inválido')
        .required(isEn ? 'Required' : 'Requerido'),
      phone: Yup.string()
        .matches(/^[0-9+\-\s()]{7,}$/, isEn ? 'Invalid phone' : 'Teléfono inválido')
        .optional(),
      message: Yup.string()
        .min(10, isEn ? 'Too short' : 'Muy corto')
        .required(isEn ? 'Required' : 'Requerido'),
    }),
    onSubmit: async (values, helpers) => {
      helpers.setStatus(undefined)
      const result = await submitContact({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        lang,
      })

      if (result.ok) {
        helpers.setStatus({
          type: 'ok',
          text: isEn
            ? 'Thank you. We will contact you shortly.'
            : 'Gracias. Nos pondremos en contacto pronto.',
        })
        helpers.resetForm()
        return
      }

      helpers.setStatus({
        type: 'error',
        text: isEn
          ? 'Could not send the form. Please try WhatsApp or call +52 474 742 1030.'
          : 'No se pudo enviar el formulario. Intente por WhatsApp o llame al +52 474 742 1030.',
      })
    },
  })

  const status = formik.status as { type: 'ok' | 'error'; text: string } | undefined

  return (
    <section
      id="contacto"
      className="py-12 sm:py-16 md:py-24 min-h-[calc(100svh-64px)] flex items-center scroll-mt-20 pb-28 sm:pb-16"
    >
      <div className="mx-auto max-w-6xl px-4 w-full grid gap-8 md:grid-cols-2 items-start">
        <div className="min-w-0">
          <div className="mb-6 flex items-center gap-3 sm:gap-4">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl bg-primary/90 flex items-center justify-center overflow-hidden shadow-sm">
              <img
                src="/raod_builder_logo-removebg-preview.png"
                alt="RoadBuilder"
                className="h-10 sm:h-14 w-auto object-contain drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div className="min-w-0">
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                {isEn ? 'Contact us' : 'Contáctenos'}
              </h2>
              <p className="font-sans text-slate-300 mt-1">
                {isEn ? 'Request information or a quote.' : 'Solicite información o una cotización.'}
              </p>
              <p className="font-sans text-sm text-slate-300 mt-2">
                <a href="tel:+524747421030" className="text-primary hover:underline">
                  (52) 474 742 1030
                </a>
                {' · '}
                <a href="tel:+524747421031" className="text-primary hover:underline">
                  (52) 474 742 1031
                </a>
              </p>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="max-w-lg" noValidate>
            <div className="mb-4">
              <label className="font-sans block text-sm font-medium text-slate-200 mb-1.5">
                {isEn ? 'Name' : 'Nombre'}
              </label>
              <input
                className={inputClass}
                placeholder={isEn ? 'Your name' : 'Su nombre'}
                autoComplete="name"
                disabled={formik.isSubmitting}
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="mt-1 text-red-400 text-sm">{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="font-sans block text-sm font-medium text-slate-200 mb-1.5">
                {isEn ? 'Email' : 'Correo electrónico'}
              </label>
              <input
                type="email"
                className={inputClass}
                placeholder={isEn ? 'email@example.com' : 'correo@ejemplo.com'}
                autoComplete="email"
                disabled={formik.isSubmitting}
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-1 text-red-400 text-sm">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="font-sans block text-sm font-medium text-slate-200 mb-1.5">
                {isEn ? 'Phone' : 'Teléfono'}
              </label>
              <input
                type="tel"
                className={inputClass}
                placeholder={isEn ? 'Optional' : 'Opcional'}
                autoComplete="tel"
                disabled={formik.isSubmitting}
                {...formik.getFieldProps('phone')}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="mt-1 text-red-400 text-sm">{formik.errors.phone}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="font-sans block text-sm font-medium text-slate-200 mb-1.5">
                {isEn ? 'Message' : 'Mensaje'}
              </label>
              <textarea
                rows={4}
                className={inputClass + ' resize-y min-h-[100px]'}
                placeholder={isEn ? 'Write your message...' : 'Escriba su mensaje...'}
                disabled={formik.isSubmitting}
                {...formik.getFieldProps('message')}
              />
              {formik.touched.message && formik.errors.message && (
                <div className="mt-1 text-red-400 text-sm">{formik.errors.message}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-extrabold text-black shadow-md hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
            >
              {formik.isSubmitting
                ? isEn
                  ? 'Sending…'
                  : 'Enviando…'
                : isEn
                  ? 'Send Message'
                  : 'Enviar Mensaje'}
            </button>
            <AnimatePresence mode="wait">
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className={`mt-4 rounded-xl px-4 py-3 border ${
                    status.type === 'ok'
                      ? 'bg-emerald-500/15 border-emerald-400/40'
                      : 'bg-amber-500/15 border-amber-400/40'
                  }`}
                >
                  <p
                    className={`font-sans text-sm font-medium ${
                      status.type === 'ok' ? 'text-emerald-100' : 'text-amber-100'
                    }`}
                  >
                    {status.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg min-w-0">
          <iframe
            title={isEn ? 'Location' : 'Ubicación'}
            className="w-full h-[220px] sm:h-[280px] md:h-[320px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=101%20Vintage%20Drive%2C%20Red%20Oak%2C%20TX%2075154%2C%20USA&output=embed"
          />
          <div className="font-sans text-sm text-slate-300 p-4 border-t border-white/10 space-y-1">
            <div>101 Vintage Drive, Red Oak, TX 75154, USA</div>
            <div>
              <a href="tel:+524747421030" className="text-primary hover:underline">
                (52) 474 742 1030
              </a>
              {' · '}
              <a href="tel:+524747421031" className="text-primary hover:underline">
                (52) 474 742 1031
              </a>
            </div>
            <div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline font-semibold"
              >
                WhatsApp: +52 614 704 1000
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
