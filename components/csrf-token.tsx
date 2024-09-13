"use client";

import { getCsrfToken } from "next-auth/react";
import { useEffect, useState } from "react";

interface CsrfTokenProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function CsrfToken(props: CsrfTokenProps) {
  const csrfTokenState = useState("");
  useEffect(() => {
    getCsrfToken().then((csrfToken) => {
      if (!csrfToken) {
        return;
      }
      csrfTokenState[1](csrfToken);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return csrfTokenState[0] ? (
    <input value={csrfTokenState[0]} {...props} />
  ) : null;
}
