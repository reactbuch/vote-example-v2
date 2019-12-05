import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const VOTES_QUERY = gql`
  query VoteOverview {
    votes {
      id
      title
      choices {
        id
        title
      }
    }
  }
`;

export default function VoteOverview() {
  const { loading, error, data } = useQuery(VOTES_QUERY);

  if (loading) {
    return <h3>Loading... Please wait!</h3>;
  }
  if (error) {
    return <h3>An error occurred while loading Votes</h3>;
  }

  return data.votes.map(v => (
    <div key={v.id}>
      <h2>{v.title}</h2>
      <ul>
        {v.choices.map(c => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  ));
}
