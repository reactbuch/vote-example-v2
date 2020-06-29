import React from "react";
import VoteController from "./VoteController";
import VoteLoadingIndicator from "./VoteLoadingIndicator";
import { fetchJson } from "../backend";

export default function VoteListPage() {
  //
  const [pageState, setPageState] = React.useState({
    currentPage: 1,
    hasPrevPage: false,
    hasNextPage: false,
    totalPages: null,
    allVotes: null,
  });

  function handleOnNextPage() {
    setPageState({
      currentPage: pageState.currentPage + 1,
    });
  }

  function handleOnPrevPage() {
    setPageState({
      currentPage: pageState.currentPage - 1,
    });
  }

  React.useEffect(() => {
    fetchJson(`/api/v2/votes?pagesize=2&page=${pageState.currentPage}`).then(
      (result) => {
        setPageState({
          currentPage: result.page,
          totalPages: result.totalpages,
          hasNextPage: result.hasNextPage,
          hasPrevPage: result.hasPrevPage,
          allVotes: result.result,
        });
      }
    );
  }, [pageState.currentPage]);

  if (!pageState.allVotes) {
    return <VoteLoadingIndicator />;
  }

  return (
    <VoteController
      votes={pageState.allVotes}
      currentPage={pageState.currentPage}
      totalPages={pageState.totalPages}
      onNextPage={pageState.hasNextPage ? handleOnNextPage : undefined}
      onPrevPage={pageState.hasPrevPage ? handleOnPrevPage : undefined}
    />
  );
}
