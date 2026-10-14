"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  CircleHelpIcon,
  PlusIcon,
  SettingsIcon,
  ZapIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { Panel, UsageMeter } from "@/components/patterns/layout"
import { Pill, Eyebrow, Tag } from "@/components/patterns/status"
import {
  StatTile,
  ProgressRing,
  Callout,
  Stepper,
} from "@/components/patterns/data-display"
import {
  ListGroup,
  ListItem,
  DataTable,
  LogStream,
} from "@/components/patterns/collections"
import { ResponsiveDialog } from "@/components/patterns/responsive-dialog"
import { ValueField } from "@/components/patterns/code"
import { SegmentedControl } from "@/components/patterns/segmented-control"
import { FilterChips } from "@/components/patterns/filter-chips"
import { ThemeSegmented } from "@/components/theme/theme-toggle"

export function ToolPreview() {
  const [enabled, setEnabled] = useState(true)
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-elevated">
      <div className="flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <ZapIcon className="size-4 text-brand-text" />
          <span className="text-sm font-medium">Tool workspace</span>
        </div>
        <Tag>Preview</Tag>
      </div>
      <div className="space-y-5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <Eyebrow>Example / dashboard</Eyebrow>
            <h3 className="mt-2 font-heading text-xl font-semibold">
              Everything in its place.
            </h3>
          </div>
          <Pill tone="success" dot>
            Healthy
          </Pill>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <StatTile
            label="Example requests"
            value="24,816"
            trend={[12, 16, 14, 22, 18, 26, 30]}
          />
          <StatTile label="Example latency" value="42" unit="ms" />
        </div>
        <UsageMeter label="Monthly usage" used={24816} limit={50000} />
        <ListGroup>
          <ListItem
            icon={BellIcon}
            title="Notifications"
            description="A real switch. Try it."
            trailing={
              <Switch
                checked={enabled}
                onCheckedChange={setEnabled}
                aria-label="Example notifications"
              />
            }
          />
        </ListGroup>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-subtle-foreground">
            COMPOSED FROM THE KIT
          </span>
          <Button onClick={() => toast.success("Your next tool starts here.")}>
            <PlusIcon />
            New tool
          </Button>
        </div>
      </div>
    </div>
  )
}

export function ButtonsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(
        ["default", "outline", "secondary", "ghost", "destructive"] as const
      ).map((variant) => (
        <Button
          key={variant}
          variant={variant}
          onClick={() => toast(`${variant} button clicked`)}
        >
          {variant[0].toUpperCase() + variant.slice(1)}
          {variant === "default" && <ArrowRightIcon />}
        </Button>
      ))}
      <Button disabled>Disabled</Button>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="outline" size="icon" aria-label="Button help" />
          }
        >
          <CircleHelpIcon />
        </TooltipTrigger>
        <TooltipContent>Controls use Lucide icons at size-4.</TooltipContent>
      </Tooltip>
    </div>
  )
}

export function FormsExample() {
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [enabled, setEnabled] = useState(true)
  return (
    <form
      className="max-w-md space-y-5"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
        if (name.trim()) toast.success(`Saved example tool: ${name.trim()}`)
      }}
    >
      <Field data-invalid={submitted && !name.trim()}>
        <FieldLabel htmlFor="example-tool-name">Tool name</FieldLabel>
        <Input
          id="example-tool-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="My next tool"
          aria-invalid={submitted && !name.trim()}
          aria-describedby={
            submitted && !name.trim() ? "tool-name-error" : "tool-name-help"
          }
        />
        <FieldDescription id="tool-name-help">
          A local example. Nothing is sent to a server.
        </FieldDescription>
        {submitted && !name.trim() && (
          <FieldError id="tool-name-error">Enter a tool name.</FieldError>
        )}
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="example-private" defaultChecked />
        <FieldLabel htmlFor="example-private">Private by default</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch
          id="example-enabled"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
        <FieldLabel htmlFor="example-enabled">Enable notifications</FieldLabel>
      </Field>
      <Button type="submit">
        <CheckIcon />
        Save example
      </Button>
    </form>
  )
}

export function StatusExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(
        ["brand", "success", "warning", "danger", "info", "neutral"] as const
      ).map((tone) => (
        <Pill key={tone} tone={tone} dot live={tone === "success"}>
          {tone}
        </Pill>
      ))}
    </div>
  )
}

export function OverlayExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open responsive dialog
      </Button>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title="One API. Two presentations."
        description="A centered dialog on desktop and a bottom sheet on a phone."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false)
                toast.success("Example confirmed")
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          Resize your browser to try the mobile presentation. Focus management,
          escape to close, and the overlay come from the existing primitives.
        </p>
      </ResponsiveDialog>
    </>
  )
}

export function TabsExample() {
  return (
    <Tabs defaultValue="preview">
      <TabsList aria-label="Example view">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <p className="py-4 text-muted-foreground">
          Use Tabs to swap a whole panel of content.
        </p>
      </TabsContent>
      <TabsContent value="details">
        <p className="py-4 text-muted-foreground">
          For a small mode switch, use SegmentedControl instead.
        </p>
      </TabsContent>
    </Tabs>
  )
}

export function MetricsExample() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatTile
        label="Example uptime"
        value="99.98"
        unit="%"
        delta={1.2}
        trend={[8, 10, 9, 14, 12, 16, 17]}
      />
      <Panel title="Example quota">
        <div className="flex items-center gap-5">
          <ProgressRing value={0.64} size={60} label="64%" />
          <div className="flex-1">
            <UsageMeter label="Build minutes" used={64} limit={100} />
          </div>
        </div>
      </Panel>
    </div>
  )
}

export function CollectionsExample() {
  const rows = [
    {
      name: "Link checker",
      status: "Healthy",
      tone: "success" as const,
      runs: 128,
    },
    {
      name: "Feed reader",
      status: "Queued",
      tone: "neutral" as const,
      runs: 64,
    },
  ]
  return (
    <DataTable
      caption="Illustrative tools"
      rows={rows}
      rowKey={(row) => row.name}
      columns={[
        {
          key: "name",
          header: "Example tool",
          primary: true,
          cell: (row) => row.name,
        },
        {
          key: "status",
          header: "Status",
          cell: (row) => (
            <Pill tone={row.tone} dot>
              {row.status}
            </Pill>
          ),
        },
        {
          key: "runs",
          header: "Runs",
          align: "right",
          cell: (row) => <span className="font-mono">{row.runs}</span>,
        },
      ]}
    />
  )
}

export function SettingsExample() {
  const [enabled, setEnabled] = useState(true)
  return (
    <ListGroup>
      <ListItem
        icon={SettingsIcon}
        title="Automatic updates"
        description="Example preference"
        trailing={
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            aria-label="Automatic updates"
          />
        }
      />
      <ListItem
        icon={BellIcon}
        title="Send a test notification"
        description="Try toast feedback"
        onClick={() => toast.success("Test notification received")}
        chevron
      />
    </ListGroup>
  )
}

export function CodeExample() {
  return (
    <ValueField
      label="Example endpoint"
      value="https://example.com/api/tools"
      hint="Illustrative"
    />
  )
}

export function FeedbackExample() {
  return (
    <div className="space-y-4">
      <Callout tone="info" title="Compose, then customize the content.">
        All status colors use a shared Tone contract.
      </Callout>
      <Button variant="outline" onClick={() => toast.success("Changes saved")}>
        Show success toast
      </Button>
    </div>
  )
}

export function ModesExample() {
  const [value, setValue] = useState("week")
  const [filters, setFilters] = useState<string[]>(["active"])
  return (
    <div className="space-y-5">
      <SegmentedControl
        label="Example range"
        value={value}
        onValueChange={setValue}
        options={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
      />
      <FilterChips
        label="Example status filters"
        value={filters}
        onValueChange={setFilters}
        multiple
        options={[
          { value: "active", label: "Active", count: 3 },
          { value: "archived", label: "Archived", count: 2 },
        ]}
      />
    </div>
  )
}

export function WorkflowExample() {
  return (
    <Stepper
      steps={[
        { title: "Choose primitives", state: "complete" },
        { title: "Compose a pattern", state: "current" },
        { title: "Build your tool", state: "upcoming" },
      ]}
    />
  )
}

export function LogsExample() {
  return (
    <LogStream
      title="Example output"
      lines={[
        { time: "12:00:01", level: "info", message: "Loading design tokens" },
        {
          time: "12:00:02",
          level: "success",
          message: "Ready to build your next tool",
        },
      ]}
    />
  )
}

export const examples = [
  {
    slug: "ui-button",
    title: "Actions",
    description: "Six variants. One familiar interaction.",
    component: ButtonsExample,
    code: '<Button variant="outline">Create tool</Button>',
  },
  {
    slug: "ui-field",
    title: "Forms",
    description: "Labels, help, validation, and native controls.",
    component: FormsExample,
    code: '<Field>\n  <FieldLabel htmlFor="name">Tool name</FieldLabel>\n  <Input id="name" />\n</Field>',
  },
  {
    slug: "patterns-status",
    title: "Status",
    description: "Shared tones with a live, healthy signal.",
    component: StatusExample,
    code: '<Pill tone="success" dot live>Healthy</Pill>',
  },
  {
    slug: "patterns-responsive-dialog",
    title: "Overlays",
    description: "Dialog on desktop. Bottom sheet on a phone.",
    component: OverlayExample,
    code: '<ResponsiveDialog open={open} onOpenChange={setOpen}\n  title="Create tool">\n  {/* Your form */}\n</ResponsiveDialog>',
  },
  {
    slug: "ui-tabs",
    title: "Tabs",
    description: "Switch complete panels with keyboard navigation.",
    component: TabsExample,
    code: '<Tabs defaultValue="overview">\n  <TabsList><TabsTrigger value="overview">Overview</TabsTrigger></TabsList>\n  <TabsContent value="overview">Content</TabsContent>\n</Tabs>',
  },
  {
    slug: "patterns-data-display",
    title: "Metrics",
    description: "Compact values, trends, and quotas.",
    component: MetricsExample,
    code: '<StatTile label="Requests" value="24,816" />\n<ProgressRing value={0.64} label="64%" />',
  },
  {
    slug: "patterns-collections",
    title: "Collections",
    description: "Records become cards on smaller screens.",
    component: CollectionsExample,
    code: "<DataTable columns={columns} rows={rows}\n  rowKey={(row) => row.id} />",
  },
  {
    slug: "patterns-collections",
    title: "Settings",
    description: "Grouped rows instead of settings tables.",
    component: SettingsExample,
    code: '<ListGroup>\n  <ListItem title="Notifications" trailing={<Switch />} />\n</ListGroup>',
  },
  {
    slug: "patterns-code",
    title: "Values & copy",
    description: "One-click copying, with toast confirmation.",
    component: CodeExample,
    code: '<ValueField label="Endpoint" value="https://example.com/api" />',
  },
  {
    slug: "ui-sonner",
    title: "Feedback",
    description: "Contextual notes and theme-aware toasts.",
    component: FeedbackExample,
    code: 'toast.success("Changes saved")',
  },
  {
    slug: "patterns-segmented-control",
    title: "Modes & filters",
    description: "Small mode switches and filter selections.",
    component: ModesExample,
    code: '<SegmentedControl label="Range" value={range}\n  onValueChange={setRange} options={options} />',
  },
  {
    slug: "patterns-data-display",
    title: "Workflow",
    description: "Make the current step visible.",
    component: WorkflowExample,
    code: '<Stepper steps={[{ title: "Build", state: "current" }]} />',
  },
]

export function ModulePreview({ slug }: { slug: string }) {
  const example = examples.find((item) => item.slug === slug)
  if (example) {
    const Component = example.component
    return <Component />
  }
  if (slug.startsWith("theme-")) return <ThemeSegmented size="md" />
  if (slug === "ui-input" || slug === "ui-checkbox" || slug === "ui-switch")
    return <FormsExample />
  return null
}
