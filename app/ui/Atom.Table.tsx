interface TableHeader<T> {
  key: string | keyof T;
  label: string;
  className?: string;
  format?: (item: T) => string | JSX.Element;
}

interface Props<T> {
  filters: JSX.Element;
  headers: TableHeader<T>[];
  items: T[];
}

export default function KmTable<T>({ filters, headers, items }: Props<T>) {
  return (
    <div className="km-table">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key as string} className={header.className}>
                {header.label}
              </th>
            ))}
          </tr>
          {filters ?? null}
        </thead>
        <tbody>
          {items.map((item: T, row: number) => (
            <tr key={row}>
              {headers.map((header, col) => (
                <td key={col} className={header.className}>
                  {header.format
                    ? header.format(item)
                    : `${item[header.key as keyof T]}`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
