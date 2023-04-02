import { useMemo } from "react";
import { dateToISO } from "~/utils";

import KmInput from "~/ui/Atom.Input";

interface Props {
  endDate: Date | null;
  search: string;
  startDate: Date | null;
  onChangeEndDate: (str: string) => void;
  onChangeSearch: (str: string) => void;
  onChangeStartDate: (str: string) => void;
}

export default function KmCampaignFilters({
  endDate,
  search,
  startDate,
  onChangeEndDate,
  onChangeSearch,
  onChangeStartDate,
}: Props) {
  const endDateISO = useMemo(
    () => (endDate ? dateToISO(endDate) : ""),
    [endDate]
  );
  const startDateISO = useMemo(
    () => (startDate ? dateToISO(startDate) : ""),
    [startDate]
  );

  return (
    <tr className="km-campaign-filters">
      <th>
        <KmInput
          type="search"
          placeholder="Search"
          value={search}
          size="xs"
          onChange={onChangeSearch}
        />
      </th>
      <th />
      <th className="text-right">
        <KmInput
          value={startDateISO}
          attrs={{ max: endDateISO }}
          size="xs"
          type="date"
          onChange={onChangeStartDate}
        />
      </th>
      <th className="text-right">
        <KmInput
          value={endDateISO}
          attrs={{ min: startDateISO }}
          size="xs"
          type="date"
          onChange={onChangeEndDate}
        />
      </th>
      <th />
    </tr>
  );
}
