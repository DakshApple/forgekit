import { NextResponse } from "next/server";
import { withAdmin } from "@/server/auth";
import { getDashboard } from "@/server/admin-queries";

export const GET = withAdmin(async () => NextResponse.json(await getDashboard()));
