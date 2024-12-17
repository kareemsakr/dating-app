import { searchMatchRequests } from "../lib/actions";
import MatchRequestSearch from "../ui/MatchRequestSearch";
import { MatchSelector } from "../ui/MatchSelector";

export async function AdminPanel() {
  const result = await searchMatchRequests({});
  return (
    <>
      <MatchSelector />
      <MatchRequestSearch matchRequests={result.data || []} />
    </>
  );
}
