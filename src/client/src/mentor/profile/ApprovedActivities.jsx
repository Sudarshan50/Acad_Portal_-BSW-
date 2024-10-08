import React from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';

const ApprovedQueries = ({ queries }) => (
  <div className="overflow-auto mb-4">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Info</th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Asked By</th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Moderator</th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Hours</th>
        </tr>
      </thead>
      <tbody>
        {queries?.map((query, index) => (
          <tr key={index}>
            <td className="border-b border-blue-gray-50 p-4">{(query.description.length>45)?(query.description).substring(0,45)+"....":(query.description)}</td>
            <td className="border-b border-blue-gray-50 p-4">{query.student.kerberos?.toUpperCase()}</td>
            <td className="border-b border-blue-gray-50 p-4">{`${query.last_action_moderator.kerberos}@iitd.ac.in`}</td>
            <td className="border-b border-blue-gray-50 p-4">{query.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ApprovedAttendances = ({ attendances }) => (
  <div className="overflow-auto">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Info</th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Approved By</th>
          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Hours</th>
        </tr>
      </thead>
      <tbody>
        {attendances?.map((attendance, index) => (
          <tr key={index}>
            <td className="border-b border-blue-gray-50 p-4">{(attendance.description.length>45)?(attendance.description).substring(0,45)+"....":(attendance.description)}</td>
            <td className="border-b border-blue-gray-50 p-4">{`${attendance.approved_by.kerberos}@iitd.ac.in`}</td>
            <td className="border-b border-blue-gray-50 p-4">{attendance.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ApprovedActivities = ({ queries, attendances }) => (
  <Card className="w-full mb-4">
    <CardBody>
      <Typography variant="h5" className="mb-4">My Approved Activity</Typography>
      <Typography variant="h6" className="mb-4">Queries taken with APPROVED hours</Typography>
      <ApprovedQueries queries={queries} />
      <Typography variant="h6" className="mb-4"> APPROVED Attendances</Typography>
      <ApprovedAttendances attendances={attendances} />
    </CardBody>
  </Card>
);

export default ApprovedActivities;