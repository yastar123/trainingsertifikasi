export type TrainingCategory = 'Pelatihan' | 'Kajian' | 'Jasa'
export type Training = { name: string; category: TrainingCategory; description: string }

const pelatihan = [
  'Ahli K3 Umum', 'SMK3', 'Operator Forklift', 'Operator Alat Berat Excavator Bulldozer Vibro Dump Truck Wheel Loader', 'Operator Gondola', 'Operator Lifter, Manlift, Boomlift, Scissor Lift', 'Operator Pallet Mover, Liftstacker, Reachstacker', 'Operator Tower Crane', 'Operator Overhead Crane Mobile Crane Pedestal Crane', 'Operator Pita Transport (Conveyor) Kompressor', 'Rigger (Juru Ikat)', 'Operator K3 Cargo Hoist Crane Kelas 3 (Lift Barang)', 'Pesawat Angkat & Pesawat Angkut', 'Lift & Eskalator', 'Operator Genset', 'Turbin Uap & Gas', 'Operator Mesin Produksi & Perkakas', 'Operator Tanur', 'Pesawat Tenaga & Produksi', 'Pesawat Uap Boiler', 'Teknisi Bejana Tekan & Tangki Timbun', 'Petugas P3K', 'K3 Rumah Sakit', 'Hiperkes Paramedic / Perawat', 'HIPERKES DOKTER', 'K3 Kebakaran DAMKAR DCBA', 'K3 Kimia', 'Ahli K3 Muda Lingkungan Kerja', 'K3 Ruang Terbatas (Confined Space)', 'K3 Listrik', 'K3 Konstruksi', 'Perancah (Scaffolding)', 'Juru Las (Welder)', 'Tenaga Kerja Bangunan Tinggi (TKBT)', 'Tenaga Kerja Pada Ketinggian (TKPK)', 'WAH (Working at Height)', 'Pipe Fitter', 'K3 Konstruksi', 'H2S JSA ERGONOMI PERMIT TO WORK BBS HACCP HAZMAT LOTO', 'Authorizer Gas tester', 'DDT (Defensive Driving Training)', 'K3 Migas', 'Penanggung Jawab Operasional Pertama (POP) POM POU', 'Insiden Investigator', 'Penanggungjawab Operasional Pengolahan Air Limbah (POPAL)', 'Penanggungjawab Pengendalian Pencemaran Air (PPPA)', 'Penanggungjawab Pengendalian Pencemaran Udara (PPPU) & POIPPU', 'PLB3 (Penanggung Jawab Pengelolaan B3) & OLB3 (Operator Pengelola Limbah B3)', 'Pengambil Contoh Uji Air (PCUA)', 'Training Manajemen Risiko', 'Sea Survival HUET BOSIET & T-BOSIET', 'Compressor', 'Drilling',
]
const kajian = ['Kajian Safety Culture Maturity Level', 'Kajian Fire Risk Asessment', 'Kajian Lingkungan Transportasi Maritim Budaya Kesehatan Ekonomi Sosial Pendidikan']
const jasa = ['Jasa UKL-UPL Amdal Pertek Rintek', 'Jasa Sertifikat Laik Fungsi (SLF) dan Nomor Induk Data Instalasi (NIDI)', 'Jasa Sertifikat Laik Operasi (SLO)', 'Jasa Riksa Uji SILO (Surat Izin Layak Operasi) SIA (Surat Izin Alat)', 'Jasa Transportasi & Pengelolaan Limbah B3', 'Jasa Audit Keuangan Perusahaan']

const make = (names: string[], category: TrainingCategory, description: string) => names.map((name) => ({ name, category, description }))
export const trainings: Training[] = [...make(pelatihan, 'Pelatihan', 'Program kompetensi K3 dengan materi praktis untuk kebutuhan kerja.'), ...make(kajian, 'Kajian', 'Kajian berbasis kebutuhan untuk mendukung keputusan keselamatan organisasi.'), ...make(jasa, 'Jasa', 'Pendampingan profesional untuk kebutuhan kepatuhan dan operasional perusahaan.')]
export const trainingCategories: TrainingCategory[] = ['Pelatihan', 'Kajian', 'Jasa']
export const trainingCounts = { Pelatihan: pelatihan.length, Kajian: kajian.length, Jasa: jasa.length }

if (pelatihan.length !== 53 || kajian.length !== 3 || jasa.length !== 6) throw new Error('Training catalog counts do not match the approved catalog.')
if (trainings.length !== 62) throw new Error('Training catalog must contain exactly 62 items.')

export const trainingByCategory = (category: TrainingCategory) => trainings.filter((training) => training.category === category)

export const trainingForCity = (name: string, city: string) => `${name} ${city}`
