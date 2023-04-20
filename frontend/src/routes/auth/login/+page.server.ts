import { verify } from "argon2";
import { fail } from "@sveltejs/kit";
import { setFlash, redirect } from "sveltekit-flash-message/server";
import { superValidate, setError } from "sveltekit-superforms/server";

import { prisma } from "$lib/utilities/database";
import { loginSchema } from "$lib/utilities/schema";
import { AuthService } from "$lib/services/AuthService";

export const actions = {
  async credentials(event) {
    const form = await superValidate(event, loginSchema);
    const shouldRedirect = !event.request.headers.get("x-sveltekit-action");

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: form.data.login }, { email: form.data.login }]
      }
    });

    if (!user) {
      setError(form, "login", "Invalid username or email address.");
      return fail(400, { form });
    }

    if (!(await verify(user.password, form.data.password))) {
      setError(form, "password", "Invalid password.");
      return fail(400, { form });
    }

    await prisma.session.upsert({
      where: { sid: event.locals.sid },
      update: { currentUserId: user.id },
      create: {
        sid: event.locals.sid,
        currentUserId: user.id
      }
    });

    setFlash(
      {
        id: "auth",
        type: "info",
        message: `You're now logged in as ${user.name}.`
      },
      event
    );

    if (shouldRedirect) {
      throw redirect(301, "/");
    } else {
      return {
        form,
        currentUser: AuthService.formatUserData(user)
      };
    }
  }
};
