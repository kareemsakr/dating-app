import { searchMatchRequests } from "../lib/actions";
import MatchRequestSearch from "../ui/MatchRequestSearch";

export async function AdminPanel() {
  const result = await searchMatchRequests({});
  return (
    <>
      <MatchRequestSearch matchRequests={result.data || []} />
    </>
  );
}
