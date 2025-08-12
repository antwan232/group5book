// src/pages/RegisterPage.jsx
import { SignUp } from "@clerk/clerk-react";

export default function RegisterPage() {
  return <SignUp path="/register" routing="path" signInUrl="/login" />;
}
