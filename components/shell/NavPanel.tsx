interface NavLink {
  label: string
  icon: string
  active?: boolean
}

interface NavGroup {
  title: string
  items: NavLink[]
}

const groups: NavGroup[] = [
  {
    title: 'My Work',
    items: [
      { label: 'My Day', icon: '◉', active: true },
      { label: 'Dashboards', icon: '◈' },
      { label: 'Activities', icon: '◈' },
    ],
  },
  {
    title: 'Customers',
    items: [
      { label: 'Accounts', icon: '◈' },
      { label: 'Contacts', icon: '◈' },
    ],
  },
  {
    title: 'Sales',
    items: [
      { label: 'Leads', icon: '◈' },
      { label: 'Opportunities', icon: '◈' },
      { label: 'Quotes', icon: '◈' },
    ],
  },
]

export function NavPanel() {
  return (
    <div className="flex flex-col overflow-y-auto border-r border-d365-border bg-white">
      <div className="px-4 pb-2 pt-3.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-d365-ink-3">
        Sales
      </div>
      {groups.map((g, gi) => (
        <div key={g.title} className={gi > 0 ? 'mt-2' : ''}>
          <div className="px-4 pb-1.5 pt-2.5 text-xs font-semibold text-d365-ink-2">
            {g.title}
          </div>
          {g.items.map((it) => (
            <div
              key={it.label}
              className={`flex cursor-pointer items-center gap-2 text-[13px] ${
                it.active
                  ? 'border-l-2 border-d365-blue bg-d365-blue-light py-1.5 pl-[30px] pr-4 font-semibold text-d365-ink'
                  : 'py-1.5 pl-8 pr-4 text-d365-ink hover:bg-[#F3F2F1]'
              }`}
            >
              <span className="text-sm text-d365-ink-3">{it.icon}</span>
              {it.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
