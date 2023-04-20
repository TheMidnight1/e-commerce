import { prisma } from "$lib/utilities/database";
import { redirect } from "sveltekit-flash-message/server";

export const actions = {
  async default(event) {
    await prisma.session.update({
      where: { sid: event.locals.sid },
      data: {
        currentUser: { disconnect: true }
      }
    });

    throw redirect(
      "/auth/login",
      { id: "auth", type: "success", message: "You're now logged out from your account." },
      event
    );
  }
};
