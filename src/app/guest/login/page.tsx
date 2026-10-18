import { redirect } from "next/navigation";

export default function GuestLoginPage() {
  redirect("/guest?login=true");
}
