export const BRAND_NAME = 'Training Sertifikasi'
export const WHATSAPP_NUMBER = '628118500177'
export const PHONE_DISPLAY = '0811-8500-177'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^\s*(kota|kabupaten)\s+/i, '')
    .toLowerCase()
    .replace(/\s*&\s*/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function cityFromHost(host: string) {
  const hostname = host.split(':')[0].toLowerCase()
  if (!hostname.endsWith('trainingsertifikasi.id')) return null
  const subdomain = hostname.replace('.trainingsertifikasi.id', '')
  return subdomain && subdomain !== 'www' ? subdomain : null
}
