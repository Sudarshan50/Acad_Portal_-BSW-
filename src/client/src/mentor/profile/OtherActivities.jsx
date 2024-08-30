import React from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";


const ResolvedQueries = ({ queries, isMod, handleModAction }) => (
  <div className="overflow-auto mb-4">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Info
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Asked By
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Status
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Status
          </th>
        
        </tr>
      </thead>
      <tbody>
        {queries.map((query, index) => (
          <tr key={index}>
            <td className="border-b border-blue-gray-50 p-4">{(query.description.length>45)?(query.description).substring(0,45)+"....":(query.description)}</td>
            <td className="border-b border-blue-gray-50 p-4">{query.student.kerberos?.toUpperCase()}</td>
            <td className="border-b border-blue-gray-50 p-4">{`${query.last_action_moderator.kerberos}@iitd.ac.in`}</td>
            <td className="border-b border-blue-gray-50 p-4">{query.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RejectedQueries = ({ queries, isMod, handleModAction }) => (
  <div className="overflow-auto mb-4">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Info
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Asked By
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Moderator
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {queries.map((query, index) => (
          <tr key={index}>
            <td className="border-b border-blue-gray-50 p-4">{(query.description.length>45)?(query.description).substring(0,45)+"....":(query.description)}</td>
            <td className="border-b border-blue-gray-50 p-4">{query.student.kerberos?.toUpperCase()}</td>
            <td className="border-b border-blue-gray-50 p-4">{`${query.last_action_moderator.kerberos}@iitd.ac.in`}</td>
            <td className="border-b border-blue-gray-50 p-4">{query.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TakenOppurtunites = ({ opportunities }) => (
  <div className="overflow-auto mb-4">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Info
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Course
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Created By
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {opportunities.map((opportunity, index) => (
          <tr key={index}>
            <td className="border-b border-blue-gray-50 p-4">
              {opportunity.title}
            </td>
            <td className="border-b border-blue-gray-50 p-4">
              {opportunity.course}
            </td>
            <td className="border-b border-blue-gray-50 p-4">
              {opportunity.creator.kerberos?.toUpperCase()}
            </td>
            <td className="border-b border-blue-gray-50 p-4">
              {opportunity.state}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
const ExpiredOpportunities = ({ opportunities }) => (
  <div className="overflow-auto mb-4">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Info
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Course
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Taken By
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {opportunities.map((opportunity, index) => (
          <tr key={index}>
            <td className="border-b border-blue-gray-50 p-4">
              {opportunity.title}
            </td>
            <td className="border-b border-blue-gray-50 p-4">
              {opportunity.course}
            </td>
            <td className="border-b border-blue-gray-50 p-4">
              {opportunity?.taker?.kerberos?.toUpperCase()}
            </td>
            <td className="border-b border-blue-gray-50 p-4">
              {opportunity.state}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RejectedAttendances = ({ attendances, isMod, handleModAction }) => (
  <div className="overflow-auto mb-4">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Info
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Moderator
          </th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {attendances.map((attendance, index) => (
          <tr key={index}>
            <td className="border-b border-blue-gray-50 p-4">
            {(attendance.description.length>45)?(attendance.description).substring(0,45)+"....":(attendance.description)}
            </td>
            <td className="border-b border-blue-gray-50 p-4">
            {`${attendance.approved_by.kerberos}@iitd.ac.in`}
            </td>
            <td className="border-b border-blue-gray-50 p-4 ring-deep-orange-700">
              {attendance.status}
            </td>
            {isMod && (
              <td className="border-b border-blue-gray-50 p-4">
                <Button
                  size="small"
                  color="blue"
                  onClick={() =>
                    handleModAction(attendance, "Change to Approved")
                  }
                >
                  Change to Approved
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OtherActivities = ({
  resolvedQueries,
  rejectedQueries,
  expiredOpportunities,
  takenOpportunities,
  rejectedAttendances,
  isMod,
  handleModAction,
}) => (
  
  <Card className="w-full mb-4">
    <CardBody>
      <Typography variant="h5" className="mb-4">
        Other Activity
      </Typography>
      <Typography variant="h6" className="mb-4">
        RESOLVED queries, i.e. hours not approved or rejected
      </Typography>
      <ResolvedQueries
        queries={resolvedQueries}
        isMod={isMod}
        handleModAction={handleModAction}
      />
      <Typography variant="h6" className="mb-4">
        Queries taken with REJECTED hours
      </Typography>
      <RejectedQueries
        queries={rejectedQueries}
        isMod={isMod}
        handleModAction={handleModAction}
      />
      <Typography variant="h6" className="mb-4">
        My Floated opportunities
      </Typography>
      <ExpiredOpportunities opportunities={expiredOpportunities} />
      <Typography variant="h6" className="mb-4">
        TAKEN opportunities
      </Typography>
      <TakenOppurtunites opportunities={takenOpportunities} />
      <Typography variant="h6" className="mb-4">
        REJECTED Attendances
      </Typography>
      <RejectedAttendances
        attendances={rejectedAttendances}
        isMod={isMod}
        handleModAction={handleModAction}
      />
    </CardBody>
  </Card>
);

export default OtherActivities;
