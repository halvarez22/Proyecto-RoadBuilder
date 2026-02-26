import { useFormik } from 'formik'
import * as Yup from 'yup'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n'

const baseInputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200'

export default function Contact() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'

  const inputClass = baseInputClass

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
        .matches(/^[0-9+\-\s()]{7,}$/, isEn ? 'Invalid phone number' : 'Teléfono inválido')
        .optional(),
      message: Yup.string()
        .min(10, isEn ? 'Too short' : 'Muy corto')
        .required(isEn ? 'Required' : 'Requerido'),
    }),
    onSubmit: (values, helpers) => {
      helpers.setStatus(
        isEn ? 'Thank you, we will contact you shortly.' : 'Gracias, nos pondremos en contacto pronto.',
      )
      helpers.resetForm()
    },
  })

  return (
    <section id="contacto" className="py-16 md:py-24 min-h-[calc(100vh-64px)] flex items-center scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 w-full grid gap-8 md:grid-cols-2 items-start">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl bg-primary/90 flex items-center justify-center overflow-hidden shadow-sm">
              <img
                src="/raod_builder_logo-removebg-preview.png"
                alt="RoadBuilder"
                className="h-14 w-auto object-contain drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div>
              <h2 className="font-sans text-3xl font-extrabold leading-tight text-white">
                {isEn ? 'Contact us' : 'Contáctenos'}
              </h2>
              <p className="font-sans text-slate-300 mt-1">
                {isEn ? 'Request information or a quote.' : 'Solicite información o una cotización.'}
              </p>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="max-w-lg">
            <div className="mb-4">
              <label className="font-sans block text-sm font-medium text-slate-200 mb-1.5">
                {isEn ? 'Name' : 'Nombre'}
              </label>
              <input
                className={inputClass}
                placeholder={isEn ? 'Your name' : 'Su nombre'}
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
                {...formik.getFieldProps('message')}
              />
              {formik.touched.message && formik.errors.message && (
                <div className="mt-1 text-red-400 text-sm">{formik.errors.message}</div>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-extrabold text-black shadow-md hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {isEn ? 'Send message' : 'Enviar Mensaje'}
            </button>
            <AnimatePresence mode="wait">
              {formik.status && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 px-4 py-3 flex items-center gap-3"
                >
                  <span className="text-emerald-400 text-xl" aria-hidden>
                    ✓
                  </span>
                  <p className="font-sans font-semibold text-emerald-200">{formik.status as string}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <iframe
            title={isEn ? 'Location' : 'Ubicación'}
            className="w-full h-[320px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=101%20Vintage%20Drive%2C%20Red%20Oak%2C%20TX%2075154&output=embed"
          />
          <div className="font-sans text-sm text-slate-300 p-4 border-t border-white/10">
            101 Vintage Drive, Red Oak, TX 75154, USA
          </div>
        </div>
      </div>
    </section>
  )
}
