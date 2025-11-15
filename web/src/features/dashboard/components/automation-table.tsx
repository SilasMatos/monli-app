'use client'

export default function AutomationTable({
  automations
}: {
  automations: Array<{
    id: number
    name: string
    icon: string
    description: string
    status: string
    enrolledSubscribers: number
    completedSubscribers: number
    lastEdited: string
  }>
}) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Running':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      case 'Draft':
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
      case 'Paused':
        return 'bg-red-500/10 text-red-400 border border-red-500/20'
      default:
        return 'bg-slate-500/10 text-slate-400'
    }
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border bg-card/50">
          <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
            Automations Name
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
            Descriptions
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
            Status
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
            Subscribers Enrolled
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
            Subscribers Completed
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
            Last Edited
          </th>
        </tr>
      </thead>
      <tbody>
        {automations.map(automation => (
          <tr
            key={automation.id}
            className="border-b border-border hover:bg-card/50 transition cursor-pointer"
          >
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">{automation.icon}</span>
                <span className="font-medium text-foreground">
                  {automation.name}
                </span>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-muted-foreground">
              {automation.description}
            </td>
            <td className="px-6 py-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                  automation.status
                )}`}
              >
                {automation.status}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-foreground">
              <span className="text-muted-foreground">
                {automation.enrolledSubscribers}
              </span>{' '}
              <span className="text-muted-foreground">subscribers</span>
            </td>
            <td className="px-6 py-4 text-sm text-foreground">
              <span className="text-muted-foreground">
                {automation.completedSubscribers}
              </span>{' '}
              <span className="text-muted-foreground">subscribers</span>
            </td>
            <td className="px-6 py-4 text-sm text-muted-foreground">
              {automation.lastEdited}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
