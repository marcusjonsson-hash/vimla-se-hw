interface SpecsTableProps {
  specs: Record<string, string>;
}

/**
 * Specifications table — two-column key/value layout.
 *
 * Displays at minimum: screen size, chip, camera, battery, 5G.
 * Open by default on all viewports. Collapsible via <details>/<summary>
 * with a chevron indicator visible on mobile only.
 *
 * Traces to: FR-206, US-201 AC-3, Drop 2 AC #2, ux.md specs table
 */
export default function SpecsTable({ specs }: SpecsTableProps) {
  const entries = Object.entries(specs);
  if (entries.length === 0) return null;

  return (
    <section className="mt-12">
      <details className="group" open>
        <summary className="md:list-none text-xl font-bold text-dark cursor-pointer md:cursor-default flex items-center justify-between">
          Specifikationer
          <span className="md:hidden text-muted text-sm group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-gray-200">
          <table className="w-full text-sm">
            <tbody>
              {entries.map(([label, value], index) => (
                <tr
                  key={label}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 font-medium text-muted w-1/3">
                    {label}
                  </td>
                  <td className="px-4 py-3 text-dark">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
