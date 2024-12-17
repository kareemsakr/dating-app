import { searchMatchRequests } from "../lib/actions";
import MatchRequestSearch from "../ui/MatchRequestSearch";
import { MatchSelector } from "../ui/MatchSelector";
import Wrapper from "./wrapper";

export async function AdminPanel() {
  const result = await searchMatchRequests({});

  return (
    <Wrapper>
      <MatchSelector />
      <MatchRequestSearch matchRequests={result.data || []} />
    </Wrapper>
  );
}
