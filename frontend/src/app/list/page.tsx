import InterestCard from "@/components/InterestCard";
import { getInterestByUserId } from "@/services/api";
import { cookies } from "next/headers";
import React from "react";
import { Empty } from "antd";

async function List() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");
  if (!userId) return <Empty />;
  const recommendation: Recommendation = await getInterestByUserId(
    userId?.value!
  );
  return <InterestCard recommendation={recommendation} />;
}

export default List;
