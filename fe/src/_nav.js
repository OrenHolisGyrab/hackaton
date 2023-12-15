export default [
  {
    component: 'CNavItem',
    name: 'Moje výpůjčky',
    to: '/vypujcky/personal-active',
    icon: 'cil-apps',
    role: 'STUDENT'
  },
  {
    component: 'CNavItem',
    name: 'Předchozí výpůjčky',
    to: '/vypujcky/personal-historic',
    icon: 'cil-apps',
    role: 'STUDENT'
  },
  {
    component: 'CNavTitle',
    name: 'Výpůjčky',
    role: 'WORKER'
  },
  {
    component: 'CNavItem',
    name: 'Aktivní výpůjčky',
    to: '/vypujcky/aktivni',
    icon: 'cil-apps',
    role: 'WORKER'
  },
  {
    component: 'CNavItem',
    name: 'Historie',
    to: '/vypujcky/historie',
    icon: 'cil-apps',
    role: 'WORKER'
  },
  {
    component: 'CNavItem',
    name: 'Položky',
    to: '/vypujcky/polozky',
    icon: 'cil-apps',
    role: 'WORKER'
  },
  {
    component: 'CNavTitle',
    name: 'Uživatelé',
    role: 'ADMIN'
  },
  {
    component: 'CNavItem',
    name: 'Opravneni',
    to: '/uzivatele/opravneni',
    icon: 'cil-apps',
    role: 'ADMIN'
  }
]
