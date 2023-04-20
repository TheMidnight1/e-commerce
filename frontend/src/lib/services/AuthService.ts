import type { User } from "@prisma/client";
import { pick } from "$lib/utilities/functions";
import { prisma } from "$lib/utilities/database";

export type TCurrentUser = ReturnType<Awaited<typeof AuthService["loadCurrentUser"]>>;

export class AuthService {
  static async loadCurrentUser(sid?: string) {
    if (!sid) return null;

    const session = await prisma.session.findFirst({
      where: { sid }
    });

    if (!session?.currentUserId) return null;

    const user = await prisma.user.findFirst({
      where: { id: session.currentUserId },
      select: { id: true, name: true, role: true }
    });
    return user;
  }
  static formatUserData(user: User) {
    return pick(user, ["id", "name", "role"]);
  }
}
