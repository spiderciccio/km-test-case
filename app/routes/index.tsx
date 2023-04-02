import { useEffect, useState } from "react";

import { isClient } from "~/utils/index";
import { Campaign, CampaignAPI } from "~/models/campaign";

import styles from "~/styles/pages/index.css";

import LayoutDefault from "~/layouts/default";
import KmTable from "~/ui/Atom.Table";
import KmCampaignFilters from "~/ui/Molecule.CampaignFilters";
import IconActive from "~/assets/active";
import IconInactive from "~/assets/inactive";

declare global {
  interface Window {
    AddCampaigns: (items: CampaignAPI[]) => void;
  }
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Index() {
  const currentDate = new Date();
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [endDate, setEndDate] = useState<null | Date>(null);

  const [tbItems, setTbItems] = useState<Campaign[]>([]);
  const [originaItems, setOriginaItems] = useState<Campaign[]>([]);

  const tbHeader = [
    { key: "name", label: "Name" },
    {
      key: "status",
      label: "Status",
      format: (item: Campaign) =>
        item.isActive(currentDate) ? (
          <span className="status-active">
            <IconActive /> Active
          </span>
        ) : (
          <span className="status-inactive">
            <IconInactive /> Inactive
          </span>
        ),
    },
    {
      className: "text-right",
      key: "startDate",
      label: "Start date",
      format: (item: Campaign) => item.toStringStartDate(),
    },
    {
      className: "text-right",
      key: "endDate",
      label: "End date",
      format: (item: Campaign) => item.toStringEndDate(),
    },
    {
      className: "text-right",
      key: "Budget",
      label: "Budget",
      format: (item: Campaign) => item.toStringBudget(),
    },
  ];

  const applyFilters = () => {
    const searchLC = search.toLowerCase();
    setTbItems(
      originaItems.filter((item) => {
        const nameSearchable = item.getNameSearchable();
        if (!nameSearchable.includes(searchLC)) {
          return false;
        }
        if (item.getEndDateObj() < item.getStartDateObj()) {
          return false;
        }
        if (startDate && item.getStartDateObj() < startDate) {
          return false;
        }
        if (endDate && item.getEndDateObj() > endDate) {
          return false;
        }
        return true;
      })
    );
  };

  useEffect(() => applyFilters(), [originaItems, search, startDate, endDate]);

  if (isClient()) {
    window.AddCampaigns = (newItems: CampaignAPI[]) => {
      setOriginaItems((currentOiginalItems) => [
        ...currentOiginalItems,
        ...newItems.map((item) => new Campaign(item)),
      ]);
    };
  }

  return (
    <LayoutDefault header="Welcome to King Makers">
      <div
        className={`page-index ${
          originaItems.length === 0 ? "page-index--no-data" : ""
        }`}
      >
        <KmTable
          headers={tbHeader}
          items={tbItems}
          filters={
            <KmCampaignFilters
              endDate={endDate}
              search={search}
              startDate={startDate}
              onChangeEndDate={(date) =>
                setEndDate(date ? new Date(date) : null)
              }
              onChangeSearch={(newSearch) => setSearch(newSearch)}
              onChangeStartDate={(date) =>
                setStartDate(date ? new Date(date) : null)
              }
            />
          }
        ></KmTable>
        {originaItems.length === 0 ? (
          <div className="page-index__no-data-msg">
            Please call your global method &lt;&lt;AddCampaigns&gt;&gt;
          </div>
        ) : null}
      </div>
    </LayoutDefault>
  );
}
