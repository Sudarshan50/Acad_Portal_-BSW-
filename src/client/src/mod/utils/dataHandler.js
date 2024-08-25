const handleData = (queries, attendance, opportunities) => {
  const modQueries = {};
  const ongoingActivities = {};
  const pastActivities = {};

  //modqueries includes thoses queries which are quueued or resolved and also conatin attendace which are unapproved...
  modQueries.queries = queries.filter(
    (query) => query.status === "QUEUED" || query.status === "RESOLVED"
  );
  modQueries.attendance = attendance.filter(
    (attendance) => attendance.status === "UNAPPROVED"
  );

  //ongoing activites contain those queries and opputunites which are either avaliable or taken...
  ongoingActivities.queries = queries.filter(
    (query) => query.status === "AVAILABLE" || query.status === "TAKEN"
  );
  ongoingActivities.opportunities = opportunities.filter(
    (opportunity) =>
      opportunity.state === "AVAILABLE" || opportunity.state === "TAKEN"
  );

  //past activites contain all those queires which are rejected/approved,expired opurtunites and approved/rejected attendace...
  pastActivities.queries = queries.filter(
    (query) => query.status === "DISMISSED" || query.status === "APPROVED" || query.status === "REJECTED"
  );
  pastActivities.opportunities = opportunities.filter(
    (opportunity) => opportunity.state === "EXPIRED"
  );
  pastActivities.attendance = attendance.filter(
    (attendance) =>
      attendance.status === "APPROVED" || attendance.status === "DISAPPROVED"
  );
  return { modQueries, ongoingActivities, pastActivities };
};
export default handleData;
