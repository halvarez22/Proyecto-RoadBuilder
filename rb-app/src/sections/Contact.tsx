import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Contact(){
  const formik = useFormik({
    initialValues: { name:'', email:'', phone:'', message:'' },
    validationSchema: Yup.object({
      name: Yup.string().min(2,'Muy corto').required('Requerido'),
      email: Yup.string().email('Correo inválido').required('Requerido'),
      phone: Yup.string().matches(/^[0-9+\-\s()]{7,}$/, 'Teléfono inválido').optional(),
      message: Yup.string().min(10,'Muy corto').required('Requerido'),
    }),
    onSubmit: (values, helpers)=>{
      helpers.setStatus('Gracias, nos pondremos en contacto pronto.')
      helpers.resetForm()
    }
  })
  return (
    <section id="contacto" className="py-16 min-h-[calc(100vh-64px)] flex items-center scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 w-full grid gap-6 md:grid-cols-2 items-start">
        <div>
          <div className="mb-4 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-md bg-primary/90 flex items-center justify-center overflow-hidden">
              <img
                src="/raod_builder_logo-removebg-preview.png"
                alt="RoadBuilder"
                className="h-14 w-auto object-contain drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]"
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold leading-tight">Contáctenos</h2>
              <p className="text-slate-300">Solicite información o una cotización.</p>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="max-w-lg">
            <div className="mb-3">
              <label className="block text-sm mb-1">Nombre</label>
              <input className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2" {...formik.getFieldProps('name')} />
              {formik.touched.name && formik.errors.name && <div className="text-red-400 text-sm">{formik.errors.name}</div>}
            </div>
            <div className="mb-3">
              <label className="block text-sm mb-1">Correo electrónico</label>
              <input className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2" {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email && <div className="text-red-400 text-sm">{formik.errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="block text-sm mb-1">Teléfono</label>
              <input className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2" {...formik.getFieldProps('phone')} />
              {formik.touched.phone && formik.errors.phone && <div className="text-red-400 text-sm">{formik.errors.phone}</div>}
            </div>
            <div className="mb-3">
              <label className="block text-sm mb-1">Mensaje</label>
              <textarea rows={4} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2" {...formik.getFieldProps('message')} />
              {formik.touched.message && formik.errors.message && <div className="text-red-400 text-sm">{formik.errors.message}</div>}
            </div>
            <button type="submit" className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-extrabold text-black hover:brightness-110">
              Enviar Mensaje
            </button>
            {formik.status && <div className="mt-2 text-green-400 font-bold">{formik.status as string}</div>}
          </form>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/10">
          <iframe title="Ubicación" className="w-full h-[320px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Miguel%20Leandro%20Guerra%20181-B%2C%20Colonia%20Centro%2C%20Lagos%20de%20Moreno%2C%20Jalisco%2047400%2C%20Mexico&output=embed"></iframe>
          <div className="text-sm text-slate-300 p-3 border-t border-white/10">Miguel Leandro Guerra #181-B, Col. Centro, 47400, MX</div>
        </div>
      </div>
    </section>
  )
}
