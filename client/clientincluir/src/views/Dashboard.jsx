import { Button } from "@mui/material";
import React from "react";

export default function Dashboard() {
  const buttonsList = [
    { name: "Aula", href: "/clazz" },
    { name: "Presença", href: "/presenca" },
    { name: "Usuários", href: "/users" },
  ];

  return (
    <div>
      {buttonsList.map((e, index) => {
        return (
          <div key={index}>
            <Button style={{ marginLeft: 10 }} href={e.href}>
              {e.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
