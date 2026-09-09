export type District = { name: string; city: string }

const districtsByCity: Record<string, string[]> = {
  bandung: ['Andir', 'Antapani', 'Arcamanik', 'Astanaanyar', 'Babakan Ciparay', 'Bandung Kidul', 'Bandung Kulon', 'Bandung Wetan', 'Batununggal', 'Bojongloa Kaler', 'Bojongloa Kidul', 'Buahbatu', 'Cibeunying Kaler', 'Cibeunying Kidul', 'Cibiru', 'Cicendo', 'Cidadap', 'Cinambo', 'Coblong', 'Gedebage', 'Kiaracondong', 'Lengkong', 'Mandalajati', 'Panyileukan', 'Rancasari', 'Regol', 'Sukajadi', 'Sukasari', 'Sumur Bandung', 'Ujungberung'],
  jakarta: ['Cengkareng', 'Grogol Petamburan', 'Kebon Jeruk', 'Kembangan', 'Palmerah', 'Taman Sari', 'Tambora', 'Tanah Abang', 'Menteng', 'Senen', 'Gambir', 'Kemayoran', 'Sawah Besar', 'Cempaka Putih', 'Tebet', 'Setiabudi', 'Mampang Prapatan', 'Pancoran', 'Pasar Minggu', 'Kebayoran Baru', 'Kebayoran Lama', 'Cilandak', 'Jagakarsa', 'Pulogadung', 'Jatinegara', 'Duren Sawit', 'Kramat Jati', 'Pasar Rebo', 'Cakung', 'Matraman', 'Kelapa Gading', 'Koja', 'Pademangan', 'Penjaringan', 'Tanjung Priok', 'Cilincing'],
  medan: ['Medan Amplas', 'Medan Area', 'Medan Barat', 'Medan Baru', 'Medan Belawan', 'Medan Deli', 'Medan Denai', 'Medan Helvetia', 'Medan Johor', 'Medan Kota', 'Medan Labuhan', 'Medan Maimun', 'Medan Marelan', 'Medan Perjuangan', 'Medan Petisah', 'Medan Polonia', 'Medan Selayang', 'Medan Sunggal', 'Medan Tembung', 'Medan Timur', 'Medan Tuntungan'],
}

export function districtsForCity(citySlug: string, cityName: string): District[] {
  const names = districtsByCity[citySlug] ?? [`Pusat ${cityName}`, `Kawasan ${cityName}`]
  return names.map((name) => ({ name: `Kecamatan ${name}`, city: cityName }))
}

export function districtSlug(district: District) {
  return district.name.replace(/^Kecamatan\s+/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export function districtSubdomainUrl(district: District, citySlug: string, serviceSlug: string) {
  return `https://${districtSlug(district)}.${citySlug}.trainingsertifikasi.id/artikel/${serviceSlug}`
}

export function districtMapsUrl(district: District) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${district.name}, ${district.city}`)}`
}

export { districtsByCity }
