const WHATSAPP_NUMBER = '523319459597'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export default function WhatsAppBubble() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
      aria-label="WhatsApp"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-7 w-7 text-white"
      >
        <path
          fill="currentColor"
          d="M16 4C9.37 4 4 9.17 4 15.39c0 2.54.84 4.89 2.29 6.8L4 28l5.99-2.17A12.3 12.3 0 0 0 16 26.77c6.63 0 12-5.17 12-11.39C28 9.17 22.63 4 16 4Zm0 20.54c-1.82 0-3.58-.5-5.12-1.45l-.37-.22-3.55 1.28 1.23-3.34-.24-.35A8.8 8.8 0 0 1 7.2 15.4C7.2 10.73 11.15 7 16 7s8.8 3.73 8.8 8.4-3.95 9.14-8.8 9.14Zm4.02-6.67c-.22-.11-1.29-.63-1.49-.7-.2-.07-.35-.11-.5.11-.15.22-.57.7-.7.86-.13.15-.26.17-.48.06-.22-.11-.94-.34-1.8-1.08-.67-.56-1.12-1.25-1.25-1.47-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.19-.69-1.63-.18-.43-.36-.36-.5-.37h-.43c-.15 0-.39.06-.6.28-.2.22-.79.74-.79 1.8 0 1.06.81 2.09.92 2.23.11.15 1.6 2.52 3.95 3.42.55.22.97.35 1.3.45.55.17 1.06.15 1.46.09.45-.07 1.29-.53 1.47-1.05.18-.52.18-.96.13-1.05-.04-.09-.2-.15-.41-.26Z"
        />
      </svg>
    </a>
  )
}

