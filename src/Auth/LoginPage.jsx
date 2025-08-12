import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";

export default function CustomSignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    image: null,
  });

  if (!isLoaded) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // إنشاء المستخدم
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      });

      // رفع الصورة (لو فيه)
      if (form.image) {
        await signUp.update({
          profileImage: form.image, // Blob أو File
        });
      }

      // تأكيد الحساب (لو فيه OTP أو Email verification)
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // تفعيل الجلسة
      await setActive({ session: signUp.createdSessionId });

      console.log("✅ User registered successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
