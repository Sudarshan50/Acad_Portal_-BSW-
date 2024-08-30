import React from "react";
import { List, ListItem, Button } from "@material-tailwind/react";

const CustomList = ({ props, caller }) => {
  return (
    <List>
      {props?.map((query, index) => (
        <ListItem key={index}>
          {query.description}
          <p style={{color:"red",fontWeight:"bold",marginLeft:"1em"}}>{query.status}</p>
        </ListItem>
      ))}

    </List>

  );
};

export default CustomList;
