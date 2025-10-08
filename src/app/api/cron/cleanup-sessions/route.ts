import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

/**
 * * API route to clean up expired sessions from the database.
 *
 * @description
 * This endpoint is designed to be called by a scheduled task (cron job)
 * to periodically remove expired user sessions from the `Session` table.
 *
 * @protection
 * This endpoint is protected by a secret token. The cron job service must
 * send this secret in the `Authorization` header as a Bearer token.
 * The secret should be stored in the `CRON_SECRET` environment variable.
 *
 * @deployment
 * To make this work in production:
 * 1. Set the `CRON_SECRET` environment variable in your hosting environment.
 * 2. Configure a cron job service (e.g., GitHub Actions, Vercel Cron Jobs)
 *    to send a GET request to this endpoint (`/api/cron/cleanup-sessions`)
 *    on a regular schedule (e.g., daily).
 * 3. The cron job service must have access to your deployment URL and the `CRON_SECRET`.
 *
 * @example GitHub Actions Workflow (`.github/workflows/cleanup-sessions.yml`):
 *   - name: Call cleanup endpoint
 *     run: |
 *       curl --request GET \
 *       --url '${{ secrets.DEPLOYMENT_URL }}/api/cron/cleanup-sessions' \
 *       --header 'Authorization: Bearer ${{ secrets.CRON_SECRET }}'
 */
export async function GET() {

  const headersList = headers();
  const authorization = (await headersList).get("authorization");

  if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const now = new Date();
    const { count } = await prisma.session.deleteMany({
      where: {
        expires: {
          lt: now, // "lt" means "less than"
        },
      },
    });

    console.log(`Cron job: Successfully deleted ${count} expired sessions.`);
    return NextResponse.json({
      ok: true,
      message: `Deleted ${count} expired sessions.`,
    });
  } catch (error) {
    console.error("Cron job: Error cleaning up expired sessions:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}