import { redirect } from "next/navigation";

export default async function RefundDetailUnderscorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/refund-requests/${id}`);
}

