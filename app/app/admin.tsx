import { searchMatchRequests } from "../lib/actions";
import MatchRequestSearch from "../ui/MatchRequestSearch";
import { MatchSelector } from "../ui/MatchSelector";
import SelectionWrapper from "./wrapper";

export async function AdminPanel() {
  const result = await searchMatchRequests({});

  return (
    <SelectionWrapper>
      <MatchSelector />
      <MatchRequestSearch matchRequests={result.data || []} />
    </SelectionWrapper>
  );
}
