import type { ProductSpec } from './types'

export const MOCK_PRODUCTS: ProductSpec[] = [
  {
    name: 'ThinkStation P8',
    cpu: 'AMD Threadripper PRO 7000 WX-series (up to 96 cores)',
    gpu: 'Up to 2× NVIDIA RTX 6000 Ada (48 GB each)',
    ram: 'Up to 2 TB DDR5 ECC',
    iso_certs: [
      'Aidoc (radiology AI)',
      'GE Healthcare Edison',
      'iCAD ProFound AI',
      'Volpara',
      'Siemens syngo.via',
      'Philips IntelliSpace',
    ],
    workload_profile:
      'Top-tier AI inference + 3D reconstruction. Built for large-model on-prem inference on dedicated reading stations.',
    price_range: '$8,500 – $18,000',
  },
  {
    name: 'ThinkStation P5',
    cpu: 'Intel Xeon W-2400/3400 series',
    gpu: 'NVIDIA RTX A4000 / A5000 / RTX 4000 Ada',
    ram: 'Up to 512 GB DDR5 ECC',
    iso_certs: [
      'Aidoc',
      'iCAD ProFound AI',
      'Volpara',
      'Siemens syngo.via',
      'Philips IntelliSpace',
    ],
    workload_profile:
      'Mid-range AI workstation. Secondary reading stations, radiologist offices, phased fleet rollouts. Good price-performance.',
    price_range: '$4,200 – $9,500',
  },
  {
    name: 'ThinkStation P3 Tower',
    cpu: 'Intel Core i7 / i9 (14th gen)',
    gpu: 'NVIDIA RTX A2000 / RTX 4000 SFF',
    ram: 'Up to 128 GB DDR5',
    iso_certs: ['iCAD ProFound AI', 'Volpara', 'Philips IntelliSpace'],
    workload_profile:
      'Entry workstation. Suitable for lighter AI-assisted workflows, clinical-ops review, density/risk tools. Not sized for heavy on-prem inference.',
    price_range: '$1,800 – $3,800',
  },
  {
    name: 'ThinkPad P16',
    cpu: 'Intel Xeon / Core i9 (HX-class)',
    gpu: 'NVIDIA RTX 5000 Ada Laptop',
    ram: 'Up to 192 GB DDR5',
    iso_certs: ['Aidoc', 'iCAD ProFound AI', 'Siemens syngo.via'],
    workload_profile:
      'Mobile workstation for roaming clinical informaticists, teleradiology, remote reads. Performance approaching desktop P5 but portable.',
    price_range: '$3,500 – $7,500',
  },
  {
    name: 'ThinkPad P1 Gen 7',
    cpu: 'Intel Core Ultra 9',
    gpu: 'NVIDIA RTX 4000 Ada Laptop',
    ram: 'Up to 64 GB LPDDR5x',
    iso_certs: ['iCAD ProFound AI', 'Volpara'],
    workload_profile:
      'Thin-and-light mobile workstation. Best for executives, CMIOs, informatics leadership who need performance but carry the machine daily.',
    price_range: '$2,400 – $4,800',
  },
  {
    name: 'ThinkPad T14 Gen 5',
    cpu: 'Intel Core Ultra 7 (vPro)',
    gpu: 'Integrated Intel Arc graphics',
    ram: 'Up to 64 GB DDR5',
    iso_certs: [],
    workload_profile:
      'Standard clinical + business notebook. Epic Hyperspace + Teams + clinical web apps. Fleet-friendly: vPro, ThinkShield, 4-year warranty, docked + mobile workflows. The default workhorse for 150–500 user endpoint fleets.',
    price_range: '$1,400 – $2,100',
  },
  {
    name: 'ThinkPad T14s Gen 4',
    cpu: 'Intel Core Ultra 5 / Ultra 7',
    gpu: 'Integrated Intel Arc graphics',
    ram: 'Up to 32 GB LPDDR5x (soldered)',
    iso_certs: [],
    workload_profile:
      'Thin-and-light clinical notebook. Same-family alternative to T14 for roaming/clinical staff who carry the device all day. Non-serviceable RAM is the tradeoff.',
    price_range: '$1,500 – $2,300',
  },
  {
    name: 'ThinkPad E15',
    cpu: 'Intel Core i5 / i7 (13th gen)',
    gpu: 'Integrated Intel graphics',
    ram: 'Up to 40 GB DDR4',
    iso_certs: [],
    workload_profile:
      'Value business notebook. Admin staff, non-clinical knowledge workers, shared/kiosk use. No vPro. Consider when a T14 is over-specced for a seat role.',
    price_range: '$900 – $1,300',
  },
  {
    name: 'ThinkCentre M90t Gen 5',
    cpu: 'Intel Core i5 / i7 (14th gen)',
    gpu: 'Integrated UHD / optional NVIDIA T400',
    ram: 'Up to 64 GB DDR5',
    iso_certs: [],
    workload_profile:
      'General-purpose business desktop. Office productivity, light admin work. Not certified for clinical imaging or AI inference workloads.',
    price_range: '$900 – $1,600',
  },
]
