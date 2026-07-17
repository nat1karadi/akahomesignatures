/**
 * WhatsApp order routing.
 *
 * Orders are not paid online — instead the customer's basket + details are
 * formatted into a message and handed off to WhatsApp (the app on mobile,
 * WhatsApp Web on desktop) addressed to the house number below. No backend,
 * no API keys, no payment processor.
 *
 * To change the destination number, edit WHATSAPP_NUMBER here or set
 * NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local. Use full international format;
 * any spaces, dashes or a leading "+" are fine — they're stripped.
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+2347079604259"; // house number

/** Build a wa.me click-to-chat URL with a pre-filled message. */
export function whatsappLink(message: string, number = WHATSAPP_NUMBER): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** True when the destination number is still the unset placeholder. */
export function isWhatsAppConfigured(number = WHATSAPP_NUMBER): boolean {
  const digits = number.replace(/\D/g, "");
  return digits.length >= 7 && !/^0+$/.test(digits);
}
