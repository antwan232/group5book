LoginPage.jsx
import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return <SignIn path="/login" routing="path" signUpUrl="/register" />;
}
